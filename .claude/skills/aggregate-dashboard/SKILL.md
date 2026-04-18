---
name: aggregate-dashboard
description: Use when computing Code Complete study-level aggregates — verdict distribution across chapters, voting averages per chapter and per member, highest/lowest rated chapters, best discussion curation, Devil's Advocate collection, member activity counts. Also use when regenerating the /appendix dashboard after new chapter YAMLs arrive.
---

# aggregate-dashboard

## Overview

각 챕터 YAML 안에 흩뿌려진 판정/투표/베스트 토론을 한 데 모아 **스터디 전체 대시보드**를 만든다. 원본 YAML은 read-only. 결과는 `_workspace/appendix/dashboard.yml` 하나.

## When to Use

- 새 챕터 YAML이 추가/수정된 후 대시보드 갱신
- 사용자가 "부록만 다시" / "대시보드 다시" 요청
- 스터디 진행 현황 리포트가 필요할 때

## 집계 공식

### verdict_distribution

```
alive = count(ai_assist.verdict.rating == "🟢 생존")
evolved = count(... == "🟡 변형")
dead = count(... == "🔴 사망")
other = count(null OR 위 3종 외)
```

### voting_summary.overall_average

```
모든 챕터, 모든 멤버의 votes 값 (1~5 정수) 평균
null 투표는 분자/분모에서 모두 제외
소수점 1자리까지
```

### voting_summary.per_chapter[chXX]

```
해당 챕터의 votes.* 중 null 아닌 값들의 산술 평균
전원 null이면 null (평균 계산 불가)
```

### voting_summary.per_member[name]

```
해당 멤버가 제출한 모든 챕터 votes의 평균
```

### highest_rated / lowest_rated (TOP 3)

```
per_chapter 평균 기준 내림차순 / 오름차순 각 3개
동점 시 chapter_number 오름차순 tiebreak
null 챕터는 lowest에 포함하지 않음
```

### best_discussions

```
human_only.best_pick.content가 null 아닌 모든 챕터 수집
content, reason 원문 인용
```

### devils_advocates

```
human_only.devils_advocate가 null 아닌 모든 챕터 수집
author, argument 원문 인용
```

### member_activity[name]

```
opinions_count = 이 멤버가 opinion 작성한 챕터 수 (opinion != null)
devils_advocate_count = 이 멤버가 반박 담당한 챕터 수
votes_submitted = 이 멤버의 votes.name != null 인 챕터 수
```

## 엣지 케이스

| 상황 | 처리 |
|---|---|
| 입력 YAML 0개 | 빈 dashboard.yml 생성 (`chapters_included: 0`), exit 0 |
| YAML 스키마 위반 | 해당 챕터만 skip + `chapters_skipped: [ch03]` 필드에 기록 |
| 전원 미응답 챕터 | per_chapter[chXX]: null, overall_average 계산에서 제외 |
| 판정이 이모지가 아닌 텍스트만 ("생존") | `other`에 카운트 + 경고 로그 |
| best_pick.content 존재하지만 reason null | 포함은 하되 reason 빈 문자열 |

## 출력 스키마

```yaml
generated_at: 2026-04-18T23:00:00+09:00
chapters_included: 8
chapters_skipped: []
members_count: 7

verdict_distribution:
  alive: 5
  evolved: 2
  dead: 1
  other: 0

voting_summary:
  overall_average: 3.8
  per_chapter:
    ch01: 4.2
    ch02: 3.5
    ch03: null
  per_member:
    Alice: 3.9
    Amber: 4.1
    Crong: 3.5
    diego: 4.3
    Jay: 3.7
    Leo: 3.8
    zinii: 3.4

highest_rated:
  - { chapter: 5, title: "...", average: 4.7, verdict: "🟢 생존" }

lowest_rated:
  - { chapter: 6, title: "...", average: 2.1, verdict: "🔴 사망" }

best_discussions:
  - chapter: 5
    content: "(원문 인용)"
    reason: "(원문 인용)"

devils_advocates:
  - chapter: 5
    author: diego
    argument: "(원문 인용)"

member_activity:
  Alice: { opinions_count: 8, devils_advocate_count: 1, votes_submitted: 8 }
```

## 멱등성

동일 입력 set에 대해 `generated_at` 외 모든 필드 identical. 다른 결과 나오면 버그.

## Common Mistakes

| 실수 | 결과 | 수정 |
|---|---|---|
| null 투표를 0으로 치환 | 평균 왜곡 | null은 분모에서도 제외 |
| best_pick 요약/재표현 | Human-only 침범 | 원문 그대로 복사 |
| 판정 fuzzy 매칭 ("생존" 포함 모두 alive) | 오분류 | 정확히 "🟢 생존" 문자열 매치 |
