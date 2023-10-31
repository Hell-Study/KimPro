import React, { useEffect, useRef } from 'react';
import { useRecoilValue } from 'recoil';
import { selectState } from '../../recoil/atoms/selectState';
import { TRADING_VIEW_SYMBOLS } from './ChartLeft.constant';

declare global {
  interface Window {
    TradingView: any;
  }
}

let tvScriptLoadingPromise: Promise<void> | undefined;

export default function TradingViewWidget() {
  const selectedOption = useRecoilValue(selectState);
  const onLoadScriptRef = useRef<null | (() => void)>(null);

  useEffect(() => {
    onLoadScriptRef.current = createWidget;

    if (!tvScriptLoadingPromise) {
      tvScriptLoadingPromise = new Promise<void>((resolve) => {
        const script = document.createElement('script');
        script.id = 'tradingview-widget-loading-script';
        script.src = 'https://s3.tradingview.com/tv.js';
        script.type = 'text/javascript';
        script.onload = () => resolve();

        document.head.appendChild(script);
      });
    }

    tvScriptLoadingPromise.then(() => {
      if (onLoadScriptRef.current) {
        onLoadScriptRef.current();
      }
    });

    return () => {
      onLoadScriptRef.current = null;
    };

    function createWidget() {
      if (
        document.getElementById('tradingview_0e511') &&
        'TradingView' in window
      ) {
        new window.TradingView.widget({
          autosize: true,
          symbol: getTradingViewSymbol(selectedOption),
          interval: '15',
          timezone: 'Asia/Seoul',
          theme: 'light',
          style: '1',
          locale: 'kr',
          enable_publishing: false,
          hide_top_toolbar: true,
          hide_volume: true,
          save_image: false,
          backgroundColor: 'transparent',
          container_id: 'tradingview_0e511',
        });
      }
    }

    function getTradingViewSymbol(exchange: string) {
      if (exchange in TRADING_VIEW_SYMBOLS) {
        return TRADING_VIEW_SYMBOLS[
          exchange as keyof typeof TRADING_VIEW_SYMBOLS
        ];
      }
      return TRADING_VIEW_SYMBOLS.BINANCE;
    }
  }, [selectedOption]);

  return (
    <>
      <div
        className="tradingview-widget-container"
        style={{ height: '100%', width: '100%' }}
      >
        <div
          id="tradingview_0e511"
          style={{ height: 'calc(100% - 32px)', width: '100%' }}
        />
      </div>
    </>
  );
}
