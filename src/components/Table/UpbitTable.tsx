import useUpbitTicker, { IUpbitMarketCode } from 'api/upbit/useUpbitTicker';
import * as styled from './Table.styles';
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
              <styled.CoinBox
                key={data.code}
                id={data.code}
                onClick={clickCoinHandler}
                $selected={selectedCoin[0].market === data.code}
              >
                <styled.CoinBoxName>
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
                </styled.CoinBoxName>
                <styled.CoinBoxPrice $changeType={data.change}>
                  {data.trade_price?.toLocaleString('ko-KR')}
                </styled.CoinBoxPrice>
                <styled.CoinBoxKimchiPremium>
                  (국내코인원화 / 해외코인달러 x 환율 - 1)*100
                </styled.CoinBoxKimchiPremium>
                <styled.CoinBoxChange $changeType={data.change}>
                  <styled.CoinBoxChangeRate>
                    {data.signed_change_rate > 0 ? '+' : null}
                    {(data.signed_change_rate * 100).toFixed(2)}%
                  </styled.CoinBoxChangeRate>
                  <styled.CoinBoxChangePrice>
                    {data.signed_change_price?.toLocaleString('ko-KR')}
                  </styled.CoinBoxChangePrice>
                </styled.CoinBoxChange>
                <styled.CoinBoxHighestWeek>
                  <styled.CoinBoxHighestWeekRate>
                    {data.highest_52_week_price
                      ? (
                          (data.trade_price / data.highest_52_week_price - 1) *
                          100
                        ).toFixed(2) + '%'
                      : null}
                  </styled.CoinBoxHighestWeekRate>
                  <styled.CoinBoxHighestWeekPrice>
                    {data.highest_52_week_price
                      ? data.highest_52_week_price?.toLocaleString('ko-KR')
                      : null}
                  </styled.CoinBoxHighestWeekPrice>
                </styled.CoinBoxHighestWeek>
                <styled.CoinBoxLowestWeek>
                  <styled.CoinBoxLowestWeekRate>
                    {data.lowest_52_week_price
                      ? '+' +
                        (
                          (data.trade_price / data.lowest_52_week_price - 1) *
                          100
                        ).toFixed(2) +
                        '%'
                      : null}
                  </styled.CoinBoxLowestWeekRate>
                  <styled.CoinBoxLowestWeekPrice>
                    {data.lowest_52_week_price
                      ? data.lowest_52_week_price?.toLocaleString('ko-KR')
                      : null}
                  </styled.CoinBoxLowestWeekPrice>
                </styled.CoinBoxLowestWeek>
                <styled.CoinBoxVolume>
                  <div>
                    {Math.ceil(
                      convertMillonWon(data.acc_trade_price_24h),
                    )?.toLocaleString('ko-KR')}
                  </div>
                  <div>백만</div>
                </styled.CoinBoxVolume>
              </styled.CoinBox>
            );
          })
        : null}
    </>
  );
}
