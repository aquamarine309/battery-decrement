const achievements = [
  {
    id: 11,
    name: "你的第一步",
    description: "启动手机。",
    checkEvent: GAME_EVENT.ACTIVATE_PHONE,
    checkRequirement: () => true
  },
  {
    id: 12,
    name: "第一个应用",
    description: "下载第一个应用",
    checkEvent: GAME_EVENT.DOWNLOAD_APP,
    checkRequirement: id => id === 0
  }
]