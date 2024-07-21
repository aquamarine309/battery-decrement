export const sidebarResources = [
  // Note: ID 0 is interpreted in the Vue component as "the largest unlocked ID" - do not use ID 0
  {
    id: 1,
    optionName: "电量",
    isAvailable: () => true,
    value: () => Currency.battery.value,
    formatValue: value => formatBattery(value),
    formatClass: "o-sidebar-currency--battery"
  },
  {
    id: 2,
    optionName: "无用手机",
    isAvailable: () => PlayerProgress.phoneUnlocked(),
    value: () => Currency.uselessPhones.value,
    formatValue: value => format(value, 2),
    formatClass: "o-sidebar-currency--phones"
  }
];
