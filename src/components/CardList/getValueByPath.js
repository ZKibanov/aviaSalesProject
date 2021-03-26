const getValueByPath = (obj, path) => {
  let result = obj;
  path.forEach((propName) => {
    if (result !== undefined && typeof result === 'object') {
      result = result[propName];
    }
  });
  return result;
};

export default getValueByPath;
