import styles from './VerdictDistribution.module.css';

interface VerdictDistributionProps {
  alive: number;
  evolved: number;
  dead: number;
  other?: number;
}

interface Row {
  emoji: string;
  label: string;
  count: number;
  className: string;
}

export default function VerdictDistribution({
  alive,
  evolved,
  dead,
  other = 0,
}: VerdictDistributionProps) {
  const total = alive + evolved + dead + other;

  if (total === 0) {
    return <span className={styles.fallback}>판정 없음</span>;
  }

  const rows: Row[] = [
    { emoji: '🟢', label: '생존', count: alive, className: styles.alive },
    { emoji: '🟡', label: '변형', count: evolved, className: styles.evolved },
    { emoji: '🔴', label: '사망', count: dead, className: styles.dead },
  ];

  if (other > 0) {
    rows.push({
      emoji: '⚪',
      label: '기타',
      count: other,
      className: styles.other,
    });
  }

  return (
    <section className={styles.distribution} aria-label="판정 분포">
      <ul className={styles.list}>
        {rows.map((row) => {
          const ratio = row.count / total;
          return (
            <li key={row.label} className={styles.row}>
              <span className={styles.rowLabel}>
                <span aria-hidden="true">{row.emoji}</span>
                <span>{row.label}</span>
              </span>
              <div className={styles.track}>
                <div
                  className={`${styles.fill} ${row.className}`}
                  style={{ width: `${ratio * 100}%` }}
                />
              </div>
              <span className={styles.rowCount}>{row.count}</span>
            </li>
          );
        })}
      </ul>
      <p className={styles.total}>총 {total}장</p>
    </section>
  );
}
