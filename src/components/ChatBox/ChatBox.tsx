import React, { useEffect, useRef, useState } from 'react';
import { fetchMessages } from '../../firebase/fetchMessages';
import { Message } from 'components/Message';
import { MessageType } from 'components/Message/Message';
import { SendMessage } from 'components/SendMessage';
import { useRecoilState } from 'recoil';
import { modalIsOpenState } from 'recoil/atoms/upbit';
import * as styled from './ChatBox.styles';
import { StyledModal } from './ChatBox.styles';
// 닉네임 업데이트 함수
const updateNickname = () => {
  const userChosenNickname = prompt('변경할 닉네임을 입력해주세요');
  if (userChosenNickname) {
    try {
      localStorage.setItem('displayName', userChosenNickname);
    } catch (error) {
      console.error('Error updating nickname:', error);
    }
  }
};

const overlayStyles = {
  overlay: {
    zIndex: 2, // 1 이하이면 차트 선택됨
    backgroundColor: 'rgba(0, 0, 0, 0)',
  },
};

const ChatBox = () => {
  const [modalIsOpen, setModalIsOpen] = useRecoilState(modalIsOpenState);

  const closeModal = () => {
    setModalIsOpen(false);
  };

  const [messages, setMessages] = useState<MessageType[]>([]);
  const storedDisplayName = localStorage.getItem('displayName');
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messagesWrapperRef = useRef<HTMLDivElement | null>(null);
  const [isAtBottom, setIsAtBottom] = useState(true);
  const [lastMessage, setLastMessage] = useState<MessageType | null>(null);

  const loadPreviousMessages = () => {
    if (messages.length > 0) {
      const newLastMessage = messages[0]; // 가장 오래된 메시지
      fetchMessages(
        (newMessages) => setMessages([...newMessages, ...messages]),
        newLastMessage,
      );
      setLastMessage(newLastMessage);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView();
    }
  };

  const handleScroll = (e: React.UIEvent<HTMLDivElement>) => {
    const target = e.target as HTMLDivElement;
    const bottom =
      target.scrollHeight - target.scrollTop === target.clientHeight;
    if (!bottom) {
      setIsAtBottom(false);
    }
    if (target.scrollTop === 0) {
      const oldScrollHeight = target.scrollHeight;

      requestAnimationFrame(() => {
        target.scrollTop = target.scrollHeight - oldScrollHeight;
      });
    }
    if (!messagesWrapperRef.current) {
      return;
    }

    const { scrollTop, scrollHeight, clientHeight } =
      messagesWrapperRef.current;
    const atBottom = scrollHeight - (scrollTop + clientHeight) < 10;
    setIsAtBottom(atBottom);
  };

  useEffect(() => {
    if (isAtBottom) {
      scrollToBottom();
    }
  }, [messages, isAtBottom]);

  useEffect(() => {
    const unsubscribe = fetchMessages(setMessages);
    return () => unsubscribe();
  }, []);

  return (
    <StyledModal
      isOpen={modalIsOpen}
      onRequestClose={closeModal}
      style={overlayStyles}
    >
      <styled.ModalInsideWrapper>
        <styled.ChatBoxHeader>
          <div>CHAT</div>
          <div onClick={updateNickname} style={{ cursor: 'pointer' }}>
            {storedDisplayName}
          </div>
        </styled.ChatBoxHeader>
        <styled.MessagesWrapper
          onScroll={handleScroll}
          ref={messagesWrapperRef}
        >
          <styled.ButtonWrapper>
            <styled.Button onClick={loadPreviousMessages}>
              이전 채팅 불러오기
            </styled.Button>
          </styled.ButtonWrapper>
          {messages?.map((message) => (
            <Message key={message.id} message={message} />
          ))}
          <div ref={messagesEndRef} />
        </styled.MessagesWrapper>
        {!isAtBottom && (
          <styled.ScrollToBottomButton onClick={scrollToBottom}>
            🔻
          </styled.ScrollToBottomButton>
        )}
        <SendMessage />
      </styled.ModalInsideWrapper>
    </StyledModal>
  );
};

export default ChatBox;
