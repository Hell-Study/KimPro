![main](https://github.com/2weeks-team/2weeks-team/assets/39702832/f8318c48-b88d-4f20-a901-634feab46414)

## 목차
1. [**프로젝트 소개**](#1)
2. [**기술 스택**](#2)
3. [**주요 기능**](#3)
4. [**프로젝트 구성도**](#4)
5. [**최적화**](#5)
6. [**팀 소개**](#6)
7. [**폴더 구조**](#7)

<div id="1"></div>

## 📌 프로젝트 소개
**KIMPRO**는 김치프리미엄과 가상화폐 시세 변동을 실시간으로 제공하는 서비스입니다. 국내 거래소 **업비트**, **빗썸**과 해외 거래소 **바이낸스**의 암호화폐 시세를 비교하여, 여러 수치들을 차트, 테이블 등으로 시각화하였습니다.

'김치 프리미엄'의 'KIMP'와 '프로페셔널'의 'PRO'를 조합하여 **KIMPRO**를 저희 서비스 이름으로 정하였으며, 이름에 걸맞게 김치 프리미엄을 유저들에게 프로페셔널하게 제공하고자 합니다.

[**🔗 서비스 바로가기 Click !**](https://hell-study.github.io/Final-Project/) 👈

> **김치 프리미엄(Kimchi premium)**, 김프는 한국에서 거래되는 암호화폐의 시세가 해외 거래소 시세와 비교해 얼마나 높은가를 뜻하는 단어입니다. 해외 거래소보다 높을 경우 '김치 프리미엄이 끼어 있다.' 비슷한 정도로 낮아질 경우 '김치 프리미엄이 빠졌다.'라고 표현합니다.

<div id="2"></div>

## 📌 기술 스택

### Environment

<div style="display: flex;">
  <img src="https://img.shields.io/badge/VSC-007ACC?style=for-the-badge&logo=visual studio&logoColor=white" />
  <img src="https://img.shields.io/badge/github-181717?style=for-the-badge&logo=github&logoColor=white" />
  <img src="https://img.shields.io/badge/git-F05032?style=for-the-badge&logo=git&logoColor=white" />
  <img src="https://img.shields.io/badge/ESLint-4B3263?style=for-the-badge&logo=eslint&logoColor=white" />
  <img src="https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white" />
</div>

### FrontEnd

<div style="display: flex;">
  <img src="https://img.shields.io/badge/html5-%23E34F26.svg?style=for-the-badge&logo=html5&logoColor=white" />
  <img src="https://img.shields.io/badge/css3-1572B6?style=for-the-badge&logo=css3&logoColor=white" />
  <img src="https://img.shields.io/badge/react-%2320232a?style=for-the-badge&logo=react&logoColor=%2361DAFB" />
  <img src="https://img.shields.io/badge/-React%20Query-FF4154?style=for-the-badge&logo=react%20query&logoColor=white">
  <img src="https://img.shields.io/badge/Recoil-oran?style=for-the-badge&logo=Recoil" />
  <img src="https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white" />
  <img src="https://img.shields.io/badge/Socket.io-black?style=for-the-badge&logo=socket.io&badgeColor=010101">
    <img src="https://img.shields.io/badge/styled--components-DB7093?style=for-the-badge&logo=styled-components&logoColor=white">
</div>

### BackEnd

<div style="display: flex;">
  <img src="https://img.shields.io/badge/firebase-%23039BE5.svg?style=for-the-badge&logo=firebase" />
  <img src="https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white" />
</div>

### Others

<div style="display: flex;">
  <img src="https://img.shields.io/badge/jira-0052CC?style=for-the-badge&logo=jira&logoColor=white" />
  <img src="https://img.shields.io/badge/notion-000000?style=for-the-badge&logo=notion&logoColor=white" />
  <img src="https://img.shields.io/badge/figma-%23F24E1E?style=for-the-badge&logo=figma&logoColor=white" />
    <img src="https://img.shields.io/badge/github%20pages-121013?style=for-the-badge&logo=github&logoColor=white" />
</div>

<div id="3"></div>

## 📌 주요 기능
| 기능                      | 내용                                                                                                                                |
| :------------------------ | :---------------------------------------------------------------------------------------------------------------------------------- |
| 김프 차트                   | 사용자가 원하는 차트를 셀렉트박스로 선택할 수 있으며, 업비트/빗썸 김치프리미엄과 바이낸스 비트코인 차트를 실시간으로 보여줍니다. |
| 코인 차트               | 코인 테이블에서 선택한 코인 정보와 시세 차트를 실시간으로 보여줍니다.            |
| 코인 테이블 | 사용자가 원하는 거래소를 셀렉트박스로 선택할 수 있으며, 업비트/빗썸 코인의 이름, 현재가, 전일대비, 고가/저가대비, 거래량, 그리고 각각 코인마다 바이낸스와의 김치프리미엄을 실시간으로 보여줍니다. 또한 각 카테고리별 오름/내림차순 정렬이 가능하며, 코인 검색 기능을 지원합니다.       |
| 위젯 | S&P 500, NASDAQ, KOSPI, KOSDAQ, 금 선물의 시세, 전일대비를 수치 및 차트로 보여주며, 캐러셀 형태로 구현하였습니다.                  |
| 채팅 | 사이트 이용자들과 실시간 채팅을 할 수 있으며, 로컬스토리지로 부여받은 닉네임으로 소통할 수 있습니다. (로그인 필요 x)                  |
| 다크/라이트 모드 | 토글 버튼을 통해 서비스 전체의 색상을 다크 또는 라이트로 설정할 수 있으며, 상태를 로컬스토리지로 저장합니다.                 |
| 헤더 | 환율(USD/KRW), 암호화폐/거래소 개수, 전체 시가총액, 24시간 거래량, BTC 점유율, 즉 암호화폐 시장과 관련된 전체적인 수치를 보여줍니다.                  |

<div id="4"></div>

## 📌 프로젝트 구성도
|                                   아키텍처(Architecture)                                   |
| :----------------------------------------------------------------------------------------: |
| <img src="https://github.com/ssafy-mate/ssafy-mate_front-end/assets/39702832/023485a5-276b-4c82-9a13-a2b4e06c75d0" /> |

<div id="5"></div>

## 📌 최적화
|                                              웹 성능 최적화 전                                              |                                     웹 성능 최적화 후                                      |
| :---------------------------------------------------------------------------------------------------------: | :--------------------------------------------------------------------------------------------------------: |
| <img src="https://github.com/Hell-Study/Final-Project/assets/39702832/8b674efa-2dfa-45cd-a95c-c8d6882b0756" alt="웹 성능 최적화 전 분석 이미지" width="500px"/> | <img src="https://github.com/Hell-Study/Final-Project/assets/39702832/8b674efa-2dfa-45cd-a95c-c8d6882b0756" alt="웹 성능 최적화 전 분석 이미지" width="500px"/> |

|           항목           | 웹 성능 최적화 전 | 웹 성능 최적화 후 |
| :----------------------: | :---------------: | :---------------: |
|    Performance Score     |        62         |        88         |
|  First Contentful Paint  |       0.6s        |       0.5s        |
|   Time to Interactive    |       2.8s        |       1.3s        |
|       Speed Index        |       3.5s        |       1.3s        |
|   Total Blocking Time    |       100ms       |        0ms        |
| Largest Contentful Paint |       6.2s        |       2.2s        |
| Cumulative Layout Shift  |       0.128       |       0.001       |

> 무엇, 무엇을 사용하여서 어떻게 바뀌었다

<div id="6"></div>

## 📌 팀 소개

<table>
  <tr>
    <td align="center" width="150px">
      <a href="https://github.com/seungjun222" target="_blank">
        <img src="https://github.com/KDT1-FE/Y_FE_Toy1/assets/39702832/bae37c66-7793-4ab8-a4e9-d2230d9adb9c" alt="어승준 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/suyeonnnnnnn" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/79249376?v=4" alt="서지수 프로필" />
      </a>
    </td>
    <td align="center" width="150px">
      <a href="https://github.com/yangjaehyuk" target="_blank">
        <img src="https://avatars.githubusercontent.com/u/139189221?v=4" alt="박나영 프로필" />
      </a>
    </td>
  </tr>
  <tr>
    <td align="center">
      <a href="https://github.com/seungjun222" target="_blank">
        어승준<br />
                팀장 (FE)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/HOOOO98" target="_blank">
        서지수<br />
                팀원 (FE)
      </a>
    </td>
    <td align="center">
      <a href="https://github.com/JeongMin83" target="_blank">
        박나영<br />
                팀원 (FE)
      </a>
    </td>
  </tr>
</table>

|  이름  |        역할        | <div align="center">개발 내용</div>                                                                                                                                                                                        |
| :----: | :-------: | :------ |
| 어승준 | FE<br />팀장 | - DB 설계<br />- Spring Data JPA 세팅<br />&nbsp;&nbsp;&nbsp;&nbsp;- 채팅 도메인 개발<br />&nbsp;&nbsp;&nbsp;&nbsp;- 로그인 도메인 개발<br />- TypeScript, Nest.js와 Socket.io를 이용한 실시간 채팅 서버 구현<br />&nbsp;&nbsp;&nbsp;&nbsp;- 웹소켓 연결<br />&nbsp;&nbsp;&nbsp;&nbsp;- 1대1 실시간 채팅 구현<br />                                                                                                                                                                                                                                                              |
| 서지수 |      FE      | - DB 설계<br />- Spring Boot로 RESTful API 작성<br />&nbsp;&nbsp;&nbsp;&nbsp;- 로그인 도메인 개발<br />&nbsp;&nbsp;&nbsp;&nbsp;- 회원가입 도메인 개발<br />&nbsp;&nbsp;&nbsp;&nbsp;- 아이디 찾기 도메인 개발<br />&nbsp;&nbsp;&nbsp;&nbsp;- 비밀번호 재설정 도메인 개발<br />&nbsp;&nbsp;&nbsp;&nbsp;- 회원 정보 조회 및 수정 도메인 개발<br />- SMTP Server, Redis를 이용한 이메일 인증 기능 구현<br />                                                                                                                             |
| 박나영 |      FE      | - DB 설계<br />&nbsp;&nbsp;&nbsp;&nbsp;- 기술 스택 데이터 전처리<br />&nbsp;&nbsp;&nbsp;&nbsp;- 교육생 인증 데이터 전처리<br />- 서버에 기술 스택 이미지 업로드<br />- Spring Boot로 RESTful API 작성<br />&nbsp;&nbsp;&nbsp;&nbsp;- 기술 스택 조회 서비스 도메인 개발<br />&nbsp;&nbsp;&nbsp;&nbsp;- 팀 생성/수정/삭제 서비스 도메인 개발                                       |

<div id="7"></div>

## 📌 폴더 구조

<details>
<summary>폴더 구조 보기</summary>

```
Final-Project
├─ src
│  ├─ api
│  │  ├─ bithumb
│  │  │  ├─ fetchBithumbCandlestick.ts
│  │  │  └─ fetchBithumbTicker.ts
│  │  ├─ coingecko
│  │  │  └─ getCoingeckoData.ts
│  │  ├─ getChartWidgetData.ts
│  │  ├─ getGlobalCoinData.ts
│  │  ├─ getNickname.ts
│  │  ├─ getTickerWidgetData.ts
│  │  └─ upbit
│  │     ├─ useCreateChart.ts
│  │     └─ useFetchUpbitMarketCode.ts
│  ├─ App.css
│  ├─ App.test.tsx
│  ├─ App.tsx
│  ├─ assets
│  │  ├─ fonts
│  │  │  └─ foo
│  │  ├─ images
│  │  │  ├─ Chat-Btn.svg
│  │  │  ├─ Chat.svg
│  │  │  ├─ Logo-Dark.svg
│  │  │  └─ Logo-Light.svg
│  │  └─ style
│  │     ├─ GlobalStyle.ts
│  │     └─ theme.ts
│  ├─ components
│  │  ├─ bithumb
│  │  │  ├─ Bithumb.type.ts
│  │  │  ├─ ChartComponent.tsx
│  │  │  ├─ index.ts
│  │  │  └─ RealTimeChart.tsx
│  │  ├─ ChartLeft
│  │  │  ├─ ChartInfo.tsx
│  │  │  ├─ ChartLeft.constant.ts
│  │  │  ├─ ChartLeft.styles.ts
│  │  │  ├─ ChartLeft.tsx
│  │  │  ├─ index.ts
│  │  │  └─ TradingViewWidget.tsx
│  │  ├─ ChartRight
│  │  │  ├─ ChartRight.styles.ts
│  │  │  ├─ ChartRight.tsx
│  │  │  └─ index.ts
│  │  ├─ ChatBox
│  │  │  ├─ ChatBox.styles.ts
│  │  │  ├─ ChatBox.tsx
│  │  │  └─ index.ts
│  │  ├─ common
│  │  │  ├─ Footer
│  │  │  │  ├─ Footer.styles.ts
│  │  │  │  ├─ Footer.tsx
│  │  │  │  └─ index.ts
│  │  │  └─ Header
│  │  │     ├─ Header.styles.ts
│  │  │     ├─ Header.tsx
│  │  │     └─ index.ts
│  │  ├─ CustomSelect
│  │  │  ├─ CustomSelect.styles.ts
│  │  │  ├─ CustomSelect.tsx
│  │  │  ├─ CustomSelect.types.ts
│  │  │  └─ index.ts
│  │  ├─ Message
│  │  │  ├─ index.ts
│  │  │  ├─ Message.styles.ts
│  │  │  ├─ Message.tsx
│  │  │  └─ Message.types.ts
│  │  ├─ SendMessage
│  │  │  ├─ index.ts
│  │  │  ├─ SendMessage.styles.ts
│  │  │  └─ SendMessage.tsx
│  │  ├─ Table
│  │  │  ├─ Bithumb.tsx
│  │  │  ├─ BithumbTable.tsx
│  │  │  ├─ index.ts
│  │  │  ├─ Table.constant.ts
│  │  │  ├─ Table.styles.ts
│  │  │  ├─ Table.tsx
│  │  │  ├─ TableHeader
│  │  │  │  ├─ index.ts
│  │  │  │  ├─ TableHeader.styles.ts
│  │  │  │  ├─ TableHeader.tsx
│  │  │  │  ├─ TableHeaderItem.styles.tsx
│  │  │  │  └─ TableHeaderItem.tsx
│  │  │  └─ UpbitTable.tsx
│  │  └─ Widget
│  │     ├─ Carousel.tsx
│  │     ├─ ChartWidget.tsx
│  │     │  ...
│  │     └─ Widget.types.ts
│  ├─ firebase
│  │  ├─ config.ts
│  │  ├─ createMessages.ts
│  │  │  ...
│  │  └─ orderSnapshotMessages.ts
│  ├─ hooks
│  │  ├─ binance
│  │  │  ├─ updateBithumbSocketDataWithBinance.ts
│  │  │  ├─ updateUpbitListWithBinance.ts
│  │  │  ├─ useBinanceTicker.ts
│  │  │  └─ useFetchExchangeRate.ts
│  │  ├─ bithumb
│  │  │  ├─ useBithumbWsTicker.ts
│  │  │  ├─ useFetchBithumbticker.ts
│  │  │  └─ useMatchCoingecko.ts
│  │  ├─ upbit
│  │  │  └─ useUpbitTicker.ts
│  │  ├─ useChartTickers.ts
│  │  ├─ useDropdown.ts
│  │  │  ...
│  │  └─ useWidgetTickers.ts
│  ├─ index.css
│  ├─ index.tsx
│  ├─ pages
│  │  └─ home
│  │     ├─ Home.page.tsx
│  │     ├─ Home.styles.ts
│  │     └─ index.ts
│  ├─ react-app-env.d.ts
│  ├─ recoil
│  │  ├─ atoms
│  │  │  ├─ bithumb.ts
│  │  │  ├─ coingecko.ts
│  │  │  │  ...
│  │  │  └─ upbit.ts
│  │  └─ selectors
│  │     └─ foo.ts
│  ├─ reportWebVitals.ts
│  ├─ setupTests.ts
│  ├─ styles
│  │  └─ globalStyle.ts
│  └─ utils
│     ├─ convertMillonWon.ts
│     │  ...
│     ├─ getFormattedValues.ts
└─ tsconfig.json

```
</details>

### 📌 개발 기간 :  `4주` `23.10.09 ~ 23.11.03`
