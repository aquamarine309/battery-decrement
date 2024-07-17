export default {
  name: "SaveFileName",
  components: {
  },
  data() {
    return {
      saveFileName: ""
    };
  },
  methods: {
    update() {
      this.saveFileName = player.options.saveFileName;
    },
    removeNotAvailableCharacters(input) {
      return input.replace(/[^a-zA-Z0-9 -]/gu, "");
    },
    handleChange(event) {
      const newName = this.removeNotAvailableCharacters(event.target.value.trim());
      player.options.saveFileName = newName;
      event.target.value = newName;
    }
  },
  template: `
  <div class="o-primary-btn o-primary-btn--option o-primary-btn--input l-options-grid__button">
    <b>存档名称:</b>
    <span ach-tooltip="自定义名称(只能使用数字、英文字母和连字符，不得超过16个字符)">
      <input
        class="c-custom-save-name__input"
        type="text"
        maxlength="16"
        placeholder="自定义名称"
        :value="saveFileName"
        @change="handleChange"
        data-v-save-file-name
      >
    </span>
  </div>
  `
};