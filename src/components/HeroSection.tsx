import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './HeroSection.module.css';

export default function HeroSection() {
  const heroImage = useBaseUrl('/img/members/hero.png');

  return (
    <section className={styles.hero}>
      <div className={styles.intro}>
        <p className={styles.eyebrow}>함수랑 산악회</p>
        <h1 className={styles.title}>
          FE 개발자 7명이 Code Complete 2판을 읽고, 2026년에도 살아있는지 직접 투표했어요
        </h1>
        <p className={styles.subtitle}>
          2026년 프론트엔드 현업 관점으로 다시 본 Steve McConnell의 고전. 각자의 경험으로 읽고, 직접
          투표하고, 치열하게 토론했어요.
        </p>
      </div>
      <figure className={styles.figure}>
        <img src={heroImage} alt="함수랑 산악회 7인 캐릭터" loading="lazy" />
      </figure>
    </section>
  );
}
