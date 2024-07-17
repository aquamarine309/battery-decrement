import BatteryContainer from "./BatteryContainer.js";

export default {
  name: "HeaderCenterContainer",
  components: {
    BatteryContainer
  },
  data() {
    return {
      battery: 1,
      batteryPerSecond: 0
    };
  },
  methods: {
    update() {
      this.battery = Currency.battery.value
      this.batteryPerSecond = Apps.batteryPerSecond;;
    },
  },
  template: `
  <div
    class="c-prestige-button-container"
  >
    <span>手机当前的电量为 <span class="c-game-header--currency c-game-header__battery">{{ formatBattery(battery) }}</span> 。</span>
    <BatteryContainer :battery="battery" />
    <span>每秒消耗 {{ formatBattery(batteryPerSecond) }} 的电量。</span>
  </div>
  `
};