import React, { useEffect } from 'react';
import { Timestamp } from 'firebase/firestore';
import {
  MessageRight,
  MessageLeft,
  UserMessage,
  UserName,
  ChatBubble,
} from './Message.styles';

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
    <ChatBubble style={isCurrentUser ? { marginLeft: 'auto' } : {}}>
      <div>
        <UserName>
          {message.name} {firstThreeChars}
        </UserName>
        {isCurrentUser ? (
          <MessageRight>
            <div>{formattedTime}</div>
            <UserMessage style={{ marginLeft: '10px' }}>
              {message.text}
            </UserMessage>
          </MessageRight>
        ) : (
          <MessageLeft>
            <UserMessage style={{ marginRight: '10px' }}>
              {message.text}
            </UserMessage>
            <div>{formattedTime}</div>
          </MessageLeft>
        )}
      </div>
    </ChatBubble>
  );
};
export default Message;
