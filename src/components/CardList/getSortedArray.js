export const getValueByPath = (obj, path) => {
  let result = obj;
  path.forEach((propName) => {
    if (result !== undefined && typeof result === 'object') {
      result = result[propName];
    }
  });
  return result;
};

export function getSortedArray(list, property) {
  const getSortedByPath = (data, path) =>
    data
      .filter((el) => getValueByPath(el, path) !== undefined)
      .sort((a, b) => {
        const aVal = getValueByPath(a, path);
        const bVal = getValueByPath(b, path);
        if (aVal < bVal) return -1;
        if (aVal > bVal) return 1;
        return 0;
      });

  return getSortedByPath(list, property);
}
