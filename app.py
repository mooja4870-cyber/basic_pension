import altair as alt
import pandas as pd
import streamlit as st

from src.calculator import PolicyConfig, calculate_result

st.set_page_config(
    page_title="기초연금 모의 계산기",
    page_icon="📘",
    layout="wide",
)

st.title("기초연금 모의 계산기")
st.caption("실제 심사는 국민연금공단 산정 결과를 따릅니다. 아래 값은 모의 계산용입니다.")

with st.sidebar:
    st.header("입력값")
    household_type = st.radio("가구 형태", ["단독가구", "부부가구"], index=0)
    monthly_income = st.number_input("월 소득(원)", min_value=0, value=1_500_000, step=10_000)
    total_assets = st.number_input("총 자산(원)", min_value=0, value=160_000_000, step=1_000_000)
    total_debt = st.number_input("총 부채(원)", min_value=0, value=20_000_000, step=1_000_000)

    with st.expander("정책 기준값(필요 시 조정)"):
        earned_income_deduction = st.number_input(
            "근로소득 기본공제(원)", min_value=0, value=1_100_000, step=10_000
        )
        earned_income_rate = st.slider(
            "공제 후 반영 비율", min_value=0.0, max_value=1.0, value=0.7, step=0.05
        )
        base_asset_deduction = st.number_input(
            "기본재산 공제(원)", min_value=0, value=135_000_000, step=1_000_000
        )
        asset_conversion_rate = st.slider(
            "재산 소득환산 연이율", min_value=0.0, max_value=0.1, value=0.04, step=0.005
        )
        single_limit = st.number_input(
            "단독가구 선정 기준액(원)", min_value=0, value=2_130_000, step=10_000
        )
        couple_limit = st.number_input(
            "부부가구 선정 기준액(원)", min_value=0, value=3_408_000, step=10_000
        )
        single_max_pension = st.number_input(
            "단독가구 최대 연금(원)", min_value=0, value=334_810, step=1_000
        )
        couple_max_pension = st.number_input(
            "부부가구 최대 연금(원)", min_value=0, value=535_690, step=1_000
        )

config = PolicyConfig(
    earned_income_deduction=int(earned_income_deduction),
    earned_income_reflection_rate=float(earned_income_rate),
    base_asset_deduction=int(base_asset_deduction),
    annual_asset_conversion_rate=float(asset_conversion_rate),
    single_household_limit=int(single_limit),
    couple_household_limit=int(couple_limit),
    single_household_max_pension=int(single_max_pension),
    couple_household_max_pension=int(couple_max_pension),
)

is_single = household_type == "단독가구"
result = calculate_result(
    monthly_income=monthly_income,
    assets=total_assets,
    debt=total_debt,
    is_single_household=is_single,
    config=config,
)

col1, col2, col3 = st.columns(3)
col1.metric("소득인정액", f"{result.recognized_income:,.0f}원")
col2.metric("선정기준액", f"{result.limit_amount:,.0f}원")
col3.metric("예상 최대연금", f"{result.max_pension:,.0f}원")

if result.eligible:
    st.success("모의 계산 결과: 수급 가능 구간으로 계산되었습니다.")
else:
    st.error("모의 계산 결과: 기준액을 초과했습니다.")

breakdown_df = pd.DataFrame(
    {
        "항목": ["근로소득 반영액", "재산 소득환산액"],
        "금액": [result.income_component, result.asset_component],
    }
)

chart = (
    alt.Chart(breakdown_df)
    .mark_bar(cornerRadiusTopLeft=8, cornerRadiusTopRight=8)
    .encode(
        x=alt.X("항목:N", title="구성 항목"),
        y=alt.Y("금액:Q", title="원"),
        tooltip=["항목", alt.Tooltip("금액:Q", format=",.0f")],
        color=alt.Color("항목:N", legend=None),
    )
    .properties(height=320)
)

st.subheader("소득인정액 구성")
st.altair_chart(chart, use_container_width=True)

st.markdown("---")
st.markdown(
    "- 이 앱은 배포용 템플릿이며, 정책값은 사이드바에서 바로 조정할 수 있습니다.  \n"
    "- Streamlit Community Cloud 배포 시 `app.py`를 Main file path로 지정하면 됩니다."
)
