export const Autobuyer = {};

export const Autobuyers = (function() {
  const dimensions = [];
  
  const prestige = [];

  const single = [];

  const singleComplex = [].concat(single);

  const arrays = [];
  const all = dimensions.concat(prestige, singleComplex, arrays);
  const multiple = [];

  return {
    all: all.flat(),
    display: [multiple, single],
    upgradeable: [],

    get unlocked() {
      return Autobuyers.all.filter(a => a.isUnlocked || a.isBought);
    },

    get hasAutobuyersForEditModal() {
      return [].some(autobuyer => autobuyer.isUnlocked);
    },

    toggle() {
      player.auto.autobuyersOn = !player.auto.autobuyersOn;
    },

    tick() {
      if (!player.auto.autobuyersOn) return;
      PerformanceStats.start("Autobuyers");

      // The canTick condition must be checked after the previous autobuyer has triggered
      // in order to avoid slow dimension autobuyers.
      for (const autobuyer of Autobuyers.all) {
        if (autobuyer.canTick) autobuyer.tick();
      }

      PerformanceStats.end();
    },

    resetTick(prestigeEvent) {
      const autobuyers = Autobuyers.all.filter(n => n.resetTick !== undefined);
      for (const autobuyer of autobuyers) {
        autobuyer.resetTick(prestigeEvent);
      }
    },

    reset() {
      for (const autobuyer of Autobuyers.all) {
        autobuyer.reset();
      }
    }
  };
}());