import React, { useEffect } from 'react';
import { Timestamp } from 'firebase/firestore';
import { MessageRight, MessageLeft } from './Message.styles';

export type MessageType = {
  uid: string;
  name: string;
  text: string;
  createdAt: Timestamp;
  id: string;
};

interface MessageProps {
  message: MessageType;
}

const Message: React.FC<MessageProps> = ({ message }) => {
  const storedUid = localStorage.getItem('uid');
  const createdAt = message.createdAt.toDate();
  const firstThreeChars = message.uid.substring(0, 3);
  const formattedTime = createdAt.toLocaleTimeString([], {
    hour: '2-digit',
    minute: '2-digit',
  });
  const isCurrentUser = message.uid === storedUid;

  return (
    <div className={`chat-bubble ${isCurrentUser ? 'right' : ''}`}>
      <div className="chat-bubble__right">
        <p className="user-name">
          {message.name} {firstThreeChars}
        </p>
        {isCurrentUser ? (
          <MessageRight>
            <div>{formattedTime}</div>
            <div className="user-message" style={{ marginLeft: '10px' }}>
              {message.text}
            </div>
          </MessageRight>
        ) : (
          <MessageLeft>
            <div className="user-message" style={{ marginRight: '10px' }}>
              {message.text}
            </div>
            <div>{formattedTime}</div>
          </MessageLeft>
        )}
      </div>
    </div>
  );
};
export default Message;
