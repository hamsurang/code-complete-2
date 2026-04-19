import type { MemberName } from './types';
import styles from './VotingBar.module.css';

interface VotingBarProps {
  average: number | null;
  votes: Partial<Record<MemberName, number | null>>;
}

const MAX_SCORE = 5;

export default function VotingBar({ average, votes }: VotingBarProps) {
  if (average === null) {
    return <span className={styles.fallback}>투표 집계 대기</span>;
  }

  const fillRatio = Math.min(Math.max(average / MAX_SCORE, 0), 1);
  const entries = Object.entries(votes) as Array<[MemberName, number | null | undefined]>;

  return (
    <section className={styles.voting} aria-label={`투표 평균 ${average.toFixed(1)}점`}>
      <div className={styles.summary}>
        <span className={styles.average}>{average.toFixed(1)}</span>
        <span className={styles.max}>/ {MAX_SCORE}</span>
      </div>
      <div
        className={styles.track}
        role="progressbar"
        aria-valuenow={average}
        aria-valuemin={0}
        aria-valuemax={MAX_SCORE}
      >
        <div className={styles.fill} style={{ width: `${fillRatio * 100}%` }} />
      </div>
      {entries.length > 0 && (
        <ul className={styles.ticks}>
          {entries.map(([member, score]) => (
            <li
              key={member}
              className={score === null || score === undefined ? styles.tickEmpty : styles.tick}
            >
              <span className={styles.tickMember}>{member}</span>
              <span className={styles.tickScore}>
                {score === null || score === undefined ? '–' : score}
              </span>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}
