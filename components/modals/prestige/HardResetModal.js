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
      return "花开花落，尽归尘土。缘起缘灭，曲终人散。";
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
      重置游戏
    </template>
    <div class="c-modal-message__text">
      请确定是否要重置游戏。
      <span class="c-modal-hard-reset-danger">删除存档不会解锁任何秘密。</span>
      输入“{{ expectedInput }}”以确认重置
      <div class="c-modal-hard-reset-danger">
        这将失去你的存档。
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
        该操作会永久删除存档，祝你好运。
      </div>
      <div v-else>
        Type in the correct phrase to hard reset.
      </div>
    </div>
    <template #confirm-text>
      毁灭
    </template>
  </ModalWrapperChoice>
  `
};