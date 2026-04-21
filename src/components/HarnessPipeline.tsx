import styles from './HarnessPipeline.module.css';

export default function HarnessPipeline() {
  return (
    <figure className={styles.wrapper}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-2 0 1092 520"
        role="img"
        aria-labelledby="harness-pipeline-title harness-pipeline-desc"
        className={`${styles.svg} cc2-diagram cc2-harness-pipeline`}
        preserveAspectRatio="xMidYMid meet"
      >
        <title id="harness-pipeline-title">code-complete-2 하네스 6-에이전트 파이프라인</title>
        <desc id="harness-pipeline-desc">
          Notion DB를 입력으로 받아 6개 에이전트(notion-extractor, chapter-editor,
          fe-content-enhancer, mdx-writer, aggregator, voice-validator)를 거쳐 Docusaurus MDX
          페이지와 대시보드 부록을 생성하는 데이터 파이프라인
        </desc>

        <defs>
          <pattern id="h-dots" width="20" height="20" patternUnits="userSpaceOnUse">
            <circle cx="1" cy="1" r="0.8" fill="var(--cc2-ink)" fillOpacity="0.08" />
          </pattern>
          <marker id="h-arrow" markerWidth="9" markerHeight="7" refX="8" refY="3.5" orient="auto">
            <polygon points="0 0, 9 3.5, 0 7" fill="var(--cc2-arrow-default)" />
          </marker>
          <marker
            id="h-arrow-feedback"
            markerWidth="9"
            markerHeight="7"
            refX="8"
            refY="3.5"
            orient="auto"
          >
            <polygon points="0 0, 9 3.5, 0 7" fill="var(--cc2-arrow-feedback)" />
          </marker>
        </defs>

        <rect x="-2" width="1092" height="520" fill="var(--cc2-paper)" />
        <rect x="-2" width="1092" height="520" fill="url(#h-dots)" opacity="0.6" />

        {/* Main flow arrows */}
        <line
          x1="140"
          y1="72"
          x2="216"
          y2="72"
          stroke="var(--cc2-arrow-default)"
          strokeWidth="1.2"
          markerEnd="url(#h-arrow)"
        />
        <rect x="150" y="58" width="60" height="14" rx="2" fill="var(--cc2-paper)" />
        <text
          x="180"
          y="69"
          className="mono"
          fill="var(--cc2-soft)"
          fontSize="8"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          FETCH
        </text>

        <line
          x1="344"
          y1="72"
          x2="416"
          y2="72"
          stroke="var(--cc2-arrow-default)"
          strokeWidth="1.2"
          markerEnd="url(#h-arrow)"
        />
        <rect x="352" y="58" width="62" height="14" rx="2" fill="var(--cc2-paper)" />
        <text
          x="383"
          y="69"
          className="mono"
          fill="var(--cc2-soft)"
          fontSize="8"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          3-ZONE YAML
        </text>

        <line
          x1="544"
          y1="72"
          x2="616"
          y2="72"
          stroke="var(--cc2-arrow-default)"
          strokeWidth="1.2"
          markerEnd="url(#h-arrow)"
        />
        <rect x="552" y="58" width="66" height="14" rx="2" fill="var(--cc2-paper)" />
        <text
          x="585"
          y="69"
          className="mono"
          fill="var(--cc2-soft)"
          fontSize="8"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          EDITED YAML
        </text>

        <line
          x1="744"
          y1="72"
          x2="816"
          y2="72"
          stroke="var(--cc2-arrow-default)"
          strokeWidth="1.2"
          markerEnd="url(#h-arrow)"
        />
        <rect x="752" y="58" width="68" height="14" rx="2" fill="var(--cc2-paper)" />
        <text
          x="786"
          y="69"
          className="mono"
          fill="var(--cc2-soft)"
          fontSize="8"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          ENHANCED
        </text>

        <line
          x1="944"
          y1="72"
          x2="1016"
          y2="72"
          stroke="var(--cc2-arrow-default)"
          strokeWidth="1.2"
          markerEnd="url(#h-arrow)"
        />
        <rect x="952" y="58" width="60" height="14" rx="2" fill="var(--cc2-paper)" />
        <text
          x="982"
          y="69"
          className="mono"
          fill="var(--cc2-soft)"
          fontSize="8"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          WRITE
        </text>

        {/* Branch to aggregator */}
        <line
          x1="680"
          y1="128"
          x2="680"
          y2="250"
          stroke="var(--cc2-arrow-default)"
          strokeWidth="1.2"
          markerEnd="url(#h-arrow)"
        />
        <rect x="650" y="180" width="62" height="14" rx="2" fill="var(--cc2-paper)" />
        <text
          x="681"
          y="191"
          className="mono"
          fill="var(--cc2-soft)"
          fontSize="8"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          ALL YAML
        </text>

        <line
          x1="744"
          y1="280"
          x2="1016"
          y2="280"
          stroke="var(--cc2-arrow-default)"
          strokeWidth="1.2"
          markerEnd="url(#h-arrow)"
        />
        <rect x="860" y="266" width="68" height="14" rx="2" fill="var(--cc2-paper)" />
        <text
          x="894"
          y="277"
          className="mono"
          fill="var(--cc2-soft)"
          fontSize="8"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          DASHBOARD
        </text>

        {/* voice-validator: write → validate */}
        <line
          x1="880"
          y1="128"
          x2="880"
          y2="330"
          stroke="var(--cc2-arrow-default)"
          strokeWidth="1.2"
          markerEnd="url(#h-arrow)"
        />
        <rect x="846" y="220" width="70" height="14" rx="2" fill="var(--cc2-paper)" />
        <text
          x="881"
          y="231"
          className="mono"
          fill="var(--cc2-soft)"
          fontSize="8"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          VALIDATE
        </text>

        {/* Feedback loop */}
        <path
          d="M 816 360 Q 480 420 480 128"
          fill="none"
          stroke="var(--cc2-arrow-feedback)"
          strokeWidth="1.2"
          strokeDasharray="5,4"
          markerEnd="url(#h-arrow-feedback)"
        />
        <rect x="320" y="400" width="120" height="14" rx="2" fill="var(--cc2-paper)" />
        <text
          x="380"
          y="411"
          className="mono"
          fill="var(--cc2-arrow-feedback)"
          fontSize="8"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          SLOP DETECTED · REWORK
        </text>

        {/* Notion DB (external) */}
        <rect x="16" y="36" width="124" height="72" rx="8" fill="var(--cc2-paper)" />
        <rect
          x="16"
          y="36"
          width="124"
          height="72"
          rx="8"
          fill="var(--cc2-ink)"
          fillOpacity="0.03"
          stroke="var(--cc2-ink)"
          strokeOpacity="0.30"
          strokeWidth="1"
        />
        <rect
          x="24"
          y="44"
          width="32"
          height="12"
          rx="2"
          fill="none"
          stroke="var(--cc2-ink)"
          strokeOpacity="0.40"
          strokeWidth="0.8"
        />
        <text
          x="40"
          y="53"
          className="mono"
          fill="var(--cc2-muted)"
          fontSize="7"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          SOURCE
        </text>
        <text
          x="78"
          y="80"
          fill="var(--cc2-ink)"
          fontSize="13"
          fontWeight="600"
          textAnchor="middle"
        >
          Notion DB
        </text>
        <text
          x="78"
          y="98"
          className="mono"
          fill="var(--cc2-muted)"
          fontSize="9"
          textAnchor="middle"
        >
          산출물 워크스페이스
        </text>

        {/* 1. notion-extractor */}
        <rect x="216" y="36" width="128" height="72" rx="8" fill="var(--cc2-paper)" />
        <rect
          x="216"
          y="36"
          width="128"
          height="72"
          rx="8"
          fill="#ffffff"
          fillOpacity="0.4"
          stroke="var(--cc2-ink)"
          strokeWidth="1"
        />
        <rect
          x="224"
          y="44"
          width="32"
          height="12"
          rx="2"
          fill="none"
          stroke="var(--cc2-ink)"
          strokeOpacity="0.40"
          strokeWidth="0.8"
        />
        <text
          x="240"
          y="53"
          className="mono"
          fill="var(--cc2-muted)"
          fontSize="7"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          AGENT
        </text>
        <text
          x="280"
          y="80"
          fill="var(--cc2-ink)"
          fontSize="13"
          fontWeight="600"
          textAnchor="middle"
        >
          notion-extractor
        </text>
        <text
          x="280"
          y="98"
          className="mono"
          fill="var(--cc2-muted)"
          fontSize="9"
          textAnchor="middle"
        >
          raw → 3-Zone YAML
        </text>

        {/* 2. chapter-editor ★ FOCAL */}
        <rect x="416" y="28" width="128" height="88" rx="8" fill="var(--cc2-paper)" />
        <rect
          x="416"
          y="28"
          width="128"
          height="88"
          rx="8"
          fill="var(--cc2-accent-tint)"
          stroke="var(--cc2-accent)"
          strokeWidth="1.4"
        />
        <rect
          x="424"
          y="36"
          width="44"
          height="12"
          rx="2"
          fill="none"
          stroke="var(--cc2-accent)"
          strokeOpacity="0.70"
          strokeWidth="0.8"
        />
        <text
          x="446"
          y="45"
          className="mono"
          fill="var(--cc2-accent)"
          fontSize="7"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          ★ LEAD
        </text>
        <text
          x="480"
          y="72"
          fill="var(--cc2-ink)"
          fontSize="13"
          fontWeight="600"
          textAnchor="middle"
        >
          chapter-editor
        </text>
        <text
          x="480"
          y="90"
          className="mono"
          fill="var(--cc2-muted)"
          fontSize="9"
          textAnchor="middle"
        >
          9섹션 재배치
        </text>
        <text
          x="480"
          y="105"
          className="mono"
          fill="var(--cc2-muted)"
          fontSize="9"
          textAnchor="middle"
        >
          + 브릿지 문장
        </text>

        {/* 3. fe-content-enhancer */}
        <rect x="616" y="36" width="128" height="72" rx="8" fill="var(--cc2-paper)" />
        <rect
          x="616"
          y="36"
          width="128"
          height="72"
          rx="8"
          fill="#ffffff"
          fillOpacity="0.4"
          stroke="var(--cc2-ink)"
          strokeWidth="1"
        />
        <rect
          x="624"
          y="44"
          width="32"
          height="12"
          rx="2"
          fill="none"
          stroke="var(--cc2-ink)"
          strokeOpacity="0.40"
          strokeWidth="0.8"
        />
        <text
          x="640"
          y="53"
          className="mono"
          fill="var(--cc2-muted)"
          fontSize="7"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          AGENT
        </text>
        <text
          x="680"
          y="78"
          fill="var(--cc2-ink)"
          fontSize="13"
          fontWeight="600"
          textAnchor="middle"
        >
          fe-content-enhancer
        </text>
        <text
          x="680"
          y="96"
          className="mono"
          fill="var(--cc2-muted)"
          fontSize="9"
          textAnchor="middle"
        >
          Java/C++ → React/TS
        </text>

        {/* 4. mdx-writer */}
        <rect x="816" y="36" width="128" height="72" rx="8" fill="var(--cc2-paper)" />
        <rect
          x="816"
          y="36"
          width="128"
          height="72"
          rx="8"
          fill="#ffffff"
          fillOpacity="0.4"
          stroke="var(--cc2-ink)"
          strokeWidth="1"
        />
        <rect
          x="824"
          y="44"
          width="32"
          height="12"
          rx="2"
          fill="none"
          stroke="var(--cc2-ink)"
          strokeOpacity="0.40"
          strokeWidth="0.8"
        />
        <text
          x="840"
          y="53"
          className="mono"
          fill="var(--cc2-muted)"
          fontSize="7"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          AGENT
        </text>
        <text
          x="880"
          y="78"
          fill="var(--cc2-ink)"
          fontSize="13"
          fontWeight="600"
          textAnchor="middle"
        >
          mdx-writer
        </text>
        <text
          x="880"
          y="96"
          className="mono"
          fill="var(--cc2-muted)"
          fontSize="9"
          textAnchor="middle"
        >
          YAML → MDX
        </text>

        {/* MDX output */}
        <rect x="1016" y="36" width="64" height="72" rx="8" fill="var(--cc2-paper)" />
        <rect
          x="1016"
          y="36"
          width="64"
          height="72"
          rx="8"
          fill="var(--cc2-accent-tint)"
          stroke="var(--cc2-accent)"
          strokeWidth="1"
          strokeOpacity="0.70"
        />
        <rect
          x="1022"
          y="44"
          width="36"
          height="12"
          rx="2"
          fill="none"
          stroke="var(--cc2-accent)"
          strokeOpacity="0.60"
          strokeWidth="0.8"
        />
        <text
          x="1040"
          y="53"
          className="mono"
          fill="var(--cc2-accent)"
          fontSize="7"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          OUTPUT
        </text>
        <text
          x="1048"
          y="78"
          fill="var(--cc2-ink)"
          fontSize="12"
          fontWeight="600"
          textAnchor="middle"
        >
          docs/*.mdx
        </text>
        <text
          x="1048"
          y="96"
          className="mono"
          fill="var(--cc2-muted)"
          fontSize="9"
          textAnchor="middle"
        >
          6 페이지
        </text>

        {/* 5. aggregator */}
        <rect x="616" y="244" width="128" height="72" rx="8" fill="var(--cc2-paper)" />
        <rect
          x="616"
          y="244"
          width="128"
          height="72"
          rx="8"
          fill="#ffffff"
          fillOpacity="0.4"
          stroke="var(--cc2-ink)"
          strokeWidth="1"
        />
        <rect
          x="624"
          y="252"
          width="32"
          height="12"
          rx="2"
          fill="none"
          stroke="var(--cc2-ink)"
          strokeOpacity="0.40"
          strokeWidth="0.8"
        />
        <text
          x="640"
          y="261"
          className="mono"
          fill="var(--cc2-muted)"
          fontSize="7"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          AGENT
        </text>
        <text
          x="680"
          y="286"
          fill="var(--cc2-ink)"
          fontSize="13"
          fontWeight="600"
          textAnchor="middle"
        >
          aggregator
        </text>
        <text
          x="680"
          y="304"
          className="mono"
          fill="var(--cc2-muted)"
          fontSize="9"
          textAnchor="middle"
        >
          판정·투표·토론 집계
        </text>

        {/* Dashboard output */}
        <rect x="1016" y="244" width="64" height="72" rx="8" fill="var(--cc2-paper)" />
        <rect
          x="1016"
          y="244"
          width="64"
          height="72"
          rx="8"
          fill="var(--cc2-ink)"
          fillOpacity="0.05"
          stroke="var(--cc2-muted)"
          strokeWidth="1"
        />
        <rect
          x="1022"
          y="252"
          width="36"
          height="12"
          rx="2"
          fill="none"
          stroke="var(--cc2-muted)"
          strokeOpacity="0.60"
          strokeWidth="0.8"
        />
        <text
          x="1040"
          y="261"
          className="mono"
          fill="var(--cc2-muted)"
          fontSize="7"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          OUTPUT
        </text>
        <text
          x="1048"
          y="286"
          fill="var(--cc2-ink)"
          fontSize="12"
          fontWeight="600"
          textAnchor="middle"
        >
          dashboard
        </text>
        <text
          x="1048"
          y="304"
          className="mono"
          fill="var(--cc2-muted)"
          fontSize="9"
          textAnchor="middle"
        >
          부록
        </text>

        {/* 6. voice-validator (feedback loop) */}
        <rect x="816" y="324" width="128" height="72" rx="8" fill="var(--cc2-paper)" />
        <rect
          x="816"
          y="324"
          width="128"
          height="72"
          rx="8"
          fill="var(--cc2-ink)"
          fillOpacity="0.02"
          stroke="var(--cc2-accent-2)"
          strokeOpacity="0.60"
          strokeWidth="1"
          strokeDasharray="4,4"
        />
        <rect
          x="824"
          y="332"
          width="56"
          height="12"
          rx="2"
          fill="none"
          stroke="var(--cc2-accent-2)"
          strokeOpacity="0.70"
          strokeWidth="0.8"
        />
        <text
          x="852"
          y="341"
          className="mono"
          fill="var(--cc2-accent-2)"
          fontSize="7"
          textAnchor="middle"
          letterSpacing="0.14em"
        >
          FEEDBACK
        </text>
        <text
          x="880"
          y="366"
          fill="var(--cc2-ink)"
          fontSize="13"
          fontWeight="600"
          textAnchor="middle"
        >
          voice-validator
        </text>
        <text
          x="880"
          y="384"
          className="mono"
          fill="var(--cc2-muted)"
          fontSize="9"
          textAnchor="middle"
        >
          AI 슬롭 탐지 · 재작성 유도
        </text>

        {/* Legend */}
        <line x1="0" y1="460" x2="1088" y2="460" stroke="var(--cc2-rule)" strokeWidth="0.8" />
        <text
          x="0"
          y="480"
          className="mono"
          fill="var(--cc2-muted)"
          fontSize="9"
          letterSpacing="0.14em"
        >
          LEGEND
        </text>
        <rect
          x="100"
          y="472"
          width="14"
          height="10"
          rx="2"
          fill="var(--cc2-accent-tint)"
          stroke="var(--cc2-accent)"
          strokeWidth="1"
        />
        <text x="120" y="481" fill="var(--cc2-muted)" fontSize="10">
          주역 · 결과물
        </text>
        <line
          x1="236"
          y1="477"
          x2="264"
          y2="477"
          stroke="var(--cc2-arrow-default)"
          strokeWidth="1.2"
        />
        <text x="272" y="481" fill="var(--cc2-muted)" fontSize="10">
          주 흐름
        </text>
        <line
          x1="360"
          y1="477"
          x2="388"
          y2="477"
          stroke="var(--cc2-arrow-feedback)"
          strokeWidth="1.2"
          strokeDasharray="5,4"
        />
        <text x="396" y="481" fill="var(--cc2-muted)" fontSize="10">
          피드백 루프 (슬롭 재작성)
        </text>
        <text
          x="1088"
          y="481"
          className="mono"
          fill="var(--cc2-soft)"
          fontSize="9"
          textAnchor="end"
          letterSpacing="0.14em"
        >
          6 AGENTS · 10 SKILLS
        </text>
      </svg>
    </figure>
  );
}
