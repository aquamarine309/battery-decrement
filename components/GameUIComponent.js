import GameUiComponentFixed from "./GameUiComponentFixed.js";
import GameUi from "./ui-modes/modern/ModernUI.js";
import TabComponents from "./tabs/index.js";

export default {
  name: "GameUIComponent",
  components: {
    ...TabComponents,
    GameUi,
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
      <GameUi>
        <component
          :is="page"
          class="c-game-tab"
        />
      </GameUi>
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