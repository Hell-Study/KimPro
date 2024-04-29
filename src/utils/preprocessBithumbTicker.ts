import type { ITicker } from '../@types/common.types';
import type { IFetchTicker } from '../@types/bithumb.types';
import {
  changes,
  changesRatio,
  convertDate,
  getAllcoingeckoMarketData,
  highRatio,
  lowRatio,
  matchCoingeckoMarketData,
} from 'utils';

export const preprocessBithumbTicker = async (
  bithumbTickerData: IFetchTicker[],
) => {
  const date = convertDate(
    Number(bithumbTickerData[bithumbTickerData.length - 1][1]),
  );
  bithumbTickerData.splice(bithumbTickerData.length - 1); // 배열 마지막 날짜 값 제거

  const allCoingeckoMarketData = await getAllcoingeckoMarketData();

  const preprocessedBithumbTicker: ITicker[] = [];
  bithumbTickerData.map((data) => {
    const { coinName, thumb } = matchCoingeckoMarketData(
      allCoingeckoMarketData,
      data[0],
    );
    const {
      opening_price,
      closing_price,
      prev_closing_price,
      min_price,
      max_price,
      acc_trade_value_24H,
    } = data[1];

    preprocessedBithumbTicker.push({
      symbol: data[0],
      tradePrice: Number(closing_price),
      coinName: coinName,
      thumbnail: thumb,
      openingPrice: Number(opening_price),
      changeRatio: changesRatio(closing_price, prev_closing_price),
      changePrice: changes(closing_price, prev_closing_price),
      highestRatio: highRatio(closing_price, max_price),
      highestPrice: Number(max_price),
      lowestRatio: lowRatio(closing_price, min_price),
      lowestPrice: Number(min_price),
      tradeValue_24H: Number(acc_trade_value_24H),
      date: date,
    });
  });

  return preprocessedBithumbTicker;
};
