<template>
  <IonPage>
    <TopToolbar>FAQ - Domande frequenti</TopToolbar>

    <IonContent>
      <ion-grid fixed>
        <ion-searchbar id="faq-search-bar" class="p-0 mb-4" color="light" inputmode="text"
                       placeholder="Cosa vuoi sapere?"
                       :show-cancel-button="searchValue ? 'always' : 'never'"
                       v-model="searchValue"
        ></ion-searchbar>

        <AccordionList :sections="accordionSections" v-if="accordionSections.length">
          <template v-for="entry in accordionSections" :key="entry.id" #[getSlotName(entry)]>
            <div v-html="entry.data.answer"></div>
          </template>
        </AccordionList>
        <NoData v-else
                :text="loading ? 'Sto recuperando le informazioni desiderate...' : 'Al momento non ci sono FAQ disponibili. Visita presto questa sezione per rimanere aggiornato.'"></NoData>
      </ion-grid>
    </IonContent>
  </IonPage>
</template>

<script lang="ts">
import { computed, defineComponent, inject, ref, Ref, watch } from 'vue'
import TopToolbar from '@/components/toolbars/TopToolbar.vue'
import { HttpPlugin } from '@/plugins/HttpPlugin'
import { onIonViewWillEnter } from '@ionic/vue'
import AccordionList, { AccordionSection } from '@/components/AccordionList.vue'
import { Faq } from '@/@types/Faqs'
import NoData from '@/components/NoData.vue'
import { AlertsPlugin } from '@/plugins/Alerts'

export default defineComponent({
  name: 'Faq',
  components: { NoData, AccordionList, TopToolbar },
  setup () {
    const http = inject('http') as HttpPlugin
    const alerts = inject('alerts') as AlertsPlugin
    const faqs = ref<Faq[]>([])
    const searchValue = ref('')
    const loading = ref(true)

    /**
     * Must be a ref because i must be able to change the "open" prop.
     */
    const accordionSections: Ref<AccordionSection[]> = ref([])

    const filteredFaqs = computed(() => {
      const searchText = searchValue.value.toLowerCase().trim()

      if (!searchText || searchText.length < 2) {
        return faqs.value
      }

      const search = searchText.split(' ')

      return faqs.value.filter(faq => {
        let mustReturn = true

        search.forEach(word => {
          if (!faq.question.toLowerCase().includes(word) && !faq.answer.toLowerCase().includes(word)) {
            mustReturn = false
          }
        })

        return mustReturn
      })
    })

    function getSlotName (entry: AccordionSection) {
      return 'content_' + entry.id
    }

    function stripTags (text: string) {
      let toReturn = text
      const tags = ['font']
      const styles = ['color', 'font-family', 'background-color']
      const stripTagsRegex = new RegExp(`<(/|)(${tags.join('|')})[^>]*>`, 'gi')
      const stripInlineStylesRegex = new RegExp(`(${styles.join('|')}):.*?;`, 'gi')

      toReturn = toReturn.replaceAll(stripTagsRegex, '')
      toReturn = toReturn.replaceAll(stripInlineStylesRegex, '')

      return toReturn
    }

    function highlightText (text: string) {
      const searchText = searchValue.value.toLowerCase().trim()
      const words = searchText.split(' ')
      let finalText = text

      if (!searchText.length) {
        return text
      }

      words.forEach(word => {
        finalText = finalText.replace(new RegExp(word, 'gi'), `<span class="highlight">${word}</span>`)
      })

      return finalText
    }

    watch(() => filteredFaqs.value, () => {
      accordionSections.value = filteredFaqs.value.map((faq) => {
        return {
          id: faq.id,
          text: stripTags(highlightText(faq.question)),
          open: !!searchValue.value,
          data: {
            ...faq,
            answer: stripTags(highlightText(faq.answer))
          }
        } as AccordionSection
      })
    })

    onIonViewWillEnter(async () => {
      loading.value = true

      try {
        faqs.value = await http.api.faqs.read()
      } catch (e) {
        console.error(e)
      } finally {
        loading.value = false
      }
    })

    return {
      accordionSections,
      getSlotName,
      loading,
      searchValue
    }
  }
})
</script>

<style scoped lang="scss">
#faq-search-bar {
  --border-radius: 15px;
}

.accordion-list:deep(.accordion-header-text) {
  white-space: normal;
}
</style>
