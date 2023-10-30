const convertTimestamp = (timestamp: number): string => {
  const date = new Date(timestamp);
  const result = `${date.getUTCFullYear()}-${String(
    date.getUTCMonth() + 1,
  ).padStart(2, '0')}-${String(date.getUTCDate()).padStart(2, '0')}`;
  console.log(result);
  return result;
};

export default convertTimestamp;
