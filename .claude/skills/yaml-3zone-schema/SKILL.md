---
name: yaml-3zone-schema
description: Use when reading, writing, or validating Code Complete chapter YAML files — including zone integrity checks (ai_editable / ai_assist / human_only), member opinion preservation, vote range validation, verdict emoji matching, or schema migration questions. Also use when an agent is about to edit a chapter YAML and needs to confirm which fields are safe to touch.
---

# yaml-3zone-schema

## 왜 3-Zone인가

스터디 상품의 핵심 가치는 **7명 멤버의 살아있는 목소리**다. AI가 의견/투표/Devil's Advocate를 건드리면 상품 가치가 0이 된다. 반면 요약·코드 번역·체크리스트는 AI가 잘할 수 있는 영역이다. 이 비대칭을 **YAML 키 계층**으로 물리적으로 드러내 실수 방지.

## Zone 정의

### 🟢 ai_editable (AI가 생성/수정 가능)

```yaml
ai_editable:
  summary:
    lead: string              # 3-5줄 리드 문장
    bullets: [string, ...]    # 핵심 포인트 3-5개
  code_examples:
    - title: string
      before: string          # Before 코드 (FE 관점 안티패턴)
      after: string           # After 코드 (수정본)
      language: "typescript" | "javascript" | "tsx"
      translation_note: string | null  # FE 등가 없을 때만
  checklist:
    - text: string
      eslint_rule: string | null
      rule_url: string | null
```

### 🟡 ai_assist (AI 초안 가능, 사람이 최종 확정)

```yaml
ai_assist:
  verdict:
    rating: "🟢 생존" | "🟡 변형" | "🔴 사망"
    rationale: string         # 한 줄 근거. AI는 제안만, YAML 값이 있으면 그대로
```

### 🔴 human_only (AI 접근 완전 금지)

```yaml
human_only:
  discussion_questions: [string, ...]  # 토론 포인트 3개
  member_opinions:
    - author: "Alice" | "Amber" | "Crong" | "diego" | "Jay" | "Leo" | "zinii"
      emoji: string
      opinion: string                    # 원문 보존, 한 글자도 수정 금지
      experience: string                 # 현업 경험
  devils_advocate:
    author: string
    argument: string                     # 원문 보존
  votes:                                 # 1~5 정수
    Alice: 1 | 2 | 3 | 4 | 5 | null
    Amber: 1 | 2 | 3 | 4 | 5 | null
    Crong: 1 | 2 | 3 | 4 | 5 | null
    diego: 1 | 2 | 3 | 4 | 5 | null
    Jay: 1 | 2 | 3 | 4 | 5 | null
    Leo: 1 | 2 | 3 | 4 | 5 | null
    zinii: 1 | 2 | 3 | 4 | 5 | null
  best_pick:
    content: string | null
    reason: string | null
```

### meta (공통 메타)

```yaml
meta:
  chapter_number: integer (1-35)
  title: string
  original_title: string
  week: string  # "5주차" 등
  source: "notion-pull"
  source_page_id: uuid
  extracted_at: ISO-8601 datetime
  members: [Alice, Amber, Crong, diego, Jay, Leo, zinii]
```

### edit_meta (chapter-editor 이후 추가)

```yaml
edit_meta:
  edited_at: datetime
  reorder_applied: "default" | string
  bridges_added: integer
  zones_respected: true  # Human-only 해시 검증 통과
  ai_assisted_fields: [string, ...]  # 어느 필드에 AI가 손댔는지
```

## 검증 로직

### 필수 체크 (모든 에이전트가 YAML 읽은 직후 실행)

1. **구조 검증** — 3-Zone 키(ai_editable / ai_assist / human_only / meta)가 루트에 존재
2. **Zone 침범 검사** — 멤버 이름이 ai_editable에 들어있지 않은지, 코드 예제가 human_only에 들어있지 않은지
3. **members 매칭** — `meta.members`와 `human_only.member_opinions[].author`, `human_only.votes` 키가 일치
4. **판정 표준** — `ai_assist.verdict.rating`이 🟢/🟡/🔴 3종 중 하나
5. **투표 범위** — `human_only.votes.*` 값은 1~5 정수 또는 null

### Human-only 무결성 해시 (chapter-editor 이후 필수)

chapter-editor가 YAML을 수정한 뒤 출력 전 **반드시 해시 비교**:

```typescript
// 검증 로직 (chapter-reorchestration에서도 참조)
import { createHash } from 'node:crypto';
import { stringify } from 'yaml';

function hashHumanOnly(yaml: any): string {
  const canonical = stringify(yaml.human_only, { sortMapEntries: true });
  return createHash('sha256').update(canonical).digest('hex');
}

const beforeHash = hashHumanOnly(inputYaml);
const afterHash = hashHumanOnly(outputYaml);
if (beforeHash !== afterHash) {
  throw new Error('Human-only zone was modified. Aborting.');
}
```

## 스키마 위반 시

| 위반 유형 | 심각도 | 처리 |
|---|---|---|
| 루트 Zone 키 누락 | high | exit 1, "yaml-3zone-schema 참조" 안내 |
| Human-only 필드에 AI 생성 흔적 (예: `member_opinions[].opinion` 이 비어있음) | high | exit 1 |
| members 리스트와 opinions 저자 불일치 | medium | 경고 + 누락된 author만 `opinion: null` 추가 |
| 투표 값이 1-5 범위 밖 | medium | 경고 + null로 치환 |
| meta 필드 누락 | low | 경고, 파이프라인은 진행 |

## zod 타입 정의 (선택, scripts/validate.ts)

구현 시 zod로 런타임 검증 권장:

```typescript
import { z } from 'zod';

const MemberName = z.enum(['Alice', 'Amber', 'Crong', 'diego', 'Jay', 'Leo', 'zinii']);
const VoteValue = z.union([z.number().int().min(1).max(5), z.null()]);

export const ChapterYamlSchema = z.object({
  meta: z.object({
    chapter_number: z.number().int().min(1).max(35),
    title: z.string(),
    original_title: z.string(),
    week: z.string(),
    source: z.literal('notion-pull'),
    source_page_id: z.string().uuid(),
    extracted_at: z.string().datetime(),
    members: z.array(MemberName),
  }),
  ai_editable: z.object({
    summary: z.object({
      lead: z.string(),
      bullets: z.array(z.string()).min(1).max(5),
    }),
    code_examples: z.array(z.object({
      title: z.string(),
      before: z.string(),
      after: z.string(),
      language: z.enum(['typescript', 'javascript', 'tsx']),
      translation_note: z.string().nullable(),
    })).optional(),
    checklist: z.array(z.object({
      text: z.string(),
      eslint_rule: z.string().nullable(),
      rule_url: z.string().url().nullable(),
    })).optional(),
  }),
  ai_assist: z.object({
    verdict: z.object({
      rating: z.enum(['🟢 생존', '🟡 변형', '🔴 사망']),
      rationale: z.string(),
    }),
  }),
  human_only: z.object({
    discussion_questions: z.array(z.string()),
    member_opinions: z.array(z.object({
      author: MemberName,
      emoji: z.string(),
      opinion: z.string(),
      experience: z.string(),
    })),
    devils_advocate: z.object({
      author: MemberName,
      argument: z.string(),
    }).nullable(),
    votes: z.record(MemberName, VoteValue),
    best_pick: z.object({
      content: z.string().nullable(),
      reason: z.string().nullable(),
    }).nullable(),
  }),
});
```

## 스키마 마이그레이션

버전 변경 시 `meta.schema_version` 필드 추가 (현재 암묵적 v1). v2 이상에서는 필수화.
