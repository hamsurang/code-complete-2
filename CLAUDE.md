# Code Complete 2판 한글 스터디 — Docusaurus 퍼블리싱 리포

## 프로젝트 개요

함수랑 산악회 7명이 진행한 Code Complete 2판 스터디 산출물(Notion)을 **"2026년판 FE 관점 재해석"** 콘셉트로 Docusaurus에 맛깔나게 재구성해 외부 공개한다.

- **스택:** Docusaurus 3.9.2 · React 19 · TypeScript 5.9.3 · MDX 3
- **배포:** GitHub Pages (`hamsurang/code-complete-2`, baseUrl `/code-complete-2/`)
- **배포 전략:** A(GitHub Pages) + E(조용한 공개 — `robots.txt Disallow: /`). 3~5장 누적 + 각 장 voice-validator pass 이후 별도 PR로 해제
- **배포 트리거:** `main` 브랜치 push → `.github/workflows/deploy.yml` → `actions/deploy-pages@v4`
- **스터디원 7명:** Alice(🦊 2년차) · Amber(🐵 5년차) · Crong(🦎 1년차) · diego(🦉 5년차) · Jay(🦜 3년차) · Leo(🐻 4년차) · zinii(🐿️)

## 핵심 원칙

1. **Notion = 1회성 재료, Docusaurus = 본진** — 자동 sync 없음, 수동 트리거로 건져와 편집 재구성
   - Why: 주기 sync는 양방향 충돌·스키마 드리프트·CI 복잡도를 부르지만 해결하려는 문제는 "새 주차 콘텐츠 이주" 하나. 수동 트리거면 충분하고 매번 편집자 에이전트가 반드시 개입해 품질이 보장된다.
2. **스터디원 기여물 보존** — 멤버 의견 / Devil's Advocate / 투표는 AI가 건드리지 않는 Human-only Zone
   - Why: 스터디 상품의 유일한 차별점은 7명의 **살아있는 목소리**다. AI가 한 글자라도 고치면 "스터디 노트"가 아닌 "AI 요약본"이 되어 상품 가치가 0이 된다. 해시 검증(`scripts/verify-human-only-hash.js`)과 hook으로 기계적으로 강제한다.
3. **AI value-add는 3영역만** — 요약·코드 번역·체크리스트 (AI-editable Zone) + 판정 근거 초안(AI-assist Zone)
   - Why: AI가 잘하는 영역(원서 Java/C++ → React/TS 번역, 체크리스트 ↔ ESLint 매핑)과 못하는 영역(현업 경험, 판정 합의)이 명확히 다르다. 경계를 YAML 키 계층으로 드러내 실수를 구조적으로 차단한다.
4. **"맛깔나게" 재구성** — Notion 9섹션 순서가 아닌 독자 읽기 흐름으로 chapter-editor가 재배치
   - Why: Notion 섹션 순서는 집필자 편의다. 독자는 Verdict(훅) → 요약 → 투표(사회적 증명) → 코드 → 의견(클라이맥스) 순이 더 잘 읽힌다. 순서 바꾸기는 자유지만 내용 변경은 Zone 경계 위반이다.

---

## 하네스: code-complete-docusaurus

**목표:** Notion 산출물 → 3-Zone YAML → "맛깔나게" 편집 재구성 → Docusaurus MDX 자동 생성. AI 슬롭 냄새 제로, 멤버 목소리 원본 보존.

### 에이전트 팀 (6명, 파이프라인 패턴)

| 에이전트 | 역할 |
|---|---|
| [notion-extractor](.claude/agents/notion-extractor.md) | Notion DB 1회성 추출 + 3-Zone YAML 분리 |
| [chapter-editor](.claude/agents/chapter-editor.md) ★ | 9섹션 재배치 + 브릿지 문장 ("맛깔나게" 주역) |
| [fe-content-enhancer](.claude/agents/fe-content-enhancer.md) | Java/C++ → React/TS 코드 번역 + ESLint 룰 매핑 |
| [aggregator](.claude/agents/aggregator.md) | 판정 분포 / 투표 평균 / 베스트 토론 집계 (부록) |
| [mdx-writer](.claude/agents/mdx-writer.md) | YAML → MDX + 커스텀 컴포넌트 + frontmatter |
| [voice-validator](.claude/agents/voice-validator.md) | AI 슬롭 탐지 (ai_editable 영역만, 피드백 루프) |

### 스킬 (10개)

