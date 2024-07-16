export const sidebarResources = [
  // Note: ID 0 is interpreted in the Vue component as "the largest unlocked ID" - do not use ID 0
  {
    id: 1,
    optionName: "电量",
    isAvailable: () => true,
    value: () => Currency.battery.value,
    formatValue: value => formatPercents(value, 2, 3),
    formatClass: "o-sidebar-currency--battery"
  }
];
