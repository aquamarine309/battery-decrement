import GameHeader from "../GameHeader.js";

export default {
  name: "AndroidUi",
  components: {
    GameHeader
  },
  data() {
    return {
      isFullScreen: false
    }
  },
  computed: {
    tab() {
      return this.$viewModel.tab;
    },
    subtab() {
      return this.$viewModel.subtab;
    }
  },
  methods: {
    update() {
      //Game ui has padding, but it should not show in the achievements tab.
      this.isFullScreen = this.tab === "achievements";
    }
  },
  template: `
  <div
    id="container"
    class="container l-old-ui c-old-ui"
    :class="{'l-old-ui--achievement': isFullScreen}"
  >
    <link
      rel="stylesheet"
      type="text/css"
      href="./stylesheets/android-ui.css"
    >
    <GameHeader class="l-old-ui__header" />
    <div class="l-old-ui__page">
      <slot />
    </div>
  </div>
  `
}