| 스킬 | 용도 | 사용 에이전트 |
|---|---|---|
| [code-complete-harness](.claude/skills/code-complete-harness/SKILL.md) | 오케스트레이터 (팀 구성/작업 할당/데이터 흐름) | 리더 |
| [yaml-3zone-schema](.claude/skills/yaml-3zone-schema/SKILL.md) | 3-Zone YAML 스키마 + zod 검증 | 전체 |
| [mdx-components](.claude/skills/mdx-components/SKILL.md) | 커스텀 컴포넌트 props 계약 | mdx-writer |
| [writing-voice-ff](.claude/skills/writing-voice-ff/SKILL.md) | 집필 어투 가이드 (Frontend Fundamentals 해요체) | chapter-editor, fe-content-enhancer, mdx-writer, voice-validator |
| [notion-yaml-extract](.claude/skills/notion-yaml-extract/SKILL.md) | Notion 블록 → 3-Zone YAML 매핑 | notion-extractor |
| [chapter-reorchestration](.claude/skills/chapter-reorchestration/SKILL.md) | 재구성 원칙·브릿지·무결성 해시 | chapter-editor |
| [fe-content-enhance](.claude/skills/fe-content-enhance/SKILL.md) | Java/C++ → TS 번역 + ESLint 매핑 | fe-content-enhancer |
| [aggregate-dashboard](.claude/skills/aggregate-dashboard/SKILL.md) | 집계 공식·엣지 케이스 | aggregator |
| [mdx-render](.claude/skills/mdx-render/SKILL.md) | YAML → MDX 템플릿 | mdx-writer |
| [voice-ai-slop-detect](.claude/skills/voice-ai-slop-detect/SKILL.md) | AI 슬롭 패턴 카탈로그 | voice-validator |

### 실행 규칙

- 스터디 산출물 퍼블리싱·재구성 요청 시 `code-complete-harness` 스킬을 통해 6 에이전트 팀으로 처리
- 단순 MDX 수정·리뷰는 팀 없이 직접 가능
- **모든 에이전트는 `model: "opus"`**
- 중간 산출물: `_workspace/` (raw JSON, 3-Zone YAML, edited YAML, enhanced YAML, appendix, validation reports)
- 최종 산출물: `docs/partN/chXX.mdx`, `docs/appendix/dashboard.mdx`
- 실행 전 기존 `_workspace/` 존재 시 `_workspace_prev/{timestamp}/` 백업

### 3-Zone 정책

| Zone | 담당 | AI 접근 |
|---|---|---|
| 🟢 **ai_editable** | summary, code_examples, checklist | AI 생성·수정 가능 |
| 🟡 **ai_assist** | verdict.rationale | AI 초안만, 사람 최종 확정 |
| 🔴 **human_only** | member_opinions, devils_advocate, votes, best_pick | AI 절대 접근 금지 (해시 검증) |

### 커스텀 MDX 컴포넌트 (src/components/)

- `<Verdict rating rationale />`
- `<MemberOpinion author emoji opinion experience />`
- `<VotingBar average votes />`
- `<DevilsAdvocate author argument />`
- `<BestPickCallout content reason />`
- `<VerdictDistribution alive evolved dead />` (부록용)
- `<BestDiscussions items />` (부록용)

---

## 디렉토리 구조

```
code-complete-2/
├── CLAUDE.md                      # 이 파일
├── .github/workflows/
│   ├── build.yml                  # PR 게이트 (lint + format:check + build)
│   └── deploy.yml                 # main push 시 GitHub Pages 배포
├── eslint.config.mjs              # ESLint 9 flat config
├── .prettierrc.json               # 포맷터
├── scripts/
│   └── verify-human-only-hash.js  # Human-only Zone 해시 검증 (Node)
├── docs/
│   ├── index.mdx
│   ├── foundations/               # 🧭 구현의 기초 (ch1-4, ch5-6)
│   ├── good-code/                 # ✏️ 좋은 코드 쓰기 (ch7-9, ch20-23)
│   ├── growth/                    # 🔧 완성과 성장 (ch24-26, ch31-34)
│   └── appendix/                  # 집계 대시보드 (사이드바 미노출, URL 유지)
├── plans/                         # 로컬 실행 플랜 (.gitignore, docs/ 밖)
├── src/
│   ├── components/                # 커스텀 MDX 컴포넌트 (Phase 4)
│   └── css/custom.css
├── _workspace/                    # 하네스 중간 산출물 (.gitignore 대상)
│   ├── raw/chapters/chXX.json
│   ├── data/chapters/chXX.yml
│   ├── edited/chXX.edited.yml
│   ├── enhanced/chXX.enhanced.yml
│   ├── appendix/dashboard.yml
│   ├── validation/chXX.report.json
│   └── _workspace_prev/{timestamp}/
└── .claude/
    ├── settings.json              # hooks (PostToolUse Human-only 검증)
    ├── hooks/
    │   └── post-write-yaml.sh     # edited YAML 쓸 때마다 Zone 해시 비교
    ├── agents/
    │   ├── notion-extractor.md
    │   ├── chapter-editor.md
    │   ├── fe-content-enhancer.md
    │   ├── aggregator.md
    │   ├── mdx-writer.md
    │   └── voice-validator.md
    └── skills/
        ├── code-complete-harness/SKILL.md      # 오케스트레이터
        ├── yaml-3zone-schema/SKILL.md          # 공통 스키마
        ├── mdx-components/SKILL.md             # 공통 컴포넌트 계약
        ├── writing-voice-ff/SKILL.md           # 공통 집필 어투 가이드
        ├── notion-yaml-extract/SKILL.md
        ├── chapter-reorchestration/SKILL.md
        ├── fe-content-enhance/SKILL.md
        ├── aggregate-dashboard/SKILL.md
        ├── mdx-render/SKILL.md
        └── voice-ai-slop-detect/SKILL.md
```

