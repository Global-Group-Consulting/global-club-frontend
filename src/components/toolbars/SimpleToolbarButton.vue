<template>
  <ClubButton version="outline">
    {{ text }}
  </ClubButton>
</template>

<script>
  import ClubButton from '@/components/ClubButton';
  export default {
    name: "SimpleToolbarButton",
    components: { ClubButton },
    props: {
      text: String,
      icon: String
    }
  };
</script>

<style scoped>

</style>
