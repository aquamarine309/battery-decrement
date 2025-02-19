export default {
  name: "ToggleButton",
  props: {
    label: {
      type: String,
      required: false,
      default: ""
    },
    on: {
      type: String,
      required: false,
      default: "已开启"
    },
    off: {
      type: String,
      required: false,
      default: "已关闭"
    },
    value: {
      type: Boolean,
      required: true
    },
    tooltipClass: {
      type: String,
      required: false,
      default: ""
    },
    tooltipContent: {
      type: String,
      required: false,
      default: ""
    }
  },
  computed: {
    displayText() {
      return `${this.label} ${this.value ? this.on : this.off}`.trim();
    }
  },
  template: `
  <button
    v-bind="$attrs"
    @click="emitInput(!value)"
  >
    {{ displayText }}
    <div
      v-if="tooltipClass"
      :class="tooltipClass"
    >
      {{ tooltipContent }}
    </div>
  </button>
  `
};