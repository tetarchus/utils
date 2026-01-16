import process from 'node:process';
import fsPromises from 'node:fs/promises';
import { fileURLToPath, URL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

/** Return value of common function. */
type FindUpCommon = {
  /** Whether the `name` value is absolute. */
  isAbsoluteName: boolean;
  /** The path to the root directory. */
  root: string;
  /** The path to the directory to start searching from. */
  startDir: string;
  /** Path to the directory to stop searching at. */
  stopAt: string;
  /** The type of file to find. */
  type: 'directory' | 'file';
};

/** Options to pass in to the findUp functions. */
type FindUpOptions = {
  /**
   * The directory to start from
   * @default process.cwd()
   */
  readonly cwd?: URL | string;
  /**
   * A directory path where the search halts if no matches have been found.
   * @default Root Directory
   */
  readonly stopAt?: URL | string;
  /**
   * The type of path to match.
   * @default 'file'
   */
  readonly type?: FindUpCommon['type'];
};

/**
 * Converts a resource path to a string.
 * @param urlOrPath A file locator that may either be a URL or a path string.
 * @returns The path string representing the `urlOrPath` value.
 */
const toPath = (urlOrPath: URL | string): string =>
  urlOrPath instanceof URL ? fileURLToPath(urlOrPath) : urlOrPath;

/**
 * Creates common values that are used across sync/async functions.
 * @param name The name of the directory/file to locate.
 * @param options Options to generate the common values from.
 * @returns An object containing values that are used across the findUp functions.
 */
const common = (
  name: string,
  { cwd = process.cwd(), stopAt: stopDir, type = 'file' }: FindUpOptions = {},
): FindUpCommon => {
  const directory = path.resolve(toPath(cwd));
  const { root } = path.parse(directory);
  const stopAt = path.resolve(directory, toPath(stopDir ?? root));
  const isAbsoluteName = path.isAbsolute(name);

  return { isAbsoluteName, root, startDir: directory, stopAt, type };
};

/**
 * Searches for the given file asynchronously.
 * @param name The name of the directory/file to locate.
 * @param options Options to use when finding the directory/file.
 * @returns The path to the found directory/file.
 */
const findUp = async (name: string, options?: FindUpOptions): Promise<string | undefined> => {
  const { isAbsoluteName, root, startDir, stopAt, type } = common(name, options);
  let directory = startDir;

  while (directory) {
    const filePath = isAbsoluteName ? name : path.join(directory, name);
    try {
      const stats = await fsPromises.stat(filePath);
      if ((type === 'file' && stats.isFile()) || (type === 'directory' && stats.isDirectory())) {
        return filePath;
      }
    } catch {}

    if (directory === stopAt || directory === root) {
      break;
    }

    directory = path.dirname(directory);
  }
};

/**
 * Searches for the given file synchronously.
 * @param name The name of the directory/file to locate.
 * @param options Options to use when finding the directory/file.
 * @returns The path to the found directory/file.
 */
const findUpSync = (name: string, options?: FindUpOptions): string | undefined => {
  const { isAbsoluteName, root, startDir, stopAt, type } = common(name, options);
  let directory = startDir;

  while (directory) {
    const filePath = isAbsoluteName ? name : path.join(directory, name);

    try {
      const stats = fs.statSync(filePath, { throwIfNoEntry: false });
      if ((type === 'file' && stats?.isFile()) || (type === 'directory' && stats?.isDirectory())) {
        return filePath;
      }
    } catch {}

    if (directory === stopAt || directory === root) {
      break;
    }

    directory = path.dirname(directory);
  }
};

export { findUp, findUpSync };
