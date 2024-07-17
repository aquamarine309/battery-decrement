export default {
  name: "AndroidSubtabButton",
  props: {
    subtab: {
      type: Object,
      required: true
    },
    parentName: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      isAvailable: false,
      isCurrentSubtab: false,
      tabName: ""
    };
  },
  computed: {
    displayName() {
      return this.subtab.name.toUpperCase();
    },
    tabClass() {
      return {
        "c-android-ui--bottom__tab-btn": true,
        "c-android-ui--bottom__tab-btn--open": this.subtab.isOpen,
        "c-android-ui--bottom__subtab-btn": true
      }
    },
  },
  methods: {
    update() {
      this.isAvailable = this.subtab.isAvailable;
      this.isCurrentSubtab = this.subtab.isOpen;
    }
  },
  template: `
    <div
      v-if="isAvailable"
      :class="tabClass"
      @click="subtab.show(true)"
    >
      {{ displayName }}
    </div>
  `
}