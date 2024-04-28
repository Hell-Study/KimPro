const options = { method: 'GET', headers: { accept: 'application/json' } };

export const fetchBithumbCandlestick = async (
  order_currency: string,
  chart_intervals: string,
) => {
  try {
    const fetchedBithumbCandlestick = await (
      await fetch(
        `https://api.bithumb.com/public/candlestick/${order_currency}_KRW/${chart_intervals}`,
        options,
      )
    ).json();

    return fetchedBithumbCandlestick.data;
  } catch (error) {
    console.error('bithumb candlestick api 오류 발생', error);
    throw error;
  }
};
