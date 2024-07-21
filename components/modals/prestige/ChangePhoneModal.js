import ResetModal from "./ResetModal.js";

export default {
  name: "ChangePhoneModal",
  components: {
    ResetModal
  },
  data() {
    return {
      gainedChanging: 0,
      gainedPhones: 0,
      startingBattery: 1
    };
  },
  computed: {
    isFirstPhone() {
      return !PlayerProgress.phoneUnlocked();
    },
    message() {
      const info = this.isFirstPhone ? this.firstPhoneInfo : ``;
      return `换手机后，所有应用都会重置。${info}`;
    },
    firstPhoneInfo() {
      return `但是，你会获得一个无用手机。它可以用来买升级来获得提升。`;
    },
    gainInfo() {
      return `你将会获得 ${format(this.gainedPhones, 2, 0)} 个换手机次数
        和 ${format(this.gainedInfinityPoints, 2, 0)} 个无用手机。`;
    },
    startingResources() {
      return `并且你将在下一个手机以 ${formatBattery(this.startingBattery)} 的电量开始。`;
    }
  },
  methods: {
    update() {
      this.gainedChanging = Math.round(gainedChanging());
      this.gainedPhones = Math.round(gainedPhones());
      this.startingBattery = Currency.battery.startingValue;
    },
    handleYesClick() {
      changePhoneResetRequest();
      EventHub.ui.offAll(this);
      if (this.isFirstPhone) {
        setTimeout(() => Modal.message.show(`该动画在每次手动换手机时都会出现，你可以在设置中关闭该动画。`, {}, 3), 2000);
      }
    }
  },
  template: `
  <ResetModal
    header="你即将换手机"
    :message="message"
    :gained-resources="gainInfo"
    :starting-resources="startingResources"
    :confirm-fn="handleYesClick"
    :alternate-condition="isFirstPhone"
    :alternate-text="message"
    :confirm-option="isFirstPhone ? undefined : 'chnagePhone'"
  />
  `
};