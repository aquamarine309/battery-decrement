import AwayProgressEntry from "./AwayProgressEntry.js";
import ModalWrapper from "./ModalWrapper.js";

export default {
  name: "AwayProgressModal",
  components: {
    AwayProgressEntry,
    ModalWrapper,
  },
  props: {
    playerBefore: {
      type: Object,
      required: true,
    },
    playerAfter: {
      type: Object,
      required: true,
    },
    seconds: {
      type: Number,
      required: true,
    },
  },
  data() {
    return {
      somethingHappened: false,
    };
  },
  computed: {
    offlineStats() {
      return AwayProgressTypes.appearsInAwayModal;
    },
    headerText() {
      const timeDisplay = TimeSpan.fromSeconds(this.seconds).toString();
      if (!this.somethingHappened) {
        return `在你离开的 ${timeDisplay} 里... 什么事情都没发生。`;
      }
      return `在你离开的 ${timeDisplay} 里: `;
    },
  },
  template: `
  <ModalWrapper class="c-modal-away-progress">
    <div class="c-modal-away-progress__header">
      {{ headerText }}
    </div>
    <div
      class="c-modal-away-progress__resources c-modal--short"
      data-v-away-progress-modal
    >
      <AwayProgressEntry
        v-for="name of offlineStats"
        :key="name"
        :name="name"
        :player-before="playerBefore"
        :player-after="playerAfter"
        @something-happened="somethingHappened = true"
      />
    </div>
    <span v-if="somethingHappened">Note: Click an entry to hide it in the future.</span>
  </ModalWrapper>
  `
};