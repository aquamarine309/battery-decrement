import AutosaveIntervalSlider from "./AutosaveIntervalSlider.js";
import OptionsButton from "../../OptionsButton.js";
import PrimaryToggleButton from "../../PrimaryToggleButton.js";
import SaveFileName from "./SaveFileName.js";

export default {
  name: "OptionsSavingTab",
  components: {
    AutosaveIntervalSlider,
    OptionsButton,
    PrimaryToggleButton,
    SaveFileName
  },
  data() {
    return {
      syncSaveIntervals: false,
      showTimeSinceSave: false,
      userName: ""
    };
  },
  watch: {
    syncSaveIntervals(newValue) {
      player.options.syncSaveIntervals = newValue;
    },
    showTimeSinceSave(newValue) {
      player.options.showTimeSinceSave = newValue;
    }
  },
  methods: {
    update() {
      const options = player.options;
      this.syncSaveIntervals = options.syncSaveIntervals;
      this.showTimeSinceSave = options.showTimeSinceSave;
    },
    importAsFile(event) {
      // This happens if the file dialog is canceled instead of a file being selected
      if (event.target.files.length === 0) return;

      const reader = new FileReader();
      reader.onload = function() {
        // File importing behavior should use the behavior on the existing and to-be-overwritten save instead of the
        // settings in the to-be-imported save. This is largely because the former is more easily edited by the player,
        // and in contrast with the import-as-string case which allows the player to choose.
        // Note: Do not move this into GameStorage.import, as this would cause the offline progress choice in the text
        // import modal (the only other place GameStorage.import is called) to always be overridden
        GameStorage.offlineEnabled = player.options.offlineProgress;
        GameStorage.offlineTicks = player.options.offlineTicks;
        GameStorage.import(reader.result);
      };
      reader.readAsText(event.target.files[0]);
    }
  },
  template: `
  <div class="l-options-tab">
    <div class="l-options-grid">
      <div class="l-options-grid__row">
        <OptionsButton
          class="o-primary-btn--option_font-x-large"
          onclick="GameStorage.export()"
        >
          导出存档
        </OptionsButton>
        <OptionsButton
          class="o-primary-btn--option_font-x-large"
          onclick="Modal.import.show()"
        >
          导入存档
        </OptionsButton>
        <OptionsButton
          class="o-primary-btn--option_font-x-large"
          onclick="Modal.hardReset.show()"
        >
          重置游戏
        </OptionsButton>
      </div>
      <div class="l-options-grid__row">
        <OptionsButton
          class="o-primary-btn--option_font-x-large"
          onclick="GameStorage.save(false, true)"
        >
          保存游戏
        </OptionsButton>
        <OptionsButton
          class="o-primary-btn--option_font-x-large"
          onclick="Modal.loadGame.show()"
        >
          选择存档
        </OptionsButton>
        <AutosaveIntervalSlider
          :min="10"
          :max="60"
          :interval="1"
        />
      </div>
      <div class="l-options-grid__row">
        <OptionsButton
          onclick="GameStorage.exportAsFile()"
        >
          以文件形式导出
        </OptionsButton>
        <OptionsButton
          class="c-file-import-button"
        >
          <input
            class="c-file-import"
            type="file"
            accept=".txt"
            @change="importAsFile"
          >
          <label for="file">导入存档文件</label>
        </OptionsButton>
        <PrimaryToggleButton
          v-model="showTimeSinceSave"
          class="o-primary-btn--option l-options-grid__button"
          label="显示存档时间:"
        />
      </div>
      <div class="l-options-grid__row">
        <OptionsButton
          onclick="Modal.backupWindows.show()"
        >
          打开自动备份菜单
        </OptionsButton>
        <SaveFileName />
      </div>
    </div>
  </div>
  `
};