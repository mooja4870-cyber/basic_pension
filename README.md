# Basic Pension Streamlit App

기초연금 모의 계산기 Streamlit 앱입니다.

## Local Run

```bash
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
streamlit run app.py
```

## Test

```bash
pytest -q
```

## Streamlit Community Cloud Deploy

1. GitHub 저장소에 `main` 브랜치로 푸시
2. https://share.streamlit.io 에서 저장소 연결
3. Main file path를 `app.py`로 설정
4. 배포 후 앱 URL 확인

## Notes

- 사이드바에서 정책 기준값을 조정할 수 있습니다.
- 실제 수급 심사는 공단 공식 산식을 따르므로 참고용으로만 사용하세요.
