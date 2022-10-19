export function get8caracters(str: string) {
  if (str.length > 8) {
    return str.substring(0, 8);
  }

  if (str.length < 8) {
    return str.padStart(8, '0');
  }

  return str;
}
