---
name: voice-ai-slop-detect
description: Use when scanning Docusaurus MDX files for AI-generated writing symptoms in Korean — cliché openers ("이제부터는", "자 그럼"), overly polite indirections, empty meta-sentences, bullet-point fragmentation, pronoun overuse, emotional filler adjectives, needless analogies. Only scan ai_editable zones indicated by frontmatter ai_assisted list. Do not scan human_only component props (MemberOpinion, DevilsAdvocate, BestPickCallout, VotingBar).
---

# voice-ai-slop-detect

## Overview

AI가 쓴 티 나는 한글 문장을 잡아내는 검증 스킬. 하지만 **멤버가 쓴 글은 어색해도 진정성이므로 건드리지 않는다**. Zone 경계가 이 스킬의 생명줄.

**스타일 기준점:** `writing-voice-ff` 스킬이 정의한 해요체·"코드를 읽는 사람" 관점이 이 파이프라인의 목표 어투다. 이 검사는 그 목표에서 벗어난 문장을 잡는 "반대쪽" 역할을 한다.

## When to Use

- mdx-writer가 MDX 생성 직후, 파이프라인 품질 게이트
- 사용자가 "슬롭 재검사" 요청
- 특정 챕터가 "뭔가 AI 같다" 피드백 받았을 때

## 검사 대상 결정 (가장 중요)

MDX frontmatter의 `ai_assisted` 목록에 있는 섹션만 검사:

```yaml
ai_assisted:
  - summary         # ← 이 H2 섹션만 검사
  - code_examples   # ← 코드 블록 주석만 (v1은 skip)
  - checklist       # ← 체크리스트 텍스트만
```

**절대 검사하지 않는 것:**
- `<MemberOpinion>`, `<DevilsAdvocate>`, `<BestPickCallout>`, `<VotingBar>` 컴포넌트 `props` 내용
- 코드 블록 안의 코드 자체 (`// 주석`은 v2에서 추가)
- frontmatter 필드 값

경계가 모호하면 **skip 쪽으로 판단**. 오탐보다 미탐이 낫다는 원칙을 뒤집지 말 것.

## AI 슬롭 카탈로그 (한글 FE 맥락)

### High severity (통과 0개)

| 카테고리 | 패턴 | 예시 |
|---|---|---|
| 상투구 서두 | "이제부터는~", "지금부터 알아보겠습니다", "자 그럼~", "먼저~", "시작하기에 앞서" | "이제부터는 변수 네이밍에 대해 살펴보겠습니다" |
| 정형 결론 | "이 장에서는 ~에 대해 알아보았습니다", "지금까지 ~을 살펴봤습니다" | "이 장에서는 네이밍 원칙을 알아보았습니다" |
| LLM 아이덴티티 | "저는 AI로서", "도움이 되었기를", "~라고 할 수 있겠습니다" | "도움이 되었기를 바랍니다" |
| 격식체 혼용 | `~합니다 / ~입니다`가 해요체 문서 안에 섞여 등장 | "가독성이 중요합니다. 이를 위해 ~해요." |

### Medium severity (3개까지 허용)

| 카테고리 | 패턴 | 예시 |
|---|---|---|
| 과잉 정중체 | "~해보시는 건 어떨까요?", "~라고 할 수 있겠습니다", "~이라고 생각됩니다" | "이 원칙을 적용해보시는 건 어떨까요?" |
| 감정 과잉 | "정말 중요한", "반드시 기억해야 할", "아주 결정적인", "매우 핵심적인" | "정말 중요한 개념입니다" |
| 빈 메타 | "위에서 살펴본 바와 같이", "앞서 말했듯이", "잠시 후 다룰" | "위에서 살펴본 바와 같이" |
| 인칭 대명사 | 챕터당 "우리는/여러분은/여러분도" 3회 이상 | "여러분도 한 번 시도해보세요" |

### Low severity (10개까지 허용)

