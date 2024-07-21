import { deepmergeAll } from "../../deepmerge.js";

// WARNING: Don't use state accessors and functions from global scope here, that's not safe in long-term
export const migrations = {
  patches: {
    1.01: player => {
      delete player.records.bestInfinity;
      delete player.records.realTimeDoomed;
      player.records.thisPhone.time = Number.MAX_VALUE;
      player.records.thisPhone.realTime = Number.MAX_VALUE;
    }
  },

  prePatch(saveData) {
    saveData.version = saveData.version || 0;
  },

  // Patch up to the specified version; we need this functionality in order to properly migrate both saves from
  // much older versions and saves from in-development versions
  patch(saveData, maxVersion) {
    this.prePatch(saveData);
    // This adds all the undefined properties to the save which are in player.js
    const player = deepmergeAll([Player.defaultStart, saveData]);
    const versions = Object.keys(this.patches).map(parseFloat).sort();
    let version;
    while ((version = versions.find(v => player.version < v && v < maxVersion)) !== undefined) {
      const patch = this.patches[version];
      patch(player);
      player.version = version;
    }
    return player;
  },

  patchPlayer(saveData) {
    // Plus 1 because this the threshold is exclusive (it migrates up to but not including the maxVersion)
    return this.patch(saveData, Object.keys(migrations.patches).map(k => Number(k)).max() + 1);
  }
};
