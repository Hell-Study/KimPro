import type { IFetchTicker } from '../../@types/bithumb.types';

const options = { method: 'GET', headers: { accept: 'application/json' } };

export const fetchBithumbTicker = async () => {
  try {
    const fetchedBithumbTicker = await (
      await fetch('https://api.bithumb.com/public/ticker/ALL_KRW', options)
    ).json();

    const marketCodes = Object.keys(fetchedBithumbTicker.data);
    const bithumbTicker: IFetchTicker[] = Object.entries(
      fetchedBithumbTicker.data,
    );

    return { marketCodes, bithumbTicker };
  } catch (error) {
    console.error('bithumb ticker fetch api 오류 발생', error);
    throw error;
  }
};
