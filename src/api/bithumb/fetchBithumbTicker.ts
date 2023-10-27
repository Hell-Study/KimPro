const options = { method: 'GET', headers: { accept: 'application/json' } };

export const fetchBithumbTicker = async () => {
  const bithumbTicker = await (
    await fetch('https://api.bithumb.com/public/ticker/ALL_KRW', options)
  )
    .json()
    .catch((error) => {
      console.error('bithumb ticker api 오류 발생', error);
    });

  return bithumbTicker.data;
};
