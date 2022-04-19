<template>
  <div>
    <div class="ion-text-right mb-3">
      <ClubButton size="small" version="outline" @click="readAll" v-if="paginatedData?.data.length && showReadAllBtn">
        Segna tutto come letto
      </ClubButton>
    </div>

    <h4 class="ion-text-start" v-if="title">{{ title }}</h4>

    <PaginatedList :paginated-data="paginatedData"
                   v-slot:default="{data}"
                   :visible="visible"
                   @pageChanged="onPageChanged"
                   @manualRefresh="onManualRefresh">
      <ion-list>
        <!-- TODO:: impostare l'immagine in base al tipo di notifica. Se c'è un immagine, mostrare quella -->
        <AdminListItem v-for="item of data" :key="item.id"
                       :title="item.data.title"
                       :description="item.data.content"
                       :open-link="{}"
                       :is-button="false">
          <template v-slot:description="{description}">
            <div class="ion-text-wrap" v-html="description"></div>
          </template>

          <template v-slot:extraLabels>
            <div class="ion-text-wrap text-small">
              <strong class="ion-text-wrap">{{ getType(item) }}</strong>
              <span> - </span>
              <span class="ion-text-wrap">{{ getCreatedAt(item.created_at) }}</span>
            </div>
          </template>

          <template v-slot:buttons-main>
            <div class="d-flex flex-column ion-align-items-center">
              <ion-toggle :checked="item.read_at" @click.prevent.stop="updateStatus(item, $event)"></ion-toggle>
              <small>{{ getStatus(item) }}</small>
            </div>
          </template>
        </AdminListItem>
      </ion-list>
    </PaginatedList>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, PropType, Ref, ref, watch } from 'vue'
import { Notification } from '@/@types/Notifications'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { OrderStatusEnum } from '@/@enums/order.status.enum'
import AdminListItem from '@/components/lists/AdminListItem.vue'
import { formatLocaleDate } from '@/@utilities/dates'
import { formatOrderStatus, getOrderStatusColor } from '@/@utilities/statuses'
import { useI18n } from 'vue-i18n'
import PaginatedList from '@/components/lists/PaginatedList.vue'
import { PaginatedResult } from '@/@types/Pagination'
import ClubButton from '@/components/ClubButton.vue'
import FormToggleV from '@/components/forms/FormToggleV.vue'
import { AlertsPlugin } from '@/plugins/Alerts'
import { NotificationTypeEnum } from '@/@enums/notification.type.enum'

export default defineComponent({
  name: 'NotificationsList',
  components: { ClubButton, AdminListItem, PaginatedList },
  props: {
    title: String,
    read: {
      type: Boolean,
      required: true
    },
    noDataText: String,
    visible: {
      type: Boolean,
      default: true
    },
    userId: String,
    limit: Number,
    filters: Object,
    eager: Boolean,
    refreshAsap: Boolean,
    showReadAllBtn: Boolean
  },
  setup (props, { emit }) {
    const http = inject('http') as HttpPlugin
    const alerts = inject('alerts') as AlertsPlugin
    const { t } = useI18n()
    const paginatedData: Ref<PaginatedResult<Notification[]> | undefined> = ref()
    const loaded = ref(false)
    const pendingRefresh = ref(false)

    function getType (notification: Notification) {
      return t('enums.NotificationTypeEnum.' + notification.data.type)
    }

    function getCreatedAt (createdAt: Date) {
      return formatLocaleDate(createdAt)
    }

    function getStatus (notification: Notification) {
      return notification.read_at ? 'Letta' : 'Non letta'
    }

    async function fetchData (page?: number) {
      if (props.filters && Object.keys(props.filters).length === 0) {
        paginatedData.value = undefined

        return
      }

      try {
        paginatedData.value = (await http.api.notifications[props.read ? 'getRead' : 'getUnread']()) || undefined

        loaded.value = true
        pendingRefresh.value = false

        emit('dataFetched')
      } catch (er) {
        paginatedData.value = undefined
      }
    }

    async function updateStatus (notification: Notification, event) {
      const currStatus = !!notification.read_at
      const nextStatus = !notification.read_at
      const nextStatusText = notification.read_at ? 'Non letta' : 'Letta'

      const result = await alerts.ask({
        header: 'Cambiare stato notifica?',
        message: `Sei sicuro di voler segnare la notifica come <strong>${nextStatusText}</strong>?`
      })

      if (result.resp) {
        try {
          await http.api.notifications[nextStatus ? 'read' : 'unread'](notification.id)

          event.target.checked = nextStatus
          notification['read_at'] = nextStatus ? Date.now().toString() : null

          const updatedIndex = paginatedData.value?.data.findIndex(n => n.id === notification.id) ?? -1

          if (updatedIndex > -1) {
            paginatedData.value?.data.splice(updatedIndex, 1)
          }

          emit('notificationUpdated', notification)
        } catch (er) {
          console.log(er)

          setTimeout(() => {
            event.target.checked = currStatus
          }, 0)
        }
      } else {
        setTimeout(() => {
          event.target.checked = currStatus
        }, 0)
      }
    }

    async function readAll () {
      const resp = await alerts.ask({
        header: 'Segnare tutte come letto?',
        message: 'Vuoi davvero segnare tutte le notifiche come lette?'
      })

      if (resp.resp) {
        await http.api.notifications.readAll()

        if (paginatedData.value) {
          paginatedData.value.data = []
        }

        emit('notificationUpdated')
      }
    }

    async function onPageChanged (page: number) {
      await fetchData(page)
    }

    async function onManualRefresh (event) {
      await fetchData(paginatedData.value?.page)

      // Must call complete to let the loader know all is done
      event.target.complete()
    }

    watch(() => props.visible, (value) => {
      if ((!loaded.value && value) || (value && pendingRefresh.value)) {
        fetchData()
      }
    })

    watch(() => props.filters, () => {
      if (loaded.value || props.eager) {
        fetchData()
      }
    }, { immediate: true, deep: true })

    watch(() => props.refreshAsap, value => {
      if (value) {
        pendingRefresh.value = true
      }
    })

    return {
      paginatedData,
      formatLocaleDate, formatOrderStatus,
      getType, getCreatedAt, getStatus,
      onPageChanged, onManualRefresh,
      updateStatus,
      readAll
    }
  }
})
</script>

<style scoped>

</style>
