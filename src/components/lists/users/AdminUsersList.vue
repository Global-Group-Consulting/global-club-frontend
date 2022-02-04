<template>
  <div>
    <h4 class="ion-text-start" v-if="title">{{ title }}</h4>

    <PaginatedList :paginated-data="paginatedData"
                   v-if="paginatedData?.data.length > 0"
                   v-slot:default="{data}"
                   @pageChanged="onPageChanged">
      <ion-list>
        <AdminListItem v-for="user of data" :key="user._id"
                       :title="getTitle(user)"
                       :description="user.email"
                       :open-link="{ name:'admin.users.profile', params: { id: user._id } }"
                       :open-link-label="$t('pages.users.btn_open')"
        >
          <template v-slot:image>
            <Icon :name="role !== UserRoleEnum.CLIENTE ? 'user' : 'user-2'"></Icon>
          </template>
        </AdminListItem>
      </ion-list>
    </PaginatedList>

  </div>
</template>

<script lang="ts">
import {defineComponent, inject, nextTick, onMounted, PropType, Ref, ref, watch} from 'vue';
import {PaginatedResultEntity} from '@/@entities/paginatedResult.entity';
import {Order} from '@/@types/Order';
import {HttpPlugin} from '@/plugins/HttpPlugin';
import NoData from '@/components/NoData.vue';
import AdminListItem from '@/components/lists/AdminListItem.vue';
import {formatLocaleDate} from '@/@utilities/dates';
import {formatOrderStatus} from '@/@utilities/statuses';
import {useI18n} from 'vue-i18n';
import {UserRoleEnum} from '@/@enums/user.role.enum';
import {User} from '@/@types/User';
import {formatUserName} from '@/@utilities/fields';
import PaginatedList from "@/components/lists/PaginatedList.vue";
import {PaginatedResult} from "@/@types/Pagination";

export default defineComponent({
  name: "AdminUsersList",
  components: {PaginatedList, AdminListItem},
  props: {
    title: String,
    role: {
      required: true,
      type: Number as PropType<UserRoleEnum>,
    },
    noDataText: String,
    visible: {
      type: Boolean,
      default: true
    },
    limit: Number
  },
  setup(props, {emit}) {
    const http = inject("http") as HttpPlugin;
    const {t} = useI18n();
    // const users = new PaginatedResultEntity<User>();
    const loaded = ref(false);
    const paginatedData: Ref<PaginatedResult<any> | undefined> = ref();

    function getTitle(user: User) {
      return formatUserName(user)
    }

    function getDescription(order: Order) {
      return t('pages.orders.list.subText', {
        number: order._id,
        status: formatOrderStatus(order.status)
      })
    }


    async function fetchData(page?: number) {
      paginatedData.value = await http.api.users.readAll(props.role, page);

      // users.merge(result);

      loaded.value = true;

      await nextTick(() => {
        emit("dataFetched");
      })
    }

    async function onPageChanged(page: number) {
      await fetchData(page)
    }

    watch(() => props.visible, (value) => {
      if (!loaded.value && value) {
        fetchData()
      }
    })

    onMounted(async () => {
      if (!loaded.value && props.visible) {
        await fetchData()
      }
    });

    return {
      formatLocaleDate, formatOrderStatus,
      getTitle, getDescription,
      UserRoleEnum, onPageChanged, paginatedData
    }
  }
  });
</script>

<style scoped>

</style>
