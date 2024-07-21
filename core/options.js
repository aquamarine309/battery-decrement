import { sha512_256 } from "../modules/sha512.js";

export class GameOptions {
  static refreshUpdateRate() {
    GameIntervals.gameLoop.restart();
  }

  static refreshAutosaveInterval() {
    GameIntervals.save.restart();
  }
  
  static toggleUI() {
    player.options.androidUI = !player.options.androidUI;
    ui.view.androidUI = player.options.androidUI;
    Themes.find(Theme.currentName()).set();
    GameStorage.save();
  }
}

const secretImports = [];

function secretImportIndex(data) {
  const sha = sha512_256(data.replace(/\s/gu, "").toUpperCase());
  return secretImports.indexOf(sha);
}

export function isSecretImport(data) {
  return secretImportIndex(data) !== -1;
}

export function tryImportSecret(data) {
  const index = secretImportIndex(data);

  switch (index) {
    default:
      return false;
  }
}
