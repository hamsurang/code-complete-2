import styles from './BestPickCallout.module.css';

interface BestPickCalloutProps {
  content: string;
  reason: string;
}

export default function BestPickCallout({ content, reason }: BestPickCalloutProps) {
  return (
    <aside className={styles.callout} aria-label="베스트 토론">
      <header className={styles.header}>
        <span className={styles.emoji} aria-hidden="true">
          💎
        </span>
        <span className={styles.label}>Best Pick</span>
      </header>
      <blockquote className={styles.content}>{content}</blockquote>
      <p className={styles.reason}>{reason}</p>
    </aside>
  );
}
