import PrimaryButton from "../../PrimaryButton.js";

export default {
  name: "PhonePanel",
  components: {
    PrimaryButton
  },
  data() {
    return {
      isActive: false,
      consumption: 0,
      percentsInAllApps: 0
    }
  },
  computed: {
    btnText() {
      if (this.isActive) return "已启动";
      return "启动手机";
    }
  },
  methods: {
    update() {
      this.isActive = Phone.isActive;
      this.consumption = Phone.effectValue;
      if (!this.isActive) return;
      this.percentsInAllApps = this.consumption / Apps.batteryPerSecond;
    },
    activate() {
      Phone.activate();
    }
  },
  template: `
  <div :class="{ 'c-bad-shadow': isActive }">
    <div class="c-phone-text">
      <span class="c-phone-title">
        <i class="fas fa-mobile" />
        手机
        <i class="fas fa-mobile" />
      </span>
      <br>
      <span>-{{ formatBattery(consumption) }}/s</span>
      <span v-if="isActive">({{ formatPercents(percentsInAllApps, 0, 1) }})</span>
    </div>
    <PrimaryButton
      :enabled="!isActive"
      @click="activate"
      class="o-primary-btn--app"
    >
      {{ btnText }}
    </PrimaryButton>
  </div>
  `
}