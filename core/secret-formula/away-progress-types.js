export const awayProgressTypes = [
  {
    name: "battery",
    forcedName: "电量",
    reference: ["battery"],
    isUnlocked: () => true,
    formatValue: value => formatBattery(value)
  }
];
