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
        <ion-item :button="item.data.action?.link" :detail="item.data.action?.link"
                  @click="onItemClick(item)"
                  v-for="item of data" :key="item.id">
          <ion-thumbnail slot="start">
            <Image file-id=""></Image>
          </ion-thumbnail>

          <ion-label>
            <h2>
              <span v-html="item.data.title"></span>
            </h2>

            <h4>
              <slot name="description">
                <span v-html="item.data.content"></span>
              </slot>
            </h4>

            <div class="ion-text-wrap text-small">
              <strong class="ion-text-wrap">{{ getType(item) }}</strong>
              <span> - </span>
              <span class="ion-text-wrap">{{ getCreatedAt(item.created_at) }}</span>
            </div>
          </ion-label>

          <slot name="buttons-main">
            <div class="d-flex flex-column ion-align-items-center">
              <ion-toggle :checked="item.read_at" @click.prevent.stop="updateStatus(item, $event)"></ion-toggle>
              <small>{{ getStatus(item) }}</small>
            </div>
          </slot>
        </ion-item>
      </ion-list>
    </PaginatedList>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, onMounted, PropType, Ref, ref, watch } from 'vue'
import { Notification } from '@/@types/Notifications'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { formatLocaleDate } from '@/@utilities/dates'
import { formatOrderStatus, getOrderStatusColor } from '@/@utilities/statuses'
import { useI18n } from 'vue-i18n'
import PaginatedList from '@/components/lists/PaginatedList.vue'
import { PaginatedResult } from '@/@types/Pagination'
import ClubButton from '@/components/ClubButton.vue'
import { AlertsPlugin } from '@/plugins/Alerts'
import { useRouter } from 'vue-router'
import Image from '@/components/Image.vue'

export default defineComponent({
  name: 'NotificationsList',
  components: { Image, ClubButton, PaginatedList },
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
    const router = useRouter()
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

    async function onItemClick (notification: Notification) {
      debugger
      if (!notification.data.action?.link) {
        return
      }

      if (!notification['read_at']) {
        await http.api.notifications.read(notification.id)
        notification['read_at'] = Date.now().toString()

        const updatedIndex = paginatedData.value?.data.findIndex(n => n.id === notification.id) ?? -1

        if (updatedIndex > -1) {
          paginatedData.value?.data.splice(updatedIndex, 1)
        }

        emit('notificationUpdated', notification)
      }

      await router.push(notification.data.action.link)
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
      updateStatus, fetchData,
      readAll, onItemClick
    }
  }
})
</script>

<style scoped>

</style>
