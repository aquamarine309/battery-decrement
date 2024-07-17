export const state = {
  view: {
    modal: {
      queue: [],
      current: undefined,
      progressBar: undefined,
    },
    shiftDown: false,
    theme: "Normal",
    scrollWindow: 0,
    currentContextMenu: null,
    tab: "apps",
    subtab: "apps",
    initialized: false,
    tutorialState: 0,
    tutorialActive: true,
    androidUI: window.innerWidth <= 500,
    hotkey: -1,
    achievementId: -1
  },
  lastClickTime: 0,
};