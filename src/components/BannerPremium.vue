<template>
  <div class="banner" v-if="mustShow">
    <ClubButton v-if="!userIsPremium && !authUser.clubPackChangeOrder"
                class="m-0"
                @click="changePack"
                version="outline"
                color="light"
                :disabled="authUser.clubPackChangeOrder">
      Passa a premium
    </ClubButton>

    <PageLink class="m-0"
              v-if="authUser.clubPackChangeOrder"
              title="Vai alla richiesta"
              :to="{name: 'private.orders.details', params: {id: authUser.clubPackChangeOrder}}"
              :btn-props="{version:'link', color: 'secondary', icon: true, iconName:'time-circle'}">
      Cambio pack in corso...
    </PageLink>
  </div>
</template>

<script lang="ts">
import { computed, ComputedRef, defineComponent, inject, ref } from 'vue'
import { useStore } from 'vuex'
import { storeKey } from '@/store'
import { User } from '@/@types/User'
import { PackEnum } from '@/@enums/pack.enum'
import { AlertsPlugin } from '@/plugins/Alerts'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import PageLink from '@/components/PageLink.vue'
import ClubButton from '@/components/ClubButton.vue'

export default defineComponent({
  name: 'BannerPremium',
  components: { ClubButton, PageLink },
  setup () {
    const store = useStore(storeKey)
    const alerts = inject('alerts') as AlertsPlugin
    const http = inject('http') as HttpPlugin
    const authUser: ComputedRef<User> = computed(
        () => store.getters['auth/user']
    )
    const mustShow = computed(() => authUser.value.clubPackChangeOrder
        || (!userIsPremium.value && !authUser.value.clubPackChangeOrder))

    const userIsPremium = computed(() => {
      return authUser.value.clubPack === PackEnum.PREMIUM
    })

    async function changePack () {
      const answer = await alerts.ask({
        header: 'Passa a premium!',
        message: 'Gentile utente, state per richiedere il passaggio al Pack Premium. Se desiderate continuare, vi preghiamo di cliccare su \'OK\'.'
      })

      if (!answer.resp) {
        return
      }

      const result = await http.api.users.updatePack(store.getters['auth/user']._id)

      if (result) {
        await store.dispatch('auth/updateUser', {
          clubPackChangeOrder: result.clubPackChangeOrder
        })
      }
    }

    return {
      authUser, userIsPremium,
      changePack,
      mustShow
    }
  }
})
</script>

<style scoped lang="scss">
.banner {
  padding: 1rem 2rem;
  background-image: var(--primary-dark-bg-gradient);
}
</style>
