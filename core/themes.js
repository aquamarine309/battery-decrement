import { sha512_256 } from "../modules/sha512.js";

export const Theme = function Theme(name, config) {
  this.name = name;

  this.isDark = function() {
    return this.isDefault() || config.isDark;
  };

  this.isMetro = config.isMetro;

  this.isAnimated = config.isAnimated;

  this.isSecret = config.isSecret;

  this.isDefault = function() {
    return name === "Normal";
  };

  this.isAvailable = function() {
    if (!this.isSecret) return true;
    // Note: match[0] gets the full string of a match, here the initial S and number in a theme name.
    return player.secretUnlocks.themes.some(theme => theme.match(/^S[0-9]*/u)[0] === name);
  };

  this.displayName = function() {
    if (!this.isSecret || !this.isAvailable()) return name;
    // Secret themes are stored as "S9Whatever", so we need to strip the SN part
    return player.secretUnlocks.themes.find(theme => theme.match(/^S[0-9]*/u)[0] === name).replace(/^S[0-9]*/u, "");
  };

  this.set = function() {
    // Remove all entries in the class list from the class list
    document.body.classList.remove(...document.body.classList);

    document.body.classList.add(this.cssClass());
    if (this.isMetro) document.body.classList.add("s-base--metro");
    if (this.isDark()) document.body.classList.add("s-base--dark");

    if (this.isAnimated && player.options.animations.background) {
      document.getElementById("background-animations").style.display = "block";
    } else {
      document.getElementById("background-animations").style.display = "none";
    }
    player.options.theme = name;
    ui.view.theme = name;
    window.getSelection().removeAllRanges();
  };

  this.cssClass = function() {
    return `t-${this.name.replace(/\s+/gu, "-").toLowerCase()}`;
  };
};

Theme.currentName = function() {
  return player.options.theme
};

Theme.current = function() {
  return Themes.find(Theme.currentName());
};

Theme.set = function(name) {
  const theme = Themes.find(name);
  theme.set();
  return theme;
};

Theme.secretThemeIndex = function(name) {
  const secretThemes = [];
  const sha = sha512_256(name.toUpperCase());
  return secretThemes.indexOf(sha);
};

Theme.isSecretTheme = function(name) {
  return Theme.secretThemeIndex(name) !== -1;
};

Theme.animatedThemeUnlocked = function() {
  return Themes.all.some(theme => theme.isAvailable && theme.isAnimated);
};

Theme.tryUnlock = function(name) {
  const index = Theme.secretThemeIndex(name);
  if (index === -1) {
    return false;
  }
  const prefix = `S${index + 1}`;
  const fullName = prefix + name.capitalize();
  const isAlreadyUnlocked = player.secretUnlocks.themes.has(fullName);
  player.secretUnlocks.themes.add(fullName);
  Theme.set(prefix);
  if (!isAlreadyUnlocked) {
    GameUI.notify.success(`You have unlocked the ${name.capitalize()} theme!`, 5000);
    if (Theme.current().isAnimated) {
      setTimeout(Modal.message.show(`This secret theme has animations. If they are giving you performance issues,
        you can turn them off in the Options/Visual tab to reduce lag.`), 100);
    }
  }
  return true;
};

Theme.create = function(name, settings) {
  const config = {
    isDark: false || settings.dark,
    isMetro: false || settings.metro,
    isAnimated: false || settings.animated,
    isSecret: false || settings.secret,
  };
  return new Theme(name, config);
};

export const Themes = {
  all: [
    /* eslint-disable no-multi-spaces */
    // Note that "Normal" is a special case where dark is overridden elsewhere with whether or not the UI is Modern
    Theme.create("Normal",          {                                                         }),
    Theme.create("Metro",           {              metro: true,                               }),
    Theme.create("Dark",            { dark: true,                                             }),
    Theme.create("Dark Metro",      { dark: true,  metro: true,                               }),
    Theme.create("Inverted",        {                                                         }),
    Theme.create("Inverted Metro",  {              metro: true,                               }),
    Theme.create("AMOLED",          { dark: true,                                             }),
    Theme.create("AMOLED Metro",    { dark: true,  metro: true,                               }),
    /* eslint-enable no-multi-spaces */
  ],

  available() {
    return Themes.all
      .filter(theme => theme.isAvailable());
  },

  find(name) {
    return Themes.all
      .find(theme => theme.name === name);
  }
};
