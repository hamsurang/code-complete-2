---
name: notion-yaml-extract
description: Use when extracting a Code Complete study chapter page from Notion ("산출물" database) into a 3-Zone YAML file — including initial pulls, re-extraction after Notion updates, mapping unknown block types, troubleshooting parse failures, or verifying member opinion preservation. Also use when the 9-section Notion template layout needs to be translated into structured data agents can consume.
---

# notion-yaml-extract

## Overview

Notion 챕터 페이지는 9섹션 템플릿(Verdict callout / 핵심 요약 / 코드 예제 / 토론 포인트 / 멤버 의견 callout ×7 / Devil's Advocate quote / 유효성 투표 / FE 체크리스트 to_do / 베스트 토론 후보 callout)을 따른다. 이 스킬은 각 Notion 블록 타입을 3-Zone YAML 필드로 매핑하는 규칙을 정의한다.

## When to Use

- 신규 챕터를 Notion DB에서 1회 추출할 때
- 이미 추출된 YAML을 재생성할 때 (Notion에서 원본이 수정된 경우)
- 새 블록 타입을 만났을 때 매핑 규칙 참조
- 추출 결과 YAML이 이상할 때 원인 진단

## 9섹션 → Zone 매핑

| Notion 섹션 | Notion 블록 타입 | YAML 경로 | Zone |
|---|---|---|---|
| 판정 배지 callout (⚖️) | callout, icon=⚖️ | `ai_assist.verdict.{rating,rationale}` | 🟡 |
| 핵심 요약 H2 + 문단 | heading_2("📝 핵심 요약") + paragraph | `ai_editable.summary.lead` | 🟢 |
| 핵심 포인트 불릿 3개 | bulleted_list_item ×3 | `ai_editable.summary.bullets[]` | 🟢 |
| React/TS 코드 예제 H2 | heading_2("💻...") + code blocks | `ai_editable.code_examples[]` | 🟢 |
| Before ❌ | heading_3("Before ❌") + code | `.before` | 🟢 |
| After ✅ | heading_3("After ✅") + code | `.after` | 🟢 |
| 토론 포인트 H2 | heading_2("🔥...") + numbered_list_item | `human_only.discussion_questions[]` | 🔴 |
| 멤버 의견 callout | callout, icon=이모지 (7종 매칭) | `human_only.member_opinions[]` | 🔴 |
| Devil's Advocate H3 + quote | heading_3("😈...") + quote | `human_only.devils_advocate` | 🔴 |
| 유효성 투표 H2 + 문단 | heading_2("📊...") + paragraph | `human_only.votes.*` | 🔴 |
| FE 체크리스트 H2 + to_do | heading_2("✅...") + to_do | `ai_editable.checklist[]` | 🟢 |
| 베스트 후보 callout | callout, icon=💎 | `human_only.best_pick` | 🔴 |

## 멤버 이모지 매핑

YAML `human_only.member_opinions[].author` 결정에 사용:

| 이모지 | Member |
|---|---|
| 🦊 | Alice |
| 🐵 / 🙊 / 🐒 | Amber |
| 🦎 | Crong |
| 🦉 | diego |
| 🦜 | Jay |
| 🐻 | Leo |
| 🐿️ | zinii |

**매칭 실패 시:** callout icon이 위 목록에 없으면 `author: "unknown"` + 추출 로그에 경고. 사람이 YAML 수동 수정.

## 투표 파싱 규칙

유효성 투표 섹션의 문단 예시:
```
A: 4/5  B: 5/5  C: 3/5  D: 4/5  E: 5/5  F: 4/5  G: 3/5  H: -/5  → 평균: 4.0/5
```

- A~H는 **슬롯 이름**이지 멤버 이름이 아님. meta.members의 순서(Alice, Amber, Crong, diego, Jay, Leo, zinii)로 매핑
- 7명이므로 A~G까지 매핑, H 이후는 무시
- `-`, `?`, 빈 칸 → `null` (미응답)
- `평균` 값은 aggregator가 재계산하므로 파싱하지 않아도 됨

## 판정 callout 파싱

callout 내부 텍스트:
```
판정: 🟢 생존
한 줄 근거: ...
```

- 첫 줄에서 🟢/🟡/🔴 추출 → `rating`
- 두 번째 이후 줄 → `rationale` (줄바꿈 하나로 join)
- "판정:" / "한 줄 근거:" 프리픽스는 제거

## 코드 블록 언어 감지

Notion `code.language`가:
- `typescript` / `tsx` → YAML `language: typescript` 또는 `tsx`
- `javascript` → `javascript`
- `java` / `cpp` / 기타 → `translation_note: "원서 {lang} 예제, FE로 번역 필요"` + 원본 코드는 `before`에 보관

## 체크리스트 to_do 파싱

```
☐ 체크리스트 항목 1 (FE 맥락으로 수정)
   관련 ESLint 룰: `@typescript-eslint/no-unused-vars` (링크)
```

- to_do rich_text → `checklist[].text`
- 바로 다음 paragraph에 "관련 ESLint 룰:" 또는 "ESLint:" 포함 시 코드/링크 파싱
- 없으면 `eslint_rule: null` (fe-content-enhancer가 나중에 채움)

## 파싱 실패 패턴

| 패턴 | 원인 | 처리 |
|---|---|---|
| Verdict callout에 이모지 없음 | 멤버가 수정 시 실수 | `rating: null` + 경고, aggregator는 제외 |
| 멤버 의견이 7개 미만 | 미작성 | 누락 멤버는 `opinion: null` + 매칭된 author만 나열 |
| 투표 문단 포맷 깨짐 | 자유 서식 | 정규식 매칭 실패 시 모든 투표 `null` + 경고 |
| 섹션 순서가 템플릿과 다름 | 편집자가 재배치 | 문제없음 — section heading으로만 매칭, 순서 무관 |
| 동일 섹션이 여러 번 | 실수 복붙 | 첫 번째만 사용 + 경고 |

## Notion MCP 호출 순서

1. `mcp__notion-personal__API-retrieve-a-database` → DB 메타 + data_source ID
2. (필요 시) 페이지 ID 직접 지정 — DB query 실패 시 사용자에게 페이지 ID 요청
3. `mcp__notion-personal__API-retrieve-a-page` → 페이지 메타 (title, icon)
4. `mcp__notion-personal__API-get-block-children` (recursive) → 전체 블록 트리

**블록 트리 순회:** 재귀적으로 `has_children: true`인 블록은 children 다시 호출. 중첩 limit 없음.

## Common Mistakes

| 실수 | 결과 | 수정 |
|---|---|---|
| 이모지만 보고 멤버 매핑 | 동일 이모지 겹치면 혼란 | author 필드의 닉네임 텍스트도 확인 |
| `-` 투표를 0으로 치환 | 평균 왜곡 | 반드시 `null` |
| 코드 블록의 plain_text만 추출 | indent 소실 | `rich_text[].plain_text`를 **그대로** 연결 |
| Human-only 영역 요약/재표현 | 멤버 목소리 왜곡 | literal 보존, 한 글자도 수정 금지 |

## 원본 JSON 덤프 필수

YAML 변환 전에 `_workspace/raw/chapters/chXX.json`에 **전체 블록 트리 덤프**. 파싱 실패해도 원본은 있어야 재시도 가능.
