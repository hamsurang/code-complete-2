---
name: code-complete-harness
description: Use when user wants to publish, update, or re-run Code Complete 2 study artifacts from Notion to Docusaurus — including phrases like "산출물 퍼블리싱", "Notion에서 Docusaurus", "챕터 업데이트", "재실행", "일부 장만 다시", "부록만 재생성", "대시보드 업데이트", "새 주차 반영", "편집 스타일 바꿔". Covers initial run, partial re-run, dashboard-only refresh, and feedback-driven iteration on previously generated MDX.
---

# code-complete-harness — 오케스트레이터

## 목표

함수랑 산악회 Code Complete 2판 스터디의 Notion 산출물을 **한 번 건져 와서** Docusaurus 독자 관점으로 재구성해 퍼블리싱한다. 6 에이전트가 파이프라인으로 협업하며, Human-only Zone(멤버 의견·투표·Devil's Advocate)은 AI가 건드리지 않는다.

## Phase 0: 컨텍스트 확인 (초기/후속/부분 재실행 판별)

작업 시작 전 `_workspace/` 상태를 본다.

| 상태 | 판정 | 행동 |
|---|---|---|
| `_workspace/` 미존재 | 초기 실행 | 전체 파이프라인 실행 |
| `_workspace/` 존재 + 사용자가 "재실행"/"업데이트"/"새 주차" | 새 실행 | 기존 `_workspace/`를 `_workspace_prev/{timestamp}/` 이동 후 전체 실행 |
| `_workspace/` 존재 + 사용자가 "ch05만 다시" 류 부분 수정 | 부분 재실행 | 해당 챕터만 지정 단계부터 재호출 (아래 "부분 재실행 매트릭스" 참조) |
| `_workspace/` 존재 + 사용자 피드백 ("편집 스타일 바꿔") | 부분 재실행 | 피드백이 가리키는 에이전트부터 재호출 |

**부분 재실행 매트릭스:**

| 사용자 요청 | 재실행 시작 에이전트 |
|---|---|
| "ch05 의견 누락" → Notion에서 다시 추출 | notion-extractor |
| "ch05 편집이 어색" → 재편집 | chapter-editor |
| "ch05 코드 예시 품질 개선" | fe-content-enhancer |
| "대시보드만 다시 집계" | aggregator |
| "MDX만 재렌더" | mdx-writer |
| "슬롭 재검사" | voice-validator |

## 팀 구성

```
리더: 이 오케스트레이터
팀: [notion-extractor, chapter-editor, fe-content-enhancer, aggregator, mdx-writer, voice-validator]
실행 모드: 에이전트 팀 (TeamCreate + TaskCreate)
모델: 전원 opus
```

## 파이프라인 (순차 + 부분 병렬)

```
[notion-extractor] (N개 챕터 순차)
      ↓ _workspace/data/chapters/chXX.yml
[chapter-editor] (N개 챕터 병렬 가능)
      ↓ _workspace/edited/chXX.edited.yml
      ├─[fe-content-enhancer] (병렬)
      │     ↓ _workspace/enhanced/chXX.enhanced.yml
      └─[aggregator] (모든 edited 완료 후)
            ↓ _workspace/appendix/dashboard.yml
              ┆
              ↓ (enhanced + dashboard 둘 다 준비되면)
[mdx-writer]
      ↓ docs/partN/chXX.mdx, docs/appendix/dashboard.mdx
[voice-validator]
      ↓ pass: 완료 / fail: chapter-editor 또는 fe-content-enhancer 재호출 (최대 2회)
```

## 데이터 전달 프로토콜

- **태스크 기반 (TaskCreate):** 챕터별 작업을 에이전트에게 할당. 각 작업은 `chapter_number`, `input_path`, `output_path` 메타 포함
- **파일 기반:** `_workspace/` 하위에 단계별 산출물 저장 (감사 추적용)
- **메시지 기반 (SendMessage):** 피드백 루프와 실시간 조율 (예: voice-validator → chapter-editor 재작성 요청)

파일명 컨벤션: `{stage}/chXX.{artifact}.{ext}`
- `raw/chapters/chXX.json` — Notion 원본 블록 덤프
- `data/chapters/chXX.yml` — 3-Zone YAML (extractor 출력)
- `edited/chXX.edited.yml` — chapter-editor 재구성본
- `enhanced/chXX.enhanced.yml` — fe-content-enhancer 보강본
- `appendix/dashboard.yml` — aggregator 집계
- `validation/chXX.report.json` — voice-validator 검증

## 에러 핸들링

| 에러 유형 | 전략 |
|---|---|
| notion-extractor 401/403 | 사용자에게 Notion integration 공유 요청 + 중단 |
| 단일 챕터 파싱 실패 | 해당 챕터 skip + 로그, 나머지 챕터는 진행. 최종 리포트에 명시 |
| chapter-editor가 Human-only 해시 깨트림 | 즉시 fail-fast. 재실행으로 복구 시도, 2회 실패 시 수동 개입 요청 |
| fe-content-enhancer ESLint 룰 검색 불가 | 해당 체크리스트만 `eslint_rule: null` + 파이프라인 계속 |
| aggregator 입력 0개 | 빈 대시보드 YAML 생성 + 경고 |
| voice-validator fail | chapter-editor/fe-content-enhancer 2회 재시도. 3회째는 수동 검토 |

상충 데이터는 삭제하지 않고 출처 병기. 예: 판정이 🟢과 🟡로 혼재 시 두 개 다 기록 후 aggregator가 "판정 불일치" 리포트.

## 워크플로우 실행

### 초기 실행 (예: 5주차 5장 퍼블리싱)

1. Phase 0 체크: `_workspace/` 없음 → 초기 실행
2. TeamCreate(team_name="code-complete", members=6)
3. TaskCreate:
   - "extract-ch05" (owner: notion-extractor)
   - "edit-ch05" (owner: chapter-editor, blockedBy: extract-ch05)
   - "enhance-ch05" (owner: fe-content-enhancer, blockedBy: edit-ch05)
   - "aggregate" (owner: aggregator, blockedBy: edit-ch05)
   - "render-ch05" (owner: mdx-writer, blockedBy: [enhance-ch05, aggregate])
   - "validate-ch05" (owner: voice-validator, blockedBy: render-ch05)
4. 팀원들 자체 조율하며 실행 (SendMessage로 피드백)
5. 모든 태스크 completed 시 팀 해체
6. 사용자에게 산출물 요약 + 피드백 요청

### 부분 재실행 (예: "ch05 의견이 빠졌다")

1. Phase 0 체크: `_workspace/` 존재 + 부분 수정 요청
2. notion-extractor 재호출 (ch05만)
3. 이후 downstream 에이전트들에게 "ch05 변경됨" 메시지 → 해당 챕터만 재실행

## 테스트 시나리오

### 정상 흐름
- **입력:** "5주차 ch05를 Docusaurus에 퍼블리싱해줘"
- **예상:** Notion DB에서 ch05 추출 → edited → enhanced → aggregate(1개 챕터 기준) → MDX 생성 → voice-validator pass
- **검증:** `docs/part-02/ch05.mdx` 생성 + frontmatter에 authors/ai_assisted 기록 + `<MemberOpinion>` 7개 + `<VotingBar>` 존재

### 에러 흐름
- **입력:** "ch05 퍼블리싱" (Notion integration 미공유 상태)
- **예상:** notion-extractor 401 → 사용자에게 공유 요청 메시지 + 파이프라인 중단
- **검증:** `_workspace/` 어떤 파일도 생성 안 됨 (fail-fast)

## 완료 후 피드백 수집

실행 완료 시 사용자에게:
- "편집 흐름이 마음에 드시나요?" — chapter-editor 피드백
- "코드 예제가 실전 같나요?" — fe-content-enhancer 피드백
- "부록 대시보드가 유용한가요?" — aggregator 피드백

피드백은 CLAUDE.md 변경 이력에 기록 → 해당 스킬 개선 루프.

## 사용자 보고 템플릿

실행 완료 시 다음 형식으로 보고:

```
✅ code-complete-harness 완료

처리된 챕터: ch05 (5주차)
생성 파일:
  - docs/part-02/ch05.mdx
  - docs/appendix/dashboard.mdx (업데이트)

품질:
  - voice-validator: pass (high 0, medium 1, low 3)
  - Human-only zone 무결성: 검증됨

다음 단계:
  - Docusaurus dev server: npm run start
  - 검토 후 커밋: git add docs/ && git commit -m "feat: ch05 퍼블리싱"
```
