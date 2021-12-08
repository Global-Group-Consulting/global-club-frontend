<template>
  <ion-menu side="start" content-id="main-content" menu-id="main-menu" autoHide="false" class="main-menu">
    <ion-header v-if="isLoggedIn">
      <ion-toolbar>
        <!--        <ion-title>Menu</ion-title>-->
        <ion-img :src="require('/public/assets/logo_full_bicolor.svg')"></ion-img>
      </ion-toolbar>
    </ion-header>

    <ion-content v-if="isLoggedIn">
      <ion-list>

        <template v-for="(entry, i) of menuEntries" :key="'menu_' + i">

          <ion-item-divider color="secondary" v-if="entry.divider">
            <hr>
          </ion-item-divider>

          <ion-item v-else button
                    :color="$route.name === entry.route ? 'primary' : ''"
                    @click="onItemClick(entry)">

            <Icon :name="entry.icon" class="me-2"></Icon>

            <ion-label>
              {{ t("mainMenu." + entry.label) }}
            </ion-label>
          </ion-item>
        </template>

      </ion-list>
    </ion-content>

    <ion-footer>
      <ion-list>
        <ion-item v-for="(entry, i) of footerEntries" :key="'footer_' + i"
                  button
                  :color="$route.name === entry.route ? 'primary' : ''"
                  @click="onItemClick(entry, $event)">
          <Icon :name="entry.icon" class="me-2"></Icon>

          <ion-label>
            <template v-if="entry.label.startsWith('$')">{{ entry.label.replace("$", '') }}</template>

            <template v-else>{{ $t("mainMenu." + entry.label) }}</template>
          </ion-label>
        </ion-item>

      </ion-list>


    </ion-footer>
  </ion-menu>
</template>


<script lang="ts" setup>
  import { computed, ComputedRef } from 'vue';
  import { useStore } from 'vuex';
  import { storeKey } from '@/store';
  // import { AuthPlugin } from '@/plugins/AuthPlugin';
  import { useI18n } from 'vue-i18n';
  import { MessageSchema } from '@/plugins/I18n';
  import { useRouter } from 'vue-router';
  import { formatUserName } from '@/@utilities/fields';
  import { popoverController } from '@ionic/vue';
  import AccountPopover from '@/components/popovers/AccountPopover.vue';
  import { AclPermissionsEnum } from '@/@enums/acl.permissions.enum';
  import { getUserMenuEntries } from '@/config/menuEntries';
  import { User } from '@/@types/User';
  import Icon from '@/components/Icon.vue';

  export interface MenuEntry {
    route?: string;
    click?: (event?: Event) => void;
    label: string;
    divider?: boolean;
    icon?: string;
    permissions?: AclPermissionsEnum[];
    showInMobile?: boolean;
  }

  const store = useStore(storeKey);
  const router = useRouter();
  const { t } = useI18n<{ message: MessageSchema }, 'it'>();
  // const auth = inject<AuthPlugin>('auth');
  const isLoggedIn = computed(() => store.getters['auth/isLoggedIn']);
  const authUser: ComputedRef<User> = computed(() => store.getters['auth/user']);

  const menuEntries: ComputedRef<MenuEntry[]> = computed(() => {
    return getUserMenuEntries(authUser.value);
  })

  const footerEntries: ComputedRef<MenuEntry[]> = computed(() => ([
    {
      label: "$" + formatUserName(authUser.value),
      icon: "settings",
      click: async (event) => {
        const popover = await popoverController
            .create({
              component: AccountPopover,
              cssClass: 'dropdown-popover',
                  event: event,
                  translucent: true
                })
            await popover.present();
          }
        }
      ])
  )

  function onItemClick (entry: MenuEntry, event?: Event) {
    if (entry.click) {
      entry.click(event);
    } else {
      router.push({ name: entry.route });
    }
  }
</script>
