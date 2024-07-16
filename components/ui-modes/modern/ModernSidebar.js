import ModernSidebarCurrency from "./ModernSidebarCurrency.js";
import ModernTabButton from "./ModernTabButton.js";

export default {
  name: "ModernSidebar",
  components: {
    ModernSidebarCurrency,
    ModernTabButton
  },
  data() {
    return {
      tabVisibilities: []
    };
  },
  computed: {
    tabs: () => Tabs.currentUIFormat
  },
  methods: {
    update() {
      this.tabVisibilities = Tabs.currentUIFormat.map(x => x.isAvailable);
    },
  },
  template: `
  <div class="c-modern-sidebar">
    <ModernSidebarCurrency />
    <template
      v-for="(tab, tabPosition) in tabs"
    >
      <ModernTabButton
        v-if="tabVisibilities[tabPosition]"
        :key="tab.name"
        :tab="tab"
        :tab-position="tabPosition"
      />
    </template>
  </div>
  `
};