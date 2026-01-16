import { dirname, join } from 'node:path';
import { fileURLToPath, URL } from 'node:url';

import { describe, expect, it } from 'vitest';

import { findUp, findUpSync } from '../../server';

const pwd = dirname(fileURLToPath(import.meta.url));
const basePath = join(pwd, '../../../');

const files = {
  license: 'LICENSE',
  nonExistent: 'does-not-exist',
  srcDir: 'src',
};

const licensePath = join(basePath, files.license);

describe('FindUp Util Tests', () => {
  describe(findUp, () => {
    it('finds file with default options', async () => {
      expect.assertions(1);
      const result = await findUp(files.license);
      expect(result).toBe(licensePath);
    });

    it('handles URL paths', async () => {
      expect.assertions(1);
      const result = await findUp(files.license, { cwd: new URL(import.meta.url) });
      expect(result).toBe(licensePath);
    });

    it('handles absolute files', async () => {
      expect.assertions(1);
      const result = await findUp(licensePath);
      expect(result).toBe(licensePath);
    });

    it('handles non-existent files', async () => {
      expect.assertions(1);
      const result = await findUp(files.nonExistent);
      expect(result).toBeUndefined();
    });

    it('handles directory search', async () => {
      expect.assertions(1);
      const result = await findUp(files.srcDir, { type: 'directory' });
      expect(result).toBe(join(basePath, files.srcDir));
    });
  });

  describe(findUpSync, () => {
    it('finds file with default options', () => {
      expect.assertions(1);
      const result = findUpSync(files.license);
      expect(result).toBe(licensePath);
    });

    it('handles URL paths', () => {
      expect.assertions(1);
      const result = findUpSync(files.license, { cwd: new URL(import.meta.url) });
      expect(result).toBe(licensePath);
    });

    it('handles absolute files', () => {
      expect.assertions(1);
      const result = findUpSync(licensePath);
      expect(result).toBe(licensePath);
    });

    it('handles non-existent files', () => {
      expect.assertions(1);
      const result = findUpSync(files.nonExistent);
      expect(result).toBeUndefined();
    });

    it('handles directory search', () => {
      expect.assertions(1);
      const result = findUpSync(files.srcDir, { type: 'directory' });
      expect(result).toBe(join(basePath, files.srcDir));
    });
  });
});
