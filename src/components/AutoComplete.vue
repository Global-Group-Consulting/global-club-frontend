<template>

     <ion-searchbar
          placeholder="Cosa desideri cercare?"
          showCancelButton="true"
          debounce="100"
          v-model="userInput"
          animated="true"
          autocomplete="on"
          inputmode="search"
          @ionInput="onChange"
        >
    </ion-searchbar>
   
     <ion-card class="list-search"  v-if="filteredSuggestions.length"></ion-card>

      <ion-item v-for="(s,i) in filteredSuggestions" :key="i" @click="selected(s)">{{s[optionsKey]}}</ion-item>
    
</template>

<script>
import useAutoComplete from "../plugins/useAutocomplete";
export default {
  name: "AutoComplete",
  props: {
    msg: String,
    options: Array ,
    optionsKey: String
  },
  // eslint-disable-next-line vue/no-setup-props-destructure
  setup({ options, optionsKey }) {
    return {
      ...useAutoComplete(options, optionsKey)
    };
  },
  data() {
    return {};
  },
  methods: {
    doSave: function(_clear) {
      if (_clear) {
        this.$emit("save-option", {});
        this.userInput = "";
      } else {
        this.$emit("save-option", this.selectedItem);
      }
    }
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
 
 
</style>
