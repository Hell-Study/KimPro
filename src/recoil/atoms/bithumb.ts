import { IBithumbFetchTicker } from 'components/bithumb/Bithumb.type';
import { atom } from 'recoil';

export const bithumbMarketCodesState = atom<string[]>({
  key: 'bithumbMarketCodesState',
  default: [],
});

export const bithumbTickerState = atom<IBithumbFetchTicker[]>({
  key: 'bithumbTickerState',
  default: [],
});
