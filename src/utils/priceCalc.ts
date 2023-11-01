import { IUpbitTicker } from 'hooks/upbit/useUpbitTicker';
import { IBithumbTicker } from 'components/bithumb/Bithumb.type';

// 업비트
// 고가 대비 증감률(52주)
export const highest_52_week_rate = (data: IUpbitTicker) =>
  (data.trade_price / data.highest_52_week_price - 1) * 100;

// 저가 대비 증감률(52주)
export const lowest_52_week_rate = (data: IUpbitTicker) =>
  (data.trade_price / data.lowest_52_week_price - 1) * 100;

// 빗썸
// 전일 대비 증감률
export const changesRatio = ({
  closing_price,
  prev_closing_price,
}: IBithumbTicker) =>
  ((Number(closing_price) - Number(prev_closing_price)) /
    Number(prev_closing_price)) *
  100;

// 전일 대비
export const changes = ({
  closing_price,
  prev_closing_price,
}: IBithumbTicker) => Number(closing_price) - Number(prev_closing_price);

// 고가 대비 증감률(전일)
export const highRatio = ({ closing_price, max_price }: IBithumbTicker) =>
  ((Number(closing_price) - Number(max_price)) / Number(max_price)) * 100;

// 저가 대비 증감률(전일)
export const lowRatio = ({ closing_price, min_price }: IBithumbTicker) =>
  ((Number(closing_price) - Number(min_price)) / Number(min_price)) * 100;
