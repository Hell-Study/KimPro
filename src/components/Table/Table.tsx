import React, { memo, useState, useEffect } from 'react';
import useWsTicker from 'api/upbit/useWsTicker';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  marketCodesState,
  selectedCoinInfoState,
  selectedCoinState,
} from 'recoil/atoms/upbit';
import * as styled from './Table.styles';

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
      (code) => code?.market === evt.currentTarget.id,
    );
    setSelectedCoin(currentTarget);
  };

  return (
    <styled.CoinListBox>
      <styled.CoinBoxNav>
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
      </styled.CoinBoxNav>
      <styled.CoinBoxHeader>
        <div>코인</div>
        <div>현재가</div>
        <div>김프</div>
        <div>전일대비</div>
        <div>고가대비(52주)</div>
        <div>저가대비(52주)</div>
        <div>거래대금</div>
      </styled.CoinBoxHeader>
      {socketData
        ? socketData.map((data) => {
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
    </styled.CoinListBox>
  );
};
