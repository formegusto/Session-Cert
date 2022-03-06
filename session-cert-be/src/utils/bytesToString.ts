export function bytesToString(bytes: any): string {
  return String.fromCharCode.apply(null, bytes);
}
