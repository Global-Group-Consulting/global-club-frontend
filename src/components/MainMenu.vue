<template>
  <ion-menu side="start" content-id="main-content" menu-id="main-menu" autoHide="false">
    <ion-header v-if="isLoggedIn">
      <ion-toolbar>
        <ion-title>Menu</ion-title>
      </ion-toolbar>
    </ion-header>

    <ion-content v-if="isLoggedIn">
      <ion-list>

        <ion-item button
                  v-for="(entry, i) of menuEntries" :key="i"
                  :color="$route.name === entry.route ? 'primary' : ''"
                  @click="onItemClick(entry)">
          <ion-label>
            {{ t("mainMenu." + entry.label) }}
          </ion-label>
        </ion-item>

      </ion-list>
    </ion-content>
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

interface MenuEntry {
  route?: string;
  click?: () => void;
  label: string;
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
  },
  {
    route: 'admin.orders',
    label: 'orders',
  },
  {
    route: 'admin.users',
    label: 'users',
  },
  {
    route: 'admin.products',
    label: 'products',
  },
  {
    route: 'admin.productCategories',
    label: 'productCategories',
  },
  {
    click: () => auth?.logout(),
    label: 'logout',
  }
];

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
