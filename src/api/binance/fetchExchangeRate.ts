const fetchExchangeRate = async () => {
  const response = await fetch(
    `https://openexchangerates.org/api/latest.json?app_id=${process.env.REACT_APP_API_KEY}&symbols=KRW`,
  );

  const data = await response.json();
  return data.rates.KRW;
};

export default fetchExchangeRate;
