import useBaseUrl from '@docusaurus/useBaseUrl';
import MemberCard from './MemberCard';
import type { MemberName } from './types';
import styles from './HeroSection.module.css';

interface Member {
  nickname: MemberName;
  realName: string;
  emoji: string;
  role: string;
  github?: string;
  linkedin?: string;
}

const members: readonly Member[] = [
  {
    nickname: 'Alice',
    realName: '소현',
    emoji: '🦊',
    role: '2년차 프론트엔드 개발자 (F-pretence)',
  },
  {
    nickname: 'Amber',
    realName: '도윤',
    emoji: '🐵',
    role: '5년차 프론트엔드 개발자, 지금은 취준생',
  },
  {
    nickname: 'Crong',
    realName: '규진',
    emoji: '🦎',
    role: '토큰 없으면 퇴근하는 1년차 프론트엔드 개발자',
  },
  {
    nickname: 'diego',
    realName: '장원',
    emoji: '🦉',
    role: '운동은 안 하고 Claude에 월 50만원 쓰면서 데이터로 뇌 운동하는 5년차',
  },
  {
    nickname: 'Jay',
    realName: '준근',
    emoji: '🦜',
    role: '에어팟 없으면 개발 못 하는 3년차 프론트엔드 개발자',
  },
  {
    nickname: 'Leo',
    realName: '승완',
    emoji: '🐻',
    role: '아침밥 안 먹는 4년차 프론트엔드 개발자',
  },
  {
    nickname: 'zinii',
    realName: '미진',
    emoji: '🐿️',
    role: 'Claude에게 직장을 빼앗기게 생긴 고민 개발자',
  },
];

export default function HeroSection() {
  const heroImage = useBaseUrl('/img/members/hero.png');

  return (
    <section className={styles.hero}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>함수랑 산악회</p>
        <h1 className={styles.title}>FE 개발자 7명이 Code Complete 2판을 읽고, 2026년에도 살아있는지 직접 투표했어요</h1>
        <p className={styles.subtitle}>
          2026년 프론트엔드 현업 관점으로 다시 본 Steve McConnell의 고전. 각자의 경험으로 읽고,
          직접 투표하고, 치열하게 토론했어요.
        </p>
      </div>
      <figure className={styles.figure}>
        <img src={heroImage} alt="함수랑 산악회 7인 캐릭터" loading="lazy" />
      </figure>
      <div className={styles.grid}>
        {members.map((m) => (
          <MemberCard key={m.nickname} {...m} />
        ))}
      </div>
    </section>
  );
}
