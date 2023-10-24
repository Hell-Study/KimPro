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
                $selected={selectedCoin[0]?.market === data.code}
              >
                <styled.CoinBoxName>
                  <styled.CoinBoxNameKorean>
                    <img
                      alt={`${data.code?.split('-')[1]} 아이콘`}
                      width="15"
                      height="15"
                      decoding="async"
                      data-nimg="1"
                      className="rounded-full"
                      src={`https://static.upbit.com/logos/${data.code?.split(
                        '-',
                      )[1]}.png`}
                    />
                    <div>
                      {
                        marketCodes.filter(
                          (code) => code?.market === data.code,
                        )[0]?.korean_name
                      }
                    </div>
                  </styled.CoinBoxNameKorean>
                  <styled.CoinBoxNameMarket>
                    {
                      marketCodes
                        .filter((code) => code?.market === data.code)[0]
                        ?.market?.split('-')[1]
                    }
                  </styled.CoinBoxNameMarket>
                </styled.CoinBoxName>
                <styled.CoinBoxPrice>
                  <styled.CoinBoxPriceKorean>
                    {data.trade_price?.toLocaleString('ko-KR')}
                  </styled.CoinBoxPriceKorean>
                  <styled.CoinBoxPriceBinance>
                    바이낸스 시세
                  </styled.CoinBoxPriceBinance>
                </styled.CoinBoxPrice>
                <styled.CoinBoxKimchiPremium>
                  김치프리미엄%
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
