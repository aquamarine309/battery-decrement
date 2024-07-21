export const tabs = [
  {
    key: "apps",
    name: "应用",
    id: 0,
    hidable: true,
    subtabs: [
      {
        key: "apps",
        name: "应用",
        symbol: "<i class='fas fa-check-circle'></i>",
        component: "AppsTab",
        id: 0,
        hidable: true
      }
    ]
  },
  {
    key: "options",
    name: "选项",
    id: 1,
    hidable: false,
    subtabs: [
      {
        key: "saving",
        name: "存档",
        symbol: "<i class='fas fa-save'></i>",
        component: "OptionsSavingTab",
        id: 0,
        hidable: false,
      },
      {
        key: "visual",
        name: "视觉效果",
        symbol: "<i class='fas fa-palette'></i>",
        component: "OptionsVisualTab",
        id: 1,
        hidable: false,
      },
      {
        key: "gameplay",
        name: "游戏玩法",
        symbol: "<i class='fas fa-wrench'></i>",
        component: "OptionsGameplayTab",
        id: 2,
        hidable: false,
      }
    ]
  },
  {
    key: "phone",
    name: "手机",
    id: 1,
    hidable: true,
    color: "var(--color-phone)",
    condition: () => PlayerProgress.phoneUnlocked(),
    subtabs: [
      {
        key: "upgrades",
        name: "手机升级",
        symbol: "<i class='fas fa-arrow-up'></i>",
        component: "PhoneUpgradesTab",
        id: 0,
        hidable: true
      }
    ]
  }
];
