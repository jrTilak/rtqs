/**
 * Helper function to check if an object is empty
 * @param obj - Object to check
 * @returns true if object is empty, false otherwise
 */
export function isEmptyObject(obj: unknown): boolean {
  return (
    typeof obj === "object" &&
    obj !== null &&
    !Array.isArray(obj) &&
    Object.keys(obj).length === 0
  );
}
