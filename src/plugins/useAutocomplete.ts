import { reactive, toRefs } from "vue";

 
const useAutoComplete = (options, key) => {
  const state = reactive({
    userInput: "",
    filteredSuggestions: [],
    suggestions: options,
    selectedItem: {}
  });

  const selected = _item => {
    state.userInput = _item[key];
    state.filteredSuggestions = [];
    state.selectedItem = { userInput: state.userInput, item: _item };
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const onChange = _event => {
    const i = state.userInput;
    state.selectedItem = { userInput: state.userInput, item: null };
    if (i.length === 0) {
      state.filteredSuggestions = [];
      return;
    }
    const r = state.suggestions.filter(
      suggestion => suggestion[key].toLowerCase().indexOf(i.toLowerCase()) > -1
    );
    console.log(r);
    state.filteredSuggestions = r;
  };
  return {
    ...toRefs(state),
    selected,
    onChange
  };
};

export default useAutoComplete;
