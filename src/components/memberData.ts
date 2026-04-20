import type { MemberName } from './types';

interface MemberProfile {
  github: string;
  linkedin: string | null;
  description: string;
}

export const MEMBER_DATA: Record<MemberName, MemberProfile> = {
  Alice: {
    github: 'sHyunis',
    linkedin: 'https://www.linkedin.com/in/%EC%86%8C%ED%98%84-%EC%A0%95-100448322/',
    description: '2년차 프론트엔드 개발자 (F-pretence)',
  },
  Amber: {
    github: 'doyoonear',
    linkedin: 'https://www.linkedin.com/in/doyoonleee/',
    description: '5년차 프론트엔드 개발자, 지금은 취준생',
  },
  Crong: {
    github: 'Kyujenius',
    linkedin: 'https://www.linkedin.com/in/hongkyujin',
    description: '토큰 없으면 퇴근하는 1년차 프론트엔드 개발자',
  },
  diego: {
    github: 'jangwonyoon',
    linkedin: 'https://www.linkedin.com/in/%EC%9E%A5%EC%9B%90-%EC%9C%A4-5908911ba/?locale=en',
    description: '운동은 안하고 클로드에 월 50만원 쓰면서 데이터로 뇌 운동 하는 5년차 프론트엔드 개발자',
  },
  Jay: {
    github: 'jxxunnn',
    linkedin: 'https://www.linkedin.com/in/jxxunnn',
    description: '에어팟 없으면 개발 못하는 3년차 프론트엔드 개발자',
  },
  Leo: {
    github: 'Seung-wan',
    linkedin: 'https://www.linkedin.com/in/seungwanyu/',
    description: '아침 밥 안먹는 4년차 프론트엔드 개발자',
  },
  zinii: {
    github: 'azure-553',
    linkedin: 'https://www.linkedin.com/in/mijin-sim4530',
    description: '클로드에게 직장을 빼앗기게 생긴 고꼬마 개발자',
  },
};
