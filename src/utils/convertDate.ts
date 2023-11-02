const convertDate = (value: number): string => {
  const date = new Date(value);
  const time = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(
    2,
    '0',
  )}-${String(date.getDate()).padStart(2, '0')}`;
  return time;
};

export default convertDate;
