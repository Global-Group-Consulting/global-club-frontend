<template>
  <IonPage>
    <TopToolbar include-back>Carrello</TopToolbar>

    <IonContent>
      <ion-grid fixed>
        <ion-row class="mb-4" v-if="hasProducts">
          <ion-col>
            <h3 class="ion-text-start">Totale provvisorio</h3>
          </ion-col>
          <ion-col>
            <h3 class="ion-text-end">
              <BriteValue :value="cartTotal"></BriteValue>
            </h3>
          </ion-col>
        </ion-row>

        <div v-if="hasProducts">
          <ion-list class="list-transparent mb-4">
            <ion-item v-for="entry of products" :key="entry.product._id">
              <ion-thumbnail slot="start">
                <slot name="image">
                  <img :src="formatImgUrl(entry.product.thumbnail.id)" alt="cover_image">
                </slot>
              </ion-thumbnail>

              <ion-label>
                <h2 v-html="entry.product.title"></h2>
                <div class="d-flex ion-align-items-center">
                  <ClubButton size="small" only-icon icon icon-name="minus"
                              @click="changeQta(entry, -1)"/>
                  <span class="px-2 ion-text-center" style="min-width: 40px;">
                {{ entry.qta }}
              </span>
                  <ClubButton size="small" only-icon icon icon-name="plus"
                              @click="changeQta(entry,+1)"/>

                  <BriteValue :value="entry.price" class="ms-3"/>
                </div>
              </ion-label>

              <ion-buttons>
              <template v-if="$store.getters['mdAndUp']">
                <ClubButton version="link" style="color: red" only-icon icon icon-name="trash"
                            @click="removeProduct(entry)"/>

                <PageLink :to="{name: 'private.products.details', params: {id: entry.product._id}}"
                          :btn-props="{icon: true, onlyIcon: true, iconName: 'chevron-right'}">
                </PageLink>
              </template>

                <ClubButton v-else icon icon-name="menu-v" only-icon version="link"
                            @click="openProductMenu($event, entry)"></ClubButton>
              </ion-buttons>

            </ion-item>
          </ion-list>

          <FormRTE label="Note aggiuntive" v-model="orderNotes"></FormRTE>
        </div>

        <NoData v-else text="Nessun prodotto nel carrello."></NoData>

        <ion-row v-if="hasProducts" class="ion-justify-content-center mt-5">
          <ion-col class="ion-text-center" size="12" size-sm="7" size-md="6">
            <ClubButton size="large" expanded @click="submitCart">
              Procedi all'ordine
            </ClubButton>
          </ion-col>
        </ion-row>
      </ion-grid>
    </ionContent>
  </IonPage>
</template>

