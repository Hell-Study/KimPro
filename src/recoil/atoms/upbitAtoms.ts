import { IUpbitMarketCode } from 'hooks/upbit/useUpbitTicker';
import { atom } from 'recoil';

export const upbitMarketCodesState = atom<IUpbitMarketCode[]>({
  key: 'upbitMarketCodesState',
  default: [],
});
