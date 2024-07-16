import PrimaryButton from "../PrimaryButton.js";

export default {
  name: "LoadGameEntry",
  components: {
    PrimaryButton
  },
  props: {
    saveId: {
      type: Number,
      required: true
    }
  },
  data() {
    const save = GameStorage.saves[this.saveId];
    return {
      battery: new Decimal(save ? save.battery : 1),
      fileName: save ? save.options.saveFileName : ""
    };
  },
  computed: {
    isSelected() {
      return GameStorage.currentSlot === this.saveId;
    }
  },
  methods: {
    load() {
      GameStorage.loadSlot(this.saveId);
    },
    update() {
      if (this.isSelected) {
        this.battery = Currency.battery.value;
      }
    }
  },
  template: `
  <div class="l-modal-options__save-record">
    <h3>存档 #{{ saveId + 1 }}:<span v-if="isSelected"> (selected)</span></h3>
    <span v-if="fileName">文件名称: {{ fileName }}</span>
    <span>电量: {{ formatBattery(battery) }}</span>
    <PrimaryButton
      class="o-primary-btn--width-medium"
      @click="load"
    >
      加载
    </PrimaryButton>
  </div>
  `
};

// TODO replace currency to your game currency