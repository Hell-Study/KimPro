import React, { useState, useEffect } from 'react';
import * as styled from './Header.styles';

function Header() {
  return (
    <styled.HeaderContainer>
      <div>서비스이름 : 미정</div>
      <div>환율 : 나영님</div>
      <div>BTC 점유율 : 곧</div>
      <div>24시간 거래량 : 곧</div>
    </styled.HeaderContainer>
  );
}

export default Header;
