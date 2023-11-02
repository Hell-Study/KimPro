import shortId from 'shortid';
import getNickname from 'api/getNickname';

export const updateNickname = () => {
  const userChosenNickname = prompt('변경할 닉네임을 입력해주세요');
  if (userChosenNickname) {
    try {
      localStorage.setItem('displayName', userChosenNickname);
    } catch (error) {
      console.error('Error updating nickname:', error);
    }
  }
};

function generateRandomUID() {
  const randomString = shortId.generate();
  const uppercaseString = randomString.replace(/[a-z]/g, (char) =>
    char.toUpperCase(),
  );
  return uppercaseString;
}

export async function saveUserInfoToLocalStorage() {
  const uid = generateRandomUID();
  const displayName = await getNickname();
  console.log('displayName', displayName);
  localStorage.setItem('uid', uid);
  localStorage.setItem('displayName', displayName);
}
