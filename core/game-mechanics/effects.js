export const Effects = {
  /**
   * @param effectSources
   * @return {Number}
   */
  sum(...effectSources) {
    let result = 0;
    applyEffectsOf(effectSources, v => result += v);
    return result;
  },
  /**
   * @param effectSources
   * @return {Number}
   */
  product(...effectSources) {
    let result = 1;
    applyEffectsOf(effectSources, v => result *= v);
    return result;
  },
  /**
   * @param {Number} defaultValue
   * @param effectSources
   * @return {Number}
   */
  last(defaultValue, ...effectSources) {
    let result = defaultValue;
    let foundLast = false;
    const reversedSources = effectSources
      .filter(s => s !== null && s !== undefined)
      .reverse();
    const reducer = v => {
      result = v;
      foundLast = true;
    };
    for (const effectSource of reversedSources) {
      effectSource.applyEffect(reducer);
      if (foundLast) break;
    }
    return result;
  },
  /**
   * @param {Number} defaultValue
   * @param effectSources
   * @return {Number}
   */
  max(defaultValue, ...effectSources) {
    let result = defaultValue;
    applyEffectsOf(effectSources, v => result = Math.max(result, v));
    return result;
  },
  /**
   * @param {Number} defaultValue
   * @param effectSources
   * @return {Number}
   */
  min(defaultValue, ...effectSources) {
    let result = defaultValue;
    applyEffectsOf(effectSources, v => result = Math.min(result, v));
    return result;
  }
};

function applyEffectsOf(effectSources, applyFn) {
  for (const effectSource of effectSources) {
    if (effectSource !== null && effectSource !== undefined) effectSource.applyEffect(applyFn);
  }
}
