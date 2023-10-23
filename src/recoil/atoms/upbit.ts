import { IUpbitMarketCode } from 'api/upbit/useUpbitTicker';
import { atom } from 'recoil';

export const upbitMarketCodesState = atom<IUpbitMarketCode[]>({
  key: 'upbitMarketCodesState',
  default: [],
});

export const selectedCoinState = atom<SelectedCoinType[]>({
  key: 'selectedCoinState',
  default: [
    {
      market: 'KRW-BTC',
      korean_name: '비트코인',
      english_name: 'Bitcoin',
    },
  ],
});

export const selectedCoinInfoState = atom<SelectedCoinInfoType | any>({
  key: 'selectedCoinInfoState',
  default: {},
});

export const modalIsOpenState = atom({
  key: 'modalIsOpenState',
  default: true,
});
