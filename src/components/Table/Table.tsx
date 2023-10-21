import React, { memo, useState, useEffect } from 'react';
import useWsTicker from 'api/upbit/useWsTicker';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  marketCodesState,
  selectedCoinInfoState,
  selectedCoinState,
} from 'recoil/atoms/upbit';
import {
  CoinListBox,
  CoinBoxNav,
  CoinBoxHeader,
  CoinBox,
  CoinBoxName,
  CoinBoxNameMarket,
  CoinBoxPrice,
  CoinBoxKimchiPremium,
  CoinBoxChange,
  CoinBoxChangeRate,
  CoinBoxChangePrice,
  CoinBoxHighestWeek,
  CoinBoxHighestWeekRate,
  CoinBoxHighestWeekPrice,
  CoinBoxLowestWeek,
  CoinBoxLowestWeekRate,
  CoinBoxLowestWeekPrice,
  CoinBoxVolume,
} from './Table.styles';

const convertMillonWon = (value: number) => {
  const MILLION = 1000000;
  const extractedValue = value / MILLION;
  return extractedValue;
};

export const Table: React.FC = () => {
  const marketCodes = useRecoilValue(marketCodesState);
  const [selectedCoin, setSelectedCoin] = useRecoilState(selectedCoinState);
  const webSocketOptions = { throttle_time: 400, max_length_queue: 100 };
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
    <CoinListBox>
      <CoinBoxNav>
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
      </CoinBoxNav>
      <CoinBoxHeader>
        <div>코인</div>
        <div>현재가</div>
        <div>김프</div>
        <div>전일대비</div>
        <div>고가대비(52주)</div>
        <div>저가대비(52주)</div>
        <div>거래대금</div>
      </CoinBoxHeader>
      {socketData
        ? socketData.map((data) => {
            return (
              <CoinBox
                key={data.code}
                id={data.code}
                onClick={clickCoinHandler}
                $selected={selectedCoin[0].market === data.code}
              >
                <CoinBoxName>
                  <div style={{ display: 'flex', flexDirection: 'row' }}>
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
                          (code) => code.market === data.code,
                        )[0]?.korean_name
                      }
                    </div>
                  </div>
                  <CoinBoxNameMarket>
                    {
                      marketCodes
                        .filter((code) => code.market === data.code)[0]
                        ?.market?.split('-')[1]
                    }
                  </CoinBoxNameMarket>
                </CoinBoxName>
                <CoinBoxPrice $changeType={data.change}>
                  {data.trade_price?.toLocaleString('ko-KR')}
                </CoinBoxPrice>
                <CoinBoxKimchiPremium>aa</CoinBoxKimchiPremium>
                <CoinBoxChange $changeType={data.change}>
                  <CoinBoxChangeRate>
                    {data.signed_change_rate > 0 ? '+' : null}
                    {(data.signed_change_rate * 100).toFixed(2)}%
                  </CoinBoxChangeRate>
                  <CoinBoxChangePrice>
                    {data.signed_change_price?.toLocaleString('ko-KR')}
                  </CoinBoxChangePrice>
                </CoinBoxChange>
                <CoinBoxHighestWeek>
                  <CoinBoxHighestWeekRate>
                    {data.highest_52_week_price
                      ? (
                          (data.trade_price / data.highest_52_week_price - 1) *
                          100
                        ).toFixed(2) + '%'
                      : null}
                  </CoinBoxHighestWeekRate>
                  <CoinBoxHighestWeekPrice>
                    {data.highest_52_week_price
                      ? data.highest_52_week_price?.toLocaleString('ko-KR')
                      : null}
                  </CoinBoxHighestWeekPrice>
                </CoinBoxHighestWeek>
                <CoinBoxLowestWeek>
                  <CoinBoxLowestWeekRate>
                    {data.lowest_52_week_price
                      ? '+' +
                        (
                          (data.trade_price / data.lowest_52_week_price - 1) *
                          100
                        ).toFixed(2) +
                        '%'
                      : null}
                  </CoinBoxLowestWeekRate>
                  <CoinBoxLowestWeekPrice>
                    {data.lowest_52_week_price
                      ? data.lowest_52_week_price?.toLocaleString('ko-KR')
                      : null}
                  </CoinBoxLowestWeekPrice>
                </CoinBoxLowestWeek>
                <CoinBoxVolume>
                  <div>
                    {Math.ceil(
                      convertMillonWon(data.acc_trade_price_24h),
                    )?.toLocaleString('ko-KR')}
                  </div>
                  <div>백만</div>
                </CoinBoxVolume>
              </CoinBox>
            );
          })
        : null}
    </CoinListBox>
  );
};
