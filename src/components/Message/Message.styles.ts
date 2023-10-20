import styled from 'styled-components';

export const MessageRight = styled.div`
  display: flex;
  justify-content: flex-end;
`;

export const MessageLeft = styled.div`
  display: flex;
`;

export const UserName = styled.p`
  font-weight: bold;
  margin-bottom: 5px;
  font-size: 0.9rem;
  color: white;
`;

export const UserMessage = styled.div`
  word-break: break-all;
  background-color: #fff;
  color: black;
  padding: 3px 5px;
  border-radius: 5px;
`;

export const ChatBubble = styled.div`
  padding: 10px 0;
  color: white;
  width: max-content;
  max-width: calc(100% - 50px);
  display: flex;
  align-items: flex-start;
`;
