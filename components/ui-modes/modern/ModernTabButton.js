export default {
  name: "ModernTabButton",
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
      isAvailable: false,
      isHidden: false,
      subtabVisibilities: [],
      showSubtabs: false,
      hasNotification: false
    };
  },
  computed: {
    classObject() {
      return {
        "o-tab-btn": true,
        "o-tab-btn--modern-tabs": true,
        "o-tab-btn--subtabs": this.showSubtabs,
        "o-tab-btn--active": this.isCurrentTab,
        "o-tab-btn--prestige": this.color !== undefined
      };
    },
    styleObject() {
      if (this.color !== undefined) {
        return `--color-tab: ${this.color}`;
      }
      return "";
    },
    isCurrentTab() {
      return this.tab.isOpen;
    },
    tabName() {
      return this.tab.name;
    },
    color() {
      return this.tab.config.color;
    }
  },
  methods: {
    update() {
      this.isAvailable = this.tab.isAvailable;
      this.isHidden = this.tab.isHidden;
      this.subtabVisibilities = this.tab.subtabs.map(x => x.isAvailable);
      this.showSubtabs = this.isAvailable && this.subtabVisibilities.length >= 1;
      this.hasNotification = this.tab.hasNotification;
    },
    isCurrentSubtab(id) {
      return player.options.lastOpenSubtab[this.tab.id] === id;
    }
  },
  template: `
  <div
    v-if="!isHidden && isAvailable"
    :class="classObject"
    :style="styleObject"
    data-v-modern-tab-button
  >
    <div
      class="l-tab-btn-inner"
      @click="tab.show(true)"
      data-v-modern-tab-button
    >
      {{ tabName }}
      <div
        v-if="hasNotification"
        class="fas fa-circle-exclamation l-notification-icon"
      />
    </div>
    <div
      v-if="showSubtabs"
      class="subtabs"
      data-v-modern-tab-button
    >
      <template
        v-for="(subtab, index) in tab.subtabs"
      >
        <div
          v-if="subtabVisibilities[index]"
          :key="index"
          class="o-tab-btn o-tab-btn--subtab"
          :class="{
            'o-subtab-btn--active': isCurrentSubtab(subtab.id),
            'o-tab-btn--prestige': color !== undefined 
          }"
          @click="subtab.show(true)"
          data-v-modern-tab-button
        >
          <span v-html="subtab.symbol" />
          <div
            v-if="subtab.hasNotification"
            class="fas fa-circle-exclamation l-notification-icon"
          />
          <div
            class="o-subtab__tooltip"
            data-v-modern-tab-button
          >
            {{ subtab.name }}
          </div>
        </div>
      </template>
    </div>
  </div>
  `
};