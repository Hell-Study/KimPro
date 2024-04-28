export const getCoingeckoData = async (page = 1) => {
  try {
    const CoingeckoCoinData = await (
      await fetch(
        `https://api.coingecko.com/api/v3/coins/markets?vs_currency=krw&vs_currency=usd&per_page=250&page=${page}&locale=ko`,
      )
    ).json();
    return CoingeckoCoinData;
  } catch (e) {
    console.error('코인게코 코인 데이터 api 오류 발생', e);
  }
};
