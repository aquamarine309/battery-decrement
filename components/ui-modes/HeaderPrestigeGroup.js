import HeaderCenterContainer from "./prestige-header/HeaderCenterContainer.js";

export default {
  name: "HeaderPrestigeGroup",
  components: {
    HeaderCenterContainer
  },
  template: `
  <div
    class="c-prestige-info-blocks"
    data-v-header-prestige-group
  >
    <HeaderCenterContainer
      class="l-game-header__center"
      data-v-header-prestige-group
    />
  </div>
  `
};