import React from 'react';
import { AppData } from '../types';

interface Props {
  data: AppData;
  onApplyInfo: () => void;
  onRestart: () => void;
}

const formatNumber = (n: number): string => {
  return Math.round(n).toLocaleString('ko-KR');
};

export const Screen6: React.FC<Props> = ({ data, onApplyInfo, onRestart }) => {
  const isEligible = data.소득인정액 <= data.기준액;
  const 초과금액 = data.소득인정액 - data.기준액;

  return (
    <div className="min-h-screen bg-white flex flex-col px-6 py-8 animate-fade-in">
      {/* Progress */}
      <div className="mb-4">
        <div className="w-full h-3 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full bg-[#1A56DB] rounded-full progress-animate" style={{ width: '100%' }} />
        </div>
      </div>

      {isEligible ? (
        <>
          {/* Eligible Result */}
          <div className="bg-[#E8F5E9] rounded-2xl p-6 mb-6 text-center animate-bounce-in">
            <p className="text-[60px] mb-2">🎉</p>
            <h2 className="text-[32px] font-bold text-[#16A34A] mb-4">축하합니다!</h2>
            <p className="text-[24px] text-[#222222] leading-relaxed">
              기초연금을 받으실 수 있습니다!
            </p>
          </div>

          {/* Expected Amount */}
          <div className="bg-[#F0F7FF] rounded-2xl p-6 mb-6 text-center">
            <p className="text-[22px] text-[#555555] mb-2">💰 예상 월 수급액</p>
            {data.householdType === '단독' ? (
              <p className="text-[28px] font-bold text-[#1A56DB]">
                최대 {formatNumber(349700)}원
              </p>
            ) : (
              <>
                <p className="text-[26px] font-bold text-[#1A56DB] mb-1">
                  부부 각각 최대 {formatNumber(279760)}원
                </p>
                <p className="text-[22px] text-[#555555]">
                  (합계 {formatNumber(559520)}원)
                </p>
              </>
            )}
          </div>
        </>
      ) : (
        <>
          {/* Not Eligible Result */}
          <div className="bg-[#FFEBEE] rounded-2xl p-6 mb-6 text-center animate-bounce-in">
            <p className="text-[60px] mb-2">😢</p>
            <h2 className="text-[32px] font-bold text-[#D32F2F] mb-4">수급이 어렵습니다</h2>
            <p className="text-[22px] text-[#222222] leading-relaxed">
              현재 소득인정액이<br />선정 기준액을 초과합니다.
            </p>
            <p className="text-[22px] text-[#D32F2F] font-bold mt-3">
              초과 금액: {formatNumber(초과금액)}원
            </p>
          </div>

          <div className="bg-[#F0F7FF] rounded-2xl p-5 mb-6">
            <p className="text-[20px] text-[#1A56DB] text-center leading-relaxed">
              💡 하지만 정확한 판정은<br />
              주민센터에서 확인해주세요!<br />
              실제로는 받을 수 있는<br />경우도 있습니다.
            </p>
          </div>
        </>
      )}

      {/* Divider */}
      <div className="border-t-2 border-gray-200 my-4" />

      {/* Calculation Details */}
      <div className="mb-6">
        <h3 className="text-[24px] font-bold text-[#222222] mb-4">📋 계산 내역</h3>
        <div className="bg-gray-50 rounded-xl p-5 space-y-3">
          <div className="flex justify-between items-center">
            <span className="text-[20px] text-[#555555]">▪ 가구 유형</span>
            <span className="text-[20px] font-bold text-[#222222]">{data.householdType}가구</span>
          </div>
          <div className="border-t border-gray-200" />
          <div className="flex justify-between items-center">
            <span className="text-[20px] text-[#555555]">▪ 소득평가액</span>
            <span className="text-[20px] font-bold text-[#222222]">{formatNumber(data.소득평가액)}원</span>
          </div>
          <div className="border-t border-gray-200" />
          <div className="flex justify-between items-center">
            <span className="text-[20px] text-[#555555]">▪ 재산소득환산액</span>
            <span className="text-[20px] font-bold text-[#222222]">{formatNumber(data.재산소득환산액)}원</span>
          </div>
          <div className="border-t border-gray-200" />
          <div className="flex justify-between items-center">
            <span className="text-[20px] text-[#555555]">▪ 소득인정액</span>
            <span className="text-[22px] font-bold text-[#1A56DB]">{formatNumber(data.소득인정액)}원</span>
          </div>
          <div className="border-t border-gray-200" />
          <div className="flex justify-between items-center">
            <span className="text-[20px] text-[#555555]">▪ 선정 기준액</span>
            <span className="text-[22px] font-bold text-[#222222]">{formatNumber(data.기준액)}원</span>
          </div>
          <div className="border-t border-gray-200" />
          <div className="flex justify-between items-center">
            <span className="text-[20px] text-[#555555]">▪ 판정</span>
            <span className={`text-[20px] font-bold ${isEligible ? 'text-[#16A34A]' : 'text-[#D32F2F]'}`}>
              {isEligible ? '수급 가능 ✅' : '기준 초과 ❌'}
            </span>
          </div>
        </div>
      </div>

      {/* Warning */}
      <div className="bg-[#FFF3E0] rounded-xl p-5 mb-8">
        <p className="text-[20px] text-[#FF6600] font-bold text-center leading-relaxed">
          ⚠️ 이 결과는 간이 진단입니다.<br />
          정확한 판정은 주민센터에서<br />확인해주세요.
        </p>
      </div>

      {/* Buttons */}
      <div className="flex flex-col items-center gap-4">
        <button
          onClick={onApplyInfo}
          className="w-[90%] max-w-md h-[75px] bg-[#16A34A] text-white text-[24px] font-bold rounded-2xl shadow-lg hover:bg-[#15803d] active:scale-[0.98] transition-all"
        >
          📝 신청 방법 알아보기
        </button>

        <button
          onClick={onRestart}
          className="w-[90%] max-w-md h-[65px] bg-[#888888] text-white text-[22px] font-bold rounded-2xl shadow-md hover:bg-[#777] active:scale-[0.98] transition-all"
        >
          🔄 처음부터 다시하기
        </button>
      </div>

      <div className="h-8" />
    </div>
  );
};
