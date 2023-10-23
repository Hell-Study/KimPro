import { atom } from 'recoil';

export type MarketCodesType = {
  market: string;
  korean_name: string;
  english_name: string;
};

export type SelectedCoinType = {
  market: string;
  korean_name: string;
  english_name: string;
};

export type SelectedCoinInfoType = {
  candle_date_time_kt: string;
  opening_price: number;
  high_price: number;
  low_price: number;
  trade_price: number;
  trade_date: string;
};

export const marketCodesState = atom<MarketCodesType[]>({
  key: 'marketCodesState',
  default: [],
});

export const selectedCoinState = atom<SelectedCoinType[]>({
  key: 'selectedCoinState',
  default: [
    {
      market: 'KRW-BTC',
      korean_name: '비트코인',
      english_name: 'Bitcoin',
    },
  ],
});

export const selectedCoinInfoState = atom<SelectedCoinInfoType | any>({
  key: 'selectedCoinInfoState',
  default: {},
});

export const modalIsOpenState = atom({
  key: 'modalIsOpenState',
  default: true,
});
