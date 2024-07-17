export default {
  name: "BatteryContainer",
  props: {
    battery: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      isCharging: false
    }
  },
  computed: {
    fillStyle() {
      const stepRGB = [
        [255, 0, 0],
        [255, 255, 0],
        [0, 255, 0]
      ];
      const ratio = this.battery * 2;
      const interFn = index => {
        if (ratio < 0) return stepRGB[0][index];
        if (ratio < 1) {
          const r = ratio;
          return Math.round(stepRGB[0][index] * (1 - r) + stepRGB[1][index] * r);
        }
        if (ratio < 2) {
          const r = ratio - 1;
          return Math.round(stepRGB[1][index] * (1 - r) + stepRGB[2][index] * r);
        }
        return stepRGB[2][index];
      };
      const rgb = [interFn(0), interFn(1), interFn(2)];
      return {
        width: `${this.battery * 100}%`,
        "background-color": `rgb(${rgb.join(",")})`
      }
    }
  },
  created() {
    navigator.getBattery()
    .then(battery => {
      this.isCharging = battery.charging;
      battery.onchargingchange = () => {
        this.isCharging = battery.charging;
      }
    });
  },
  template: `
  <div class="l-battery-container">
    <div class="c-battery-rect">
      <div
        class="c-battery-fill"
        :style="fillStyle"
      />
      <div
        class="c-battery-icon"
        v-if="isCharging"
      >
        <i class="fas fa-bolt" />
      </div>
    </div>
    <div class="c-battery-pole" />
  </div>
  `
}