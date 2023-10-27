import { atom } from 'recoil';

export const bithumbMarketCodesState = atom<string[]>({
  key: 'bithumbMarketCodesState',
  default: [],
});
