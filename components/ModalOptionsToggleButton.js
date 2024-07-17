import PrimaryToggleButton from "./PrimaryToggleButton.js";

export default {
  name: "ModalOptionsToggleButton",
  components: {
    PrimaryToggleButton
  },
  props: {
    value: {
      type: Boolean,
      required: false,
      default: false,
    },
    text: {
      type: String,
      required: true
    }
  },
  computed: {
    view() {
      return this.$viewModel;
    },
    styleObject() {
      return {
        "background-color": this.view.androidUI ? (this.value ? "var(--color-good--option)" : "var(--color-gh-purple--option)") : (this.value ? "var(--color-good)" : "var(--color-gh-purple)"),
      };
    },
  },
  template: `
  <PrimaryToggleButton
    :value="value"
    :label="text"
    class="o-primary-btn--modal-option"
    :style="styleObject"
    @input="emitInput"
  />
  `
};