---

## 변경 이력

| 날짜 | 변경 내용 | 대상 | 사유 |
|---|---|---|---|
| 2026-04-18 | 하네스 초기 구성 (Phase 0-3) | .claude/agents/ 6개 | 스터디 산출물 퍼블리싱 프로젝트 시작 |
| 2026-04-18 | 스킬 9개 생성 (Phase 4) | .claude/skills/ | 오케스트레이터 + 공통 2 + 에이전트별 6 |
| 2026-04-18 | 스킬 description 리팩터 | code-complete-harness, yaml-3zone-schema | writing-skills 원칙(워크플로우 요약 금지) 준수 |
| 2026-04-18 | writing-voice-ff 스킬 추가 + 4개 스킬/4개 에이전트 참조 연결 | writing-voice-ff, chapter-reorchestration, fe-content-enhance, mdx-render, voice-ai-slop-detect, 4 agents | frontend-fundamentals.com 해요체 어투를 집필 에이전트 기준 어투로 채택 |
| 2026-04-18 | harness-audit Phase 2 적용 (인프라 구축) | `.github/workflows/build.yml`, `eslint.config.mjs`, `.prettierrc.json`, `scripts/verify-human-only-hash.js`, `.claude/hooks/post-write-yaml.sh`, `.claude/settings.json`, `.gitignore`, `package.json` | 축 1 Why 보강, 축 2 L1→L2 (린터·CI), 축 2 L3→L4 가산(hooks로 Human-only 강제) |
| 2026-04-20 | GitHub Pages 배포 워크플로우 + baseUrl 정합성 + 조용한 공개 | `.github/workflows/deploy.yml`, `static/robots.txt`, `docusaurus.config.ts`, `src/components/HeroSection.tsx` | PR #2. A(GitHub Pages) + E(robots.txt Disallow:/) 전략. `code-complete` → `code-complete-2` 일치. useBaseUrl 훅 |
| 2026-04-20 | CI exit code 버그 수정 + format drift 청산 | `.github/workflows/build.yml`, `eslint.config.mjs`, `package.json`, 8개 MDX | PR #3. `\| head -N` 파이프가 lint/format 실패 exit code를 SIGPIPE로 삼킴 + ESLint 9에서 `--format compact` core 분리 대응 |
| 2026-04-20 | `docs/plans/` → `plans/` 이동 (로컬 dev 사이드바 오염 방지) | `.gitignore`, `CLAUDE.md`, `docs/plans/` | PR #4. autogenerated 사이드바가 untracked 파일도 스캔 |
| 2026-04-20 | appendix 대시보드 사이드바 숨김 (URL 유지) | `sidebars.ts`, `docs/appendix/dashboard.mdx` | PR #5. autogenerated → 명시 구성. `unlisted: true` 프론트매터 추가 |
| 2026-04-20 | 주차별 → 테마별 사이드바 재구성 | `docs/weeks/` → `docs/{foundations,good-code,growth}/`, `sidebars.ts` 3 테마 × 2 파일, 프론트매터 8개 정리 | PR #6 + 추가 커밋. 외부 공개 독자 관점. 6 파일 git mv. 본문 "N주차" 표현 제거 |
| 2026-04-20 | ch7-9·ch20-23 판정 Notion 재추출 반영 | `docs/good-code/{1-routines,2-quality}.mdx`, `docs/appendix/dashboard.mdx` | PR #7. `code-complete-harness` 스킬 부분 재실행 (notion-extractor 2회 dispatch + aggregator). Notion callout `has_children` 재귀 fetch 누락 버그 발견·수동 보강으로 해결 |

---

## 기타

- 스터디 원본 Notion DB: `b9bde71a-aa9f-8230-a13e-013e0ae3be57` ("산출물")
- 챕터 템플릿 페이지: `33bde71a-aa9f-81f0-a0fd-c377180da337` (9섹션 레퍼런스)
- 현재 진행: 8장까지 (Part 1-2 범위), 2~8주차 누적
