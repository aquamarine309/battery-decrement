import { deepmergeAll } from "../deepmerge.js";

window.player = {
  battery: 1,
  apps: Array.repeat(0, 10),
  phoneActive: false,
  unlockedApps: 0,
  achievementBits: Array.repeat(0, 17),
  secretAchievementBits: Array.repeat(0, 4),
  auto: {
    autobuyersOn: true
  },
  records: {
    gameCreatedTime: Date.now(),
    totalTimePlayed: 0,
    realTimePlayed: 0,
    realTimeDoomed: 0,
    fullGameCompletions: 0,
    previousRunRealTime: 0
  },
  version: 0,
  tabNotifications: new Set(),
  triggeredTabNotificationBits: 0,
  tutorialState: 0,
  tutorialActive: true,
  options: {
    sidebarResourceID: 0,
    retryChallenge: false,
    showAllChallenges: false,
    syncSaveIntervals: true,
    hotkeys: true,
    updateRate: 33,
    offlineProgress: true,
    theme: "Normal",
    loadBackupWithoutOffline: false,
    automaticTabSwitching: true,
    hibernationCatchup: true,
    offlineTicks: 1e5,
    statTabResources: 0,
    autosaveInterval: 30000,
    showTimeSinceSave: true,
    saveFileName: "",
    exportedFileCount: 0,
    hideCompletedAchievementRows: false,
    headerTextColored: false,
    confirmations: {},
    awayProgress: {
      battery: false
    },
    hiddenTabBits: 0,
    hiddenSubtabBits: Array.repeat(0, 10),
    lastOpenTab: 0,
    lastOpenSubtab: Array.repeat(0, 10)
  }
}

export const Player = {
  defaultStart: deepmergeAll([{}, player]),
  
  get canChange() {
    return Currency.battery.lte(0);
  }
};

export function guardFromNaNValues(obj) {
  function isObject(ob) {
    return ob !== null && typeof ob === "object";
  }

  for (const key in obj) {
    if (!Object.prototype.hasOwnProperty.call(obj, key)) continue;

    let value = obj[key];
    if (isObject(value)) {
      guardFromNaNValues(value);
      continue;
    }

    if (typeof value === "number") {
      Object.defineProperty(obj, key, {
        enumerable: true,
        configurable: true,
        get: () => value,
        set: function guardedSetter(newValue) {
          if (newValue === null || newValue === undefined) {
            throw new Error("null/undefined player property assignment");
          }
          if (typeof newValue !== "number") {
            throw new Error("Non-Number assignment to Number player property");
          }
          if (!isFinite(newValue)) {
            throw new Error("NaN player property assignment");
          }
          value = newValue;
        }
      });
    }
  }
}