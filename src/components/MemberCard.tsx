import type { MemberName } from './types';
import styles from './MemberCard.module.css';

interface MemberCardProps {
  nickname: MemberName;
  realName: string;
  emoji: string;
  role: string;
  github?: string;
  linkedin?: string;
}

export default function MemberCard({
  nickname,
  realName,
  emoji,
  role,
  github,
  linkedin,
}: MemberCardProps) {
  return (
    <article className={styles.card}>
      <span className={styles.emoji} aria-hidden="true">
        {emoji}
      </span>
      <h3 className={styles.name}>
        {nickname}
        <span className={styles.realName}> ({realName})</span>
      </h3>
      <p className={styles.role}>{role}</p>
      <div className={styles.links}>
        {github ? (
          <a href={github} target="_blank" rel="noreferrer" aria-label={`${nickname} GitHub`}>
            GitHub
          </a>
        ) : (
          <span className={styles.placeholder}>GitHub</span>
        )}
        {linkedin ? (
          <a href={linkedin} target="_blank" rel="noreferrer" aria-label={`${nickname} LinkedIn`}>
            LinkedIn
          </a>
        ) : (
          <span className={styles.placeholder}>LinkedIn</span>
        )}
      </div>
    </article>
  );
}
