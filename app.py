import streamlit as st

# 페이지 설정
st.set_page_config(
    page_title="2026 기초연금 자격 자가진단",
    page_icon="🏛️",
    layout="centered"
)

# 커스텀 CSS (완벽한 중앙 정렬 시스템 적용)
st.markdown("""
<style>
    /* 전체 배경 설정 */
    .stApp {
        background-color: #0A0F14;
    }
    
    /* 기본 스트림릿 패딩 제거 및 상단 여백 확보 */
    .block-container {
        padding-top: 6rem !important;
        padding-bottom: 2rem !important;
        display: flex !important;
        flex-direction: column !important;
        align-items: center !important;
    }

    /* 모든 요소가 부모 너비 안에서 정중앙에 오도록 설정 */
    [data-testid="stVerticalBlock"] > div {
        width: 100% !important;
        display: flex !important;
        justify-content: center !important;
        align-items: center !important;
        text-align: center !important;
    }

    /* 타이틀 스타일 */
    .title-text {
        color: #FFFFFF;
        font-size: 39px;
        font-weight: 800;
        line-height: 1.2;
        margin-bottom: 20px;
        text-shadow: 0 2px 4px rgba(0,0,0,0.3);
        width: 100%;
    }
    
    /* 서브타이틀 스타일 */
    .subtitle-text {
        color: #94A3B8;
        font-size: 20px;
        line-height: 1.6;
        margin-bottom: 30px;
        width: 100%;
    }

    /* 이미지 스타일 및 강제 중앙 정렬 */
    [data-testid="stImage"] {
        display: flex !important;
        justify-content: center !important;
        width: 100% !important;
    }
    
    /* 버튼 래퍼 및 버튼 스타일 */
    .stButton {
        width: 100% !important;
        display: flex !important;
        justify-content: center !important;
        margin-top: 10px;
    }
    .stButton > button {
        width: 90% !important;
        max-width: 380px !important;
        border-radius: 16px !important;
        height: 4em !important;
        font-size: 22px !important;
        font-weight: bold !important;
        background-color: #1A56DB !important;
        color: white !important;
        border: none !important;
        box-shadow: 0 10px 25px rgba(26, 86, 219, 0.4) !important;
        transition: all 0.3s ease !important;
    }
    .stButton > button:hover {
        transform: translateY(-3px) !important;
        box-shadow: 0 15px 30px rgba(26, 86, 219, 0.5) !important;
    }

    /* 하단 푸터 스타일 */
    .footer-text {
        font-size: 16px;
        color: #64748B;
        margin-top: 40px;
        width: 100%;
    }

    /* 기타 UI 요소 (결과 화면용) */
    .info-box {
        background-color: #1E293B;
        padding: 20px;
        border-radius: 15px;
        box-shadow: 0 4px 6px rgba(0,0,0,0.2);
        margin-bottom: 20px;
        color: #E2E8F0;
        text-align: left !important;
    }
    .highlight-red {
        color: #F87171;
        font-weight: bold;
    }
    .success-box {
        background-color: #064E3B;
        padding: 25px;
        border-radius: 20px;
        text-align: center;
        margin-bottom: 25px;
        color: #ECFDF5;
    }
</style>
""", unsafe_allow_html=True)

# 세션 상태 초기화
if 'step' not in st.session_state:
    st.session_state.step = 1
if 'data' not in st.session_state:
    st.session_state.data = {}

def next_step():
    st.session_state.step += 1

def reset_app():
    st.session_state.step = 1
    st.session_state.data = {}

# 앱 로직
if st.session_state.step == 1:
    # 화면 1: 시작
    st.markdown('<div class="title-text">🏛️ 기초연금<br>자격 자가진단</div>', unsafe_allow_html=True)
    st.markdown("""
    <div class="subtitle-text">
        내가 기초연금을 받을 수 있는지<br>
        <span style="color: #E2E8F0; font-weight: 500;">2026년 최신 기준</span>으로 확인해보세요!
    </div>
    """, unsafe_allow_html=True)
    
    # 시스템적으로 중앙 정렬을 강제하는 단일 버튼 출력
    if st.button("👉 진단 시작하기"):
        next_step()
    
    st.markdown("""
    <div class="footer-text">
        📺 시니어 본색 유튜브 채널 제공<br>
        <span style="color: #10B981; font-weight: 500;">✅ 2026년 기준 최신 정보</span>
    </div>
    """, unsafe_allow_html=True)

