import ModalWrapperChoice from "./ModalWrapperChoice.js";
import PrimaryButton from "../PrimaryButton.js";

const OFFLINE_PROGRESS_TYPE = {
  IMPORTED: 0,
  LOCAL: 1,
  IGNORED: 2,
};

export default {
  name: "ImportSaveModal",
  components: {
    ModalWrapperChoice,
    PrimaryButton
  },
  data() {
    return {
      input: "",
      offlineImport: OFFLINE_PROGRESS_TYPE.IMPORTED,
    };
  },
  computed: {
    saveCheckString() {
      const save = GameSaveSerializer.deserialize(this.input);
      const rawString = GameStorage.checkPlayerObject(save);
      // Keep the length bounded; we don't want the modal to be too big for the screen for particularly bad errors
      return rawString.length > 300 ? `${rawString.slice(0, 297)}...` : rawString;
    },
    player() {
      return this.saveCheckString === "" ? GameSaveSerializer.deserialize(this.input) : undefined;
    },
    progress() {
      return PlayerProgress.of(this.player);
    },
    fileName() {
      return this.player.options.saveFileName;
    },
    battery() {
      return this.player.battery;
    },
    hasInput() {
      return this.input !== "";
    },
    inputIsValid() {
      return this.inputIsValidSave || this.inputIsSecret;
    },
    inputIsValidSave() {
      return this.player !== undefined;
    },
    inputIsSecret() {
      return isSecretImport(this.input) || Theme.isSecretTheme(this.input);
    },
    isFromFuture() {
      return this.player.lastUpdate > Date.now();
    },
    lastOpened() {
      const ms = Date.now() - this.player.lastUpdate;
      return this.isFromFuture
        ? `该存档来自 ${TimeSpan.fromMilliseconds(-ms).toString()} 后的未来.`
        : `该存档上次保存的时间在 ${TimeSpan.fromMilliseconds(ms).toString()} 之前。`;
    },
    offlineType() {
      // We update here in the computed method instead of elsewhere because otherwise it initializes the text
      // to a wrong or undefined setting
      this.updateOfflineSettings();

      switch (this.offlineImport) {
        case OFFLINE_PROGRESS_TYPE.IMPORTED:
          return "使用导入存档的设置计算离线进度";
        case OFFLINE_PROGRESS_TYPE.LOCAL:
          return "使用当前的设置计算离线进度";
        case OFFLINE_PROGRESS_TYPE.IGNORED:
          return "禁用离线进度";
        default:
          throw new Error("Unrecognized offline progress setting for importing");
      }
    },
    offlineDetails() {
      if (this.offlineImport === OFFLINE_PROGRESS_TYPE.IGNORED) {
        return `导入后不计算离线进度。`;
      }
      if (!GameStorage.offlineEnabled) return "该设置会导致在导入后不会计算离线进度。";
      if (this.isFromFuture) return "由于错误的系统时间，离线进度不会被计算.";

      const durationInMs = Date.now() - this.player.lastUpdate;
      const ticks = GameStorage.maxOfflineTicks(durationInMs);
      return `导入存档后，将计算 ${formatInt(ticks)} 个离线时长为 ${TimeSpan.fromMilliseconds(durationInMs / ticks).toStringShort()} 的游戏刻。`;
    }
  },
  mounted() {
    this.$refs.input.select();
  },
  destroyed() {
    // Explicitly setting this to undefined after closing forces the game to fall-back to the stored settings within
    // the player object if this modal is closed - ie. it makes sure actions in the modal don't persist
    GameStorage.offlineEnabled = undefined;
    GameStorage.offlineTicks = undefined;
  },
  methods: {
    changeOfflineSetting() {
      this.offlineImport = (this.offlineImport + 1) % 3;
    },
    updateOfflineSettings() {
      switch (this.offlineImport) {
        case OFFLINE_PROGRESS_TYPE.IMPORTED:
          // These are default values from a new save, used if importing from pre-reality where these props don't exist
          GameStorage.offlineEnabled = this.player.options.offlineProgress ?? true;
          GameStorage.offlineTicks = this.player.options.offlineTicks ?? 1e5;
          break;
        case OFFLINE_PROGRESS_TYPE.LOCAL:
          GameStorage.offlineEnabled = player.options.offlineProgress;
          GameStorage.offlineTicks = player.options.offlineTicks;
          break;
        case OFFLINE_PROGRESS_TYPE.IGNORED:
          GameStorage.offlineEnabled = false;
          break;
      }
    },
    importSave() {
      if (!this.inputIsValid) return;
      this.emitClose();
      GameStorage.import(this.input);
    },
  },
  template: `
  <ModalWrapperChoice
    :show-cancel="!inputIsValid"
    :show-confirm="false"
  >
    <template #header>
      导入存档
    </template>
    <input
      ref="input"
      v-model="input"
      type="text"
      class="c-modal-input c-modal-import__input"
      @keyup.enter="importSave"
      @keyup.esc="emitClose"
    >
    <div class="c-modal-import__save-info">
      <div v-if="inputIsSecret">
        ???
      </div>
      <template v-else-if="inputIsValidSave">
        <div v-if="fileName">
          File name: {{ fileName }}
        </div>
        <div>电量: {{ formatBattery(battery, 2, 1) }}</div>
        <div v-if="progress.hasFullCompletion">
          Full game completions: {{ formatInt(player.records.fullGameCompletions) }}
        </div>
        <div class="c-modal-import__warning">
          (Your current save file will be overwritten!)
        </div>
        <br>
        <div>
          {{ lastOpened }}
          <div
            class="o-primary-btn"
            @click="changeOfflineSetting"
          >
            Offline Progress: {{ offlineType }}
          </div>
          <span v-html="offlineDetails" />
        </div>
      </template>
      <div v-else-if="hasInput">
        Not a valid save:
        <br>
        {{ saveCheckString }}
      </div>
      <div
        v-if="player"
        class="c-modal-hard-reset-danger"
      >
      </div>
    </div>

    <PrimaryButton
      v-if="inputIsValid"
      class="o-primary-btn--width-medium c-modal-message__okay-btn c-modal__confirm-btn"
      @click="importSave"
    >
      导入
    </PrimaryButton>
  </ModalWrapperChoice>
  `
};