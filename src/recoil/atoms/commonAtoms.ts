import { ITicker } from '../../@types/common';
import { atom } from 'recoil';

export const baseExchangeState = atom<string>({
  key: 'baseExchangeState',
  default: 'upbit',
});

export const selectedCoinState = atom<string>({
  key: 'selectedCoinState',
  default: 'BTC',
});

export const selectedCoinInfoState = atom<ITicker | null>({
  key: 'selectedCoinInfoState',
  default: null,
});

export const searchCoinState = atom({
  key: 'searchCoinState',
  default: '',
});
