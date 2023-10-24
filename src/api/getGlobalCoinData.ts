import axios from 'axios';

export default async function getGlobalCoinData() {
  try {
    const response = await axios.get('https://api.coinlore.net/api/global/');
    const data = await response.data;
    return data;
  } catch (error) {
    console.error('An error occurred while fetching the data:', error);
  }
}
