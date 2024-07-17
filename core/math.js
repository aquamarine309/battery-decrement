/**
 * LinearCostScaling is a helper class for costs that scale linearly. If we
 * know the available resources, initial cost, and cost multiplier, we can
 * figure out the maximum amount of purchases, and also the resulting total
 * cost and cost multiplier.
 *
 * i = initial cost
 * m = cost multiplier
 * p = purchases
 * t = total cost
 *
 * t = i * (1 - m^p) / (1 - m)
 * p = floor(log(1 + t * (m - 1) / i) / log(m))
 */
window.LinearCostScaling = class LinearCostScaling {
  /**
   * @param {Number} resourcesAvailable amount of available resources
   * @param {Number} initialCost current cost
   * @param {Number} costMultiplier current cost multiplier
   * @param {Number} maxPurchases max amount of purchases
   * @param {Boolean} free signifies if the purchase is free -> if we only need to consider the last cost
   */
  constructor(resourcesAvailable, initialCost, costMultiplier, maxPurchases = Number.MAX_SAFE_INTEGER, free = false) {
    if (free) {
      this._purchases = Math.clampMax(Math.floor(
        Math.log10(resourcesAvailable / initialCost) /
        Math.log10(costMultiplier) + 1), maxPurchases);
    } else {
      this._purchases = Math.clampMax(Math.floor(
        Math.log10(resourcesAvailable * (costMultiplier - 1) / initialCost + 1) /
        Math.log10(costMultiplier)), maxPurchases);
    }
    this._totalCostMultiplier = Math.pow(costMultiplier, this._purchases);
    if (free) {
      this._totalCost = initialCost * Math.pow(costMultiplier, this._purchases - 1);
    } else {
      this._totalCost = initialCost * (1 - this._totalCostMultiplier) / (1 - costMultiplier);
    }
  }

  get purchases() {
    return this._purchases;
  }

  get totalCostMultiplier() {
    return this._totalCostMultiplier;
  }

  get totalCost() {
    return this._totalCost;
  }
};