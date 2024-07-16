export const TUTORIAL_STATE = {};

// Tutorial has two ways of moving on, either by Tutorial.moveOn() or by having it's condition be true. This
// is checked by moving on when the NEXT state's condition evaluates to true
const tutorialStates = [];

export const Tutorial = {

  isActive(atState) {
    return player.records.fullGameCompletions === 0 && ui.view.tutorialState === atState && ui.view.tutorialActive;
  },

  // Turns off the visual effect
  turnOffEffect(fromState) {
    if (fromState !== player.tutorialState) return;
    player.tutorialActive = false;
    ui.view.tutorialActive = false;
    // Check if we can immediately enter next tutorial state. This is needed
    // to correctly handle buying dimension 2 + tickspeed in the same tick,
    // for example.
    this.tutorialLoop();
  },

  // Moves on to the next tutorialState, but only if parameter is current state.
  moveOn(fromState) {
    if (fromState !== player.tutorialState) return;
    player.tutorialState++;
    ui.view.tutorialState++;
    player.tutorialActive = true;
    ui.view.tutorialActive = true;
  },

  tutorialLoop() {
    const nextState = tutorialStates.find(o => o.id === player.tutorialState + 1);
    if (nextState && nextState.condition()) this.moveOn(player.tutorialState);
  }
};
