import React, { useState, useEffect } from 'react';
import { createMessages } from '../../firebase/createMessages';
import shortId from 'shortid';
import getNickname from 'api/getNickname';
import { RiSendPlaneFill } from 'react-icons/ri';
import * as styled from './SendMessage.styles';

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

const SendMessage = () => {
  const [message, setMessage] = useState('');

  const handleSendMessage = async (event: any) => {
    event.preventDefault();
    if (message.trim() === '') {
      alert('메시지를 입력해주세요');
      return;
    }
    createMessages(message);
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
    <styled.SendMessageForm onSubmit={(event) => handleSendMessage(event)}>
      <styled.SendMessageWrapper>
        <styled.SendMessageInput
          name="messageInput"
          type="text"
          placeholder="메시지를 입력해주세요..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <styled.SendMessageButton type="submit">
          <RiSendPlaneFill />
        </styled.SendMessageButton>
      </styled.SendMessageWrapper>
    </styled.SendMessageForm>
  );
};

export default SendMessage;
