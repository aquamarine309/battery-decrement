window.EventHub = class EventHub {
  constructor() {
    this._handlers = {};
  }

  on(event, fn, target) {
    let handlers = this._handlers[event];
    if (handlers === undefined) {
      handlers = [];
      this._handlers[event] = handlers;
    }
    handlers.push({ fn, target });
  }

  offAll(target) {
    for (const handlers of Object.keys(this._handlers)) {
      this._handlers[handlers] = this._handlers[handlers]
        .filter(handler => handler.target !== target);
    }
  }

  dispatch(event, args) {
    const handlers = this._handlers[event];
    if (handlers === undefined) return;
    for (const handler of handlers) {
      handler.fn(args);
    }
  }

  static dispatch(event, ...args) {
    EventHub.logic.dispatch(event, args);
    GameUI.dispatch(event, args);
  }

  static get stats() {
    // For debug/profiling purposes
    function countHandlers(eventHub) {
      return Object.values(eventHub._handlers)
        .map(handlers => handlers.length)
        .sum();
    }
    return `UI(UPDATE/Total): ${EventHub.ui._handlers[GAME_EVENT.UPDATE].length}/${countHandlers(EventHub.ui)}; ` +
      `Logic(Total): ${countHandlers(EventHub.logic)}`;
  }
};

EventHub.logic = new EventHub();
EventHub.ui = new EventHub();

window.GAME_EVENT = {
  // Ticks
  GAME_TICK_BEFORE: "GAME_TICK_BEFORE",
  GAME_TICK_AFTER: "GAME_TICK_AFTER",

  // Other
  GAME_LOAD: "GAME_LOAD",
  OFFLINE_CURRENCY_GAINED: "OFFLINE_CURRENCY_GAINED",
  SAVE_CONVERTED_FROM_PREVIOUS_VERSION: "SAVE_CONVERTED_FROM_PREVIOUS_VERSION",

  // Used by events to signify that they are triggered by a particular
  // event, not handled by the event hub
  ACHIEVEMENT_EVENT_OTHER: "ACHIEVEMENT_EVENT_OTHER",

  ENTER_PRESSED: "ENTER_PRESSED",
  ARROW_KEY_PRESSED: "ARROW_KEY_PRESSED",

  // UI Events
  UPDATE: "UPDATE",
  TAB_CHANGED: "TAB_CHANGED",
  CLOSE_MODAL: "CLOSE_MODAL",
  OVERLAY_UPDATE: "OVERLAY_UPDATE",
  CLICK_SCREEN: "CLICK_SCREEN",
  KEYBOARD_CHANGE: "KEYBOARD_CHANGE"
};

window.onresize = () => EventHub.ui.dispatch(GAME_EVENT.KEYBOARD_CHANGE);