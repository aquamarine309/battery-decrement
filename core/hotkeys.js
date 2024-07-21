import Mousetrap from "../../modules/mousetrap.js";

import { GameKeyboard } from "./keyboard.js";

// Add your hotkeys and combinations here
// GameKeyboard.bind for single press combinations
// GameKeyboard.bindRepeatable for repeatable combinations
// Hotkeys obey player.options.hotkeys option, and should be everying relating to the functionality of the game itself
// GameKeyboard.bindHotkey for single press hotkeys
// GameKeyboard.bindRepeatableHotkey for repeatable hotkeys
// GameKeyboard class uses Mousetrap under the hood, so for more details visit
// https://craig.is/killing/mice

// Note: mod is a function key helper by Mousetap for both ctrl and command,
// and should be used to provide support for both Windows and Max

// Note: DON'T add repeatables with modifier keys other than shift
// because Mousetrap is crap, and we needed to plug it up to work
// properly with shift, so you will need to plug it up additionally
// for the other modifier keys (#3093).

// Free keys:
// i, j, k, l, n, o, p, q, v, w, x


export const shortcuts = [
  {
    name: "Toggle Autobuyers",
    keys: ["a"],
    type: "bindHotkey",
    function: () => keyboardToggleAutobuyers(),
    visible: true
  }, {
    name: "Save game",
    keys: ["mod", "s"],
    type: "bind",
    function: () => {
      GameStorage.save(false, true);
      return false;
    },
    visible: true
  }, {
    name: "Export game",
    keys: ["mod", "e"],
    type: "bind",
    function: () => {
      GameStorage.export();
      return false;
    },
    visible: true
  }, {
    name: "Modify visible tabs",
    keys: ["tab"],
    type: "bind",
    function: () => {
      keyboardVisibleTabsToggle();
      return false;
    },
    visible: true
  }, {
    name: "Confirm Modal",
    keys: ["enter"],
    type: "bind",
    function: () => {
      EventHub.dispatch(GAME_EVENT.ENTER_PRESSED);
      return true;
    },
    visible: true
  }, {
    name: "Close Modal or open Options",
    keys: ["esc"],
    type: "bind",
    function: () => {
      keyboardPressEscape();
      return false;
    },
    visible: true
  }, {
    name: "Change Tab",
    keys: ["up"],
    type: "bind",
    function: () => {
      EventHub.dispatch(GAME_EVENT.ARROW_KEY_PRESSED, "up");
      return false;
    },
    visible: false
  }, {
    name: "Change Tab",
    keys: ["down"],
    type: "bind",
    function: () => {
      EventHub.dispatch(GAME_EVENT.ARROW_KEY_PRESSED, "down");
      return false;
    },
    visible: false
  }, {
    name: "Change Subtab",
    keys: ["left"],
    type: "bind",
    function: () => {
      EventHub.dispatch(GAME_EVENT.ARROW_KEY_PRESSED, "left");
      return false;
    },
    visible: false
  }, {
    name: "Change Subtab",
    keys: ["right"],
    type: "bind",
    function: () => {
      EventHub.dispatch(GAME_EVENT.ARROW_KEY_PRESSED, "right");
      return false;
    },
    visible: false
  },
  {
    name: "Adjust Autobuyers",
    keys: ["mod", "alt", "a"],
    type: "bind",
    function: () => keyboardEditAutobuyers(),
    visible: () => Autobuyers.hasAutobuyersForEditModal
  },
  {
    name: "Fullscreen",
    keys: ["F10"],
    type: "bind",
    function: () => {},
    visible: () => false
  }
];

for (const hotkey of shortcuts) {
  GameKeyboard[hotkey.type](hotkey.keys.join("+"), hotkey.function);
}

// We need to know whether the player is holding R or not for the replicanti galaxy
// The keydown version is above, with the replicantiGalaxyRequest, as otherwise it would be overridden
GameKeyboard.bind("r", () => setHoldingR(false), "keyup");

// Same thing with Shift; we need to double-up on ctrl-shift as well since they're technically different keybinds
GameKeyboard.bind("shift", () => setShiftKey(true), "keydown");
GameKeyboard.bind("shift", () => setShiftKey(false), "keyup");
GameKeyboard.bind("ctrl+shift", () => setShiftKey(true), "keydown");
GameKeyboard.bind("ctrl+shift", () => setShiftKey(false), "keyup");
GameKeyboard.bind("alt+shift", () => setShiftKey(true), "keydown");
GameKeyboard.bind("alt+shift", () => setShiftKey(false), "keyup");

