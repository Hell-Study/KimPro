import React, { useEffect } from 'react';
import useWsTicker from 'api/upbit/useWsTicker';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  marketCodesState,
  selectedCoinInfoState,
  selectedCoinState,
} from 'recoil/atoms/upbit';
import * as style from './Table.styles';
import { baseExchangeState } from 'recoil/atoms/common';
import { convertMillonWon } from 'utils/convertMillonWon';

export const Table: React.FC = () => {
  const marketCodes = useRecoilValue(marketCodesState);
  const [selectedCoin, setSelectedCoin] = useRecoilState(selectedCoinState);
  const { socketData } = useWsTicker(marketCodes);

  const [selectedCoinInfo, setSelectedCoinInfo] = useRecoilState(
    selectedCoinInfoState,
  );

  useEffect(() => {
    if (socketData) {
      const targetData = socketData.filter(
        (data) => data.code == selectedCoin[0].market,
      );
      setSelectedCoinInfo([...targetData]);
    }
  }, [selectedCoin, socketData]);

  const clickCoinHandler = (evt: React.MouseEvent<HTMLDivElement>) => {
    const currentTarget = marketCodes.filter(
      (code) => code.market === evt.currentTarget.id,
    );
    setSelectedCoin(currentTarget);
  };

  return (
    <style.CoinListBox>
      <style.CoinBoxNav>
        <div>
          기준 거래소
          <select>
            <option value="upbit">업비트</option>
            <option value="bithumb">빗썸</option>
          </select>
          -
          <select>
            <option value="binance">바이낸스 USDT 마켓</option>
          </select>
          해외 거래소
        </div>
        <div>
          암호화폐 총 {marketCodes.length}개
          <input type="text" name="검색어" placeholder="검색어를 입력하세요" />
        </div>
      </style.CoinBoxNav>
      <style.CoinBoxHeader>
        <div>코인</div>
        <div>현재가</div>
        <div>김프</div>
        <div>전일대비</div>
        <div>고가대비(52주)</div>
        <div>저가대비(52주)</div>
        <div>거래대금</div>
      </style.CoinBoxHeader>
      {socketData
        ? socketData.map((data) => {
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
                      marketCodes.filter((code) => code.market === data.code)[0]
                        ?.korean_name
                    }
                  </div>
                  <div>
                    {
                      marketCodes.filter((code) => code.market === data.code)[0]
                        ?.market
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
    </style.CoinListBox>
  );
};
