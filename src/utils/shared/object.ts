export function isSameObject(
  obj1: Record<string, any>,
  obj2: Record<string, any>,
) {
  if (Object.keys(obj1).length !== Object.keys({ ...obj1, ...obj2 }).length) {
    return false;
  }
  for (const key in obj1) {
    if (obj1[key] !== obj2[key]) {
      return false;
    }
  }
  return true;
}
