import HiddenTabGroup from "./HiddenTabGroup.js";
import ModalWrapperOptions from "../ModalWrapperOptions.js";
import PrimaryButton from "../../../PrimaryButton.js";

export default {
  name: "HiddenTabsModal",
  components: {
    HiddenTabGroup,
    ModalWrapperOptions,
    PrimaryButton,
  },
  computed: {
    tabs: () => Tabs.currentUIFormat,
  },
  methods: {
    showAllTabs() {
      for (const tab of this.tabs) {
        tab.unhideTab();
        for (const subtab of tab.subtabs)
          subtab.unhideTab();
      }
    }
  },
  template: `
  <ModalWrapperOptions
    class="l-wrapper"
    data-v-hidden-tabs-modal
  >
    <template #header>
      Modify Visible Tabs
    </template>
    <div class="c-modal--short">
      Click a button to toggle showing a tab on/off.
      <br>
      Some tabs cannot be hidden, and you cannot hide your current tab.
      <br>
      Unhiding a tab in which all subtabs are hidden will also unhide all subtabs,
      and hiding all subtabs will also hide the tab.
      <br>
      <PrimaryButton
        @click="showAllTabs"
      >
        Show all tabs
      </PrimaryButton>
      <HiddenTabGroup
        v-for="(tab, index) in tabs"
        :key="index"
        :tab="tab"
        class="l-hide-modal-tab-container"
      />
    </div>
  </ModalWrapperOptions>
  `
};