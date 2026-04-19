import type { MemberName } from './types';
import styles from './DevilsAdvocate.module.css';

interface DevilsAdvocateProps {
  author: MemberName;
  argument: string;
}

export default function DevilsAdvocate({ author, argument }: DevilsAdvocateProps) {
  return (
    <aside className={styles.advocate} aria-label="반박">
      <header className={styles.header}>
        <span className={styles.emoji} aria-hidden="true">
          😈
        </span>
        <span className={styles.label}>Devil&apos;s Advocate</span>
        <span className={styles.author}>{author}</span>
      </header>
      <blockquote className={styles.argument}>{argument}</blockquote>
    </aside>
  );
}
