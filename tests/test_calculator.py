from src.calculator import PolicyConfig, calculate_result


def test_single_household_eligibility_true() -> None:
    result = calculate_result(
        monthly_income=1_500_000,
        assets=150_000_000,
        debt=20_000_000,
        is_single_household=True,
        config=PolicyConfig(),
    )
    assert result.eligible is True
    assert result.limit_amount == 2_130_000


def test_couple_household_limit_applied() -> None:
    result = calculate_result(
        monthly_income=4_000_000,
        assets=200_000_000,
        debt=0,
        is_single_household=False,
        config=PolicyConfig(),
    )
    assert result.limit_amount == 3_408_000
    assert result.max_pension == 535_690


def test_assets_below_deduction_no_asset_component() -> None:
    result = calculate_result(
        monthly_income=1_000_000,
        assets=100_000_000,
        debt=10_000_000,
        is_single_household=True,
        config=PolicyConfig(),
    )
    assert result.asset_component == 0
