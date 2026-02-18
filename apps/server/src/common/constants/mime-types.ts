/**
 * Supported MIME types for file uploads
 */
export const MIME_TYPES = {
  images: {
    png: "image/png",
    jpeg: "image/jpeg",
    jpg: "image/jpg",
    gif: "image/gif",
    webp: "image/webp",
    svg: "image/svg+xml",
  },
  documents: {
    pdf: "application/pdf",
  },
  text: {
    plain: "text/plain",
  },
  audio: {
    mp3: "audio/mpeg",
    wav: "audio/wav",
    ogg: "audio/ogg",
  },
} as const;

export type MimeTypeCategory = keyof typeof MIME_TYPES;
export type MimeType =
  (typeof MIME_TYPES)[MimeTypeCategory][keyof (typeof MIME_TYPES)[MimeTypeCategory]];

export const getAllMimeTypes = (): string[] => {
  return Object.values(MIME_TYPES).flatMap((category) =>
    Object.values(category),
  );
};
