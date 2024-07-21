import GameHeader from "../GameHeader.js";
import ChangePhoneButton from "../ChangePhoneButton.js";

export default {
  name: "AndroidUi",
  components: {
    GameHeader,
    ChangePhoneButton
  },
  data() {
    return {
      isFullScreen: false,
      showBtn: false
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
      this.showBtn = Player.canChange && Time.bestPhoneRealTime.totalMinutes > 1;
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
    <ChangePhoneButton />
    <template v-if="!showBtn">
      <GameHeader class="l-old-ui__header" />
      <div class="l-old-ui__page">
        <slot />
      </div>
    </template>
  </div>
  `
}