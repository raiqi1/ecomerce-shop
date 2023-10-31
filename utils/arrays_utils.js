export const compareArrays = (arr1, arr2) => {
  if (arr1.length !== arr2.length) return false;
  const neww = (object) => 
    JSON.stringify(
      Object.keys(object)
        .sort()
        .map((key) => [key, object[key]])
    );
    arr1 = new Set(arr1.map(neww));
    return arr2.every((item) => arr1.has(neww(item)));
};
