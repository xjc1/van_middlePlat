const PROJECT = __PROJECT__ || {};

export function adaptText(str) {
  return PROJECT[str] || str;
}
