import { atom } from 'recoil';

export const tableSortValueState = atom<string>({
  key: 'tableSortState',
  default: '거래액(일)',
});

export const tableSortUpDownState = atom<boolean>({
  key: 'tableUpDownState',
  default: false,
});
