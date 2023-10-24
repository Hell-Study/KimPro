import styled from 'styled-components';

export const DisplayBoard = styled.main`
  width: 1250px;
  margin: 0 auto;
  display: grid;
  grid-template-rows: 320px 1fr;
  background-color: whitesmoke;

  font-family: Arial, Helvetica, sans-serif;

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

  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
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
