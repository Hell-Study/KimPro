import React from 'react';
import './App.css';
import { Route, BrowserRouter, Routes } from 'react-router-dom';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Home } from 'pages/home';

function App() {
  return (
    <>
      <BrowserRouter>
        <div className="App">
          <Routes>
            <Route path="/Final-Project" element={<Home />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} />
    </>
  );
}

export default App;
