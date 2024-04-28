export const getCoingeckoMarketData = async (page = 1) => {
  try {
    const coingeckoMarketData = await (
      await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=krw&vs_currency=usd&per_page=250&page=${page}&locale=ko`,
      )
    ).json();
    return coingeckoMarketData;
  } catch (e) {
    console.error('coingecko market data api 오류 발생', e);
  }
};
