import styled from 'styled-components';

export const DisplayBoard = styled.main`
  width: ${({ theme }) => theme.sizes.md};
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

export const ChatButton = styled.button`
  width: 100px;
  height: 100px;
  border-radius: 100px;
  position: fixed;
  top: 50%;
  right: 0;
  transform: translateY(-50%);
`;