<script lang="ts">
  import {
    IonContent,
    IonPage, popoverController,
  } from "@ionic/vue";
  import { warning } from "ionicons/icons";
  import { computed, defineComponent, inject, ref, watch } from "vue";
  import { useStore } from 'vuex';
  import { storeKey } from '@/store';
  import { formatBrites } from '@/@utilities/currency';
  import { formatImgUrl } from '@/@utilities/images';
  import { ComputedRef } from 'vue';
  import { OrderProduct } from "@/@types/Order";
  import BriteValue from '@/components/BriteValue.vue';
  import TopToolbar from '@/components/toolbars/TopToolbar.vue';
  import ClubButton from '@/components/ClubButton.vue';
  import PageLink from '@/components/PageLink.vue';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { AlertsPlugin } from '@/plugins/Alerts';
  import NoData from '@/components/NoData.vue';
  import MenuDropdownPopover from '@/components/popovers/MenuDropdownPopover.vue';
  import { MenuEntry } from '@/composables/menuEntries';
  import { useRouter } from 'vue-router';
  import FormRTE from '@/components/forms/FormRTE.vue';

  export default defineComponent({
    components: {
      FormRTE,
      NoData,
      PageLink,
      ClubButton,
      TopToolbar,
      BriteValue,
      IonPage,
      IonContent,
    },
    name: "Cart",
    setup () {
      const store = useStore(storeKey);
      const router = useRouter();
      const http = inject("http") as HttpPlugin;
      const alerts = inject("alerts") as AlertsPlugin;
      const products: ComputedRef<OrderProduct[]> = computed(() => store.getters["cart/products"]);
      const cartTotal = computed(() => store.getters["cart/totalPrice"]);
      const hasProducts = computed(() => products.value.length > 0);
      const orderNotes = ref(store.getters["cart/notes"]);

      function changeQta (entry: OrderProduct, value: number) {
        if (entry.qta <= 1 && value === -1) {
          return
        }

        store.dispatch("cart/updateQta", {
          productId: entry.product._id,
          qta: value
        })
      }

      async function removeProduct (entry: OrderProduct) {
        const askResult = await alerts.ask({
          header: "Rimuovere il prodotto dal carrello?",
          message: `Siete sicuri ti voler rimuovere il prodotto <strong>${entry.product.title}</strong> dal proprio carrello?`,
          buttonOkText: "Si, rimuovi"
        })

        askResult && await store.dispatch("cart/remove", entry.product._id)
      }

      async function submitCart () {
        const products = store.getters['cart/products'];
        const totalPrice = store.getters['cart/totalPrice'];

        const askResult = await alerts.ask({
          header: "Inviare l'ordine?",
          message: `Siete sicuri ti voler inviare il corrente ordine per un totale di <strong>${formatBrites(totalPrice)}</strong>?`,
          buttonOkText: "Si, invia"
        })

        if (!askResult) {
          return
        }

        // first check how much money the user has.
        await http.api.movements.checkEnough(store.getters['auth/user'].id, cartTotal.value);

        await http.api.orders.create(products, orderNotes.value);
        await alerts.toastSuccess("Ordine correttamente inviato!");
        await store.dispatch("cart/clean");
      }

      async function openProductMenu (event: Event, entry: OrderProduct) {
        const popover = await popoverController
            .create({
              component: MenuDropdownPopover,
              componentProps: {
                data: [
                  {
                    icon: "trash",
                    label: "Rimuovi",
                    click: () => removeProduct(entry)
                  },
                  {
                    icon: "chevron-right",
                    label: "Vai al prodotto",
                    click: () => router.push({ name: 'private.products.details', params: { id: entry.product._id } })
                  }
                ] as MenuEntry[]
              },
              cssClass: 'dropdown-popover',
              event: event,
              translucent: true
            })
        await popover.present();
      }

      watch(() => orderNotes.value, (value) => {
        store.dispatch("cart/updateNotes", value)
      })

      return {
        warning,
        cartTotal, hasProducts,
        products, orderNotes,
        formatBrites, formatImgUrl,
        changeQta, removeProduct,
        submitCart, openProductMenu
      };
    },
  });
</script>

<style>


  .prodotticarrello {
    background-color: rgb(30, 30, 30);
    text-align: left;
    font-size: 13px;
  }


  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
    border: 0;
    border-top: 1px solid rgba(243, 243, 243, 0.342);
  }

  .btncart {
    text-transform: none;
    color: #fff;
    font-size: 15px;
    padding: 50px;
  }

  .icon-alignment {
    position: absolute;
    top: 75px;
  }

  .img-radius {
    border-radius: 25px;
  }

  .brite-img {
    width: 15px;
  }

  .header-nav {
    color: white;
    padding-left: 30px;
    padding-right: 75px;
  }

  .increment-content {
    background-color: #2d2d2d;
    width: max-content;
    border-radius: 50px;
    margin-top: 10px;
    height: 35px;
  }

  .carrello-dettagli {
    display: flex;
    flex-direction: column;
    flex-wrap: wrap;
    align-content: center;
    justify-content: center;
  }

</style>
