import ModalOptionsToggleButton from "../../ModalOptionsToggleButton.js";
import ModalWrapperOptions from "./ModalWrapperOptions.js";

export default {
  name: "InfoDisplayOptionsModal",
  components: {
    ModalOptionsToggleButton,
    ModalWrapperOptions,
  },
  data() {
    return {
      achievements: false,
      achievementUnlockStates: false
    };
  },
  computed: {
    fullCompletion() {
      return player.records.fullGameCompletions > 0;
    }
  },
  watch: {
    achievements(newValue) {
      player.options.showHintText.achievements = newValue;
    },
    achievementUnlockStates(newValue) {
      player.options.showHintText.achievementUnlockStates = newValue;
    }
  },
  methods: {
    update() {
      // const progress = PlayerProgress.current;

      const options = player.options.showHintText;
      this.achievements = options.achievements;
      this.achievementUnlockStates = options.achievementUnlockStates;
    }
  },
  template: `
  <ModalWrapperOptions class="c-modal-options__large">
    <template #header>
      信息显示设置
    </template>
    <div class="c-modal-options__button-container">
      <ModalOptionsToggleButton
        v-model="achievements"
        text="成就序号:"
      />
      <ModalOptionsToggleButton
        v-model="achievementUnlockStates"
        text="成就解锁状态:"
      />
    </div>
    Note: All types of additional info above will always display when holding shift.
  </ModalWrapperOptions>
  `
};