import BatteryContainer from "./BatteryContainer.js";

export default {
  name: "HeaderCenterContainer",
  components: {
    BatteryContainer
  },
  data() {
    return {
      battery: 1,
      batteryPerSecond: 0,
      phoneUnlocked: false,
      uselessPhones: 0
    };
  },
  computed: {
    androidUI() {
      return this.$viewModel.androidUI;
    }
  },
  methods: {
    update() {
      this.battery = Currency.battery.value
      this.batteryPerSecond = Apps.batteryPerSecond;
      if (!this.androidUI) return;
      const progress = PlayerProgress.current;
      this.phoneUnlocked = progress.isPhoneUnlocked;
      if (!this.phoneUnlocked) return;
      this.uselessPhones = Currency.uselessPhones.value;
    },
  },
  template: `
  <div class="c-prestige-button-container">
    <div
      v-if="androidUI"
      class="c-header-currency-info"
    >
      <span v-if="phoneUnlocked">
        你拥有
        <span class="c-game-header--currency c-game-header__phones">{{ format(uselessPhones, 2) }}</span>
        个无用手机。
      </span>
    </div>
    <div class="c-header-currency-info">
      <span>
        手机当前的电量为
        <span class="c-game-header--currency c-game-header__battery">
          {{ formatBattery(battery) }}
        </span>。
      </span>
    </div>
    <BatteryContainer :battery="battery" />
    <span>每秒消耗 {{ formatBattery(batteryPerSecond) }} 的电量。</span>
  </div>
  `
};