import styles from './ChapterMap.module.css';

export default function ChapterMap() {
  return (
    <figure className={styles.wrapper}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-2 0 1092 456"
        role="img"
        aria-labelledby="chapter-map-title chapter-map-desc"
        className={`${styles.svg} cc2-diagram cc2-chapter-map`}
        preserveAspectRatio="xMidYMid meet"
      >
        <title id="chapter-map-title">Code Complete 2판 35장 커버리지 맵</title>
        <desc id="chapter-map-desc">
          세 테마(구현의 기초, 좋은 코드 쓰기, 완성과 성장)에 걸쳐 35장 중 20장이 다뤄졌고 15장이
          미커버임을 보여주는 nested containment 다이어그램
        </desc>

        <defs>
          <pattern id="cc2-dots-map" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="var(--cc2-ink)" fillOpacity="0.08" />
          </pattern>
        </defs>

        <rect x="-2" width="1092" height="456" fill="var(--cc2-paper)" />
        <rect x="-2" width="1092" height="456" fill="url(#cc2-dots-map)" opacity="0.6" />

        {/* Theme 1 — 구현의 기초 */}
        <g transform="translate(0, 20)">
          <rect
            x="0"
            y="0"
            width="340"
            height="400"
            rx="12"
            fill="var(--cc2-paper-2)"
            stroke="var(--cc2-rule-solid)"
            strokeWidth="1"
          />
          <rect x="16" y="-8" width="180" height="16" fill="var(--cc2-paper)" />
          <text
            x="24"
            y="4"
            className="mono"
            fill="var(--cc2-muted)"
            fontSize="9"
            letterSpacing="0.18em"
          >
            THEME · 기초
          </text>
          <text x="20" y="40" className="title" fill="var(--cc2-ink)" fontSize="20">
            🧭 구현의 기초
          </text>
          <text x="20" y="64" fill="var(--cc2-muted)" fontSize="11">
            구현이란 무엇인가 · 비유 · 사전 준비 · 설계
          </text>
          <rect
            x="20"
            y="88"
            width="300"
            height="60"
            rx="8"
            fill="var(--cc2-accent-tint)"
            stroke="var(--cc2-accent)"
            strokeWidth="1.2"
          />
          <text x="36" y="110" fill="var(--cc2-ink)" fontSize="13" fontWeight="600">
            1~4장 · 구현 · 비유 · 요구사항 · 결정
          </text>
          <text
            x="36"
            y="130"
            className="mono"
            fill="var(--cc2-accent)"
            fontSize="9"
            letterSpacing="0.14em"
          >
            WEEK 8 · COVERED
          </text>
          <rect
            x="20"
            y="160"
            width="300"
            height="60"
            rx="8"
            fill="var(--cc2-accent-tint)"
            stroke="var(--cc2-accent)"
            strokeWidth="1.2"
          />
          <text x="36" y="182" fill="var(--cc2-ink)" fontSize="13" fontWeight="600">
            5~6장 · 구현 설계 · 클래스 설계
          </text>
          <text
            x="36"
            y="202"
            className="mono"
            fill="var(--cc2-accent)"
            fontSize="9"
            letterSpacing="0.14em"
          >
            WEEK 6 · COVERED
          </text>
          <rect
            x="20"
            y="240"
            width="300"
            height="130"
            rx="8"
            fill="none"
            stroke="var(--cc2-rule-solid)"
            strokeWidth="1"
            strokeDasharray="4,4"
          />
          <text x="36" y="262" fill="var(--cc2-muted)" fontSize="12" fontWeight="600">
            10~19장 · 변수 · 조건문 · 제어
          </text>
          <text x="36" y="280" fill="var(--cc2-soft)" fontSize="11">
            데이터 타입 · 변수 · 기본 제어 구조 등
          </text>
          <text x="36" y="300" fill="var(--cc2-soft)" fontSize="11">
            언어 메커니즘에 해당해 프레임워크 시대
          </text>
          <text x="36" y="318" fill="var(--cc2-soft)" fontSize="11">
            FE에선 우선순위를 낮춰 선정 제외됐어요
          </text>
          <text
            x="36"
            y="352"
            className="mono"
            fill="var(--cc2-soft)"
            fontSize="9"
            letterSpacing="0.14em"
          >
            10 CHAPTERS · NOT COVERED
          </text>
        </g>

        {/* Theme 2 — 좋은 코드 쓰기 */}
        <g transform="translate(372, 20)">
          <rect
            x="0"
            y="0"
            width="340"
            height="400"
            rx="12"
            fill="var(--cc2-paper-2)"
            stroke="var(--cc2-rule-solid)"
            strokeWidth="1"
          />
          <rect x="16" y="-8" width="200" height="16" fill="var(--cc2-paper)" />
          <text
            x="24"
            y="4"
            className="mono"
            fill="var(--cc2-muted)"
            fontSize="9"
            letterSpacing="0.18em"
          >
            THEME · 좋은 코드
          </text>
          <text x="20" y="40" className="title" fill="var(--cc2-ink)" fontSize="20">
            ✏️ 좋은 코드 쓰기
          </text>
          <text x="20" y="64" fill="var(--cc2-muted)" fontSize="11">
            루틴 · 방어적 프로그래밍 · 품질 · 테스트 · 디버깅
          </text>
          <rect
            x="20"
            y="88"
            width="300"
            height="60"
            rx="8"
            fill="var(--cc2-accent-tint)"
            stroke="var(--cc2-accent)"
            strokeWidth="1.2"
          />
          <text x="36" y="110" fill="var(--cc2-ink)" fontSize="13" fontWeight="600">
            7~9장 · 루틴 · 방어 · 의사코드(PPP)
          </text>
          <text
            x="36"
            y="130"
            className="mono"
            fill="var(--cc2-accent)"
            fontSize="9"
            letterSpacing="0.14em"
          >
            WEEK 7 · COVERED
          </text>
          <rect
            x="20"
            y="160"
            width="300"
            height="60"
            rx="8"
            fill="var(--cc2-accent-tint)"
            stroke="var(--cc2-accent)"
            strokeWidth="1.2"
          />
          <text x="36" y="182" fill="var(--cc2-ink)" fontSize="13" fontWeight="600">
            20~23장 · 품질 · 협력 · 테스트 · 디버깅
          </text>
          <text
            x="36"
            y="202"
            className="mono"
            fill="var(--cc2-accent)"
            fontSize="9"
            letterSpacing="0.14em"
          >
            WEEK 3~4 · COVERED
          </text>
          <rect
            x="20"
            y="240"
            width="300"
            height="130"
            rx="8"
            fill="none"
            stroke="var(--cc2-rule-solid)"
            strokeWidth="1"
            strokeDasharray="4,4"
          />
          <text x="36" y="262" fill="var(--cc2-muted)" fontSize="12" fontWeight="600">
            27~30장 · 시스템 고려사항
          </text>
          <text x="36" y="280" fill="var(--cc2-soft)" fontSize="11">
            프로그램 규모 · 관리 · 생산성 도구 등
          </text>
          <text x="36" y="300" fill="var(--cc2-soft)" fontSize="11">
            조직·관리 영역이 많아 개발자 관점 학습의
          </text>
          <text x="36" y="318" fill="var(--cc2-soft)" fontSize="11">
            우선순위에서 뒤로 밀렸어요
          </text>
          <text
            x="36"
            y="352"
            className="mono"
            fill="var(--cc2-soft)"
            fontSize="9"
            letterSpacing="0.14em"
          >
            4 CHAPTERS · NOT COVERED
          </text>
        </g>

        {/* Theme 3 — 완성과 성장 */}
        <g transform="translate(744, 20)">
          <rect
            x="0"
            y="0"
            width="340"
            height="400"
            rx="12"
            fill="var(--cc2-paper-2)"
            stroke="var(--cc2-rule-solid)"
            strokeWidth="1"
          />
          <rect x="16" y="-8" width="200" height="16" fill="var(--cc2-paper)" />
          <text
            x="24"
            y="4"
            className="mono"
            fill="var(--cc2-muted)"
            fontSize="9"
            letterSpacing="0.18em"
          >
            THEME · 완성
          </text>
          <text x="20" y="40" className="title" fill="var(--cc2-ink)" fontSize="20">
            🔧 완성과 성장
          </text>
          <text x="20" y="64" fill="var(--cc2-muted)" fontSize="11">
            리팩터링 · 코드 튜닝 · 레이아웃 · 장인정신
          </text>
          <rect
            x="20"
            y="88"
            width="300"
            height="60"
            rx="8"
            fill="var(--cc2-accent-tint)"
            stroke="var(--cc2-accent)"
            strokeWidth="1.2"
          />
          <text x="36" y="110" fill="var(--cc2-ink)" fontSize="13" fontWeight="600">
            24~26장 · 리팩터링 · 튜닝 전략·기법
          </text>
          <text
            x="36"
            y="130"
            className="mono"
            fill="var(--cc2-accent)"
            fontSize="9"
            letterSpacing="0.14em"
          >
            WEEK 5 · COVERED
          </text>
          <rect
            x="20"
            y="160"
            width="300"
            height="60"
            rx="8"
            fill="var(--cc2-accent-tint)"
            stroke="var(--cc2-accent)"
            strokeWidth="1.2"
          />
          <text x="36" y="182" fill="var(--cc2-ink)" fontSize="13" fontWeight="600">
            31~34장 · 레이아웃 · 자기 설명 · 장인정신
          </text>
          <text
            x="36"
            y="202"
            className="mono"
            fill="var(--cc2-accent)"
            fontSize="9"
            letterSpacing="0.14em"
          >
            WEEK 2 · COVERED
          </text>
          <rect
            x="20"
            y="240"
            width="300"
            height="130"
            rx="8"
            fill="none"
            stroke="var(--cc2-rule-solid)"
            strokeWidth="1"
            strokeDasharray="4,4"
          />
          <text x="36" y="262" fill="var(--cc2-muted)" fontSize="12" fontWeight="600">
            35장 · 추가 도서와 자원
          </text>
          <text x="36" y="280" fill="var(--cc2-soft)" fontSize="11">
            McConnell이 권하는 다음 읽을 거리 모음
          </text>
          <text x="36" y="300" fill="var(--cc2-soft)" fontSize="11">
            본문 원칙 학습 대상이 아니라 부록 성격이라
          </text>
          <text x="36" y="318" fill="var(--cc2-soft)" fontSize="11">
            스터디 범위에서 제외됐어요
          </text>
          <text
            x="36"
            y="352"
            className="mono"
            fill="var(--cc2-soft)"
            fontSize="9"
            letterSpacing="0.14em"
          >
            1 CHAPTER · NOT COVERED
          </text>
        </g>

        {/* Legend */}
        <line x1="0" y1="432" x2="1088" y2="432" stroke="var(--cc2-rule)" strokeWidth="0.8" />
        <text
          x="0"
          y="448"
          className="mono"
          fill="var(--cc2-muted)"
          fontSize="9"
          letterSpacing="0.14em"
        >
          LEGEND
        </text>
        <rect
          x="100"
          y="440"
          width="14"
          height="10"
          rx="2"
          fill="var(--cc2-accent-tint)"
          stroke="var(--cc2-accent)"
          strokeWidth="1"
        />
        <text x="120" y="449" fill="var(--cc2-muted)" fontSize="10">
          다룬 장 (20)
        </text>
        <rect
          x="228"
          y="440"
          width="14"
          height="10"
          rx="2"
          fill="none"
          stroke="var(--cc2-rule-solid)"
          strokeWidth="1"
          strokeDasharray="3,3"
        />
        <text x="248" y="449" fill="var(--cc2-muted)" fontSize="10">
          미커버 (15)
        </text>
        <text
          x="1088"
          y="449"
          className="mono"
          fill="var(--cc2-soft)"
          fontSize="9"
          textAnchor="end"
          letterSpacing="0.14em"
        >
          COVERAGE 20/35 · 57%
        </text>
      </svg>
    </figure>
  );
}
