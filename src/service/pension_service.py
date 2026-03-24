# src/service/pension_service.py
import pandas as pd

class PensionService:
    @staticmethod
    def calculate_income_recognition_amount(income: float, assets: float, debt: float = 0):
        # 1. 소득 하위 70%를 위한 기초연금 산정 공식 (간략화된 버전)
        # 소득인정액 = 소득평가액 + 재산의 소득환산액
        
        # 근로소득 공제 (2024년 기준 110만원 공제 후 30% 감액)
        deduct_income = (income - 1100000) * 0.7 if income > 1100000 else 0
        
        # 재산 수익률 (보통 연 4% 적용)
        net_assets = assets - debt
        # 기본재산공제 (지역별 차이가 있으나 평균 1.35억 가정)
        base_asset_deduction = 135000000 
        asset_income = max(0, (net_assets - base_asset_deduction) * 0.04 / 12)
        
        income_recognition_amount = deduct_income + asset_income
        return round(income_recognition_amount)

    @staticmethod
    def check_eligibility(recognition_amount: float, is_single: bool = True):
        # 2024년 수급 희망자 선정 기준액
        # 단독가구: 2,130,000원 이하
        # 부부가구: 3,408,000원 이하
        
        limit = 2130000 if is_single else 3408000
        return recognition_amount <= limit, limit

    @staticmethod
    def get_max_pension_amount(is_single: bool = True):
        # 2024년 기초연금 최대 금액
        # 단독가구: 334,810원
        # 부부가구: 535,690원 (20% 감액 적용)
        return 334810 if is_single else 535690
