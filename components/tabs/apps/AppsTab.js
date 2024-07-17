import PhonePanel from "./PhonePanel.js";
import DownloadAppPenel from "./DownloadAppPenel.js";
import AppRow from "./AppRow.js";

export default {
  name: "AppsTab",
  components: {
    PhonePanel,
    DownloadAppPenel,
    AppRow
  },
  data() {
    return {
      softcapped: false
    }
  },
  computed: {
    apps: () => Apps.allWithoutPhone
  },
  methods: {
    update() {
      this.softcapped = Apps.lowBattery;
    }
  },
  template: `
  <div class="c-apps-tab">
    <div class="c-app-header">
      <PhonePanel />
      <DownloadAppPenel />
    </div>
    <div class="c-apps-container">
      <AppRow
        v-for="(app, key) in apps"
        :key="key"
        :app="app"
      />
    </div>
    <div
      v-if="softcapped"
      class="c-softcap-text"
    >
      已启用省电模式，应用的消耗量减少。
    </div>
  </div>
  `
}