import styles from './ProgressTimeline.module.css';

export default function ProgressTimeline() {
  return (
    <figure className={styles.wrapper}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-2 0 1092 340"
        role="img"
        aria-labelledby="pt-title pt-desc"
        className={`${styles.svg} cc2-diagram cc2-progress-timeline`}
        preserveAspectRatio="xMidYMid meet"
      >
        <title id="pt-title">스터디 진행 타임라인</title>
        <desc id="pt-desc">
          2주차부터 8주차까지 6개 페이지에 걸쳐 누적 4장 → 8장 → 11장 → 13장 → 16장 → 20장으로 쌓인
          진행 경과 타임라인
        </desc>

        <defs>
          <pattern id="pt-dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="var(--cc2-ink)" fillOpacity="0.06" />
          </pattern>
        </defs>

        <rect x="-2" width="1092" height="340" fill="var(--cc2-paper)" />
        <rect x="-2" width="1092" height="340" fill="url(#pt-dots)" opacity="0.5" />

        {/* Baseline */}
        <line x1="60" y1="170" x2="1020" y2="170" stroke="var(--cc2-rule-solid)" strokeWidth="1" />

        {/* Progress fill — full range covered (2주차 ~ 8주차 모두 complete) */}
        <line
          x1="60"
          y1="170"
          x2="1020"
          y2="170"
          stroke="var(--cc2-accent)"
          strokeWidth="2"
          strokeLinecap="round"
        />

        {/* ─────────── Node 1 · 2주차 (label above) ─────────── */}
        <circle
          cx="60"
          cy="170"
          r="5"
          fill="var(--cc2-accent)"
          stroke="var(--cc2-paper)"
          strokeWidth="2"
        />
        <line x1="60" y1="160" x2="60" y2="130" stroke="var(--cc2-rule-solid)" strokeWidth="0.8" />
        <text
          x="60"
          y="118"
          className="mono"
          fill="var(--cc2-muted)"
          fontSize="9"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          2주차 · PART 7
        </text>
        <text
          x="60"
          y="100"
          fill="var(--cc2-ink)"
          fontSize="12"
          fontWeight="600"
          textAnchor="middle"
        >
          31 · 32 · 33 · 34
        </text>
        <text x="60" y="82" fill="var(--cc2-muted)" fontSize="10" textAnchor="middle">
          레이아웃 · 자기 설명
        </text>
        {/* Cumulative below */}
        <text
          x="60"
          y="196"
          className="mono"
          fill="var(--cc2-soft)"
          fontSize="9"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          4 / 35
        </text>

        {/* ─────────── Node 2 · 3~4주차 (label below) ─────────── */}
        <circle
          cx="220"
          cy="170"
          r="5"
          fill="var(--cc2-accent)"
          stroke="var(--cc2-paper)"
          strokeWidth="2"
        />
        <line
          x1="220"
          y1="180"
          x2="220"
          y2="210"
          stroke="var(--cc2-rule-solid)"
          strokeWidth="0.8"
        />
        <text
          x="220"
          y="226"
          className="mono"
          fill="var(--cc2-muted)"
          fontSize="9"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          3~4주차 · PART 5
        </text>
        <text
          x="220"
          y="244"
          fill="var(--cc2-ink)"
          fontSize="12"
          fontWeight="600"
          textAnchor="middle"
        >
          20 · 21 · 22 · 23
        </text>
        <text x="220" y="262" fill="var(--cc2-muted)" fontSize="10" textAnchor="middle">
          품질 · 협력 · 테스트
        </text>
        {/* Cumulative above (flipped position for below-label nodes) */}
        <text
          x="220"
          y="154"
          className="mono"
          fill="var(--cc2-soft)"
          fontSize="9"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          8 / 35
        </text>

        {/* ─────────── Node 3 · 5주차 (label above) ─────────── */}
        <circle
          cx="540"
          cy="170"
          r="5"
          fill="var(--cc2-accent)"
          stroke="var(--cc2-paper)"
          strokeWidth="2"
        />
        <line
          x1="540"
          y1="160"
          x2="540"
          y2="130"
          stroke="var(--cc2-rule-solid)"
          strokeWidth="0.8"
        />
        <text
          x="540"
          y="118"
          className="mono"
          fill="var(--cc2-muted)"
          fontSize="9"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          5주차 · PART 5
        </text>
        <text
          x="540"
          y="100"
          fill="var(--cc2-ink)"
          fontSize="12"
          fontWeight="600"
          textAnchor="middle"
        >
          24 · 25 · 26
        </text>
        <text x="540" y="82" fill="var(--cc2-muted)" fontSize="10" textAnchor="middle">
          리팩터링 · 튜닝
        </text>
        <text
          x="540"
          y="196"
          className="mono"
          fill="var(--cc2-soft)"
          fontSize="9"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          11 / 35
        </text>

        {/* ─────────── Node 4 · 6주차 (label below) ─────────── */}
        <circle
          cx="700"
          cy="170"
          r="5"
          fill="var(--cc2-accent)"
          stroke="var(--cc2-paper)"
          strokeWidth="2"
        />
        <line
          x1="700"
          y1="180"
          x2="700"
          y2="210"
          stroke="var(--cc2-rule-solid)"
          strokeWidth="0.8"
        />
        <text
          x="700"
          y="226"
          className="mono"
          fill="var(--cc2-muted)"
          fontSize="9"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          6주차 · PART 2
        </text>
        <text
          x="700"
          y="244"
          fill="var(--cc2-ink)"
          fontSize="12"
          fontWeight="600"
          textAnchor="middle"
        >
          5 · 6
        </text>
        <text x="700" y="262" fill="var(--cc2-muted)" fontSize="10" textAnchor="middle">
          구현 설계 · 클래스
        </text>
        <text
          x="700"
          y="154"
          className="mono"
          fill="var(--cc2-soft)"
          fontSize="9"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          13 / 35
        </text>

        {/* ─────────── Node 5 · 7주차 (label above) ─────────── */}
        <circle
          cx="860"
          cy="170"
          r="5"
          fill="var(--cc2-accent)"
          stroke="var(--cc2-paper)"
          strokeWidth="2"
        />
        <line
          x1="860"
          y1="160"
          x2="860"
          y2="130"
          stroke="var(--cc2-rule-solid)"
          strokeWidth="0.8"
        />
        <text
          x="860"
          y="118"
          className="mono"
          fill="var(--cc2-muted)"
          fontSize="9"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          7주차 · PART 2
        </text>
        <text
          x="860"
          y="100"
          fill="var(--cc2-ink)"
          fontSize="12"
          fontWeight="600"
          textAnchor="middle"
        >
          7 · 8 · 9
        </text>
        <text x="860" y="82" fill="var(--cc2-muted)" fontSize="10" textAnchor="middle">
          루틴 · 방어 · PPP
        </text>
        <text
          x="860"
          y="196"
          className="mono"
          fill="var(--cc2-soft)"
          fontSize="9"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          16 / 35
        </text>

        {/* ─────────── Node 6 · 8주차 FOCAL (label below) ─────────── */}
        <circle
          cx="1020"
          cy="170"
          r="8"
          fill="var(--cc2-accent-tint)"
          stroke="var(--cc2-accent)"
          strokeWidth="2"
        />
        <circle cx="1020" cy="170" r="3" fill="var(--cc2-accent)" />
        <line x1="1020" y1="182" x2="1020" y2="210" stroke="var(--cc2-accent)" strokeWidth="0.8" />
        <text
          x="1020"
          y="226"
          className="mono"
          fill="var(--cc2-accent)"
          fontSize="9"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          8주차 · PART 1
        </text>
        <text
          x="1020"
          y="244"
          fill="var(--cc2-ink)"
          fontSize="12"
          fontWeight="600"
          textAnchor="middle"
        >
          1 · 2 · 3 · 4
        </text>
        <text x="1020" y="262" fill="var(--cc2-muted)" fontSize="10" textAnchor="middle">
          개요 · 비유 · 결정
        </text>
        <text
          x="1020"
          y="154"
          className="mono"
          fill="var(--cc2-accent)"
          fontSize="10"
          textAnchor="middle"
          fontWeight="600"
          letterSpacing="0.14em"
        >
          20 / 35
        </text>

        {/* Editorial aside */}
        <text
          x="60"
          y="300"
          className="title"
          fill="var(--cc2-muted)"
          fontSize="13"
          fontStyle="italic"
        >
          책 챕터 순서가 아니라 주차 순서로 진행했어요 — 가장 최근에 읽은 1~4장이 맨 오른쪽.
        </text>

        {/* Legend */}
        <line x1="0" y1="320" x2="1088" y2="320" stroke="var(--cc2-rule)" strokeWidth="0.8" />
        <text
          x="0"
          y="334"
          className="mono"
          fill="var(--cc2-muted)"
          fontSize="9"
          letterSpacing="0.14em"
        >
          LEGEND
        </text>
        <circle cx="106" cy="330" r="4" fill="var(--cc2-accent)" />
        <text x="118" y="334" fill="var(--cc2-muted)" fontSize="10">
          완료 주차
        </text>
        <circle
          cx="218"
          cy="330"
          r="6"
          fill="var(--cc2-accent-tint)"
          stroke="var(--cc2-accent)"
          strokeWidth="1.5"
        />
        <text x="232" y="334" fill="var(--cc2-muted)" fontSize="10">
          현재 지점
        </text>
        <text
          x="1088"
          y="334"
          className="mono"
          fill="var(--cc2-soft)"
          fontSize="9"
          textAnchor="end"
          letterSpacing="0.14em"
        >
          6 SESSIONS · 20 CHAPTERS
        </text>
      </svg>
    </figure>
  );
}
