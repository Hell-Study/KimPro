import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import {
  ICoingeckoCoinData,
  coingeckoCoinDataState,
} from 'recoil/atoms/coingeckoAtoms';

export default function useMatchCoingecko(bithumbCoinSymbol: string) {
  const coingeckoCoinData = useRecoilValue(coingeckoCoinDataState);
  const [thumb, setThumb] = useState('');
  const [coinName, setCoinName] = useState('');

  useEffect(() => {
    const target = coingeckoCoinData.filter((coin: ICoingeckoCoinData) => {
      return coin.symbol === bithumbCoinSymbol;
    });
    setCoinName(target[0].name);
    setThumb(target[0].large);
  }, []);

  return { thumb, coinName };
}
