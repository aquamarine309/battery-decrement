export const hotkeys = [
  {
    id: 0,
    label: "最大",
    active: () => maxAll()
  },
  {
    id: 1,
    label: "解锁",
    active: () => Apps.download(),
    mark: () => Apps.isAvaliableForPurchase
  }
]