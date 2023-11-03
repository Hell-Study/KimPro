import { IUpbitMarketCode } from '../../@types/upbit.types';
import { atom } from 'recoil';

export const upbitMarketCodesState = atom<IUpbitMarketCode[]>({
  key: 'upbitMarketCodesState',
  default: [],
});
