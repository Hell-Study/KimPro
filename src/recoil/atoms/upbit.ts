import { atom } from 'recoil';

export type UpbitMarketCodesType = {
  market: string;
  korean_name: string;
  english_name: string;
};

export const upbitMarketCodesState = atom<UpbitMarketCodesType[]>({
  key: 'upbitMarketCodesState',
  default: [],
});
