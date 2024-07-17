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
      background: false
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
    }
  },
  methods: {
    update() {
      // const progress = PlayerProgress.current;
      this.animatedThemeUnlocked = Theme.animatedThemeUnlocked;

      const options = player.options.animations;
      this.background = options.background;
    }
  },
  template: `
  <ModalWrapperOptions class="c-modal-options__large">
    <template #header>
      动画设置
    </template>
    <div class="c-modal-options__button-container">
      <ModalOptionsToggleButton
        v-if="animatedThemeUnlocked"
        v-model="background"
        onclick="Themes.find(Theme.currentName()).set();"
        text="背景:"
      />
    </div>
  </ModalWrapperOptions>
  `
};