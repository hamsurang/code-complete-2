# 기여 가이드

이 프로젝트는 [Docusaurus](https://docusaurus.io/)로 만들어진 정적 사이트입니다.
마크다운(`.md`) 파일만 수정하면 자동으로 웹 페이지가 생성됩니다.

## 로컬 환경 세팅

### 1. 저장소 Fork & Clone

```bash
# 본인 GitHub에서 Fork 후
git clone https://github.com/{본인-GitHub-ID}/code-complete-2.git
cd code-complete-2
```

### 2. pnpm 설치 (없는 경우)

```bash
npm install -g pnpm
```

### 3. 의존성 설치 & 실행

```bash
pnpm install
pnpm start
```

브라우저에서 `http://localhost:3000/code-complete/` 가 자동으로 열립니다.
파일을 수정하면 새로고침 없이 바로 반영됩니다.

## 프로젝트 구조

```
code-complete-2/
├── docs/                    # 모든 문서가 여기에 있습니다
│   ├── index.md             # 메인 소개 페이지
│   ├── part-01/             # 1부: 기초 확립
│   │   ├── _category_.json  # 사이드바 파트 이름·순서 설정
│   │   ├── ch01.md          # Chapter 1
│   │   ├── ch02.md          # Chapter 2
│   │   └── ...
│   ├── part-02/             # 2부: 고품질 코드 작성
│   └── ...                  # part-03 ~ part-07
├── static/
│   └── img/                 # 이미지 파일 저장 위치
├── docusaurus.config.ts     # 사이트 전체 설정
├── sidebars.ts              # 사이드바 설정
└── src/
    └── css/
        └── custom.css       # 스타일 커스터마이징
```

**핵심: `docs/` 폴더 안의 `.md` 파일만 수정하면 됩니다.**

## 마크다운 작성법

### 기본 규칙

- 제목은 `##`부터 시작합니다. (`#`은 사용하지 않습니다)
- 파일 상단의 `---`로 감싼 부분(frontmatter)은 메타데이터이므로 삭제하지 마세요.

```markdown
---
sidebar_position: 1
title: "Chapter 1. 소프트웨어 구현으로의 초대"
---

> 원제: *Welcome to Software Construction*

여기부터 자유롭게 작성하세요.
```

### frontmatter 필드 설명

| 필드 | 설명 |
| --- | --- |
| `sidebar_position` | 사이드바에서의 순서 (수정하지 마세요) |
| `title` | 페이지 제목 & 사이드바 표시 텍스트 |

## 이미지 사용법

### 1. 이미지 저장

이미지는 `static/img/` 하위에 챕터별 폴더를 만들어 저장합니다.

```
static/
└── img/
    └── ch05/
        ├── design-pattern.png
        └── class-diagram.png
```

### 2. 마크다운에서 참조

```markdown
![설계 패턴 다이어그램](/img/ch05/design-pattern.png)
```

경로는 `/img/`로 시작합니다. (`static/`은 빼고 적습니다)

### 3. 크기 조절이 필요한 경우

마크다운 문법으로는 크기 조절이 안 되므로, HTML 태그를 사용하세요.

```html
<img src="/img/ch05/design-pattern.png" alt="설계 패턴" width="500" />
```

## Docusaurus 전용 문법

일반 마크다운 외에 Docusaurus에서 제공하는 유용한 문법들입니다.

### 강조 박스 (Admonitions)

```markdown
:::info 참고
일반 참고 사항을 적을 때 사용합니다.
:::

:::tip 팁
유용한 팁을 공유할 때 사용합니다.
:::

:::warning 주의
주의할 점을 강조할 때 사용합니다.
:::

:::danger 위험
절대 하면 안 되는 것을 표시할 때 사용합니다.
:::
```

### 접기 (Details)

```markdown
<details>
<summary>클릭하면 펼쳐집니다</summary>

여기에 길거나 선택적인 내용을 넣으세요.

</details>
```

### 탭

```markdown
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';

<Tabs>
<TabItem value="good" label="좋은 예">

\`\`\`js
const userName = "홍규진";
\`\`\`

</TabItem>
<TabItem value="bad" label="나쁜 예">

\`\`\`js
const a = "홍규진";
\`\`\`

</TabItem>
</Tabs>
```

## PR 올리기

1. 본인 Fork에서 브랜치를 만듭니다.

```bash
git checkout -b ch05/design-in-construction
```

2. 챕터 파일을 수정하고 커밋합니다.

```bash
git add docs/part-02/ch05.md
git commit -m "docs: ch05 구현 설계 정리"
git push origin ch05/design-in-construction
```

3. GitHub에서 Pull Request를 생성합니다.

## 자주 묻는 질문

**Q: 빌드가 실패해요.**
`pnpm build`를 돌려보세요. 깨진 링크가 있으면 에러가 나니, 경로를 확인해주세요.

**Q: 사이드바 순서가 이상해요.**
각 `.md` 파일의 `sidebar_position` 값을 확인하세요. 숫자가 작을수록 위에 표시됩니다.

**Q: 새 파일을 추가해도 되나요?**
네, 해당 파트 폴더 안에 `.md` 파일을 추가하면 자동으로 사이드바에 나타납니다. `sidebar_position`만 잘 지정해주세요.
