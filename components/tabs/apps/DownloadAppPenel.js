import PrimaryButton from "../../PrimaryButton.js"

export default {
  name: "DownloadAppPenel",
  components: {
    PrimaryButton
  },
  data() {
    return {
      cost: 0,
      isAvaliableForPurchase: false,
      multPerApp: 0,
      multToSpeed: 0,
      unlocked: 0,
      isCapped: false,
      cap: 0,
      superenergyApp: false,
      superenergyAppMult: 0
    }
  },
  computed: {
    btnText() {
      if (this.isAvaliableForPurchase) return "升级";
      if (this.isCapped) return "内存不足";
      return `电量低于${formatBattery(this.cost)}`;
    },
    classObj() {
      return {
        'c-bad-shadow': !this.isAvaliableForPurchase,
        "c-superenergy-shadow": this.superenergyApp
      }
    }
  },
  methods: {
    update() {
      this.cost = Apps.cost;
      this.isAvaliableForPurchase = Apps.isAvaliableForPurchase;
      this.multPerApp = Apps.multPerApp;
      this.multToSpeed = Apps.multToSpeed;
      this.unlocked = Apps.unlocked;
      this.isCapped = Apps.isCapped;
      this.cap = Apps.cap;
      this.superenergyApp = this.unlocked >= Apps.superenergyAppAt;
      this.superenergyAppMult = Apps.superenergyAppEffect;
    },
    download() {
      Apps.download();
    }
  },
  template: `
  <div :class="classObj">
    <div class="c-phone-text">
      <span class="c-phone-title">解锁应用 ({{ formatInt(unlocked) }}/{{ formatInt(cap) }})</span>
      <br>
      <span>游戏速率 {{ formatX(multPerApp, 0, 2) }}</span>
      <span>受APP影响的游戏速率: {{ formatX(multToSpeed, 3, 3) }}</span>
      <span v-if="superenergyApp">
        超能应用使所有应用的耗电量
        {{ formatX(superenergyAppMult, 2, 2) }}
      </span>
    </div>
    <PrimaryButton
      :enabled="isAvaliableForPurchase"
      class="o-primary-btn--app"
      @click="download"
    >
      {{ btnText }}
    </PrimaryButton>
  </div>
  `
}