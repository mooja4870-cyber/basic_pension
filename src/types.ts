export interface AppData {
  birthYear: number;
  age: number;
  householdType: '단독' | '부부' | '';
  기준액: number;
  monthlyIncome: number; // in 만원
  region: string;
  realEstate: number; // in 만원
  financial: number; // in 만원
  debt: number; // in 만원
  소득인정액: number;
  소득평가액: number;
  재산소득환산액: number;
}

export const initialData: AppData = {
  birthYear: 0,
  age: 0,
  householdType: '',
  기준액: 0,
  monthlyIncome: 0,
  region: '',
  realEstate: 0,
  financial: 0,
  debt: 0,
  소득인정액: 0,
  소득평가액: 0,
  재산소득환산액: 0,
};

export type ScreenName = 'screen1' | 'screen2' | 'screen3' | 'screen4' | 'screen5' | 'screen6' | 'screen7' | 'screen8';
