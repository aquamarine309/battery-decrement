import { GameMechanicState, RebuyableMechanicState } from "./game-mechanics/index.js";

class AppState extends RebuyableMechanicState {
  get currency() {
    return Currency.battery;
  }
  
  get isApp() {
    return true;
  }
  
  get boughtAmount() {
    return player.apps[this.id]
  }
  
  set boughtAmount(value) {
    player.apps[this.id] = value;
  }
  
  get isUnlocked() {
    return Apps.unlocked > this.id;
  }
  
  get isEffectActive() {
    return this.isUnlocked;
  }
  
  onPurchased() {
    Apps._batteryPerSecond.invalidate();
  }
  
  get isSuperenergy() {
    return this.id === Apps.superenergyAppAt;
  }
  
  get multiplier() {
    return Apps.superenergyAppEffect / (Apps.lowBattery ? this.id + 2 : 1);
  }
  
  get singleEffect() {
    return this.config.singleEffect * this.multiplier;
  }
  
  get effectValue() {
    return this.singleEffect * this.boughtAmount;
  }
  
  get isAvaliableForPurchase() {
    return this.isUnlocked;
  }
  
  buyMax() {
    if (!this.canBeBought) return false;
    const costScaling = new LinearCostScaling(
      1 - Currency.battery.value,
      this.config.initialCost,
      this.config.costMult
    );

    if (costScaling.purchases <= 0) return false;
    
    Currency.battery.add(costScaling.totalCost);
    this.boughtAmount += costScaling.purchases;
    this.onPurchased();
    return true;
  }
}

class PhoneState extends GameMechanicState {
  constructor() {
    super({});
  }
  
  get isEffectActive() {
    return this.isActive;
  }
  
  get isActive() {
    return player.phoneActive;
  }
  
  activate() {
    if (this.isActive) return;
    player.phoneActive = true;
    Apps._batteryPerSecond.invalidate();
  }
  
  get effectValue() {
    return 0.0001;
  }
  
  get isCustomEffect() { return true; }
}

export const Phone = new PhoneState();

export const App = AppState.createAccessor(GameDatabase.apps);

export const Apps = {
  all: App.index.concat(Phone),
  
  allWithoutPhone: App.index,
  
  tick(diff) {
    if (Player.canChange) return;
    const lowBattery =this.lowBattery;
    Currency.battery.subtract(this.batteryPerSecond * diff);
    if (Player.canChange) {
      Currency.battery.bumpTo(0);
    }
    if (this.lowBattery !== lowBattery) this._batteryPerSecond.invalidate();
  },
  
  get unlocked() {
    return player.unlockedApps;
  },
  
  set unlocked(value) {
    player.unlockedApps = value;
  },
  
  get cost() {
    return [0.995, 0.9, 0.7, 0.4, 0.15, 0][this.unlocked];
  },
  
  get isAffordable() {
    return Currency.battery.lte(this.cost);
  },
  
  get isCapped() {
    return this.unlocked >= this.cap;
  },
  
  get isAvaliableForPurchase() {
    return this.isAffordable && !this.isCapped;
  },
  
  download() {
    if (!this.isAvaliableForPurchase) return false;
    this.unlocked++;
    Currency.battery.reset();
    this.allWithoutPhone.map(upg => upg.resetAmount());
    this._batteryPerSecond.invalidate();
  },
  
  get multPerApp() {
    return 0.9;
  },
  
  get multToSpeed() {
    return Math.pow(this.multPerApp, this.unlocked);
  },
  
  _batteryPerSecond: new Lazy(() => Effects.sum(...Apps.all)),
  
  get batteryPerSecond() {
    return this._batteryPerSecond.value;
  },
  
  get cap() {
    return 5;
  },
  
  get lowBatteryThreshold() {
    return 0.2;
  },
  
  get lowBattery() {
    return Currency.battery.lte(this.lowBatteryThreshold);
  },
  
  get superenergyAppAt() {
    return 4;
  },
  
  get superenergyApp() {
    return App(this.superenergyAppAt);
  },
  
  get superenergyAppEffect() {
    return this.superenergyApp.isUnlocked ? Math.pow(2, this.superenergyApp.boughtAmount + 1) : 1;
  }
}

export function maxAll() {
  for (const app of Apps.allWithoutPhone.toReversed()) {
    app.buyMax();
  }
}