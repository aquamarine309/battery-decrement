import GameUiComponentFixed from "./GameUiComponentFixed.js";
import ModernUi from "./ui-modes/modern/ModernUi.js";
import AndroidUi from "./ui-modes/android/AndroidUi.js";
import TabComponents from "./tabs/index.js";

export default {
  name: "GameUIComponent",
  components: {
    ...TabComponents,
    ModernUi,
    AndroidUi,
    GameUiComponentFixed
  },
  data() {
    return {
      isOverlay: false
    }
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
    },
    containerClass() {
      return this.view.androidUI ? "old-ui" : "new-ui";
    },
    uiLayout() {
      return this.view.androidUI ? "AndroidUi" : "ModernUi";
    },
    classObject() {
      return {
        "c-game-ui": true,
        "c-game-ui--hidden": this.isOverlay
      }
    }
  },
  methods: {
    handleClick() {
      EventHub.dispatch(GAME_EVENT.CLICK_SCREEN);
      ScreenOverlay.clear();
    },
    updateOverlay() {
      this.isOverlay = ScreenOverlay.show;
    }
  },
  created() {
    this.on$(GAME_EVENT.OVERLAY_UPDATE, this.updateOverlay);
  },
  template: `
  <div
    v-if="view.initialized"
    id="ui-container"
    class="ui-wrapper"
    :class="containerClass"
    @touchstart="handleClick"
    data-v-game-ui-component
  >
    <div
      id="ui"
      :class="classObject"
    >
      <component :is="uiLayout">
        <component
          :is="page"
          class="c-game-tab"
        />
      </component>
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