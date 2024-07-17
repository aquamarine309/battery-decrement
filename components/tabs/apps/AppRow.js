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
      softcapped: false,
      isSuperenergy: false,
      multiplier: 0
    }
  },
  computed: {
    config() {
      return this.app.config;
    },
    name() {
      return this.config.name;
    },
    icon() {
      return this.config.icon.trim();
    },
    isSvgIcon() {
      return this.icon.startsWith("<");
    },
    iconInfo() {
      if (this.isSvgIcon) return this.icon;
      return `fas fa-${this.icon}`;
    },
    costString() {
      if (this.cost > 1) return "文件失效";
      return `+${formatBattery(this.cost)}`;
    },
    rowClass() {
      return {
        'c-softcap-single': this.softcapped,
        'c-app-row--superenergy': this.isSuperenergy
      }
    },
    multiplierText() {
      if (this.multiplier >= 2) return formatX(this.multiplier, 2, 2);
      const multText = formatPercents(this.multiplier - 1, 2, 1);
      return `${this.multiplier > 1 ? "+" : ""}${multText}`;
    }
  },
  methods: {
    update() {
      this.isUnlocked = this.app.isUnlocked;
      if (!this.isUnlocked) return;
      this.multiplier = this.app.multiplier;
      this.amount = this.app.boughtAmount;
      this.singlePerSecond = this.app.singleEffect;
      this.perSecond = this.app.effectValue;
      this.percentsInAllApps = this.perSecond / Apps.batteryPerSecond;
      this.canBeBought = this.app.canBeBought;
      this.cost = this.app.cost;
      this.softcapped = Apps.lowBattery;
      this.isSuperenergy = this.app.isSuperenergy;
    }
  },
  template: `
  <div
    v-if="isUnlocked"
    class="o-app-row"
    :class="rowClass"
  >
    <div class="c-app-icon">
      <span>{{ name }}[{{ formatInt(amount) }}]</span>
      <span>
        <svg
          v-if="isSvgIcon"
          width="1.5rem"
          height="1.5rem"
          viewBox="0 0 200 200"
          preserveAspectRatio="xMidYMid meet"
        >
          <g
            class="c-color-fill"
            transform="translate(0,200) scale(0.1,-0.1)"
            v-html="iconInfo"
          />
        </svg>
        <i
          v-else
          :class="iconInfo"
          aria-hidden="true"
        />
      </span>
    </div>
    <div>
      <span>
        单消耗
        <span v-if="multiplier !== 1">
          ({{ multiplierText }})
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