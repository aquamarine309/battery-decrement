export const DeltaTimeState = {
  deltaTime: new TimeSpan(0),
  unscaledDeltaTime: new TimeSpan(0),
  update(deltaTime, gameDeltaTime) {
    this.unscaledDeltaTime = TimeSpan.fromMilliseconds(deltaTime);
    this.deltaTime = TimeSpan.fromMilliseconds(gameDeltaTime);
  }
};

export const Time = {
  /**
   * @param {Function} getValue
   * @returns {TimeSpan}
   */
  fromMilliseconds(getValue) {
    return TimeSpan.fromMilliseconds(getValue());
  },
  /**
   * @param {TimeSpan} timespan
   * @param {Function} setValue
   */
  toMilliseconds(timespan, setValue) {
    Guard.isTimeSpan(timespan);
    setValue(timespan.totalMilliseconds);
  },
  /**
   * Returns a string indicating the current date and time of day, as indicated by a Date.now() timestamp. After
   * regex formatting, this gives a string resembling "[month] [day] [year] HH:MM:SS"
   * @param {number} timestamp
   * @returns {string}
   */
  toDateTimeString(timestamp) {
    return new Date(timestamp).toString().replace(/^.{4}(.*:..:..).*$/u, "$1");
  },

  /**
   * Frame delta time
   * @returns {TimeSpan}
   */
  get deltaTimeFull() {
    return DeltaTimeState.deltaTime;
  },
  /**
   * Frame delta time in seconds
   * @returns {number}
   */
  get deltaTime() {
    return this.deltaTimeFull.totalSeconds;
  },
  /**
   * Frame delta time in ms
   * @returns {number}
   */
  get deltaTimeMs() {
    return this.deltaTimeFull.totalMilliseconds;
  },
  /**
   * Frame delta time, but without EC12 or black hole effects
   * @returns {TimeSpan}
   */
  get unscaledDeltaTime() {
    return DeltaTimeState.unscaledDeltaTime;
  },

  /**
   * @returns {TimeSpan}
   */
  get totalTimePlayed() {
    return this.fromMilliseconds(() => player.records.totalTimePlayed);
  },
  /**
   * @param {TimeSpan} timespan
   */
  set totalTimePlayed(timespan) {
    this.toMilliseconds(timespan, value => player.records.totalTimePlayed = value);
  },
};
