export const getUniqueValues = (data, key, includeAll = false) => {
  const unique = [...new Set(data.map((item) => item[key]))];
  return includeAll ? ["all", ...unique] : unique;
};