import styled from 'styled-components';
import { ReactComponent as ChatBtn } from 'assets/images/Chat-Btn.svg';

export const DisplayBoard = styled.main`
  width: ${({ theme }) => theme.sizes.lg};
  margin: 0 auto;
  display: grid;
  //grid-template-rows: 320px 1fr;

  *::-webkit-scrollbar,
  *::-webkit-scrollbar-thumb {
    width: 0px;
  }

  *::-webkit-scrollbar-thumb {
  }
  *:hover::-webkit-scrollbar,
  *:hover::-webkit-scrollbar-thumb {
    width: 26px;
    border-radius: 13px;
    background-clip: padding-box;
    border: 12px solid transparent;
    color: grey;
  }

  *:hover::-webkit-scrollbar-thumb {
    box-shadow: inset 0 0 0 10px;
  }
`;

export const ChartsWrapper = styled.div`
  background-color: whitesmoke;
  padding: 5px;
  display: grid;
  gap: 5px;
  grid-template-columns: 1fr 1fr;
`;

interface ChatButtonProps {
  $isOpen: boolean;
}

export const ChatButton = styled.button<ChatButtonProps>`
  background: ${({ theme }) => theme.colors.bg_element2};
  border: 1px solid ${({ theme }) => theme.colors.border1};
  width: 130px;
  height: 80px;
  border-top-left-radius: 45px;
  border-bottom-left-radius: 45px;
  position: fixed;
  top: 50%;
  right: 0;
  padding: 0 1.4rem;
  transform: ${({ $isOpen }) =>
    $isOpen ? 'translate(130px, 0)' : 'translate(30px, 0)'};
  box-shadow: ${({ theme }) => theme.colors.alpha1} 0px 5px 20px 0px;
  transition:
    background 180ms cubic-bezier(0.25, 0.75, 0.5, 1.25) 0ms,
    transform 0.4s cubic-bezier(0.25, 0.75, 0.5, 1.25);
  z-index: 1;
  cursor: pointer;

  & img {
    width: 100%;
    height: auto;
  }

  &:hover {
    background: ${({ theme }) => theme.colors.bg_element1};
    transform: translate(5px, 0);
  }
`;

export const Icon = styled(ChatBtn)`
  width: 60px;
  height: 90px;
  transform: translate(-10px, 0px);
`;