// Toggle autobuyers
function toggleAutobuyer(buyer) {
  if (buyer.isUnlocked) {
    buyer.toggle();
    GameUI.notify.info(`${buyer.name} Autobuyer toggled ${(buyer.isActive) ? "on" : "off"}`);
  }
  return false;
}

function toggleBuySingles(buyer) {
  if (buyer.isUnlocked && buyer.toggleMode !== null) {
    buyer.toggleMode();
    const bulkName = (buyer.hasUnlimitedBulk) ? "max" : "10";
    GameUI.notify.info(`${buyer.name} Autobuyer set to buy ${(buyer.mode === 1) ? "singles" : bulkName}`);
  }
  return false;
}

function keyboardToggleAutobuyers() {
  if (Tab.automation.isUnlocked) {
    Autobuyers.toggle();
    GameUI.notify.info(`Autobuyers ${player.auto.autobuyersOn ? "resumed" : "paused"}`);
  }
}

function keyboardPressEscape() {
  if (Modal.isOpen) Modal.hideAll();
  else Tab.options.show(true);
}

function keyboardPressQuestionMark() {
  if (Modal.hotkeys.isOpen) {
    EventHub.dispatch(GAME_EVENT.CLOSE_MODAL);
    return;
  }
  if (Modal.isOpen) Modal.hideAll();
  Modal.hotkeys.show();
}

function keyboardH2PToggle() {
  if (Modal.h2p.isOpen) {
    EventHub.dispatch(GAME_EVENT.CLOSE_MODAL);
    return;
  }
  if (Modal.isOpen) Modal.hideAll();
  Modal.h2p.show();
}

function keyboardEditAutobuyers() {
  if (Modal.autobuyerEditModal.isOpen) {
    EventHub.dispatch(GAME_EVENT.CLOSE_MODAL);
    return;
  }
  if (!Autobuyers.hasAutobuyersForEditModal) return;
  if (Modal.isOpen) Modal.hideAll();
  Modal.autobuyerEditModal.show();
}

function keyboardVisibleTabsToggle() {
  if (Modal.hiddenTabs.isOpen) {
    EventHub.dispatch(GAME_EVENT.CLOSE_MODAL);
    return;
  }
  if (Modal.isOpen) Modal.hideAll();
  Modal.hiddenTabs.show();
}

EventHub.logic.on(GAME_EVENT.ARROW_KEY_PRESSED, direction => {
  // Current tabs. Defined here as both tab and subtab movements require knowing your current tab.
  const currentTab = Tabs.current.key;
  if (direction[0] === "up" || direction[0] === "down") {
    // Make an array of the keys of all the unlocked and visible tabs
    const tabs = Tabs.currentUIFormat.flatMap(i => (i.isAvailable ? [i.key] : []));
    // Find the index of the tab we are on
    let top = tabs.indexOf(currentTab);
    // Move in the desired direction
    if (direction[0] === "up") top--;
    else top++;
    // Loop around if needed
    top = (top + tabs.length) % tabs.length;
    // And now we go there.
    Tab[tabs[top]].show(true);
  } else if (direction[0] === "left" || direction[0] === "right") {
    // Current subtabs
    const currentSubtab = Tabs.current._currentSubtab.key;
    // Make an array of the keys of all the unlocked and visible subtabs
    const subtabs = Tabs.current.subtabs.flatMap(i => (i.isAvailable ? [i.key] : []));
    // Find the index of the subtab we are on
    let sub = subtabs.indexOf(currentSubtab);
    // Move in the desired direction
    if (direction[0] === "left") sub--;
    else sub++;
    // Loop around if needed
    sub = (sub + subtabs.length) % subtabs.length;
    // And now we go there.
    Tab[currentTab][subtabs[sub]].show(true);
  }
});

// Remember that Mousetrap handles the backend for GameKeyboard
// Without this, Mousetrap become confused when the "up" key is pressed, as it is the starting key of a sequence
// and an individual key. To allow both the up keybind and the konami code to work, we will change how Mousetrap handles
// all keys so the konami code functions entirely separately from the normal handling.
const originalHandleKey = Mousetrap.prototype.handleKey;
Mousetrap.prototype.handleKey = function(character, modifiers, e) {
  return originalHandleKey.apply(this, [character, modifiers, e]);
};
