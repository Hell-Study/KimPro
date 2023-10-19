import React, { useState, useEffect } from 'react';
import { db } from '../../firebase/config';
import { addDoc, collection, serverTimestamp } from 'firebase/firestore';

// 랜덤 uid 생성 함수
function generateRandomUID() {
  // 임의의 숫자를 생성하고 문자열로 변환
  const randomString = Math.random().toString(36).substr(2, 10);
  const uppercaseString = randomString.replace(/[a-z]/g, (char) =>
    char.toUpperCase(),
  );
  return uppercaseString;
}

// 랜덤 displayName 생성 함수
function generateRandomDisplayName() {
  const adjectives = ['Happy', 'Sad', 'Angry', 'Excited', 'Calm', 'Funny'];
  const nouns = ['Penguin', 'Unicorn', 'Kangaroo', 'Elephant', 'Dolphin'];
  const randomAdjective =
    adjectives[Math.floor(Math.random() * adjectives.length)];
  const randomNoun = nouns[Math.floor(Math.random() * nouns.length)];
  return `${randomAdjective}${randomNoun}`;
}

// uid와 displayName을 로컬 스토리지에 저장
function saveUserInfoToLocalStorage() {
  const uid = generateRandomUID();
  const displayName = generateRandomDisplayName();
  localStorage.setItem('uid', uid);
  localStorage.setItem('displayName', displayName);
}

// 로컬 스토리지에서 uid와 displayName을 가져오는 함수
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
      alert('Enter valid message');
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
    // 페이지 로드 시 사용자 정보를 로컬 스토리지에 저장
    const storedUid = localStorage.getItem('uid');
    const storedDisplayName = localStorage.getItem('displayName');

    if (!storedUid || !storedDisplayName) {
      saveUserInfoToLocalStorage();
    }
  }, []);

  return (
    <form onSubmit={(event) => sendMessage(event)} className="send-message">
      <label htmlFor="messageInput" hidden>
        Enter Message
      </label>
      <input
        id="messageInput"
        name="messageInput"
        type="text"
        className="form-input__input"
        placeholder="type message..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button type="submit">Send</button>
    </form>
  );
};

export default SendMessage;
