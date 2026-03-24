from dataclasses import dataclass


@dataclass(frozen=True)
class PolicyConfig:
    earned_income_deduction: int = 1_100_000
    earned_income_reflection_rate: float = 0.7
    base_asset_deduction: int = 135_000_000
    annual_asset_conversion_rate: float = 0.04
    single_household_limit: int = 2_130_000
    couple_household_limit: int = 3_408_000
    single_household_max_pension: int = 334_810
    couple_household_max_pension: int = 535_690


@dataclass(frozen=True)
class CalculationResult:
    income_component: float
    asset_component: float
    recognized_income: float
    limit_amount: float
    max_pension: float
    eligible: bool


def calculate_result(
    monthly_income: float,
    assets: float,
    debt: float,
    is_single_household: bool,
    config: PolicyConfig,
) -> CalculationResult:
    adjusted_income = max(0.0, monthly_income - config.earned_income_deduction)
    income_component = adjusted_income * config.earned_income_reflection_rate

    net_assets = max(0.0, assets - debt - config.base_asset_deduction)
    asset_component = net_assets * config.annual_asset_conversion_rate / 12

    recognized_income = round(income_component + asset_component)

    if is_single_household:
        limit_amount = config.single_household_limit
        max_pension = config.single_household_max_pension
    else:
        limit_amount = config.couple_household_limit
        max_pension = config.couple_household_max_pension

    return CalculationResult(
        income_component=round(income_component),
        asset_component=round(asset_component),
        recognized_income=recognized_income,
        limit_amount=limit_amount,
        max_pension=max_pension,
        eligible=recognized_income <= limit_amount,
    )
