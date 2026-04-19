import type { MemberName } from './types';
import styles from './BestDiscussions.module.css';

interface BestDiscussionItem {
  chapter: number;
  content: string;
  reason: string;
  contributedBy: MemberName[];
}

interface BestDiscussionsProps {
  items: BestDiscussionItem[];
}

export default function BestDiscussions({ items }: BestDiscussionsProps) {
  if (items.length === 0) {
    return <span className={styles.fallback}>토론 없음</span>;
  }

  return (
    <section className={styles.wrapper} aria-label="베스트 토론 모음">
      <ul className={styles.list}>
        {items.map((item) => (
          <li key={`${item.chapter}-${item.content}`} className={styles.item}>
            <header className={styles.header}>
              <span className={styles.chapter}>{item.chapter}장</span>
              <span className={styles.contributors}>{item.contributedBy.join(' · ')}</span>
            </header>
            <blockquote className={styles.content}>{item.content}</blockquote>
            <p className={styles.reason}>{item.reason}</p>
          </li>
        ))}
      </ul>
    </section>
  );
}
