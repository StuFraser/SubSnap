const getValidThumbnail = (url: string | undefined): string | null => {
  if (!url) return null;

  // Ignore Reddit placeholder values
  const invalidValues = ["self", "default", "nsfw", "image", ""];
  if (invalidValues.includes(url)) return null;

  // Validate as a proper URL
  try {
    new URL(url); // will throw if invalid
    return url;
  } catch {
    return null;
  }
}

export { getValidThumbnail };