import { CalcIncome, CalcAssets, RegionType } from '../types';

export const pensionService = {
  /**
   * 소득인정액 계산
   */
  calculateIncomeRecognition(income: CalcIncome, assets: CalcAssets, region: RegionType): number {
    const earned = parseInt(income.earned || '0') * 10000;
    const other = parseInt(income.other || '0') * 10000;
    const general = parseInt(assets.general || '0') * 10000;
    const financial = parseInt(assets.financial || '0') * 10000;
    const debt = parseInt(assets.debt || '0') * 10000;

    // 1. 소득평가액 = (근로소득 - 110만원) * 0.7 + 기타소득
    // ※ 2026년 기준 공제액 등은 변동될 수 있으나 현재 로직 유지
    const earnedEval = Math.max(0, (earned - 1100000) * 0.7);
    const incomeEval = earnedEval + other;

    // 2. 재산의 소득환산액 = [ (일반재산 - 지역별공제) + (금융재산 - 2000만원) - 부채 ] * 0.04 / 12
    const regionDeduction = region === 'big' ? 135000000 : region === 'medium' ? 85000000 : 72500000;
    const financialDeduction = 20000000;
    
    // (일반재산 - 공제액) + (금융재산 - 공제액) - 부채가 음수면 0으로 처리
    const assetValue = Math.max(0, (general - regionDeduction) + (financial - financialDeduction) - debt);
    const assetEval = (assetValue * 0.04) / 12;

    return Math.floor(incomeEval + assetEval);
  },

  /**
   * 자가진단 로직
   */
  checkEligibility(age: string, residence: 'domestic' | 'overseas'): 'eligible' | 'ineligible' | 'maybe' {
    const ageNum = parseInt(age);
    if (isNaN(ageNum)) return 'ineligible';

    if (ageNum < 65) {
      return 'ineligible';
    } else if (residence === 'overseas') {
      return 'ineligible';
    } else {
      // 나이와 거주지가 충족되면 소득인정액 심사가 필요하므로 'maybe'(수급 가능성 높음)를 반환
      return 'maybe';
    }
  }
};
