import HeaderPrestigeGroup from "../HeaderPrestigeGroup.js";

import GameSpeedDisplay from "../../GameSpeedDisplay.js";


export default {
  name: "ModernUi",
  components: {
    HeaderPrestigeGroup,
    GameSpeedDisplay,
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
      <div
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