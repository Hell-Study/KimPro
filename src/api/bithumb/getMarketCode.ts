const options = { method: 'GET', headers: { accept: 'application/json' } };

export const getMarketCode = async (): Promise<string[]> => {
  const marketCode = Object.keys(
    (
      await (
        await fetch('https://api.bithumb.com/public/ticker/ALL_KRW', options)
      ).json()
    ).data,
  ).map((x) => {
    return x + '_KRW';
  });
  return marketCode;
};
