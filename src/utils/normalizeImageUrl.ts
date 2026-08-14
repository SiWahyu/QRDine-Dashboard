export function normalizeImageUrl(url: string): string {
  return url.replace(/^\/storage\/(https?:\/\/)/, "$1");
}
