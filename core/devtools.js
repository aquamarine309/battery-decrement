/* eslint-disable no-console */
// Disabling no-console here seems
// reasonable, since these are the devtools after all
export const dev = {};

dev.hardReset = function() {
  GameStorage.hardReset();
};

dev.giveAllAchievements = function() {
  const allAchievements = Achievements.all.concat(SecretAchievements.all);
  for (const achievement of allAchievements) achievement.unlock();
};

dev.cancerize = function() {
  Theme.tryUnlock("Design");
  Notation.emoji.setAsCurrent();
};

dev.fixSave = function() {
  const save = JSON.stringify(player, GameSaveSerializer.jsonConverter);
  const fixed = save.replace(/NaN/gui, "10");
  const saveData = JSON.parse(fixed);
  if (!saveData || GameStorage.checkPlayerObject(saveData) !== "") {
    Modal.message.show("Could not fix the save.");
    return;
  }
  GameStorage.loadPlayerObject(saveData);
  GameStorage.save();
};

dev.removeAch = function(name) {
  if (name === "all") {
    const allAchievements = Achievements.all.concat(SecretAchievements.all);
    for (const achievement of allAchievements) achievement.lock();
    return "removed all achievements";
  }
  if (typeof (name) === "number") return Achievement(name).lock();
  if (name.startsWith("r")) return Achievement(parseInt(name.slice(1), 10)).lock();
  if (name.startsWith("s")) return SecretAchievement(parseInt(name.slice(1), 10)).lock();
  return "failed to delete achievement";
};

export function isDevEnvironment() {
  const href = window.location.href;
  return href.split("//")[1].length > 20 || isLocalEnvironment();
}

export function isLocalEnvironment() {
  const href = window.location.href;
  return href.includes("file") || href.includes("127.0.0.1") || href.includes("localhost");
}

dev.togglePerformanceStats = function() {
  PerformanceStats.toggle();
};