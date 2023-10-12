import React, { memo, useState, useEffect } from 'react';
import { useWsTicker } from 'use-upbit-api';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  marketCodesState,
  selectedCoinInfoState,
  selectedCoinState,
} from 'recoil/atoms/upbit';
import {
  CoinListBox,
  CoinBoxHeader,
  CoinBox,
  CoinBoxName,
  CoinBoxPrice,
  CoinBoxChange,
  CoinBoxChangeRate,
  CoinBoxChangePrice,
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
  const { socket, isConnected, socketData } = useWsTicker(marketCodes);

  const [selectedCoinInfo, setSelectedCoinInfo] = useRecoilState(
    selectedCoinInfoState,
  );

  useEffect(() => {
    if (socketData) {
      console.log('socketData 있음!');
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
      <CoinBoxHeader>
        <div>코인</div>
        <div>현재가</div>
        <div>전일대비</div>
        <div>거래대금</div>
      </CoinBoxHeader>
      {socketData
        ? socketData.map((data) => {
            return (
              <CoinBox
                key={data.code}
                id={data.code}
                onClick={clickCoinHandler}
                selected={selectedCoin[0].market === data.code}
              >
                <CoinBoxName>
                  <div>
                    {
                      marketCodes.filter((code) => code.market === data.code)[0]
                        .korean_name
                    }
                  </div>
                  <div>
                    {
                      marketCodes.filter((code) => code.market === data.code)[0]
                        .market
                    }
                  </div>
                </CoinBoxName>
                <CoinBoxPrice changeType={data.change}>
                  {data.trade_price.toLocaleString('ko-KR')}
                </CoinBoxPrice>
                <CoinBoxChange changeType={data.change}>
                  <CoinBoxChangeRate>
                    {data.signed_change_rate > 0 ? '+' : null}
                    {(data.signed_change_rate * 100).toFixed(2)}%
                  </CoinBoxChangeRate>
                  <CoinBoxChangePrice>
                    {data.signed_change_price.toLocaleString('ko-KR')}
                  </CoinBoxChangePrice>
                </CoinBoxChange>
                <CoinBoxVolume>
                  <div>
                    {Math.ceil(
                      convertMillonWon(data.acc_trade_price_24h),
                    ).toLocaleString('ko-KR')}
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
