export const PAIR_DATA = {
  'S&P': { id: '166', intervals: ['PT1M', 'PT30M', 'P1D'] },
  NASDAQ: { id: '1175151', intervals: ['PT1M', 'PT30M', 'P1D'] },
  KOSPI: { id: '37426', intervals: ['PT5M', 'PT30M', 'P1D'] },
  KOSDAQ: { id: '38016', intervals: ['PT1M', 'PT30M', 'P1D'] },
};

export const validInterval = ['PT1M', 'PT5M', 'PT30M', 'P1D'] as const;
export type Interval = (typeof validInterval)[number];
