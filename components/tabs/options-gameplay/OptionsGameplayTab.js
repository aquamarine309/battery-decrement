import OptionsButton from "../../OptionsButton.js";
import PrimaryToggleButton from "../../PrimaryToggleButton.js";
import SliderComponent from "../../SliderComponent.js";

export default {
  name: "OptionsGameplayTab",
  components: {
    OptionsButton,
    PrimaryToggleButton,
    SliderComponent
  },
  data() {
    return {
      offlineProgress: false,
      hibernationCatchup: false,
      hotkeys: false,
      offlineSlider: 0,
      offlineTicks: 0,
      automaticTabSwitching: false
    };
  },
  computed: {
    sliderPropsOfflineTicks() {
      return {
        min: 22,
        max: 54,
        interval: 1,
        width: "100%",
        tooltip: false
      };
    }
  },
  watch: {
    offlineProgress(newValue) {
      player.options.offlineProgress = newValue;
    },
    hibernationCatchup(newValue) {
      player.options.hibernationCatchup = newValue;
    },
    hotkeys(newValue) {
      player.options.hotkeys = newValue;
    },
    offlineSlider(newValue) {
      player.options.offlineTicks = this.parseOfflineSlider(newValue);
    },
    automaticTabSwitching(newValue) {
      player.options.automaticTabSwitching = newValue;
    },
  },
  // This puts the slider in the right spot on initialization
  created() {
    const ticks = player.options.offlineTicks;
    const exponent = Math.floor(Math.log10(ticks));
    const mantissa = (ticks / Math.pow(10, exponent)) - 1;
    this.offlineSlider = 9 * exponent + mantissa;
  },
  methods: {
    update() {
      const options = player.options;
      this.offlineProgress = options.offlineProgress;
      this.hibernationCatchup = options.hibernationCatchup;
      this.hotkeys = options.hotkeys;
      this.offlineTicks = player.options.offlineTicks;
      this.automaticTabSwitching = options.automaticTabSwitching;
    },
    // Given the endpoints of 22-54, this produces 500, 600, ... , 900, 1000, 2000, ... , 1e6 ticks
    // It's essentially 10^(x/10) but with the mantissa spaced linearly instead of logarithmically
    parseOfflineSlider(str) {
      const value = parseInt(str, 10);
      return (1 + value % 9) * Math.pow(10, Math.floor(value / 9));
    },
    adjustSliderValueOfflineTicks(value) {
      this.offlineSlider = value;
      player.options.offlineTicks = this.parseOfflineSlider(value);
    }
  },
  template: `
  <div class="l-options-tab">
    <div class="l-options-grid">
      <div class="l-options-grid__row">
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.confirmationOptions.show()"
        >
          打开确认设置
        </OptionsButton>
        <PrimaryToggleButton
          v-model="hotkeys"
          class="o-primary-btn--option l-options-grid__button"
          label="快捷键:"
          on="已启用"
          off="已禁用"
        />
        <PrimaryToggleButton
          v-model="automaticTabSwitching"
          class="o-primary-btn--option l-options-grid__button l-toggle-button"
          label="自动切换标签页(例如进入挑战):"
          data-v-options-gameplay-tab
        />
      </div>
      <div class="l-options-grid__row">
        <PrimaryToggleButton
          v-model="offlineProgress"
          class="o-primary-btn--option l-options-grid__button"
          label="离线进度:"
        />
        <div class="o-primary-btn o-primary-btn--option o-primary-btn--slider l-options-grid__button">
          <b>离线时间刻: {{ formatInt(offlineTicks) }}</b>
          <SliderComponent
            class="o-primary-btn--slider__slider"
            v-bind="sliderPropsOfflineTicks"
            :value="offlineSlider"
            @input="adjustSliderValueOfflineTicks($event)"
          />
        </div>
        <PrimaryToggleButton
          v-model="hibernationCatchup"
          class="o-primary-btn--option l-options-grid__button"
          label="长时间未刷新时计算离线进度:"
        />
      </div>
    </div>
  </div>
  `
};