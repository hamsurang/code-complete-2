import type { MemberName } from './types';
import styles from './MemberOpinion.module.css';

interface MemberOpinionProps {
  author: MemberName;
  emoji: string;
  opinion: string;
  experience: string;
}

export default function MemberOpinion({ author, emoji, opinion, experience }: MemberOpinionProps) {
  return (
    <figure className={styles.card}>
      <figcaption className={styles.header}>
        <span className={styles.emoji} aria-hidden="true">
          {emoji}
        </span>
        <span className={styles.author}>{author}</span>
      </figcaption>
      <blockquote className={styles.opinion}>{opinion}</blockquote>
      <p className={styles.experience}>{experience}</p>
    </figure>
  );
}
