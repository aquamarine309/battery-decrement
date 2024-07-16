export const NG = {
  startNewGame() {

    // Modify beaten-game quantities before doing a carryover reset
    player.records.fullGameCompletions++;
    this.restartWithCarryover();
    // Without the delay, this causes the saving (and its notification) to occur during the credits rollback
    setTimeout(() => GameStorage.save(), 10000);
  },

  // Reset the game, but carry over some post-completion stats. We also call this when starting a speedrun, so make sure
  // any stats which are updated due to completion happen in startNewGame() instead of in here
  restartWithCarryover() {
    const backUpOptions = JSON.stringify(player.options);
    // This can't be JSONed as it contains sets
    const secretUnlocks = player.secretUnlocks;
    const secretAchievements = JSON.stringify(player.secretAchievementBits);
    const fullCompletions = player.records.fullGameCompletions;
    const fullTimePlayed = player.records.previousRunRealTime + player.records.realTimePlayed;
    Modal.hideAll();
    GameStorage.hardReset();
    player.options = JSON.parse(backUpOptions);
    player.secretUnlocks = secretUnlocks;
    player.secretAchievementBits = JSON.parse(secretAchievements);
    player.records.fullGameCompletions = fullCompletions;
    player.records.previousRunRealTime = fullTimePlayed;
    Themes.find(Theme.currentName()).set();
    player.lastUpdate = Date.now();
  }
};
