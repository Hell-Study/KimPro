import useUpbitTicker, { IUpbitMarketCode } from 'api/upbit/useUpbitTicker';
import * as style from './Table.styles';
import { convertMillonWon } from 'utils/convertMillonWon';
import { useRecoilState } from 'recoil';
import { selectedCoinInfoState, selectedCoinState } from 'recoil/atoms/common';
import useFetchUpbitMarketCode from 'api/upbit/useFetchUpbitMarketCode';
import { upbitMarketCodesState } from 'recoil/atoms/upbit';

export default function UpbitTable() {
  const { marketCodes } = useFetchUpbitMarketCode();
  const [upbitMarketCodes, setUpbitMarketCodes] = useRecoilState(
    upbitMarketCodesState,
  );
  setUpbitMarketCodes(marketCodes);
  const { socketDatas } = useUpbitTicker(upbitMarketCodes);

  const [selectedCoin, setSelectedCoin] = useRecoilState(selectedCoinState);

  const [selectedCoinInfo, setSelectedCoinInfo] = useRecoilState(
    selectedCoinInfoState,
  );
  const clickCoinHandler = (evt: React.MouseEvent<HTMLDivElement>) => {
    const currentTarget = marketCodes.filter(
      (code: IUpbitMarketCode) => code.market === evt.currentTarget.id,
    );
    setSelectedCoin(currentTarget);
  };

  return (
    <>
      {socketDatas
        ? socketDatas.map((data) => {
            return (
              <style.CoinBox
                key={data.code}
                id={data.code}
                onClick={clickCoinHandler}
                $selected={selectedCoin[0].market === data.code}
              >
                <style.CoinBoxName>
                  <div>
                    {
                      upbitMarketCodes.filter(
                        (code: IUpbitMarketCode) => code.market === data.code,
                      )[0]?.korean_name
                    }
                  </div>
                  <div>
                    {
                      upbitMarketCodes.filter(
                        (code: IUpbitMarketCode) => code.market === data.code,
                      )[0]?.market
                    }
                  </div>
                </style.CoinBoxName>
                <style.CoinBoxPrice $changeType={data.change}>
                  {data.trade_price?.toLocaleString('ko-KR')}
                </style.CoinBoxPrice>
                <style.CoinBoxKimchiPremium>
                  (국내코인원화 / 해외코인달러 x 환율 - 1)*100
                </style.CoinBoxKimchiPremium>
                <style.CoinBoxChange $changeType={data.change}>
                  <style.CoinBoxChangeRate>
                    {data.signed_change_rate > 0 ? '+' : null}
                    {(data.signed_change_rate * 100).toFixed(2)}%
                  </style.CoinBoxChangeRate>
                  <style.CoinBoxChangePrice>
                    {data.signed_change_price?.toLocaleString('ko-KR')}
                  </style.CoinBoxChangePrice>
                </style.CoinBoxChange>
                <style.CoinBoxHighestWeek>
                  <style.CoinBoxHighestWeekRate>
                    {data.highest_52_week_price
                      ? (
                          (data.trade_price / data.highest_52_week_price - 1) *
                          100
                        ).toFixed(2) + '%'
                      : null}
                  </style.CoinBoxHighestWeekRate>
                  <style.CoinBoxHighestWeekPrice>
                    {data.highest_52_week_price
                      ? data.highest_52_week_price?.toLocaleString('ko-KR')
                      : null}
                  </style.CoinBoxHighestWeekPrice>
                </style.CoinBoxHighestWeek>
                <style.CoinBoxLowestWeek>
                  <style.CoinBoxLowestWeekRate>
                    {data.lowest_52_week_price
                      ? '+' +
                        (
                          (data.trade_price / data.lowest_52_week_price - 1) *
                          100
                        ).toFixed(2) +
                        '%'
                      : null}
                  </style.CoinBoxLowestWeekRate>
                  <style.CoinBoxLowestWeekPrice>
                    {data.lowest_52_week_price
                      ? data.lowest_52_week_price?.toLocaleString('ko-KR')
                      : null}
                  </style.CoinBoxLowestWeekPrice>
                </style.CoinBoxLowestWeek>
                <style.CoinBoxVolume>
                  <div>
                    {Math.ceil(
                      convertMillonWon(data.acc_trade_price_24h),
                    )?.toLocaleString('ko-KR')}
                  </div>
                  <div>백만</div>
                </style.CoinBoxVolume>
              </style.CoinBox>
            );
          })
        : null}
    </>
  );
}
