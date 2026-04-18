---
name: fe-content-enhance
description: Use when translating Code Complete's Java/C++ examples into 2026 React/TypeScript Before-After pairs, or when mapping FE checklist items to specific ESLint / typescript-eslint / react-hooks / jsx-a11y rules. Also use when original code has no FE equivalent (pointers, manual memory management) and a "principle only, no code" fallback is needed. Do not use when content belongs to human_only zone.
---

# fe-content-enhance

## Overview

원서는 2004년 Java/C++ 관점이다. 같은 원칙을 2026년 React/TypeScript 실무에서 어떻게 체감하는지 번역하는 게 이 스킬의 몫이다. 단순 문법 치환이 아니라 **같은 원칙을 드러내는 FE 안티패턴과 수정본**을 만든다.

**어투 가이드:** 코드 앞뒤 해설 산문은 `writing-voice-ff` 스킬의 해요체·"코드를 읽는 사람" 관점을 따른다. Before/After 해설 순서(문제→진단→개선→효과)도 그 스킬에 정의돼 있다.

## When to Use

- Before/After 코드가 Java/C++로 돼 있어 FE 독자가 체감 못할 때
- 체크리스트 항목이 "의도 드러나는 이름" 같은 추상 텍스트라 실무 연결 약할 때
- 원서 예제의 포인터/헤더/매크로 같은 FE 등가 없는 요소를 만났을 때

## 번역 3원칙

1. **원칙 보존, 문법 번역만** — 원서가 말하는 원칙 X를 그대로 유지. 다른 원칙으로 치환 금지
2. **Before = 실제 흔한 실수** — 허수아비 코드 금지. 실무에서 자주 보이는 안티패턴
3. **After = 최소 수정** — 전면 재작성 아닌, 원칙 적용 지점만 고침

## FE 안티패턴 카탈로그 (번역 참조)

| 원서 원칙 | FE Before 후보 | FE After 후보 |
|---|---|---|
| 의도 드러내는 변수명 | `items.map((_, i) => ...)` | `items.map((item, index) => ...)` |
| 함수 하나의 책임 | `useUserAndProducts()` 훅 | `useUser()` + `useProducts()` 분리 |
| 불필요한 주석 | `// useEffect 정리` + 빈 함수 | 주석 제거, 코드 자체로 의도 드러냄 |
| 매직 넘버 제거 | `setTimeout(fn, 3000)` | `const RETRY_DELAY_MS = 3000` |
| 깊은 중첩 회피 | `if { if { if ... } } }` | early return, guard clause |
| 데이터와 로직 분리 | 컴포넌트 안에 fetch + 렌더 | `useQuery` + presentational 컴포넌트 |
| 불변성 보장 | `array.push(item)` | `[...array, item]` |
| Boolean 이름 | `data` | `isLoading`, `hasError` |
| useEffect 의존성 완전성 | `useEffect(() => fn(x), [])` | `useEffect(() => fn(x), [x])` |
| 타입 좁히기 | `as any` 캐스팅 | 타입 가드 + narrow |

위 카탈로그는 시작점이지 전부가 아니다. 원서 원칙에 가장 가까운 FE 패턴을 판단해서 적용.

## After 코드 품질 기준

```typescript
// 기준 통과 예시
type User = { id: string; name: string };

export function useUsers(): {
  users: User[];
  isLoading: boolean;
  error: Error | null;
} {
  const { data, isLoading, error } = useQuery<User[]>({
    queryKey: ['users'],
    queryFn: fetchUsers,
  });
  return { users: data ?? [], isLoading, error };
}
```

체크 항목:
- [ ] `tsc --noEmit` 통과 가능한 문법 (실행 안 해도 됨)
- [ ] 2026년 실무 코드처럼 보임 (Hooks, TanStack Query, Suspense 등)
- [ ] 20줄 이내 (교과서용 짧은 예제)
- [ ] Before와 대조할 때 원칙 적용 지점이 명확히 보임

## ESLint 룰 매핑

체크리스트 `text` → 공식 ESLint/TS-ESLint 룰.

### 신뢰할 수 있는 소스

| 플러그인 | 링크 베이스 |
|---|---|
| ESLint core | https://eslint.org/docs/latest/rules/{rule} |
| @typescript-eslint | https://typescript-eslint.io/rules/{rule} |
| eslint-plugin-react-hooks | https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks |
| eslint-plugin-jsx-a11y | https://github.com/jsx-eslint/eslint-plugin-jsx-a11y/tree/main/src/rules |

### 자주 쓰는 매핑

| 체크리스트 텍스트 패턴 | ESLint 룰 |
|---|---|
| "변수 이름 의도" / "짧은 이름 피하기" | `id-length` |
| "사용 안 하는 import" | `@typescript-eslint/no-unused-vars` |
| "useEffect 의존성" | `react-hooks/exhaustive-deps` |
| "any 타입 금지" | `@typescript-eslint/no-explicit-any` |
| "매직 넘버" | `no-magic-numbers` |
| "키 없는 리스트" | `react/jsx-key` |
| "alt 텍스트" | `jsx-a11y/alt-text` |
| "if 중괄호" | `curly` |
| "unused expressions" | `@typescript-eslint/no-unused-expressions` |

### 매핑 없을 때

강제로 만들지 말 것. `eslint_rule: null` + `translation_note: "ESLint 자동화 불가, 코드 리뷰 항목"` 추가.

## 원서 예제 FE 등가 없음 (Fallback)

포인터/메모리 관리/매크로 등 FE에 없는 개념:

```yaml
code_examples:
  - title: "메모리 관리"
    before: null
    after: null
    language: typescript
    translation_note: |
      원서의 C++ 메모리 관리 예제는 FE 등가 없음.
      원칙 ("리소스 정리 책임을 명확히")은 React에서 useEffect cleanup 함수와
      `AbortController` 패턴으로 이어진다. 상세는 Common Mistakes 섹션 참조.
```

이 경우 mdx-writer는 이 항목을 코드 블록 없이 설명 paragraph로 렌더.

## Common Mistakes

| 실수 | 왜 문제 | 수정 |
|---|---|---|
| `useState<any>` 남용 예시 | any 금지 원칙에 반함 | 제대로 타입 지정한 Before 만들기 (흔한 실수 패턴은 따로) |
| ESLint 룰 이름 추측 | 존재하지 않는 룰 링크 | WebSearch로 실제 문서 확인 |
| Before와 After가 로직이 다름 | 리팩터링이지 원칙 적용이 아님 | 로직은 동일, 원칙 적용 지점만 바뀌어야 |
| 15줄 이상 긴 예제 | 독자 주의 분산 | 핵심만 추출, 불필요한 boilerplate 제거 |
| 주석으로 해설 ("여기가 핵심!") | 교과서 티 | 주석 최소화, 본문 paragraph으로 설명 |
