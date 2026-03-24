# app.py
import streamlit as st
import pandas as pd
import altair as alt
from src.config.app_config import Config
from src.service.pension_service import PensionService

# 1. Page Configuration (Rich UI)
st.set_page_config(
    page_title=Config.APP_TITLE,
    page_icon=Config.APP_ICON,
    layout=Config.PAGE_LAYOUT,
    initial_sidebar_state="expanded"
)

# 2. Add Custom CSS (Rich Aesthetics)
st.markdown("""
<style>
    @import url('https://fonts.googleapis.com/css2?family=Outfit:wght@300;400;600&display=swap');

    html, body, [class*="css"] {
        font-family: 'Outfit', sans-serif;
    }

    .main-header {
        font-size: 3rem;
        font-weight: 800;
        background: -webkit-linear-gradient(#f953c6, #b91d73);
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        text-align: center;
        margin-bottom: 2rem;
    }

    .card {
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(10px);
        border-radius: 15px;
        padding: 20px;
        border: 1px solid rgba(255, 255, 255, 0.2);
        box-shadow: 0 4px 15px rgba(0,0,0,0.1);
        margin-bottom: 1rem;
    }

    .status-pass {
        color: #00ff88;
        font-weight: bold;
        font-size: 1.5rem;
    }

    .status-fail {
        color: #ff4b4b;
        font-weight: bold;
        font-size: 1.5rem;
    }

    .metric-container {
        display: flex;
        justify-content: space-around;
        gap: 15px;
    }

    .metric-box {
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        color: white;
        padding: 20px;
        border-radius: 12px;
        text-align: center;
        width: 100%;
        box-shadow: 0 4px 6px rgba(0,0,0,0.1);
    }

    /* Hover effects for interactive feeling */
    .metric-box:hover {
        transform: translateY(-5px);
        transition: 0.3s ease;
    }
</style>
""", unsafe_allow_html=True)

# 3. Sidebar
with st.sidebar:
    st.header(f" {Config.APP_ICON} {Config.SIDEBAR_HEADER}")
    st.markdown("---")
    st.success("2024년 최신 기준 반영 완료")
    
    st.info("""
    기초연금은 만 65세 이상 어르신 중 
    소득 하위 70%를 대상으로 합니다.
    이 서비스를 통해 **예상 수령액**을 확인해 보세요.
    """)

# 4. Main Header
st.markdown('<div class="main-header">🎁 기초연금 정밀 계산기 & 가이드</div>', unsafe_allow_html=True)

# 5. Dashboard Grid
col1, col2 = st.columns([1, 1], gap="large")

with col1:
    st.markdown('<div class="card">🏠 기본 정보 입력</div>', unsafe_allow_html=True)
    is_single = st.radio("가구 형태", ["단독가구", "부부가구"]) == "단독가구"
    
    income = st.number_input("월 총 소득 (원)", value=1500000, step=10000, format="%d")
    assets = st.number_input("현재 보유 자산 (부동산, 예금 등)", value=150000000, step=1000000, format="%d")
    debt = st.number_input("부채 (대출금 등)", value=20000000, step=1000000, format="%d")

with col2:
    st.markdown('<div class="card">📊 분석 결과</div>', unsafe_allow_html=True)
    
    # Calculation
    recognition_amount = PensionService.calculate_income_recognition_amount(income, assets, debt)
    is_eligible, limit = PensionService.check_eligibility(recognition_amount, is_single)
    max_pension = PensionService.get_max_pension_amount(is_single)
    
    st.markdown('<div class="metric-container">', unsafe_allow_html=True)
    st.markdown(f'''
    <div class="metric-box">
        <div style="font-size: 0.9rem; opacity: 0.9;">월 소득인정액</div>
        <div style="font-size: 1.8rem; font-weight: bold;">{recognition_amount:,}원</div>
    </div>
    ''', unsafe_allow_html=True)
    st.markdown('</div>', unsafe_allow_html=True)
    
    st.markdown("---")
    
    if is_eligible:
        st.markdown(f'<div class="status-pass">🎉 축하합니다! 수급 대상자입니다.</div>', unsafe_allow_html=True)
        st.write(f"최대 월 **{max_pension:,}원**을 받으실 수 있을 것으로 보입니다.")
    else:
        st.markdown(f'<div class="status-fail">⚠️ 대상이 아닐 가능성이 큽니다.</div>', unsafe_allow_html=True)
        st.write(f"선정 기준액인 **{limit:,}원**을 초과하였습니다.")

# 6. Visual Analysis
st.markdown("---")
st.markdown("### 📈 소득 항목별 비중 분석")

# Example Data for Pie Chart
plot_data = pd.DataFrame({
    "Category": ["근로소득", "재산소득환산", "기타"],
    "Value": [income * 0.7, (assets-debt) * 0.04 / 12, 0]
})

chart = alt.Chart(plot_data).mark_arc(innerRadius=50).encode(
    theta=alt.Theta(field="Value", type="quantitative"),
    color=alt.Color(field="Category", type="nominal", scale=alt.Scale(scheme='viridis')),
    tooltip=["Category", "Value"]
).properties(height=300)

st.altair_chart(chart, use_container_width=True)

st.caption("주의: 위 결과는 실제 공단 계산 결과와 다를 수 있는 모의 수치입니다.")