elif st.session_state.step == 2:
    # 화면 2: 나이 확인
    st.write("질문 1 / 5")
    st.markdown("## 올해 만 나이가 어떻게 되시나요?")
    st.write("태어난 연도를 입력해주세요 (예: 1961)")
    
    birth_year = st.number_input("출생연도", min_value=1900, max_value=2026, value=1961, step=1)
    
    current_year = 2026
    age = current_year - birth_year
    
    if st.button("다음으로 →"):
        if age >= 65:
            st.session_state.data['age'] = age
            next_step()
        else:
            st.error(f"만 {age}세이시군요. 기초연금은 만 65세부터 신청 가능합니다. {65-age}년 후에 신청하실 수 있습니다.")

elif st.session_state.step == 3:
    # 화면 3: 가구 유형
    st.write("질문 2 / 5")
    st.markdown("## 가구 유형을 선택해주세요")
    st.write("배우자가 있으면 부부가구, 없으면 단독가구입니다.")
    
    col1, col2 = st.columns(2)
    with col1:
        if st.button("🧓 단독가구"):
            st.session_state.data['household'] = '단독'
            st.session_state.data['threshold'] = 2470000
            next_step()
    with col2:
        if st.button("👫 부부가구"):
            st.session_state.data['household'] = '부부'
            st.session_state.data['threshold'] = 3952000
            next_step()

elif st.session_state.step == 4:
    # 화면 4: 소득 정보
    st.write("질문 3 / 5")
    st.markdown("## 월 소득이 어느 정도 되시나요?")
    st.markdown("""
    <div class="info-box">
        근로소득, 사업소득, 연금소득 등 매달 받는 돈을 모두 합쳐주세요.<br>
        <span class="highlight-red">※ 세후 액수가 아닌 '세금 떼기 전' 총 지급액 기준으로 입력해주세요.</span>
    </div>
    """, unsafe_allow_html=True)
    
    income = st.number_input("월 소득액 (만원 단위)", min_value=0, value=0, step=1)
    
    if st.button("다음으로 →"):
        st.session_state.data['income'] = income
        next_step()

elif st.session_state.step == 5:
    # 화면 5: 재산 정보
    st.write("질문 4 / 5")
    st.markdown("## 재산이 어느 정도 되시나요?")
    
    region = st.selectbox("① 거주 지역", ["서울", "경기/인천", "광역도시(부산/대구 등)", "중소도시/기타"])
    
    st.markdown('<p class="highlight-red" style="font-size: 14px;">※ 부동산은 시가가 아닌 \'공시가격\' 기준입니다.</p>', unsafe_allow_html=True)
    real_estate = st.number_input("② 부동산 (집, 땅 등) - 만원 단위", min_value=0, value=0, step=1)
    
    financial = st.number_input("③ 금융재산 (예금, 적금 등) - 만원 단위", min_value=0, value=0, step=1)
    
    st.markdown('<p class="highlight-red" style="font-size: 14px;">※ 금융기관으로부터 확인 가능한 공식 부채 기준입니다.</p>', unsafe_allow_html=True)
    debt = st.number_input("④ 부채 (빚) - 만원 단위", min_value=0, value=0, step=1)
    
    if st.button("결과 확인하기 →"):
        # 계산 로직
        income_val = st.session_state.data['income'] * 10000
        # 근로소득 공제 (2026년 116만원)
        eval_income = max(0, (income_val - 1160000) * 0.7)
        
        # 재산 공제
        if region == "서울": basic_deduction = 13500
        elif region == "경기/인천": basic_deduction = 13500
        elif region == "광역도시(부산/대구 등)": basic_deduction = 8500
        else: basic_deduction = 7250
        
        net_asset = max(0, (real_estate + financial - debt - basic_deduction) * 10000)
        asset_conversion = (net_asset / 12) * 0.04
        
        recognized_income = eval_income + asset_conversion
        
        st.session_state.data['eval_income'] = eval_income
        st.session_state.data['asset_conversion'] = asset_conversion
        st.session_state.data['recognized_income'] = recognized_income
        next_step()

