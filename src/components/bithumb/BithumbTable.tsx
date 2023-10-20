import styled from 'styled-components';
import { IBithumbTicker } from './Bithumb.type';

interface Props {
  socketData: IBithumbTicker;
}

export default function BithumbTable({ socketData }: Props) {
  const {
    symbol, // 통화코드
    closePrice, // 종가
    lowPrice, // 저가
    highPrice, // 고가
    value, // 누적거래금액
    prevClosePrice, // 전일종가
  } = socketData;

  return (
    <>
      <Wrapper>
        <Aaaaa>{symbol}</Aaaaa>
        <Aaaaa>{closePrice}</Aaaaa>
        {/* 전일 대비 */}
        <Aaaaa>
          {(
            ((Number(closePrice) - Number(prevClosePrice)) /
              Number(prevClosePrice)) *
            100
          ).toFixed(2)}
          %
        </Aaaaa>
        {/* 고가 대비(전일) */}
        <Aaaaa>
          {(
            ((Number(highPrice) - Number(closePrice)) / Number(closePrice)) *
            100
          ).toFixed(2)}
        </Aaaaa>

        {/* 저가 대비(전일) */}
        <Aaaaa>
          {(
            ((Number(lowPrice) - Number(closePrice)) / Number(closePrice)) *
            100
          ).toFixed(2)}
        </Aaaaa>
        {/* 거래액(일) */}
        <Aaaaa>{Math.ceil(Number(value))}</Aaaaa>
      </Wrapper>
    </>
  );
}

export const Wrapper = styled.div`
  display: flex;
`;

export const Aaaaa = styled.div`
  margin: 5px 10px;
`;
