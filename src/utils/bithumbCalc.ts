import { IBithumbFetchTicker } from 'components/bithumb/Bithumb.type';

// 전일 대비 증감률
export const changesRatio = (data: IBithumbFetchTicker) =>
  ((Number(data[1].closing_price) - Number(data[1].prev_closing_price)) /
    Number(data[1].prev_closing_price)) *
  100;

// 전일 대비
export const changes = (data: IBithumbFetchTicker) =>
  Number(data[1].closing_price) - Number(data[1].prev_closing_price);

// 고가 대비 증감률(전일)
export const highRatio = (data: IBithumbFetchTicker) =>
  ((Number(data[1].closing_price) - Number(data[1].max_price)) /
    Number(data[1].max_price)) *
  100;

// 저가 대비 증감률(전일)
export const lowRatio = (data: IBithumbFetchTicker) =>
  ((Number(data[1].closing_price) - Number(data[1].min_price)) /
    Number(data[1].min_price)) *
  100;
