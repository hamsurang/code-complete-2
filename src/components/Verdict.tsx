import type { VerdictRating } from './types';
import styles from './Verdict.module.css';

interface VerdictProps {
  rating: VerdictRating;
  rationale: string;
}

export default function Verdict({ rating, rationale }: VerdictProps) {
  return (
    <aside className={styles.verdict} role="note" aria-label="판정">
      <span className={styles.badge}>{rating}</span>
      <p className={styles.rationale}>{rationale}</p>
    </aside>
  );
}
