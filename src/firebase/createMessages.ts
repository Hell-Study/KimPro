import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import { db } from './config';

function getUserInfoFromLocalStorage() {
  const uid = localStorage.getItem('uid');
  const displayName = localStorage.getItem('displayName');
  return { uid, displayName };
}

export const createMessages = async (message: string) => {
  if (message.trim() === '') {
    alert('메시지를 입력해주세요');
    return;
  }
  const { uid, displayName } = getUserInfoFromLocalStorage();
  await addDoc(collection(db, 'messages'), {
    text: message,
    name: displayName,
    createdAt: serverTimestamp(),
    uid,
  });
};
