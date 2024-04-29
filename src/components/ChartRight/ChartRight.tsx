import { memo } from 'react';
import * as styled from './ChartRight.styles';
import { useRecoilValue } from 'recoil';
import { selectedCoinInfoState } from 'recoil/atoms/tableAtoms';
import { ChartCoinInfo } from './ChartCoinInfo';
import { ChartContent } from './ChartContent';

function ChartRight() {
  const selectedCoinInfo = useRecoilValue(selectedCoinInfoState);
  return (
    <styled.ChartContainer>
      {selectedCoinInfo !== null && <ChartCoinInfo {...selectedCoinInfo} />}
      <ChartContent />
    </styled.ChartContainer>
  );
}

export default memo(ChartRight);
