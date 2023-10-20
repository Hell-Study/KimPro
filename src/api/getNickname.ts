import axios from 'axios';

export default async function getNickname() {
  try {
    const response = await axios.get(
      'https://nickname.hwanmoo.kr/?format=text&count=1',
    );
    const nickname = await response.data;
    return nickname;
  } catch (error) {
    console.error('An error occurred while fetching the nickname:', error);
  }
}
