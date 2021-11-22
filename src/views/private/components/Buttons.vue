<template>
  <IonPage>
    <ion-content>
      <h1>Different buttons</h1>

      <ion-grid>

        <div class="ion-text-left">
          <h2 class="ion-text-center" style="border-bottom: solid 3px var(--ion-color-primary)">Primary - basic</h2>

          <h3>Basic button</h3>
          <ClubButton>Default</ClubButton>
          <ClubButton version="filled">Default - Filled</ClubButton>
          <ClubButton version="filled" expanded>Default expanded - Filled</ClubButton>
          <br>

          <h3>With icon</h3>
          <ClubButton icon>Default - Icon start</ClubButton>
          <ClubButton icon icon-position="end">Default - Icon end</ClubButton>
          <ClubButton version="filled" icon expanded>Default - Filled</ClubButton>
          <br>

          <h3>Sizes</h3>
          <ClubButton icon size="small">Small - Icon small</ClubButton>
          <ClubButton icon>Default - Icon</ClubButton>
          <ClubButton icon size="large">Large - Icon</ClubButton>
          <ClubButton icon size="small" version="filled" expanded>Small expanded - Filled</ClubButton>
          <ClubButton icon version="filled" expanded>Default expanded - Filled</ClubButton>
          <ClubButton icon size="large" version="filled" expanded>Large expanded - Filled</ClubButton>
          <br>

          <h3>Only icons</h3>
          <ClubButton icon only-icon size="small"></ClubButton>
          <ClubButton icon only-icon></ClubButton>
          <ClubButton icon only-icon size="large"></ClubButton>
          <br>
          <br>
          <br>

          <h2 class="ion-text-center" style="border-bottom: solid 3px var(--ion-color-primary)">Primary - outlined</h2>
          <h3>Basic button</h3>
          <ClubButton version="outline">Outlined Button - outline</ClubButton>
          <ClubButton version="outline" expanded>Outlined Button expanded - outline</ClubButton>
          <br>

          <h3>With icon</h3>
          <ClubButton version="outline" icon>Outlined - Icon start</ClubButton>
          <ClubButton version="outline" icon icon-slot="end">Outlined - Icon end</ClubButton>
          <ClubButton version="outline" icon icon-slot="end" expanded>Outlined - Icon end</ClubButton>
          <br>

          <h3>Sizes</h3>
          <ClubButton version="outline" icon size="small">Outlined Small - Icon small</ClubButton>
          <ClubButton version="outline" icon>Outlined - Icon</ClubButton>
          <ClubButton version="outline" icon size="large">Outlined Large - Icon</ClubButton>
          <ClubButton version="outline" icon size="small" expanded>Small expanded - Outlined</ClubButton>
          <ClubButton version="outline" icon expanded>Default expanded - Outlined</ClubButton>
          <ClubButton version="outline" icon size="large" expanded>Large expanded - Outlined</ClubButton>
          <br>

          <h3>Only icons</h3>
          <ClubButton version="outline" icon only-icon size="small"></ClubButton>
          <ClubButton version="outline" icon only-icon></ClubButton>
          <ClubButton version="outline" icon only-icon size="large"></ClubButton>

          <br>
          <br>
          <br>

          <h2 class="ion-text-center" style="border-bottom: solid 3px var(--ion-color-primary)">Primary - link</h2>
          <h3>Basic button</h3>
          <ClubButton version="link">Link Button - outline</ClubButton>
          <ClubButton version="link" expanded>Link Button Expanded - outline</ClubButton>
          <br>

          <h3>With icon</h3>
          <ClubButton version="link" icon>Link - Icon start</ClubButton>
          <ClubButton version="link" icon icon-slot="end">Link - Icon end</ClubButton>
          <ClubButton version="link" icon icon-slot="end" expanded>Link Expanded - Icon end</ClubButton>
          <br>

          <h3>Sizes</h3>
          <ClubButton version="link" icon size="small">Link Small - Icon small</ClubButton>
          <ClubButton version="link" icon>Link - Icon</ClubButton>
          <ClubButton version="link" icon size="large">Link Large - Icon</ClubButton>
          <ClubButton icon size="small" version="link" expanded>Small expanded - Link</ClubButton>
          <ClubButton icon version="link" expanded>Default expanded - Link</ClubButton>
          <ClubButton icon size="large" version="link" expanded>Large expanded - Link</ClubButton>
          <br>

          <h3>Only icons</h3>
          <ClubButton version="link" icon only-icon size="small"></ClubButton>
          <ClubButton version="link" icon only-icon></ClubButton>
          <ClubButton version="link" icon only-icon size="large"></ClubButton>
        </div>


        <div class="ion-text-left">
          <h2 class="ion-text-center" style="border-bottom: solid 3px var(--ion-color-primary)">Secondary - basic</h2>
          <h3>Basic button</h3>
          <ClubButton color="secondary">Default</ClubButton>
          <ClubButton color="secondary" version="filled">Default - Filled</ClubButton>
          <ClubButton color="secondary" version="filled" expanded>Default - Filled</ClubButton>
          <br>

          <h3>With icon</h3>
          <ClubButton color="secondary" icon>Default - Icon start</ClubButton>
          <ClubButton color="secondary" icon icon-position="end">Default - Icon end</ClubButton>
          <ClubButton color="secondary" icon icon-position="end" expanded>Default - Icon end</ClubButton>
          <br>

          <h3>Sizes</h3>
          <ClubButton color="secondary" icon size="small">Small - Icon small</ClubButton>
          <ClubButton color="secondary" icon>Default - Icon</ClubButton>
          <ClubButton color="secondary" icon size="large">Large - Icon</ClubButton>
          <ClubButton color="secondary" icon size="small" version="filled" expanded>Small expanded - Filled</ClubButton>
          <ClubButton color="secondary" icon version="filled" expanded>Default expanded - Filled</ClubButton>
          <ClubButton color="secondary" icon size="large" version="filled" expanded>Large expanded - Filled</ClubButton>
          <br>

          <h3>Only icons</h3>
          <ClubButton color="secondary" icon only-icon size="small"></ClubButton>
          <ClubButton color="secondary" icon only-icon></ClubButton>
          <ClubButton color="secondary" icon only-icon size="large"></ClubButton>

          <br>
          <br>
          <br>

          <h2 class="ion-text-center" style="border-bottom: solid 3px var(--ion-color-primary)">Secondary -
            outlined</h2>
          <h3>Basic button</h3>
          <ClubButton color="secondary" version="outline">Outlined Button - outline</ClubButton>
          <ClubButton color="secondary" version="outline" expanded>Outlined Button - outline</ClubButton>
          <br>

          <h3>With icon</h3>
          <ClubButton color="secondary" version="outline" icon>Outlined - Icon start</ClubButton>
          <ClubButton color="secondary" version="outline" icon icon-slot="end">Outlined - Icon end</ClubButton>
          <ClubButton color="secondary" version="outline" icon icon-slot="end" expanded>Outlined - Icon end</ClubButton>
          <br>

          <h3>Sizes</h3>
          <ClubButton color="secondary" version="outline" icon size="small">Outlined Small - Icon small</ClubButton>
          <ClubButton color="secondary" version="outline" icon>Outlined - Icon</ClubButton>
          <ClubButton color="secondary" version="outline" icon size="large">Outlined Large - Icon</ClubButton>
          <ClubButton color="secondary" icon size="small" version="outline" expanded>Small expanded - Outlined
          </ClubButton>
          <ClubButton color="secondary" icon version="outline" expanded>Default expanded - Outlined</ClubButton>
          <ClubButton color="secondary" icon size="large" version="outline" expanded>Large expanded - Outlined
          </ClubButton>
          <br>

          <h3>Only icons</h3>
          <ClubButton color="secondary" version="outline" icon only-icon size="small"></ClubButton>
          <ClubButton color="secondary" version="outline" icon only-icon></ClubButton>
          <ClubButton color="secondary" version="outline" icon only-icon size="large"></ClubButton>

          <br>
          <br>
          <br>

          <h2 class="ion-text-center" style="border-bottom: solid 3px var(--ion-color-primary)">Secondary - link</h2>
          <h3>Basic button</h3>
          <ClubButton color="secondary" version="link">Link Button - outline</ClubButton>
          <ClubButton color="secondary" version="link" expanded>Link Button - outline</ClubButton>
          <br>

          <h3>With icon</h3>
          <ClubButton color="secondary" version="link" icon>Link - Icon start</ClubButton>
          <ClubButton color="secondary" version="link" icon icon-slot="end">Link - Icon end</ClubButton>
          <ClubButton color="secondary" version="link" icon icon-slot="end" expanded>Link - Icon end</ClubButton>
          <br>

          <h3>Sizes</h3>
          <ClubButton color="secondary" version="link" icon size="small">Link Small - Icon small</ClubButton>
          <ClubButton color="secondary" version="link" icon>Link - Icon</ClubButton>
          <ClubButton color="secondary" version="link" icon size="large">Link Large - Icon</ClubButton>
          <ClubButton color="secondary" icon size="small" version="link" expanded>Small expanded - link</ClubButton>
          <ClubButton color="secondary" icon version="link" expanded>Default expanded - link</ClubButton>
          <ClubButton color="secondary" icon size="large" version="link" expanded>Large expanded - link</ClubButton>
          <br>

          <h3>Only icons</h3>
          <ClubButton color="secondary" version="link" icon only-icon size="small"></ClubButton>
          <ClubButton color="secondary" version="link" icon only-icon></ClubButton>
          <ClubButton color="secondary" version="link" icon only-icon size="large"></ClubButton>
        </div>
      </ion-grid>
    </ion-content>
  </IonPage>
</template>

<script lang="ts">
  import { defineComponent } from 'vue';
  import ClubButton from '@/components/ClubButton.vue';

  export default defineComponent({
    name: "Buttons",
    components: { ClubButton }
  });
</script>

<style scoped>

</style>
