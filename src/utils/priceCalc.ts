import { IUpbitTicker } from 'hooks/upbit/useUpbitTicker';

// 공통
// 김프
export const binancePriceToKRW = (
  binancePrice: string,
  myExchangeRate: number,
) => parseFloat(binancePrice) * myExchangeRate;

// 김프 비율
export const kimchiPremiumRatio = (
  nowPrice: number,
  binancePrice: string,
  myExchangeRate: number,
) => (nowPrice / (parseFloat(binancePrice) * myExchangeRate) - 1) * 100;

// 김프와 국내 거래소 가격 차이
export const kimchiPremiumDiff = (
  nowPrice: number,
  binancePrice: string,
  myExchangeRate: number,
) => nowPrice - parseFloat(binancePrice) * myExchangeRate;

// 업비트
// 고가 대비 증감률(52주)
export const highest_52_week_rate = (data: IUpbitTicker) =>
  (data.trade_price / data.highest_52_week_price - 1) * 100;

// 저가 대비 증감률(52주)
export const lowest_52_week_rate = (data: IUpbitTicker) =>
  (data.trade_price / data.lowest_52_week_price - 1) * 100;

// 빗썸
// 전일 대비 증감률
export const changesRatio = (
  closing_price: string,
  prev_closing_price: string,
) =>
  ((Number(closing_price) - Number(prev_closing_price)) /
    Number(prev_closing_price)) *
  100;

// 전일 대비
export const changes = (closing_price: string, prev_closing_price: string) =>
  Number(closing_price) - Number(prev_closing_price);

// 고가 대비 증감률(전일)
export const highRatio = (closing_price: string, max_price: string) =>
  ((Number(closing_price) - Number(max_price)) / Number(max_price)) * 100;

// 저가 대비 증감률(전일)
export const lowRatio = (closing_price: string, min_price: string) =>
  ((Number(closing_price) - Number(min_price)) / Number(min_price)) * 100;
