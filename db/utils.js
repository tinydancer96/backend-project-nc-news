function lookUpObj(arr, availableKey, keyToFind) {
  const returnObj = {};
  if (arr.length === 0) return returnObj;
  const arrCopy = [...arr];

  for (let i = 0; i < arrCopy.length; i++) {
    const key = arrCopy[i][availableKey];
    const value = arrCopy[i][keyToFind];
    returnObj[key] = value;
  }

  return returnObj;
}

module.exports = lookUpObj;
