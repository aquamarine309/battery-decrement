import PrimaryButton from "../../PrimaryButton.js";

export default {
  name: "AppRow",
  components: {
    PrimaryButton
  },
  props: {
    app: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      amount: 0,
      perSecond: 0,
      singlePerSecond: 0,
      isUnlocked: false,
      canBeBought: false,
      cost: 0,
      percentsInAllApps: 0,
      softcapped: false
    }
  },
  computed: {
    config() {
      return this.app.config;
    },
    name() {
      return this.config.name;
    },
    iconClass() {
      return `fas fa-${this.config.icon}`;
    },
    costString() {
      if (this.cost > 1) return "文件失效";
      return `+${formatBattery(this.cost)}`;
    },
    softcapValue() {
      return 1 - 1  / (this.app.id + 2);
    }
  },
  methods: {
    update() {
      this.isUnlocked = this.app.isUnlocked;
      if (!this.isUnlocked) return;
      this.amount = this.app.boughtAmount;
      this.singlePerSecond = this.config.singleEffect;
      this.perSecond = this.app.effectValue;
      this.percentsInAllApps = this.perSecond / Apps.batteryPerSecond;
      this.canBeBought = this.app.canBeBought;
      this.cost = this.app.cost;
      this.softcapped = Apps.lowBattery;
    }
  },
  template: `
  <div
    v-if="isUnlocked"
    class="o-app-row"
    :class="{ 'c-softcap-single': softcapped }"
  >
    <div class="c-app-icon">
      <i
        :class="iconClass"
        aria-hidden="true"
      />
    </div>
    <div>
      <span>名称</span>
      <span>{{ name }} ({{ formatInt(amount) }})</span>
    </div>
    <div>
      <span>
        单个消耗
        <span v-if="softcapped">
          (-{{ formatPercents(softcapValue) }})
         </span>
      </span>
      <span>{{ formatBattery(singlePerSecond) }} 电量/秒</span>
    </div>
    <div>
      <span>总消耗 ({{ formatPercents(percentsInAllApps, 0, 1) }})</span>
      <span>{{ formatBattery(perSecond) }} 电量/秒</span>
    </div>
    <PrimaryButton
      :enabled="canBeBought"
      @click="app.purchase()"
    >
      下载 ({{ costString }})
    </PrimaryButton>
  </div>
  `
}