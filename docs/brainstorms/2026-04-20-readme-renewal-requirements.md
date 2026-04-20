---
date: 2026-04-20
topic: readme-renewal
---

# README 리뉴얼

## Problem Frame

현재 README는 초안 수준 — 비주얼 없음, 챕터 목록이 페이지 범위만 표기, 멤버 사진이 50px로 너무 작음. GitHub에서 프로젝트를 처음 보는 외부 개발자에게 스터디의 정체성과 콘텐츠 목적지를 즉각 전달해야 한다.

## Requirements

**비주얼 — 멤버 섹션**

- R1. `스터디원.png`에서 배경 제거(rembg) → `static/img/members/study-members-nobg.png` 저장, README 최상단 히어로 배너로 사용
- R2. 멤버 카드를 2열 HTML 테이블로 재구성 — GitHub 프로필 사진 80px + 🐾 이모지 + 이름(한국어) + 닉네임 + 연차 + 한 줄 설명 (hero.png의 캐릭터 설명 텍스트 그대로 사용)

**README 구조 — 가독성**

- R3. 중앙 정렬 타이틀 + 뱃지 행 (Docusaurus 사이트 링크 + Notion 링크)
- R4. "📖 스터디 노트 보러 가기" 명확한 CTA를 누끼 배너 아래 배치
- R5. 챕터 섹션을 파트별 테이블로 교체 — 파트 이름 + 챕터 범위 + 테마 키워드 포함
- R6. 개발 세팅 섹션 유지 (npm → pnpm으로 정확히 반영)

**범위 제외**

- 영문 README 추가 (별도 이슈)
- Docusaurus 사이트 본문 변경 없음

## Success Criteria

- 외부 방문자가 README에서 스터디 성격, 멤버, 콘텐츠 링크를 30초 내 파악 가능
- 누끼 사진이 GitHub 다크/라이트 모드 둘 다 자연스럽게 표시

## Key Decisions

- 누끼 배너 + 2열 개인 카드 조합 선택: 단체 정체성 + 개인 목소리 동시에 살림
- hero.png(일러스트)는 Docusaurus 사이트 히어로용으로 유지, README는 실제 사진 사용

## Next Steps

→ 직접 작업 진행 (rembg 처리 + README 작성)
