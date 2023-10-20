import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';
import shortId from 'shortid';
import getNickname from 'api/getNickname';
import {
  SendMessageForm,
  SendMessageInput,
  SendMessageButton,
} from './SendMessage.styles';

function generateRandomUID() {
  const randomString = shortId.generate();
  const uppercaseString = randomString.replace(/[a-z]/g, (char) =>
    char.toUpperCase(),
  );
  return uppercaseString;
}
async function saveUserInfoToLocalStorage() {
  const uid = generateRandomUID();
  const displayName = await getNickname();
  localStorage.setItem('uid', uid);
  localStorage.setItem('displayName', displayName);
}
function getUserInfoFromLocalStorage() {
  const uid = localStorage.getItem('uid');
  const displayName = localStorage.getItem('displayName');
  return { uid, displayName };
}

const SendMessage = () => {
  const [message, setMessage] = useState('');

  const sendMessage = async (event: any) => {
    event.preventDefault();
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
    setMessage('');
  };

  useEffect(() => {
    const storedUid = localStorage.getItem('uid');
    const storedDisplayName = localStorage.getItem('displayName');
    if (!storedUid || !storedDisplayName) {
      saveUserInfoToLocalStorage();
    }
  }, []);

  return (
    <SendMessageForm onSubmit={(event) => sendMessage(event)}>
      <SendMessageInput
        name="messageInput"
        type="text"
        placeholder="메시지를 입력해주세요..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <SendMessageButton type="submit">전송</SendMessageButton>
    </SendMessageForm>
  );
};

export default SendMessage;
