import { Injectable, Logger as L, LogLevel } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

type LogLevelWithInfo = LogLevel | 'info';

/**
 * Log levels ordered by severity, where lower number means higher priority.
 */
const LEVELS_SEVERITY: Record<LogLevelWithInfo, number> = {
  /**
   * Critical errors causing application shutdown or data loss.
   */
  fatal: 0,

  /**
   * Runtime errors or unexpected conditions that need immediate attention.
   */
  error: 1,

  /**
   * Potential issues or important events that aren’t errors but might cause problems.
   */
  warn: 2,

  /**
   * General operational messages to track the flow of the application.
   */
  info: 3,

  /**
   * Normal log messages for routine events (often similar to info, less formal).
   */
  log: 4,

  /**
   * Detailed diagnostic information useful for debugging during development.
   */
  debug: 5,

  /**
   * Highly detailed logs with maximum granularity, often very noisy.
   */
  verbose: 6,
};

/**
 * Custom Logger extending NestJS Logger.
 * Adds file-based logging with daily and hourly log files,
 * supports hierarchical log levels including 'fatal' and 'info',
 * and respects log level filtering.
 */

@Injectable()
class Logger extends L {
  /**
   * Creates a new Logger instance.
   */
  constructor(context: string) {
    super(context, { timestamp: true });
  }

  /** PRIVATE METHODS */

  /**
   *  Gets the current log level from the environment variable. `LOG_LEVEL` or defaults to 'log' if not set.
   */
  private _getLogLevel(): LogLevelWithInfo {
    const envLogLevel = (
      process.env.LOG_LEVEL || ''
    ).toLowerCase() as LogLevelWithInfo;
    const validLevels = Object.keys(LEVELS_SEVERITY) as LogLevelWithInfo[];

    if (validLevels.includes(envLogLevel)) {
      return envLogLevel;
    } else {
      return 'log';
    }
  }

  /**
   * Parses the message to a string. If the message is an object, it will be stringified.
   */
  private _parseMessageToString(message: unknown): string {
    if (message === null) return 'null';
    if (message === undefined) return 'undefined';
    if (typeof message === 'string') return message;
    try {
      return JSON.stringify(message, null, 2);
    } catch {
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      return String(message);
    }
  }

  /**
   * Checks if the given log level is enabled for current logging level based on hierarchical log levels.
   * 'info' is always enabled.
   */
  private _isLevelEnabled(level: LogLevelWithInfo): boolean {
    const currentLevel = this._getLogLevel();
    const currentLevelSeverity = LEVELS_SEVERITY[currentLevel];
    const messageLevelSeverity = LEVELS_SEVERITY[level];

    if (
      currentLevelSeverity === undefined ||
      messageLevelSeverity === undefined
    ) {
      return false;
    }

    // Log if message severity is equal or higher priority (lower number)
    return messageLevelSeverity <= currentLevelSeverity;
  }

  /**
   * Ensures the directory exists, creating it if necessary.
   */
  private _ensureDir(dirPath: string): void {
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }
  }

  /**
   * Writes the log message to a file. Log files are created daily and hourly.
   * Folder Hierarchy: .logs/{date}/{context}/{hour}.log
   * Example: .logs/2024-01-01/WorkspaceController/00-01.log
   */
  private _writeToFile(
    level: LogLevelWithInfo,
    message: unknown,
    context?: string,
  ): void {
    const now = new Date();
    const date = now.toISOString().slice(0, 10);
    const hour = now.getHours();
    const nextHour = (hour + 1) % 24;
    const hourRange = `${hour.toString().padStart(2, '0')}-${nextHour.toString().padStart(2, '0')}`;

    const moduleName = context || this.context || 'Unknown';
    const baseDir = path.resolve(`.logs/${date}/${moduleName}`);
    const filePath = path.join(baseDir, `${hourRange}.log`);

    this._ensureDir(baseDir);

    const timeString = now.toLocaleString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: 'numeric',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    });

    const pid = process.pid;
    const logEntry = `[Nest] ${pid} ${level.toUpperCase()}  - ${timeString}   [${moduleName}] ${this._parseMessageToString(message)}\n`;

    fs.appendFile(filePath, logEntry, (err) => {
      if (err) {
        super.error(
          `Failed to write log to file: ${filePath}`,
          err.message,
          'FileLogger',
        );
      }
    });
  }

  /** PUBLIC METHODS */

  override log(message: unknown, context?: string): void {
    if (this._isLevelEnabled('log')) {
      super.log(message, context);
      this._writeToFile('log', message, context);
    }
  }

  info(message: unknown, context?: string): void {
    if (this._isLevelEnabled('info')) {
      super.log(message, context);
      this._writeToFile('info', message, context);
    }
  }

  override error(message: unknown, trace?: string, context?: string): void {
    if (this._isLevelEnabled('error')) {
      super.error(message, trace, context);
      this._writeToFile('error', message, context);
    }
  }

  override warn(message: unknown, context?: string): void {
    if (this._isLevelEnabled('warn')) {
      super.warn(message, context);
      this._writeToFile('warn', message, context);
    }
  }

  override debug(message: unknown, context?: string): void {
    if (this._isLevelEnabled('debug')) {
      super.debug(message, context);
      this._writeToFile('debug', message, context);
    }
  }

  override verbose(message: unknown, context?: string): void {
    if (this._isLevelEnabled('verbose')) {
      super.verbose(message, context);
      this._writeToFile('verbose', message, context);
    }
  }

  override fatal(message: unknown, context?: string): void {
    if (this._isLevelEnabled('fatal')) {
      super.error(message, undefined, context);
      this._writeToFile('fatal', message, context);
    }
  }
}

const logger = new Logger('Default');
export { logger, Logger };
