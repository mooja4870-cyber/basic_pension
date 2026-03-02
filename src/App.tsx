import { useState, useCallback, useEffect } from 'react';
import { AppData, ScreenName, initialData } from './types';
import { Screen1 } from './screens/Screen1';
import { Screen2 } from './screens/Screen2';
import { Screen3 } from './screens/Screen3';
import { Screen4 } from './screens/Screen4';
import { Screen5 } from './screens/Screen5';
import { Screen6 } from './screens/Screen6';
import { Screen7 } from './screens/Screen7';
import { Screen8 } from './screens/Screen8';

export function App() {
  const [currentScreen, setCurrentScreen] = useState<ScreenName>('screen1');
  const [data, setData] = useState<AppData>({ ...initialData });

  // Scroll to top on screen change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentScreen]);

  const handleRestart = useCallback(() => {
    setData({ ...initialData });
    setCurrentScreen('screen1');
  }, []);

  const handleScreen2Next = useCallback((birthYear: number, age: number) => {
    setData(prev => ({ ...prev, birthYear, age }));
    setCurrentScreen('screen3');
  }, []);

  const handleScreen3Select = useCallback((type: '단독' | '부부', 기준액: number) => {
    setData(prev => ({ ...prev, householdType: type, 기준액 }));
    setCurrentScreen('screen4');
  }, []);

  const handleScreen4Next = useCallback((income: number) => {
    setData(prev => ({ ...prev, monthlyIncome: income }));
    setCurrentScreen('screen5');
  }, []);

  const handleScreen5Next = useCallback(
    (region: string, realEstate: number, financial: number, debt: number, 소득인정액: number, 소득평가액: number, 재산소득환산액: number) => {
      setData(prev => ({
        ...prev,
        region,
        realEstate,
        financial,
        debt,
        소득인정액,
        소득평가액,
        재산소득환산액,
      }));
      setCurrentScreen('screen6');
    },
    []
  );

  const renderScreen = () => {
    switch (currentScreen) {
      case 'screen1':
        return <Screen1 onNext={() => setCurrentScreen('screen2')} />;
      case 'screen2':
        return <Screen2 onNext={handleScreen2Next} />;
      case 'screen3':
        return <Screen3 onSelect={handleScreen3Select} />;
      case 'screen4':
        return <Screen4 onNext={handleScreen4Next} />;
      case 'screen5':
        return <Screen5 monthlyIncome={data.monthlyIncome} onNext={handleScreen5Next} />;
      case 'screen6':
        return (
          <Screen6
            data={data}
            onApplyInfo={() => setCurrentScreen('screen7')}
            onRestart={handleRestart}
          />
        );
      case 'screen7':
        return (
          <Screen7
            onChannel={() => setCurrentScreen('screen8')}
            onRestart={handleRestart}
          />
        );
      case 'screen8':
        return <Screen8 onRestart={handleRestart} />;
      default:
        return <Screen1 onNext={() => setCurrentScreen('screen2')} />;
    }
  };

  return (
    <div className="max-w-lg mx-auto min-h-screen shadow-2xl relative">
      {/* Top header bar */}
      {currentScreen !== 'screen1' && (
        <div className="sticky top-0 z-50 bg-[#1A56DB] text-white px-4 py-3 flex items-center gap-3 shadow-md">
          {currentScreen !== 'screen6' && currentScreen !== 'screen7' && currentScreen !== 'screen8' && (
            <button
              onClick={() => {
                const screens: ScreenName[] = ['screen1', 'screen2', 'screen3', 'screen4', 'screen5', 'screen6', 'screen7', 'screen8'];
                const idx = screens.indexOf(currentScreen);
                if (idx > 0) setCurrentScreen(screens[idx - 1]);
              }}
              className="text-[24px] font-bold p-1 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="뒤로가기"
            >
              ←
            </button>
          )}
          {(currentScreen === 'screen6' || currentScreen === 'screen7' || currentScreen === 'screen8') && (
            <button
              onClick={handleRestart}
              className="text-[24px] font-bold p-1 hover:bg-white/20 rounded-lg transition-colors"
              aria-label="처음으로"
            >
              🏠
            </button>
          )}
          <h1 className="text-[20px] font-bold flex-1 text-center pr-8">
            {currentScreen === 'screen2' && '① 나이 확인'}
            {currentScreen === 'screen3' && '② 가구 유형'}
            {currentScreen === 'screen4' && '③ 소득 정보'}
            {currentScreen === 'screen5' && '④ 재산 정보'}
            {currentScreen === 'screen6' && '진단 결과'}
            {currentScreen === 'screen7' && '신청 방법 안내'}
            {currentScreen === 'screen8' && '시니어 본색'}
          </h1>
        </div>
      )}

      {renderScreen()}
    </div>
  );
}
