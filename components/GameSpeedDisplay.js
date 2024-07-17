export default {
  name: "GameSpeedDisplay",
  data() {
    return {
      speed: 0
    };
  },
  computed: {
    speedText() {
      return this.formatNumber(this.speed);
    },
    baseText() {
      return this.speed === 1
        ? "游戏速度: 正常."
        : `游戏速度: ${this.speedText}`;
    }
  },
  methods: {
    update() {
      this.speed = getGameSpeedupFactor();
    },
    formatNumber(num) {
      if (num >= 0.001 && num < 10000 && num !== 1) {
        return format(num, 3, 3);
      }
      if (num < 0.001) {
        return `${formatInt(1)} / ${format(1 / num, 2)}`;
      }
      return `${format(num, 2)}`;
    }
  },
  template: `
  <span
    class="c-gamespeed c-info-color"
    data-v-game-speed-display
  >
    <span>
      {{ baseText }}
    </span>
  </span>
  `
};