elif st.session_state.step == 6:
    # 화면 6: 결과
    st.markdown("## 진단 결과")
    
    data = st.session_state.data
    is_eligible = data['recognized_income'] <= data['threshold']
    
    if is_eligible:
        st.markdown(f"""
        <div class="success-box">
            <p style="font-size: 60px;">🎉</p>
            <h2 style="color: #16A34A;">축하합니다!</h2>
            <p style="font-size: 20px;">기초연금을 받으실 수 있습니다!</p>
        </div>
        """, unsafe_allow_html=True)
        
        if data['household'] == '단독':
            st.markdown(f"💰 예상 월 수급액: <span class=\"result-amount\">최대 349,700원</span>", unsafe_allow_html=True)
        else:
            st.markdown(f"💰 예상 월 수급액: <span class=\"result-amount\">부부 합계 최대 559,520원</span>", unsafe_allow_html=True)
            st.write("(부부 개별 월 최대 279,760원)")
    else:
        st.error("현재 소득인정액이 선정 기준액을 초과하여 수급이 어렵습니다.")
        over_amount = data['recognized_income'] - data['threshold']
        st.write(f"초과 금액: {int(over_amount):,}원")
    
    st.markdown("---")
    st.markdown("### 📋 상세 계산 내역")
    st.write(f"▪ 가구 유형: {data['household']}가구")
    st.write(f"▪ 소득평가액: {int(data['eval_income']):,}원")
    st.write(f"▪ 재산소득환산액: {int(data['asset_conversion']):,}원")
    st.write(f"▪ **최종 소득인정액: {int(data['recognized_income']):,}원**")
    st.write(f"▪ 선정 기준액: {int(data['threshold']):,}원")
    
    st.warning("⚠️ 이 결과는 간이 진단이며, 정확한 판정은 주민센터에서 확인해주세요.")
    
    if st.button("📝 신청 방법 알아보기"):
        next_step()
    if st.button("🔄 처음부터 다시하기", key="restart"):
        reset_app()

elif st.session_state.step == 7:
    # 화면 7: 신청 방법
    st.markdown("## 📝 기초연금 신청 방법")
    
    st.info("1️⃣ **주민센터 방문 신청**: 가까운 주민센터(읍면동사무소)에 신분증 지참 방문")
    st.write("2️⃣ **국민연금공단 방문**: 지사에서도 신청 가능")
    st.write("3️⃣ **온라인 신청**: 복지로(www.bokjiro.go.kr) 홈페이지")
    
    st.markdown("### 📄 필요한 서류")
    st.write("- 신분증(주민등록증)\n- 통장 사본\n- 금융정보 제공 동의서 (센터 비치)")
    
    st.markdown("### 📞 문의 전화")
    st.write("- 국민연금공단: **1355**\n- 복지 상담: **129**")
    
    if st.button("📺 시니어 본색 채널 보기"):
        next_step()
    if st.button("🏠 처음으로 돌아가기"):
        reset_app()

elif st.session_state.step == 8:
    # 화면 8: 채널 안내
    st.markdown('<div class="title-text">📺 시니어 본색</div>', unsafe_allow_html=True)
    st.markdown("""
    <div class="info-box" style="text-align: center;">
        <p style="font-size: 20px;">더 많은 복지 정보를 유튜브에서 확인하세요!</p>
        <p style="color: #16A34A; font-weight: bold;">✅ 매주 새로운 복지 정보<br>✅ 시니어를 위한 꿀팁</p>
    </div>
    """, unsafe_allow_html=True)
    
    channel_url = "https://www.youtube.com/channel/UCI9yvQxhE22GxGTcrO0yeHg"
    st.markdown(f'<a href="{channel_url}" target="_blank"><button style="width:100%; height:80px; background-color:#FF0000; color:white; border-radius:15px; font-weight:bold; font-size:20px; border:none; cursor:pointer;">📺 유튜브 채널 구독하기</button></a>', unsafe_allow_html=True)
    
    st.write("")
    if st.button("🏠 처음으로 돌아가기", key="home"):
        reset_app()
