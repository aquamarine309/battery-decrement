export default {
  name: "BigCrunchButton",
  data() {
    return {
      isModern: false,
      smallButton: false,
      shouldDisplay: false
    };
  },
  methods: {
    update() {
      this.shouldDisplay = Player.canChange;
      if (!this.shouldDisplay) return;
      this.isModern = !player.options.androidUI;
      this.smallButton = Time.bestPhoneRealTime.totalMinutes <= 1;
    },
    handleClick() {
      if (PlayerProgress.phoneUnlocked()) changePhoneResetRequest();
      else Modal.changePhone.show();
    }
  },
  template: `
  <div v-if="shouldDisplay">
    <h3
      v-if="!smallButton"
      class="l-spacing c-info-color"
      data-change-phone-button
    >
      手机因电量过低已损坏
    </h3>
    <button
      :class="{
        'btn-change-phone': true,
        'btn-change-phone--small': smallButton
      }"
      @click="handleClick"
    >
      换手机
    </button>
  </div>
  `
};