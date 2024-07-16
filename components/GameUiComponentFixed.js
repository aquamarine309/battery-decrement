import ModalProgressBar from "./modals/ModalProgressBar.js";
import ModernSidebar from "./ui-modes/modern/ModernSidebar.js";
import PopupModal from "./modals/PopupModal.js";
import SaveTimer from "./SaveTimer.js";

export default {
  name: "GameUiComponentFixed",
  components: {
    ModernSidebar,
    SaveTimer,
    PopupModal,
    ModalProgressBar
  },
  computed: {
    view() {
      return this.$viewModel;
    },
  },
  template: `
  <div
    id="ui-fixed"
    class="c-game-ui--fixed"
    data-v-game-ui-component-fixed
  >
    <div
      id="notification-container"
      class="l-notification-container"
    />
    <ModernSidebar />
    <SaveTimer />
    <template>
      <ModalProgressBar v-if="view.modal.progressBar" />
      <PopupModal
        v-else-if="view.modal.current"
        :modal="view.modal.current"
      />
      <ModalProgressBar v-if="view.modal.progressBar" />
    </template>
  </div>
  `
};