import type { ITicker } from '../../@types/common.types';
import { atom } from 'recoil';

export const baseExchangeState = atom<string>({
  key: 'baseExchangeState',
  default: 'upbit',
});

export const modalIsOpenState = atom<boolean>({
  key: 'modalIsOpenState',
  default: false,
});

export const marketCodesState = atom<string[]>({
  key: 'marketCodesState',
  default: [],
});

export const selectedCoinState = atom<string>({
  key: 'selectedCoinState',
  default: 'BTC',
});

export const selectedCoinInfoState = atom<ITicker | null>({
  key: 'selectedCoinInfoState',
  default: null,
});

export const searchCoinState = atom<string>({
  key: 'searchCoinState',
  default: '',
});
