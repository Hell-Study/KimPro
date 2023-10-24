import { IUpbitMarketCode } from 'api/upbit/useUpbitTicker';
import { atom } from 'recoil';

export const upbitMarketCodesState = atom<IUpbitMarketCode[]>({
  key: 'upbitMarketCodesState',
  default: [],
});

export const modalIsOpenState = atom({
  key: 'modalIsOpenState',
  default: true,
});
