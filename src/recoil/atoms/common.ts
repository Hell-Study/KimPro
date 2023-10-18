import { atom } from 'recoil';

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

export const baseExchangeState = atom<string>({
  key: 'baseExchangeState',
  default: 'upbit',
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
