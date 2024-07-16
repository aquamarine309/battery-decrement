import HeaderPrestigeGroup from "./HeaderPrestigeGroup.js";

import GameSpeedDisplay from "../GameSpeedDisplay.js";

export default {
  name: "GameHeader",
  components: {
    HeaderPrestigeGroup,
    GameSpeedDisplay,
  },
  template: `
  <div>
    <HeaderPrestigeGroup />
    <GameSpeedDisplay />
  </div>
  `
};