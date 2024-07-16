import ModalWrapperChoice from "../ModalWrapperChoice.js";

export default {
  name: "HardResetModal",
  components: {
    ModalWrapperChoice
  },
  data() {
    return {
      input: ""
    };
  },
  computed: {
    expectedInput() {
      return "Shrek is love, Shrek is life";
    },
    willHardReset() {
      return this.input === this.expectedInput;
    },
    hasExtraNG() {
      return player.records.fullGameCompletions > 0;
    }
  },
  methods: {
    hardReset() {
      if (this.willHardReset) GameStorage.hardReset();
      this.input = "";
    },
  },
  template: `
  <ModalWrapperChoice
    :show-cancel="!willHardReset"
    :show-confirm="willHardReset"
    confirm-class="o-primary-btn--width-medium c-modal__confirm-btn c-modal-hard-reset-btn"
    @confirm="hardReset"
  >
    <template #header>
      HARD RESET
    </template>
    <div class="c-modal-message__text">
      Please confirm your desire to hard reset this save slot.
      <span class="c-modal-hard-reset-danger">Deleting your save will not unlock anything secret.</span>
      Type in "{{ expectedInput }}" to confirm.
      <div class="c-modal-hard-reset-danger">
        THIS WILL WIPE YOUR SAVE.
        <span v-if="hasExtraNG">
          <br>
          This will also remove any Glyph cosmetics you have unlocked from completing the game!
        </span>
      </div>
    </div>
    <input
      ref="input"
      v-model="input"
      type="text"
      class="c-modal-input c-modal-hard-reset__input"
      @keyup.esc="emitClose"
    >
    <div class="c-modal-hard-reset-info">
      <div
        v-if="willHardReset"
        class="c-modal-hard-reset-danger"
      >
        Phrase confirmed - continuing will irreversibly delete your save!
      </div>
      <div v-else>
        Type in the correct phrase to hard reset.
      </div>
    </div>
    <template #confirm-text>
      HARD RESET
    </template>
  </ModalWrapperChoice>
  `
};