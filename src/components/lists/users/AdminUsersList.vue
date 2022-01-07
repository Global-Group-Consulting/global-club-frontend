<template>
  <div>
    <h4 class="ion-text-start" v-if="title">{{ title }}</h4>

    <ion-list v-if="users.data.length > 0">
      <AdminListItem v-for="user of users.data" :key="user._id"
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

    <template v-else>
      <NoData :text="noDataText"></NoData>
    </template>

    <!--        <PaginationBar :pagination-data="paginationData"></PaginationBar>-->
  </div>
</template>

<script lang="ts">
  import { defineComponent, inject, onMounted, PropType, ref, watch } from 'vue';
  import { PaginatedResultEntity } from '@/@entities/paginatedResult.entity';
  import { Order } from '@/@types/Order';
  import { HttpPlugin } from '@/plugins/HttpPlugin';
  import { OrderStatusEnum } from '@/@enums/order.status.enum';
  import NoData from '@/components/NoData.vue';
  import AdminListItem from '@/components/lists/AdminListItem.vue';
  import { formatLocaleDate } from '@/@utilities/dates';
  import { formatOrderStatus } from '@/@utilities/statuses';
  import { useI18n } from 'vue-i18n';
  import { UserRoleEnum } from '@/@enums/user.role.enum';
  import { User } from '@/@types/User';
  import { formatUserName } from '@/@utilities/fields';

  export default defineComponent({
    name: "AdminUsersList",
    components: { AdminListItem, NoData },
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
    setup (props, { emit }) {
      const http = inject("http") as HttpPlugin;
      const { t } = useI18n();
      const users = new PaginatedResultEntity<User>();
      const loaded = ref(false);

      function getTitle (user: User) {
        return formatUserName(user)
      }

      function getDescription (order: Order) {
        return t('pages.orders.list.subText', {
          number: order._id,
          status: formatOrderStatus(order.status)
        })
      }

      async function fetchData () {
        const result = await http.api.users.readAll(props.role);

        users.merge(result);

        loaded.value = true;

        emit("dataFetched");
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
        users,
        formatLocaleDate, formatOrderStatus,
        getTitle, getDescription,
        UserRoleEnum
      }
    }
  });
</script>

<style scoped>

</style>
