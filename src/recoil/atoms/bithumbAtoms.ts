import { atom } from 'recoil';
import { IBithumbTicker } from 'components/bithumb/Bithumb.type';

export const bithumbMarketCodesState = atom<string[]>({
  key: 'bithumbMarketCodesState',
  default: [],
});

export const selectedBithumbCoinState = atom<string>({
  key: 'selectedBithumbCoinState',
  default: 'BTC',
});

export const selectedBithumbCoinInfoState = atom<IBithumbTicker | null>({
  key: 'selectedBithumbCoinInfoState',
  default: null,
});
