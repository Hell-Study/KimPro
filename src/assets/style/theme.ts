import { DefaultTheme } from 'styled-components';

const commonStyle = {
  colors: {
    white: '#ffffff',
    black: '#000000',
    red: '#EC635F',
    green: '#74E293',
    alpha_primary1: 'rgb(60, 87, 214, 0.3)',
    alpha_primary2: 'rgb(197, 206, 250, 0.2)',
  },
};

export const lightTheme: DefaultTheme = {
  ...commonStyle,
  colors: {
    ...commonStyle.colors,
    primary: '#4361ee',
    primary2: '#7d92ff',
    bg_page: '#f9fafc',
    heading1: '#1d1e23',
    heading2: '#bbbbbb',
    bg_element1: '#e8ecfd',
    bg_element2: '#fafbff',
    bg_element3: '#f4f6f9',
    bg_element4: '#ffffff',
    bg_element5: '#ffffff',
    text1: '#262626',
    text2: '#575c6d',
    text3: '#8c8f9f',
    icon: '#919eab',
    border1: '#edeef2',
    alpha1: 'rgba(48, 73, 191, 0.7)',
    alpha2: 'rgba(48, 73, 191, 0.3)',
  },
};

export const darkTheme: DefaultTheme = {
  ...commonStyle,
  colors: {
    ...commonStyle.colors,
    primary1: '#4062ff',
    primary2: '#889cfd',
    bg_page: '#161822',
    heading1: '#fcfcff',
    heading2: '#bbbbbb',
    bg_element1: '#474a64',
    bg_element2: '#303346',
    bg_element3: '#282a38',
    bg_element4: '#232533',
    bg_element5: '#14151c',
    text1: '#ebebef',
    text2: '#b3b6c4',
    text3: '#7d8096',
    icon: '#8c91aa',
    border1: '#434557',
    alpha1: 'rgba(255, 255, 255, 0.1)',
    alpha2: 'rgba(10,10,10,0.5)',
  },
};
