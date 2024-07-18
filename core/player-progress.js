export class PlayerProgress {
  constructor(player) {
    this._player = player;
  }

  get hasFullCompletion() {
    return this._player.records?.fullGameCompletions > 0;
  }
  
  get isPhoneUnlocked() {
    return player.changing > 0;
  }

  static get current() {
    return new PlayerProgress(player);
  }

  static of(player) {
    return new PlayerProgress(player);
  }
  
  static phoneUnlocked() {
    return this.current.isPhoneUnlocked;
  }
}
