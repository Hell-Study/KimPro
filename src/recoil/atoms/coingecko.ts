import { atom } from 'recoil';

export interface ICoingeckoCoinData {
  id: string;
  name: string;
  api_symbol: string;
  symbol: string;
  market_cap_rank: number;
  thumb: string;
  large: string;
}

export const coingeckoCoinDataState = atom<ICoingeckoCoinData[]>({
  key: 'coingeckoDataState',
  default: [],
});
