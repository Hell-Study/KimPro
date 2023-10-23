import { atom } from 'recoil';

export interface ICoingeckoCoin {
  id: string;
  symbol: string;
  name: string;
}

export const coingeckoCoinsListState = atom<ICoingeckoCoin[]>({
  key: 'coingeckoCoinsListState',
  default: [],
});
