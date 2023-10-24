import React from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { ReactQueryDevtools } from 'react-query/devtools';
import { GlobalStyle } from './assets/style/GlobalStyle';
import { lightTheme, darkTheme } from './assets/style/theme';
import { themeState } from './recoil/atoms/theme';
import { Home } from 'pages/home';

function App() {
  const currentTheme = useRecoilValue(themeState);
  return (
    <>
      <ThemeProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyle />
        <BrowserRouter>
          <div className="App">
            <Routes>
              <Route path="/Final-Project" element={<Home />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;
