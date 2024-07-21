import HeaderPrestigeGroup from "../HeaderPrestigeGroup.js";
import ChangePhoneButton from "../ChangePhoneButton.js";
import GameSpeedDisplay from "../../GameSpeedDisplay.js";


export default {
  name: "ModernUi",
  components: {
    HeaderPrestigeGroup,
    GameSpeedDisplay,
    ChangePhoneButton
  },
  data() {
    return {
      showBtn: false
    }
  },
  methods: {
    update() {
      this.showBtn = Player.canChange && Time.bestPhoneRealTime.totalMinutes > 1;
    }
  },
  template: `
  <div id="page">
    <link
      rel="stylesheet"
      type="text/css"
      href="./stylesheets/new-ui-styles.css"
    >
    <div
      class="game-container"
      style="margin-top: 3.9rem"
    >
      <ChangePhoneButton />
      <div
        v-if="!showBtn"
        class="tab-container"
      >
        <HeaderPrestigeGroup />
        <div class="information-header">
          <GameSpeedDisplay />
        </div>
        <slot />
      </div>
    </div>
  </div>
  `
};