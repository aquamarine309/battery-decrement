export default {
  name: "SaveTimer",
  data() {
    return {
      currentTime: 0,
      lastLocalSave: 0,
      showTimeSinceSave: false
    };
  },
  computed: {
    timeString() {
      const localStr = timeDisplayShort(this.currentTime - this.lastLocalSave);
      return localStr;
    },
  },
  methods: {
    update() {
      this.currentTime = Date.now();
      this.lastLocalSave = GameStorage.lastSaveTime;
      this.showTimeSinceSave = player.options.showTimeSinceSave;
    },
    save() {
      GameStorage.save(false, true);
    }
  },
  template: `
  <div
    v-if="showTimeSinceSave"
    class="o-save-timer"
    @click="save"
    data-v-save-timer
  >
    <span>Time since last save: {{ timeString }}</span>
  </div>
  `
};