export function nameOf(object: unknown): string {
  return object.constructor.name;
}
