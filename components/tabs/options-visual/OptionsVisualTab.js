import ExpandingControlBox from "../../ExpandingControlBox.js";
import OptionsButton from "../../OptionsButton.js";
import PrimaryToggleButton from "../../PrimaryToggleButton.js";
import SelectThemeDropdown from "./SelectThemeDropdown.js";
import UpdateRateSlider from "./UpdateRateSlider.js";

export default {
  name: "OptionsVisualTab",
  components: {
    UpdateRateSlider,
    PrimaryToggleButton,
    ExpandingControlBox,
    OptionsButton,
    SelectThemeDropdown
  },
  data() {
    return {
      theme: "",
      sidebarResource: "",
      headerTextColored: true,
      modifyHotkey: false
    };
  },
  computed: {
    sidebarDB: () => GameDatabase.sidebarResources,
    themeLabel() {
      return `主题: ${Themes.find(this.theme).displayName()}`;
    },
    UILabel() {
      return `UI: ${this.$viewModel.androidUI ? "手机" : "电脑"}`;
    }
  },
  watch: {
    headerTextColored(newValue) {
      player.options.headerTextColored = newValue;
    },
    modifyHotkey(newValue) {
      player.options.modifyHotkey = newValue;
    }
  },
  methods: {
    update() {
      const options = player.options;
      this.theme = Theme.currentName();
      this.headerTextColored = options.headerTextColored;
      this.modifyHotkey = player.options.modifyHotkey;
    },
  },
  template: `
  <div class="l-options-tab">
    <div class="l-options-grid">
      <div class="l-options-grid__row">         <OptionsButton
          class="o-primary-btn--option_font-large"
          onclick="GameOptions.toggleUI()"
        >
          {{ UILabel }}
        </OptionsButton>
        <ExpandingControlBox
          class="l-options-grid__button c-options-grid__notations"
          button-class="o-primary-btn o-primary-btn--option l-options-grid__notations-header"
          :label="themeLabel"
        >
          <template #dropdown>
            <SelectThemeDropdown />
          </template>
        </ExpandingControlBox>
        <UpdateRateSlider />
      </div>
      <div class="l-options-grid__row">
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.animationOptions.show();"
        >
          打开动画设置
        </OptionsButton>
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.infoDisplayOptions.show()"
        >
          打开消息显示设置
        </OptionsButton>
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.awayProgressOptions.show()"
        >
          打开离线资源设置
        </OptionsButton>
      </div>
      <div class="l-options-grid__row">
        <OptionsButton
          class="o-primary-btn--option"
          onclick="Modal.hiddenTabs.show()"
        >
          修改可见标签页
        </OptionsButton>
        <PrimaryToggleButton
          v-model="headerTextColored"
          class="o-primary-btn--option l-options-grid__button"
          label="高亮资源:"
        />
        <PrimaryToggleButton
          v-if="$viewModel.androidUI"
          v-model="modifyHotkey"
          class="o-primary-btn--option l-options-grid__button"
          label="修改快捷键显示:"
        />
      </div>
    </div>
  </div>
  `
};