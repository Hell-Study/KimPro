export const SELECT_OPTION = [
  {
    key: 'BINANCE',
    value: 'BINANCE',
    title: '비트코인 - Binance',
    symbol: 'https://kimpga.com/images/exchange-symbols/binance.svg',
  },
  {
    key: 'UPBIT',
    value: 'UPBIT',
    title: '비트코인 김치프리미엄 Ubit',
    symbol: 'https://kimpga.com/images/exchange-symbols/upbit.svg',
  },
  {
    key: 'BITHUMB',
    value: 'BITHUMB',
    title: '비트코인 김치프리미엄 Bithumb',
    symbol: 'https://kimpga.com/images/exchange-symbols/bithumb.svg',
  },
];

export const TRADING_VIEW_SYMBOLS = {
  BINANCE: 'BINANCE:BTCUSDT',
  UPBIT:
    '(BINANCE:BTCUSD/BINANCE:BTCUSD*UPBIT:BTCKRW-BINANCE:BTCUSDT*FX_IDC:USDKRW)/(BINANCE:BTCUSD*FX_IDC:USDKRW)*100',
  BITHUMB:
    '(BINANCE:BTCUSD/BINANCE:BTCUSD*BITHUMB:BTCKRW-BINANCE:BTCUSDT*FX_IDC:USDKRW)/(BINANCE:BTCUSD*FX_IDC:USDKRW)*100',
};
