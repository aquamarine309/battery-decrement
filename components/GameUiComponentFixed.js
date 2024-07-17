import ModalProgressBar from "./modals/ModalProgressBar.js";
import ModernSidebar from "./ui-modes/modern/ModernSidebar.js";
import PopupModal from "./modals/PopupModal.js";
import SaveTimer from "./SaveTimer.js";
import AndroidUIHeader from "./ui-modes/android/AndroidUIHeader.js";
import AndroidUIBottom from "./ui-modes/android/AndroidUIBottom.js";

export default {
  name: "GameUiComponentFixed",
  components: {
    ModernSidebar,
    SaveTimer,
    PopupModal,
    ModalProgressBar,
    AndroidUIHeader,
    AndroidUIBottom
  },
  computed: {
    view() {
      return this.$viewModel;
    },
    isAndroid() {
      return this.view.androidUI;
    }
  },
  template: `
  <div
    id="ui-fixed"
    class="c-game-ui--fixed"
    data-v-game-ui-component-fixed
  >
    <AndroidUIHeader v-if="isAndroid" />
    <AndroidUIBottom v-if="isAndroid" />
    <div
      v-if="!isAndroid"
      id="notification-container"
      class="l-notification-container"
    />
    <ModernSidebar v-if="!isAndroid" />
    <SaveTimer v-if="!isAndroid" />
    <PopupModal
      v-else-if="view.modal.current"
      :modal="view.modal.current"
    />
    <ModalProgressBar v-if="view.modal.progressBar" />
  </div>
  `
};