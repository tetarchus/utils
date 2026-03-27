// TODO: Add this to @tetarchus/utils to re-use?

/**
 * Logger utility class with prefix.
 */
class Logger {
  /**
   * Prefix to add to logs. Placed between square brackets followed by a colon.
   * e.g.: `[prefix]:`
   */
  #prefix: string;

  constructor(prefix: string) {
    this.#prefix = prefix;
  }

  /**
   * Logs the `messages` to the console using the `type` method.
   * @param type The type of console method to use to log.
   * @param messages The messages to pass to the `console` method.
   */
  #log(type: 'error' | 'info' | 'warn', ...messages: unknown[]): void {
    console[type](`[${this.#prefix}]:`, ...messages);
  }

  /**
   * Creates a new logger, extending the original prefix with the new one.
   * @param prefix The prefix to append.
   * @returns A new child `Logger`.
   *
   * @example
   * const log = new Logger('originalPrefix');
   * const child = log.child('extended'); // => Prefix = `originalPrefix/extended`
   */
  public child(prefix: string): Logger {
    return new Logger(`${this.#prefix}/${prefix}`);
  }

  /**
   * Logs errors to the console with a prefix.
   * @param messages The messages to log.
   */
  public error(...messages: unknown[]): void {
    this.#log('error', ...messages);
  }

  /**
   * Logs info messages to the console with a prefix.
   * @param messages The messages to log.
   */
  public info(...messages: unknown[]): void {
    this.#log('info', ...messages);
  }

  /**
   * Logs warnings to the console with a prefix.
   * @param messages The messages to log.
   */
  warn(...messages: unknown[]): void {
    this.#log('warn', ...messages);
  }
}

export { Logger };
