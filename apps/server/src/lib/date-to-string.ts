export function dateToString<T extends Record<any, unknown>>(
  obj: T,
): { [K in keyof T]: T[K] extends Date ? string : T[K] } {
  const result = {} as any;

  for (const key in obj) {
    const value = obj[key];

    result[key] =
      typeof value === 'object' && value !== null && value instanceof Date
        ? value.toISOString()
        : value;
  }

  return result;
}
