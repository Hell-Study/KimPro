import React, { Suspense } from 'react';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { useRecoilValue } from 'recoil';
import { ThemeProvider } from 'styled-components';
import { ReactQueryDevtools } from 'react-query/devtools';
import { GlobalStyle } from './styles/GlobalStyle';
import { lightTheme, darkTheme } from './styles/theme';
import { themeState } from './recoil/atoms/theme';

const Home = React.lazy(() => import('pages/home'));

function App() {
  const currentTheme = useRecoilValue(themeState);
  return (
    <>
      <ThemeProvider theme={currentTheme === 'light' ? lightTheme : darkTheme}>
        <GlobalStyle />
        <BrowserRouter>
          <div className="App">
            <Suspense fallback={<div>로딩중...</div>}>
              <Routes>
                <Route path="/Final-Project" element={<Home />}></Route>
              </Routes>
            </Suspense>
          </div>
        </BrowserRouter>
        <ReactQueryDevtools initialIsOpen={true} />
      </ThemeProvider>
    </>
  );
}

export default App;
