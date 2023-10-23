import styled from 'styled-components';
import Modal from 'react-modal';

export const StyledModal = styled(Modal)`
  position: fixed;
  top: 55%;
  right: 0;
  transform: translateY(-50%);
  margin-right: 10px;
  border-radius: 20px;
  background-color: #1c2c4c;
  width: 400px;
  height: 600px;
`;

export const ModalInsideWrapper = styled.div``;

export const ChatBoxHeader = styled.div`
  position: fixed;
  top: 0px;
  width: 100%;
  padding: 20px 30px;
  background-color: #4c768d;
  display: flex;
  justify-content: space-between;
  border-radius: 20px 20px 0 0;
  color: white;
`;

export const ButtonWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 10px;
`;

export const Button = styled.button`
  border-radius: 10px;
  padding: 5px 10px;
`;

export const MessagesWrapper = styled.div`
  padding: 60px 20px 50px;
  max-height: 560px; /* 600 - 40 */

  overflow-y: scroll;
  scroll-behavior: smooth;
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background: #888;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-thumb:hover {
    background: #555;
  }
  &::-webkit-scrollbar-track {
    background: #333;
  }
`;

export const ScrollToBottomButton = styled.button`
  position: fixed;
  top: 83%;
  right: 0;
  transform: translateY(-83%);
  margin-right: 10px;
  border-radius: 60px;
  background-color: white;
  width: 60px;
  height: 60px;
  font-size: 1.3rem;
`;
