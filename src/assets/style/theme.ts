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
    primary1: '#4361EE',
    primary2: '#899DFC',
    bg_page: '#F9FAFC',
    bg_element1: '#FAFBFF',
    bg_element2: '#E8ECFD',
    bg_element3: '#FCFCFC',
    heading1: '#34363F',
    heading2: '#565863',
    text1: '#262626',
    text2: '#646572',
    text3: '#8C8F9F',
    icon: '#C3C5CD',
    border1: '#EDEEF2',
    border2: '#E7E8EF',
    alpha1: 'rgba(48, 73, 191, 0.7)',
    alpha2: 'rgba(48, 73, 191, 0.3)',
  },
};

export const darkTheme: DefaultTheme = {
  ...commonStyle,
  colors: {
    ...commonStyle.colors,
    primary1: '#4062FF',
    primary2: '#899DFC',
    bg_page: '#171923',
    bg_element1: '#474a64',
    bg_element2: '#303346',
    bg_element3: '#232533',
    heading1: '#F0F1F5',
    heading2: '#D7D9E3',
    text1: '#ebebef',
    text2: '#B3B6C4',
    text3: '#7D8096',
    icon: '#8C91AA',
    border1: '#434557',
    border2: '#2C2F41',
    alpha1: 'rgba(10,10,10,0.5)',
    alpha2: 'rgba(255, 255, 255, 0.1)',
  },
};
