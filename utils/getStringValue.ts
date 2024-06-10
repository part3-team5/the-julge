const getStringValue = (value: string | string[] | undefined) => {
  if (Array.isArray(value)) {
    return value[0];
  }
  return value;
};

export default getStringValue;
