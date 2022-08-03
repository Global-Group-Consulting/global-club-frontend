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

        <AccordionList :sections="accordionSections">
          <template v-for="entry in accordionSections" :key="entry.id" #[getSlotName(entry)]>
            <div v-html="entry.data.answer"></div>
          </template>
        </AccordionList>
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

export default defineComponent({
  name: 'Faq',
  components: { AccordionList, TopToolbar },
  setup () {
    const http = inject('http') as HttpPlugin
    const faqs = ref<Faq[]>([])
    const searchValue = ref('')

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

    function highlightText (text: string) {
      const words = searchValue.value.toLowerCase().trim().split(' ')
      let finalText = text

      words.forEach(word => {
        finalText = finalText.replace(new RegExp(word, 'gi'), `<span class="highlight">${word}</span>`)
      })

      return finalText
    }

    watch(() => filteredFaqs.value, () => {
      accordionSections.value = filteredFaqs.value.map((faq) => {
        return {
          id: faq.id,
          text: highlightText(faq.question),
          open: !!searchValue.value,
          data: {
            ...faq,
            answer: highlightText(faq.answer),
          }
        } as AccordionSection
      })
    })

    onIonViewWillEnter(async () => {
      faqs.value = await http.api.faqs.read()
    })

    return {
      accordionSections,
      getSlotName,
      searchValue
    }
  }
})
</script>

<style scoped lang="scss">
#faq-search-bar {
  --border-radius: 15px
}
</style>
