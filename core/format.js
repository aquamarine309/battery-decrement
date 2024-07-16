window.format = function format(value, places = 0, placesUnder1000 = 0) {
  if (Number.isNaN(value)) return "NaN";
  else if (!Number.isFinite(value)) return "无限";
  else if (value < 0) {
    return `-${format(-value)}`;
  }
  
  if (value >= 1000) {
    return value.toFixed(places);
  }
  return value.toFixed(placesUnder1000);
}

window.formatInt = function formatInt(value) {
  return formatWithCommas(value.toFixed(0));
}

window.formatPercents = function formatPercents(value, places, placesUnder1000) {
  return `${format(value * 100, places, placesUnder1000)}%`;
}

window.formatBattery = function formatBattery(value) {
  return formatPercents(value, 2, 3);
}

window.formatX = function formatX(value, places = 0, placesUnder1000 = 0) {
  return `×${format(value, places, placesUnder1000)}`;
}

window.formatPow = function formatPow(value, placesUnder1000 = 0) {
  return `^${format(value, 0, placesUnder1000)}`;
}

window.timeDisplay = function timeDisplay(ms) {
  return TimeSpan.fromMilliseconds(ms).toString();
};

window.timeDisplayNoDecimals = function timeDisplayNoDecimals(ms) {
  return TimeSpan.fromMilliseconds(ms).toStringNoDecimals();
};

window.timeDisplayShort = function timeDisplayShort(ms) {
  return TimeSpan.fromMilliseconds(ms).toStringShort();
};

const commaRegexp = /\B(?=(\d{3})+(?!\d))/gu;
window.formatWithCommas = function formatWithCommas(value) {
  const decimalPointSplit = value.toString().split(".");
  decimalPointSplit[0] = decimalPointSplit[0].replace(commaRegexp, ",");
  return decimalPointSplit.join(".");
};

/**
 * Creates an enumated string, using the oxford comma, such that "a"; "a and b"; "a, b, and c"
 * @param  {string[]} items - an array of items to enumerate
 * @return {string} - a string of {items}, separated by commas and/or and as needed.
 */
window.makeEnumeration = function makeEnumeration(items) {
  if (items.length === 0) return "";
  if (items.length === 1) return items[0];
  if (items.length === 2) return `${items[0]} 和 ${items[1]}`;
  const commaSeparated = items.slice(0, items.length - 1).join("，");
  const last = items[items.length - 1];
  return `${commaSeparated}，和 ${last}`;
};
