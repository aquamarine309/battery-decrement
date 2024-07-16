import GameUiComponentFixed from "./GameUiComponentFixed.js";
import ModernUi from "./ui-modes/modern/ModernUi.js";
import TabComponents from "./tabs/index.js";

export default {
  name: "GameUIComponent",
  components: {
    ...TabComponents,
    ModernUi,
    GameUiComponentFixed
  },
  computed: {
    view() {
      return this.$viewModel;
    },
    page() {
      const subtab = Tabs.current[this.$viewModel.subtab];
      return subtab.config.component;
    },
    themeCss() {
      return `./stylesheets/theme-${this.view.theme}.css`;
    }
  },
  template: `
  <div
    v-if="view.initialized"
    id="ui-container"
    class="ui-wrapper new-ui"
    data-v-game-ui-component
  >
    <div
      id="ui"
      class="c-game-ui"
    >
      <ModernUi>
        <component
          :is="page"
          class="c-game-tab"
        />
      </ModernUi>
      <link
        v-if="view.theme !== 'Normal'"
        type="text/css"
        rel="stylesheet"
        :href="themeCss"
      >
    </div>
    <GameUiComponentFixed />
  </div>
  `
};