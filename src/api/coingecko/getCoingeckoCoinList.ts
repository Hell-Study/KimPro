export const getCoingeckoCoinList = async () => {
  const coinList = await (
    await fetch('https://api.coingecko.com/api/v3/coins/list')
  ).json();

  return coinList;
};
