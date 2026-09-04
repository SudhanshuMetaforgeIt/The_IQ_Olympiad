import { BadRequestException } from '@nestjs/common';
import type { MulterOptions } from '@nestjs/platform-express/multer/interfaces/multer-options.interface.js';
import { mkdirSync } from 'node:fs';
import { unlink } from 'node:fs/promises';
import { basename, join } from 'node:path';
import { randomUUID } from 'node:crypto';
import multer from 'multer';

export const PROFILE_PHOTO_MAX_BYTES = 5 * 1024 * 1024;
export const PROFILE_PHOTO_FIELD = 'photo';
export const PROFILE_PHOTO_PUBLIC_PREFIX = '/uploads/profile-photos';

const MIME_TO_EXTENSION = {
  'image/jpeg': 'jpg',
  'image/png': 'png',
  'image/webp': 'webp',
} as const;

export type AllowedProfilePhotoMime = keyof typeof MIME_TO_EXTENSION;

export function getUploadsRoot(): string {
  return process.env.UPLOADS_DIR?.trim() || join(process.cwd(), 'uploads');
}

export function getProfilePhotoDirectory(): string {
  return join(getUploadsRoot(), 'profile-photos');
}

export function toProfilePhotoPublicUrl(filename: string): string {
  return `${PROFILE_PHOTO_PUBLIC_PREFIX}/${filename}`;
}

export function isAllowedProfilePhotoMime(
  mime: string,
): mime is AllowedProfilePhotoMime {
  return mime in MIME_TO_EXTENSION;
}

export function ensureProfilePhotoDirectory(): string {
  const directory = getProfilePhotoDirectory();
  mkdirSync(directory, { recursive: true });
  return directory;
}

/**
 * Local-disk Multer options. Swap this factory (not the API route) when moving to S3.
 */
export function createProfilePhotoMulterOptions(): MulterOptions {
  return {
    storage: multer.diskStorage({
      destination: (_request, _file, callback) => {
        try {
          callback(null, ensureProfilePhotoDirectory());
        } catch (error) {
          callback(
            error instanceof Error ? error : new Error('Unable to store photo'),
            '',
          );
        }
      },
      filename: (_request, file, callback) => {
        const extension = isAllowedProfilePhotoMime(file.mimetype)
          ? MIME_TO_EXTENSION[file.mimetype]
          : 'bin';
        callback(null, `${randomUUID()}.${extension}`);
      },
    }),
    limits: {
      fileSize: PROFILE_PHOTO_MAX_BYTES,
      files: 1,
    },
    fileFilter: (_request, file, callback) => {
      if (!isAllowedProfilePhotoMime(file.mimetype)) {
        callback(
          new BadRequestException(
            'photo must be a JPEG, PNG, or WebP image',
          ),
          false,
        );
        return;
      }
      callback(null, true);
    },
  };
}

export async function deleteLocalProfilePhoto(
  profilePhoto: string | null | undefined,
): Promise<void> {
  if (!profilePhoto?.startsWith(`${PROFILE_PHOTO_PUBLIC_PREFIX}/`)) {
    return;
  }

  const filename = basename(profilePhoto);
  if (!filename || filename === '.' || filename.includes('..')) {
    return;
  }

  await unlink(join(getProfilePhotoDirectory(), filename)).catch(() => {
    // Missing files are not an upload failure.
  });
}
