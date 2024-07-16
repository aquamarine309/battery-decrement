import ModalOptionsToggleButton from "../../ModalOptionsToggleButton.js";
import ModalWrapperOptions from "./ModalWrapperOptions.js";
import SliderComponent from "../../SliderComponent.js";

export default {
  name: "AnimationOptionsModal",
  components: {
    ModalOptionsToggleButton,
    ModalWrapperOptions,
    SliderComponent
  },
  data() {
    return {
      background: false,
      blobSnowflakes: 16,
      isS11Active: false
    };
  },
  computed: {
    sliderProps() {
      return {
        min: 1,
        max: 500,
        interval: 1,
        width: "100%",
        tooltip: false
      };
    },
    fullCompletion() {
      return player.records.fullGameCompletions > 0;
    }
  },
  watch: {
    background(newValue) {
      player.options.animations.background = newValue;
    },
    blobSnowflakes(newValue) {
      player.options.animations.blobSnowflakes = parseInt(newValue, 10);
    }
  },
  methods: {
    update() {
      // const progress = PlayerProgress.current;
      this.animatedThemeUnlocked = Theme.animatedThemeUnlocked;
      this.isS11Active = Theme.currentName() === "S11";

      const options = player.options.animations;
      this.background = options.background;
      this.blobSnowflakes = options.blobSnowflakes;
    },
    adjustSliderValue(value) {
      this.blobSnowflakes = value;
      player.options.blobSnowflakes = this.blobSnowflakes;
    }
  },
  template: `
  <ModalWrapperOptions class="c-modal-options__large">
    <template #header>
      Animation Options
    </template>
    <div class="c-modal-options__button-container">
      <div v-if="!isS11Active">
        <ModalOptionsToggleButton
          v-if="animatedThemeUnlocked"
          v-model="background"
          onclick="Themes.find(Theme.currentName()).set();"
          text="Background:"
        />
      </div>
      <div v-else>
        <ModalOptionsToggleButton
          v-if="animatedThemeUnlocked"
          v-model="background"
          onclick="Themes.find(Theme.currentName()).set();"
          text="Blobsnow:"
        />
      </div>
      <div
        v-if="isS11Active"
        class="c-blobflake-slider o-primary-btn o-primary-btn--modal-option o-primary-btn--slider"
        data-v-animation-options-modal
      >
        <b>{{ quantifyInt("Blobflake", parseInt(blobSnowflakes)) }}</b>
        <SliderComponent
          class="o-primary-btn--slider__slider"
          v-bind="sliderProps"
          :value="blobSnowflakes"
          @input="adjustSliderValue($event)"
        />
      </div>
    </div>
  </ModalWrapperOptions>
  `
};