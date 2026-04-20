import { MEMBER_DATA } from './memberData';
import type { MemberName } from './types';
import styles from './MemberGrid.module.css';

const MEMBER_EMOJIS: Record<MemberName, string> = {
  Alice: '🦊',
  Amber: '🐵',
  Crong: '🦎',
  diego: '🦉',
  Jay: '🦜',
  Leo: '🐻',
  zinii: '🐿️',
};

const MEMBER_KO_NAMES: Record<MemberName, string> = {
  Alice: '소현',
  Amber: '도윤',
  Crong: '규진',
  diego: '장원',
  Jay: '준근',
  Leo: '승완',
  zinii: '미진',
};

const MEMBERS = Object.keys(MEMBER_DATA) as MemberName[];

export default function MemberGrid() {
  return (
    <div className={styles.grid}>
      {MEMBERS.map((name) => {
        const { github, linkedin, description } = MEMBER_DATA[name];
        const emoji = MEMBER_EMOJIS[name];
        const koName = MEMBER_KO_NAMES[name];

        return (
          <div key={name} className={styles.card}>
            <span className={styles.emoji} aria-hidden="true">{emoji}</span>
            <p className={styles.name}>
              <strong>{name}</strong>
              <span className={styles.koName}> ({koName})</span>
            </p>
            <p className={styles.description}>{description}</p>
            <div className={styles.divider} />
            <div className={styles.links}>
              <a
                href={`https://github.com/${github}`}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.link}
              >
                GitHub
              </a>
              {linkedin && (
                <a
                  href={linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.link}
                >
                  LinkedIn
                </a>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
