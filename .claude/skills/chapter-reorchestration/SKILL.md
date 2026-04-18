---
name: chapter-reorchestration
description: Use when reordering, bridging, or restructuring Code Complete chapter content for reader flow — deciding where to place Verdict badge, voting bar, member opinions, or FE checklist, writing transition sentences between sections, or detecting when a chapter should break from the default render order. Also use when validating that human_only fields were preserved byte-for-byte after editing.
---

# chapter-reorchestration

## Overview

Notion 9섹션 순서는 집필자 편의고, 독자 읽기 흐름과 다르다. 이 스킬은 "맛깔나게 재구성"의 구체 규칙 — **렌더 순서 결정**과 **브릿지 문장 작성**, 그리고 **Human-only Zone 무결성 보장**을 정의한다.

## When to Use

- chapter-editor가 YAML을 받아 재구성본을 만들 때
- 특정 장이 기본 순서로 읽기 어색할 때 커스텀 순서 결정
- 섹션 간 연결이 끊겨 보일 때 브릿지 문장 작성
- 편집 후 Human-only 필드가 그대로인지 검증

## 기본 렌더 순서 (default)

```
1. Verdict 뱃지           ← 훅 (이 장의 가치를 한눈에)
2. 핵심 요약 (lead + bullets)  ← 스캐너 독자
3. VotingBar              ← 사회적 증명 (평균 점수)
4. Before/After 코드       ← 본론
5. 토론 포인트             ← 사고 유도
6. MemberOpinion ×7       ← 클라이맥스
7. DevilsAdvocate         ← 대비 (반박)
8. FE 체크리스트 + ESLint  ← 액셔너블
9. BestPickCallout        ← 여운 + 부록 연결
```

**왜 이 순서인가:** 훅 → 요약 → 증명 → 본론 → 토론 → 사람 목소리 → 반박 → 실무 → 여운. 스토리텔링 아크를 따른다.

## 커스텀 순서 판단

다음 조건 중 하나라도 해당하면 기본 순서를 벗어날 고려:

| 상황 | 권장 순서 변경 |
|---|---|
| 코드 예제가 없는 장 (이론 중심) | 코드 섹션 생략, 토론 포인트를 4번으로 |
| 판정이 🔴 사망 | Verdict 바로 뒤에 DevilsAdvocate를 배치 (반박으로 설득력 보강) |
| 멤버 의견이 3명 이하 (미완) | MemberOpinion을 조용히 뒷단으로, VotingBar도 생략 |
| 체크리스트가 매우 짧음 (2항목 이하) | 체크리스트 섹션 자체를 토론 포인트와 통합 |

사용자가 명시적으로 "이 장은 순서 바꿔달라" 하면 존중. 근거를 `edit_meta.reorder_applied`에 기록.

## 브릿지 문장 작성 원칙

섹션 사이에 1~2문장 연결 텍스트를 **선택적으로** 추가. 없어도 무방하면 안 쓴다.

**어투는 `writing-voice-ff` 스킬의 해요체 가이드를 따른다.** 브릿지 예시도 거기에 담겨 있다.

### 좋은 브릿지 (해요체)

| 위치 | 예시 |
|---|---|
| 요약 → VotingBar | "7명이 이 원칙에 준 점수는 다음과 같아요." |
| 코드 → 토론 포인트 | "코드로 끝나지 않는 원칙이에요. 현업에서는 이런 질문이 따라와요." |
| 토론 → MemberOpinion | "원칙은 이론이에요. 실무에서 이게 어떻게 체감되는지 들어봐요." |
| 체크리스트 → BestPick | "이 장에서 팀이 가장 인상 깊게 짚은 한 마디는 이거예요." |

### 금지 패턴 (AI 슬롭)

- "이제부터는 ~에 대해 알아보겠습니다"
- "자 그럼 다음으로 넘어가볼까요"
- "~은 정말 중요한 개념입니다"
- "위에서 살펴본 바와 같이"
- "여러분도 한 번 ~해보시는 것은 어떨까요"
- 격식체("~입니다", "~합니다") — `writing-voice-ff`의 해요체 원칙 위반
- "우리는", "여러분은" 인칭 남용 — `writing-voice-ff`가 정의한 "코드를 읽는 사람" 일반화를 쓰세요

**판별 기준:** 브릿지가 제거돼도 글 흐름이 깨지지 않으면 그 브릿지는 필요 없는 거다. 과감히 `null`.

## Human-only 무결성 해시 검증

편집 후 출력 직전 **반드시** 수행.

### 절차

1. 입력 YAML의 `human_only.*`를 canonical JSON으로 직렬화 (키 정렬, 공백 표준화)
2. SHA-256 해시 계산
3. 출력 YAML의 `human_only.*`도 동일하게 해시
4. 불일치 시 출력 파일 생성하지 않고 에러 발생

### 구현 스니펫

```typescript
import { createHash } from 'node:crypto';

function canonicalizeHumanOnly(humanOnly: unknown): string {
  return JSON.stringify(humanOnly, Object.keys(humanOnly as object).sort());
}

function hashHumanOnly(yaml: { human_only: unknown }): string {
  const canonical = canonicalizeHumanOnly(yaml.human_only);
  return createHash('sha256').update(canonical).digest('hex');
}

const before = hashHumanOnly(inputYaml);
const after = hashHumanOnly(outputYaml);

if (before !== after) {
  throw new Error(
    `Human-only zone modified. Input hash: ${before}, Output hash: ${after}. ` +
    `Aborting output.`
  );
}
```

### 해시가 깨졌을 때 추적

불일치 발견 시 필드별로 diff:

```typescript
for (const key of Object.keys(inputYaml.human_only)) {
  const inputStr = JSON.stringify(inputYaml.human_only[key]);
  const outputStr = JSON.stringify(outputYaml.human_only[key]);
  if (inputStr !== outputStr) {
    console.error(`MODIFIED: human_only.${key}`);
  }
}
```

## edit_meta 필수 필드

```yaml
edit_meta:
  edited_at: <ISO timestamp>
  reorder_applied: "default" | "custom: summary→code→discussion→..."
  bridges_added: <integer, 0 이상>
  zones_respected: true    # 해시 검증 통과했을 때만 true
  ai_assisted_fields:
    - verdict.rationale    # chapter-editor가 초안 제공한 필드만 나열
```

`zones_respected: false`가 YAML에 나오면 안 된다 — 해시 깨지면 저장 자체를 중단.

## Common Mistakes

| 실수 | 왜 문제 | 수정 |
|---|---|---|
| "독자 이해를 위해" 의견 살짝 고침 | Human-only 훼손, 상품 가치 파괴 | 한 글자도 수정 금지. 불편해도 원문 그대로 |
| 브릿지에 요약 반복 ("위에서 본 것처럼 X는 중요합니다") | 중복 + 슬롭 | 브릿지는 연결 기능만, 요약 금지 |
| 코드 블록에 주석으로 해설 추가 | 원본 코드 수정 = ai_editable 영역이지만 의도 왜곡 가능 | 해설은 본문 paragraph으로 |
| 순서 변경 근거 미기록 | 재실행 시 왜 그렇게 했는지 잃어버림 | edit_meta.reorder_applied에 사유까지 |
