export function nameOf(object: unknown): string {
  return object.constructor.name;
}

export function isNullOrUndefined(value: unknown): boolean {
  if (value === null || value === undefined)
    return true;

  return false;

}