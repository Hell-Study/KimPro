import { ICoingeckoCoinData } from 'recoil/atoms/coingeckoAtoms';

export default function matchCoingecko(
  coingeckoCoinData: ICoingeckoCoinData[],
  symbol: string,
) {
  const target = coingeckoCoinData.filter((coin: ICoingeckoCoinData) => {
    return coin.symbol === symbol;
  });
  const coinName = target[0].name;
  const thumb = target[0].large;

  return { coinName, thumb };
}
