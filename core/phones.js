import FullScreenAnimationHandler from "./full-screen-animation-handler.js";

export function changePhoneAnimation() {
  FullScreenAnimationHandler.display("a-implode", 2);
}

export function manualChangePhoneResetRequest() {
  if (!Player.canChange) return;
  // We show the modal under two conditions - on the first ever infinity (to explain the mechanic) and
  // post-break (to show total IP and infinities gained)
  if (player.options.confirmations.changePhone && !PlayerProgress.phoneUnlocked()) {
    Modal.changePhone.show();
  } else {
    changePhoneResetRequest();
  }
}

export function changePhoneResetRequest(disableAnimation = false) {
  if (!Player.canCrunch) return;
  if (!disableAnimation && player.options.animations.changePhone && !FullScreenAnimationHandler.isDisplaying) {
    changePhoneAnimation();
    setTimeout(changePhoneReset, 1000);
  } else {
    changePhoneReset();
  }
}

export function changePhoneReset(forced = false) {
  if (!forced && !Player.canChange) return;

  if (Player.canChange) {
    EventHub.dispatch(GAME_EVENT.CHANGE_PHONE_BEFORE);
    changePhoneGiveRewards();
  }

  changePhoneResetValues();
  EventHub.dispatch(GAME_EVENT.CHANGE_PHONE_AFTER);
}

function changePhoneGiveRewards() {
  changePhoneUpdateStatistics();

  const uselessPhones = gainedUselessPhones();
  Currency.uselessPhones.add(uselessPhones);
  Currency.changing.add(Math.round(gainedChanging()));

  changePhoneTabChange(!PlayerProgress.phoneUnlocked());
}

function changePhoneUpdateStatistics() {
  player.records.bestPhone.bestPhoneMin =
    player.records.bestPhone.bestPhoneMin.clampMin(player.records.thisPhone.bestPhoneMin);
  player.records.thisPhone.bestIPmin = 0;

  const infinityPoints = gainedPhones();

  addPhoneTime(
    player.records.thisPhone.time,
    player.records.thisPhone.realTime,
    infinityPoints,
    Math.round(gainedChanging())
  );

  player.records.bestPhone.time =
    Math.min(player.records.bestPhone.time, player.records.thisPhone.time);
  player.records.bestPhone.realTime =
    Math.min(player.records.bestPhone.realTime, player.records.thisPhone.realTime);
}

function changePhoneTabChange(firstPhone) {
  const earlyGame = player.records.bestPhone.time > 60000;
  const inAntimatterChallenge = Player.isInAntimatterChallenge;
  handleChallengeCompletion();

  if (firstPhone) {
    Tab.phone.upgrades.show();
  } else if (earlyGame) {
    Tab.apps.apps.show();
  }
}

export function changePhoneResetValues() {
  firstSoftReset();
}

export function firstSoftReset(enteringAntimatterChallenge) {
  Currency.battery.reset();
  Apps.allWithoutPhone.forEach(a => a.resetAmount());
  Player.resetRequirements("phone");
  Phone.active = false;
}

export function gainedPhones() {
  return 1;
}

export function gainedChanging() {
  return 1;
}