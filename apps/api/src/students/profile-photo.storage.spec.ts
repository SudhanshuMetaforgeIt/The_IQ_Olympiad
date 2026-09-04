import { existsSync, mkdirSync } from 'node:fs';
import { mkdtemp, writeFile } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, beforeEach, describe, expect, it } from 'vitest';

import {
  createProfilePhotoMulterOptions,
  deleteLocalProfilePhoto,
  isAllowedProfilePhotoMime,
  toProfilePhotoPublicUrl,
} from './profile-photo.storage.js';

describe('profile-photo.storage', () => {
  const originalUploadsDir = process.env.UPLOADS_DIR;

  beforeEach(() => {
    process.env.NODE_ENV = 'test';
  });

  afterEach(() => {
    if (originalUploadsDir === undefined) {
      delete process.env.UPLOADS_DIR;
    } else {
      process.env.UPLOADS_DIR = originalUploadsDir;
    }
  });

  it('maps a unique filename to the public uploads URL', () => {
    expect(toProfilePhotoPublicUrl('abc123.webp')).toBe(
      '/uploads/profile-photos/abc123.webp',
    );
  });

  it('accepts only jpeg, png, and webp mime types', () => {
    expect(isAllowedProfilePhotoMime('image/jpeg')).toBe(true);
    expect(isAllowedProfilePhotoMime('image/png')).toBe(true);
    expect(isAllowedProfilePhotoMime('image/webp')).toBe(true);
    expect(isAllowedProfilePhotoMime('image/gif')).toBe(false);
    expect(isAllowedProfilePhotoMime('application/pdf')).toBe(false);
  });

  it('rejects disallowed mime types in the multer file filter', () => {
    const options = createProfilePhotoMulterOptions();
    expect(options.fileFilter).toBeTypeOf('function');

    let accepted: boolean | undefined;
    let error: unknown;
    options.fileFilter?.(
      {} as never,
      { mimetype: 'image/gif' } as never,
      ((err: Error | null, allow?: boolean) => {
        error = err;
        accepted = allow;
      }) as never,
    );

    expect(accepted).toBe(false);
    expect(error).toBeInstanceOf(Error);
    expect((error as Error).message).toContain('JPEG, PNG, or WebP');
  });

  it('deletes a local profile photo and ignores remote URLs', async () => {
    const uploadsRoot = await mkdtemp(join(tmpdir(), 'iq-profile-photos-'));
    process.env.UPLOADS_DIR = uploadsRoot;
    const filename = 'replace-me.webp';
    const directory = join(uploadsRoot, 'profile-photos');
    mkdirSync(directory, { recursive: true });
    const filePath = join(directory, filename);
    await writeFile(filePath, 'fake-image');

    await deleteLocalProfilePhoto('/uploads/profile-photos/replace-me.webp');
    expect(existsSync(filePath)).toBe(false);

    await expect(
      deleteLocalProfilePhoto('https://cdn.example.com/photos/a.webp'),
    ).resolves.toBeUndefined();
  });
});
