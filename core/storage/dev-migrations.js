import { migrations } from "./migrations.js";

function arrayToBits(array) {
  let bits = 0;
  for (const id of array) bits |= (1 << id);
  return bits;
}

// WARNING: Don't use state accessors and functions from global scope here, that's not safe in long-term
export const devMigrations = {
  patches: [],

  patch(player) {
    player.options.testVersion = player.options.testVersion || 0;
    for (let version = player.options.testVersion; version < this.patches.length; version++) {
      const patch = this.patches[version];
      patch(player);
    }
    this.setLatestTestVersion(player);
  },

  setLatestTestVersion(player) {
    player.options.testVersion = this.patches.length;
  }
};
