export default {
  name: "AndroidTabButton",
  props: {
    tab: {
      type: Object,
      required: true
    },
    tabPosition: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isAvailable: false
    };
  },
  computed: {
    displayName() {
      return this.tab.shortName || this.tab.name.slice(0, 1).toUpperCase();
    },
    tabClass() {
      return {
        "c-android-ui--bottom__tab-btn": true,
        "c-android-ui--bottom__tab-btn--open": this.tab.isOpen
      }
    },
    fullName() {
      return this.tab.name;
    }
  },
  methods: {
    update() {
      this.isAvailable = this.tab.isAvailable;
    }
  },
  template: `
    <div
      v-if="isAvailable"
      :class="tabClass"
      @click="tab.show(true)"
    >
      {{ displayName }}
    </div>
  `
}