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

            <ion-icon :src="require(`/public/assets/icons/${entry.icon}.svg`)"
                      class="me-2"></ion-icon>

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
                  @click="onItemClick(entry)">
          <ion-icon :src="require(`/public/assets/icons/${entry.icon}.svg`)"
                    class="me-2"></ion-icon>

          <ion-label>
            {{ t("mainMenu." + entry.label) }}
          </ion-label>
        </ion-item>
      </ion-list>
    </ion-footer>
  </ion-menu>
</template>


<script lang="ts" setup>
import { computed, inject } from 'vue';
import { useStore } from 'vuex';
import { key } from '@/store';
import { AuthPlugin } from '@/plugins/AuthPlugin';
import { useI18n } from 'vue-i18n';
import { MessageSchema } from '@/plugins/I18n';
import { useRouter } from 'vue-router';
import Icon from '@/components/Icon.vue';

interface MenuEntry {
  route?: string;
  click?: () => void;
  label: string;
  divider?: boolean;
  icon?: string;
}

const store = useStore(key);
const router = useRouter();
const { t } = useI18n<{ message: MessageSchema }, 'it'>();
const auth = inject<AuthPlugin>('auth');
const isLoggedIn = computed(() => store.getters['auth/isLoggedIn']);

const menuEntries: MenuEntry[] = [
  {
    route: 'admin.home',
    label: 'home',
    icon: "home"
  },
  {
    route: 'admin.orders',
    label: 'document',
    icon: "ticket"
  },
  {
    route: 'admin.users',
    label: 'users',
    icon: "user-3"
  },
  {
    route: '',
    label: '',
    divider: true
  },
  {
    route: 'admin.products',
    label: 'products',
    icon: "ticket"
  },
  {
    route: 'admin.productCategories',
    label: 'productCategories',
    icon: "folder"
  }
];

const footerEntries: MenuEntry[] = [
  {
    click: () => auth?.logout(),
    label: 'logout',
    icon: "logout"
  }
]

function onItemClick (entry: MenuEntry) {
  if (entry.click) {
    entry.click();
  } else {
    router.push({ name: entry.route });
  }
}
</script>

<style scoped>

</style>
