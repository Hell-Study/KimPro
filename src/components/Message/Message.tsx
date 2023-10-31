import React from 'react';
import * as styled from './Message.styles';
import { MessageProps } from './Message.types';

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
    <styled.ChatBubble style={isCurrentUser ? { marginLeft: 'auto' } : {}}>
      <div>
        <styled.UserName>
          {message.name} {firstThreeChars}
        </styled.UserName>
        {isCurrentUser ? (
          <styled.MessageRight>
            <div>{formattedTime}</div>
            <styled.UserMessage style={{ marginLeft: '10px' }}>
              {message.text}
            </styled.UserMessage>
          </styled.MessageRight>
        ) : (
          <styled.MessageLeft>
            <styled.UserMessage style={{ marginRight: '10px' }}>
              {message.text}
            </styled.UserMessage>
            <div>{formattedTime}</div>
          </styled.MessageLeft>
        )}
      </div>
    </styled.ChatBubble>
  );
};
export default Message;
