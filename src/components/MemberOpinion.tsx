import type { MemberName } from './types';
import { MEMBER_DATA } from './memberData';
import styles from './MemberOpinion.module.css';

interface MemberOpinionProps {
  author: MemberName;
  emoji: string;
  opinion: string;
  experience: string;
}

export default function MemberOpinion({ author, emoji, opinion, experience }: MemberOpinionProps) {
  const profile = MEMBER_DATA[author];

  return (
    <figure className={styles.card}>
      <figcaption className={styles.header}>
        <span className={styles.emoji} aria-hidden="true">
          {emoji}
        </span>
        <div className={styles.meta}>
          <span className={styles.author}>{author}</span>
          <span className={styles.description}>{profile.description}</span>
        </div>
        <div className={styles.links}>
          <a
            href={`https://github.com/${profile.github}`}
            target="_blank"
            rel="noopener noreferrer"
            className={styles.linkBtn}
            aria-label={`${author} GitHub`}
          >
            GitHub
          </a>
          {profile.linkedin && (
            <a
              href={profile.linkedin}
              target="_blank"
              rel="noopener noreferrer"
              className={`${styles.linkBtn} ${styles.linkBtnLinkedIn}`}
              aria-label={`${author} LinkedIn`}
            >
              LinkedIn
            </a>
          )}
        </div>
      </figcaption>
      <blockquote className={styles.opinion}>{opinion}</blockquote>
      {experience ? <p className={styles.experience}>{experience}</p> : null}
    </figure>
  );
}