| 카테고리 | 패턴 | 예시 |
|---|---|---|
| 과잉 비유 | "마치 ~처럼", "A는 B와 같다" 2문장 연속 | "변수는 마치 상자와 같고, 상자는 마치 그릇 같아서..." |
| 불릿 남발 | 연속 불릿 10개, 각 문장 <5단어 | `- 중요함` `- 필수` `- 꼭 지킬 것` ... |
| 과잉 강조 | 볼드가 문단당 3회 이상 | "**중요**한 건 **변수**의 **이름**이다" |
| 불필요 넘버링 | 1, 2, 3으로 시작하는데 본문은 순서 무관 | "1. 의도 드러내기 2. 짧은 이름 피하기..." (사실 비순서) |

## 탐지 알고리즘

1. MDX 파싱 (remark/mdast) → frontmatter + body
2. body에서 JSX 컴포넌트 블록 제거 (`<MemberOpinion>` 등)
3. 남은 텍스트에서 ai_assisted 섹션 경계 식별 (H2 헤딩 기준)
4. 각 섹션에 위 카탈로그 정규식/휴리스틱 적용
5. finding 수집 + severity별 카운트
6. threshold 비교 → pass/fail

## Finding 포맷

```json
{
  "severity": "high" | "medium" | "low",
  "category": "상투구 서두",
  "line": 42,
  "column": 1,
  "excerpt": "이제부터는 변수 네이밍에 대해 알아보겠습니다",
  "suggestion": "본론으로 바로: '변수 이름은 의도를 드러내야 한다.'"
}
```

## 실패 시 피드백 루프

`overall_result: fail` 시:

1. 어느 섹션에서 fail인지 식별:
   - `summary` fail → chapter-editor 재호출
   - `code_examples` 주석 fail → fe-content-enhancer 재호출 (v2에서)
   - `checklist` fail → fe-content-enhancer 재호출
2. SendMessage에 report_path 포함
3. 재작성 후 이 스킬 다시 실행
4. 최대 2회 재시도, 3회째 fail이면 사용자에게 수동 검토 요청

## 오탐 방지 휴리스틱

### 원문 인용 구간

quote 블록 (`>`)이나 코드 블록 주석은 원문 인용일 가능성이 높음. 문맥 단서:

- 이전 paragraph에 "원서에서는", "McConnell은"이 나오면 해당 quote는 skip
- 체크리스트 중 "원서 부록" 언급이 있으면 skip

### Human-only 경계 모호할 때

MDX에서 JSX 컴포넌트가 아닌 평문으로 멤버 의견이 노출되면 ai_editable로 오인 가능. 방지책:

- mdx-writer가 `<!-- @human-only -->` 주석을 삽입하도록 명시
- 이 스킬은 `@human-only`와 `@human-only-end` 주석 사이를 skip

## 출력 파일

`_workspace/validation/chXX.report.json`:

```json
{
  "file": "docs/part-02/ch05.mdx",
  "validated_at": "2026-04-18T23:15:00+09:00",
  "overall_result": "pass",
  "findings": [],
  "zones_skipped": ["human_only"],
  "summary": { "high": 0, "medium": 2, "low": 5 },
  "sections_scanned": ["summary", "checklist"],
  "sections_skipped": ["member_opinions", "devils_advocate", "best_pick"]
}
```

## Common Mistakes

| 실수 | 결과 | 수정 |
|---|---|---|
| MemberOpinion props의 opinion도 스캔 | Human-only 위반 | JSX 블록 전체 skip 우선 |
| 코드 블록 안의 한글 주석 스캔 (v1) | 코드 설명까지 슬롭 판정 | v1에서는 skip, v2에서 별도 룰 |
| 휴리스틱이 너무 fuzzy ("알아보" 포함 전부 high) | 오탐 폭발 | 정확한 구문 매치 |
| threshold 과엄격 (medium 0) | 모든 챕터 fail | 기본값 3까지 허용 |
