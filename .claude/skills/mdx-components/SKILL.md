---
name: mdx-components
description: Use when creating, modifying, or importing custom MDX React components for Code Complete chapter pages — Verdict badge, MemberOpinion callout with emoji, VotingBar, DevilsAdvocate quote, BestPickCallout, VerdictDistribution chart, BestDiscussions list. Also use when a new visual element is needed in a chapter page beyond these seven, or when component props need to align with YAML human_only zone keys.
---

# mdx-components

## Overview

Code Complete 챕터 페이지는 Docusaurus 기본 마크다운으로는 표현이 빈약하다. 7개 전용 컴포넌트가 "맛깔나게"의 시각 축을 담당한다. 이 스킬은 각 컴포넌트의 **props 계약**을 정의하고 YAML Zone과의 매핑을 고정한다.

## When to Use

- 새 챕터 MDX를 생성할 때 어떤 컴포넌트를 import해야 하는지 모를 때
- 기존 컴포넌트 props를 바꾸려 할 때 (YAML 스키마와 동기화 필요)
- 새 컴포넌트를 추가하려 할 때 (기본 7종 외 8번째 이상)

## 컴포넌트 목록

| 컴포넌트 | Zone 출처 | 역할 |
|---|---|---|
| `<Verdict>` | ai_assist.verdict | 페이지 최상단 훅 |
| `<MemberOpinion>` | human_only.member_opinions[] | 멤버 의견 1명 |
| `<VotingBar>` | human_only.votes | 투표 평균 시각화 |
| `<DevilsAdvocate>` | human_only.devils_advocate | 반박자 인용 |
| `<BestPickCallout>` | human_only.best_pick | 베스트 토론 하이라이트 |
| `<VerdictDistribution>` | dashboard.yml | 부록 차트 |
| `<BestDiscussions>` | dashboard.yml | 부록 리스트 |

## Props 계약

### `<Verdict>`

```typescript
interface VerdictProps {
  rating: '🟢 생존' | '🟡 변형' | '🔴 사망';
  rationale: string;
}
```

사용:
```mdx
<Verdict rating="🟢 생존" rationale="2026년 FE에서도 네이밍 원칙은 그대로 유효" />
```

### `<MemberOpinion>`

```typescript
interface MemberOpinionProps {
  author: 'Alice' | 'Amber' | 'Crong' | 'diego' | 'Jay' | 'Leo' | 'zinii';
  emoji: string;
  opinion: string;
  experience: string;
}
```

**중요:** `opinion`과 `experience`는 YAML `human_only.member_opinions[].{opinion,experience}`를 **literal 그대로** 전달. 한 글자도 수정 금지.

### `<VotingBar>`

```typescript
interface VotingBarProps {
  average: number;           // 1~5 소수점 포함
  votes: Record<MemberName, number | null>;
}
```

시각화: 수평 바 (fill ratio = average/5). `null` 투표는 회색 tick으로.

### `<DevilsAdvocate>`

```typescript
interface DevilsAdvocateProps {
  author: MemberName;
  argument: string;
}
```

인용 블록 + 😈 이모지. argument는 literal.

### `<BestPickCallout>`

```typescript
interface BestPickCalloutProps {
  content: string;
  reason: string;
}
```

💎 이모지 + quote 스타일.

### 부록 전용

```typescript
interface VerdictDistributionProps {
  alive: number;
  evolved: number;
  dead: number;
  other?: number;
}

interface BestDiscussionsProps {
  items: Array<{
    chapter: number;
    content: string;
    reason: string;
    contributedBy: MemberName[];
  }>;
}
```

## 파일 위치

```
src/components/
├── Verdict.tsx
├── MemberOpinion.tsx
├── VotingBar.tsx
├── DevilsAdvocate.tsx
├── BestPickCallout.tsx
├── VerdictDistribution.tsx
├── BestDiscussions.tsx
└── types.ts         # 공통 MemberName 타입
```

공통 타입 (`types.ts`):

```typescript
export type MemberName = 'Alice' | 'Amber' | 'Crong' | 'diego' | 'Jay' | 'Leo' | 'zinii';
export type Verdict = '🟢 생존' | '🟡 변형' | '🔴 사망';
```

## 디자인 원칙 (v1 미니멀)

1. **데이터 렌더러만** — 장식 금지. 숫자/텍스트를 있는 그대로 보여주는 게 주 역할
2. **이모지 1개 + 텍스트** — 추가 아이콘/일러스트 금지 (UI 슬롭 회피)
3. **다크 모드 respect** — Docusaurus `useColorMode` 활용, 직접 색상 하드코딩 금지
4. **모바일 우선** — 모든 컴포넌트 320px 너비에서 깨지지 않아야 함

## Common Mistakes

| 실수 | 결과 | 수정 |
|---|---|---|
| `opinion` 텍스트를 마크다운으로 풀어놓음 | Human-only 영역 침범 가능성 | props로만 전달, 본문에 쓰지 말 것 |
| 컴포넌트 내부에서 YAML 직접 import | 런타임 의존성 복잡도↑ | 순수 presentational, props만 받기 |
| `votes` 객체에 없는 멤버 추가 | VotingBar 렌더 깨짐 | YAML meta.members와 동기화 필수 |
| `emoji` prop에 여러 이모지 | 시각 산만 | 정확히 1개 (MemberName → emoji 매핑 유지) |

## Import 패턴 (mdx-writer가 자동 삽입)

모든 챕터 MDX 최상단:

```mdx
import Verdict from '@site/src/components/Verdict';
import MemberOpinion from '@site/src/components/MemberOpinion';
import VotingBar from '@site/src/components/VotingBar';
import DevilsAdvocate from '@site/src/components/DevilsAdvocate';
import BestPickCallout from '@site/src/components/BestPickCallout';
```

부록 페이지만:

```mdx
import VerdictDistribution from '@site/src/components/VerdictDistribution';
import BestDiscussions from '@site/src/components/BestDiscussions';
```
