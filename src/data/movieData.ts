// Movie interface - now populated from TMDB API
export interface Movie {
  id: string;
  title: string;
  originalTitle?: string;
  genre: string[];
  releaseDate: string;
  runtime: number;
  rating: number;
  reviewCount: number;
  poster: string;
  backdrop: string;
  synopsis: string;
  director: string;
  cast: string[];
  trailerUrl?: string;
  status: 'released' | 'upcoming' | 'in_theaters';
  isPopular: boolean;
  budget?: number;
  boxOffice?: number;
}

export interface Review {
  id: string;
  movieId: string;
  userId: string;
  userName: string;
  rating: number;
  content: string;
  createdAt: string;
  likes: number;
}

export const mockMovies: Movie[] = [
  {
    id: '1',
    title: '어벤져스: 엔드게임',
    originalTitle: 'Avengers: Endgame',
    genre: ['액션', 'SF', '어드벤처'],
    releaseDate: '2019-04-25',
    runtime: 181,
    rating: 9.2,
    reviewCount: 15420,
    poster: 'https://images.unsplash.com/photo-1739891251370-05b62a54697b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NTk0OTM4MDZ8MA&ixlib=rb-4.1.0&q=80&w=400',
    backdrop: 'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBjaW5lbWF8ZW58MXx8fHwxNzU5NTE1MDA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    synopsis: '타노스의 핑거 스냅으로 인해 절반의 생명체가 사라진 지 5년 후, 남은 어벤져스들이 모든 것을 되돌리기 위한 마지막 전투를 벌입니다.',
    director: '안소니 루소, 조 루소',
    cast: ['로버트 다우니 주니어', '크리스 에반스', '스칼릿 요한슨', '마크 러팔로'],
    status: 'released',
    isPopular: true,
    budget: 356000000,
    boxOffice: 2798000000
  },
  {
    id: '2',
    title: '듄: 파트 2',
    originalTitle: 'Dune: Part Two',
    genre: ['SF', '어드벤처', '드라마'],
    releaseDate: '2024-02-29',
    runtime: 166,
    rating: 8.9,
    reviewCount: 8932,
    poster: 'https://images.unsplash.com/photo-1713392824135-a7c7db3d9465?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGZpbG1pbmclMjBjYW1lcmF8ZW58MXx8fHwxNzU5NTkxNzY5fDA&ixlib=rb-4.1.0&q=80&w=400',
    backdrop: 'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBjaW5lbWF8ZW58MXx8fHwxNzU5NTE1MDA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    synopsis: '폴 아트레이데스는 프레멘과 함께 황제와 하코넨 가문에 맞서 복수를 계획합니다.',
    director: '드니 빌뇌브',
    cast: ['티모시 샬라메', '젠데이아', '레베카 퍼거슨', '조시 브롤린'],
    status: 'released',
    isPopular: true,
    budget: 190000000,
    boxOffice: 714400000
  },
  {
    id: '3',
    title: '오펜하이머',
    originalTitle: 'Oppenheimer',
    genre: ['드라마', '스릴러', '전기'],
    releaseDate: '2023-07-21',
    runtime: 180,
    rating: 8.7,
    reviewCount: 12450,
    poster: 'https://images.unsplash.com/photo-1739891251370-05b62a54697b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NTk0OTM4MDZ8MA&ixlib=rb-4.1.0&q=80&w=400',
    backdrop: 'https://images.unsplash.com/photo-1713392824135-a7c7db3d9465?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGZpbG1pbmclMjBjYW1lcmF8ZW58MXx8fHwxNzU5NTkxNzY5fDA&ixlib=rb-4.1.0&q=80&w=1080',
    synopsis: '원자폭탄의 아버지 로버트 오펜하이머의 일생과 맨해튼 프로젝트를 다룬 전기 영화입니다.',
    director: '크리스토퍼 놀란',
    cast: ['킬리언 머피', '에밀리 블런트', '로버트 다우니 주니어', '맷 데이먼'],
    status: 'released',
    isPopular: true,
    budget: 100000000,
    boxOffice: 952000000
  },
  {
    id: '4',
    title: '가디언즈 오브 갤럭시 Vol. 3',
    originalTitle: 'Guardians of the Galaxy Vol. 3',
    genre: ['액션', 'SF', '코미디'],
    releaseDate: '2023-05-05',
    runtime: 150,
    rating: 8.4,
    reviewCount: 9876,
    poster: 'https://images.unsplash.com/photo-1713392824135-a7c7db3d9465?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGZpbG1pbmclMjBjYW1lcmF8ZW58MXx8fHwxNzU5NTkxNzY5fDA&ixlib=rb-4.1.0&q=80&w=400',
    backdrop: 'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBjaW5lbWF8ZW58MXx8fHwxNzU5NTE1MDA4fDA&ixlib-4.1.0&q=80&w=1080',
    synopsis: '가디언즈가 로켓의 과거를 알아가며 팀을 구하기 위한 마지막 모험을 떠납니다.',
    director: '제임스 건',
    cast: ['크리스 프랫', '조 샐다나', '브래들리 쿠퍼', '빈 디젤'],
    status: 'released',
    isPopular: true,
    budget: 250000000,
    boxOffice: 845600000
  },
  {
    id: '5',
    title: '스파이더맨: 어크로스 더 유니버스',
    originalTitle: 'Spider-Man: Across the Spider-Verse',
    genre: ['애니메이션', '액션', 'SF'],
    releaseDate: '2023-06-02',
    runtime: 140,
    rating: 9.1,
    reviewCount: 11234,
    poster: 'https://images.unsplash.com/photo-1739891251370-05b62a54697b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NTk0OTM4MDZ8MA&ixlib=rb-4.1.0&q=80&w=400',
    backdrop: 'https://images.unsplash.com/photo-1713392824135-a7c7db3d9465?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGZpbG1pbmclMjBjYW1lcmF8ZW58MXx8fHwxNzU5NTkxNzY5fDA&ixlib-4.1.0&q=80&w=1080',
    synopsis: '마일스 모랄레스가 멀티버스를 여행하며 다른 스파이더맨들과 만나는 스펙터클한 애니메이션입니다.',
    director: '호아킴 도스 산토스, 켐프 파워스, 저스틴 K. 톰슨',
    cast: ['샤메익 무어', '헤일리 스타인펠드', '브라이언 콕스', '오스카 아이삭'],
    status: 'released',
    isPopular: true,
    budget: 100000000,
    boxOffice: 690000000
  },
  {
    id: '6',
    title: '아바타: 물의 길',
    originalTitle: 'Avatar: The Way of Water',
    genre: ['SF', '어드벤처', '판타지'],
    releaseDate: '2022-12-16',
    runtime: 192,
    rating: 8.2,
    reviewCount: 13567,
    poster: 'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBjaW5lbWF8ZW58MXx8fHwxNzU5NTE1MDA4fDA&ixlib=rb-4.1.0&q=80&w=400',
    backdrop: 'https://images.unsplash.com/photo-1713392824135-a7c7db3d9465?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGZpbG1pbmclMjBjYW1lcmF8ZW58MXx8fHwxNzU5NTkxNzY5fDA&ixlib-4.1.0&q=80&w=1080',
    synopsis: '제이크 설리가 가족과 함께 판도라의 바다 부족에게 피신하며 벌어지는 이야기입니다.',
    director: '제임스 카메론',
    cast: ['샘 워딩턴', '조 샐다나', '시고니 위버', '스티븐 랭'],
    status: 'released',
    isPopular: true,
    budget: 350000000,
    boxOffice: 2320000000
  },
  {
    id: '7',
    title: '토르: 러브 앤 썬더',
    originalTitle: 'Thor: Love and Thunder',
    genre: ['액션', 'SF', '코미디'],
    releaseDate: '2025-05-15',
    runtime: 135,
    rating: 0,
    reviewCount: 0,
    poster: 'https://images.unsplash.com/photo-1739891251370-05b62a54697b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhY3Rpb24lMjBtb3ZpZSUyMHBvc3RlcnxlbnwxfHx8fDE3NTk0OTM4MDZ8MA&ixlib=rb-4.1.0&q=80&w=400',
    backdrop: 'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBjaW5lbWF8ZW58MXx8fHwxNzU5NTE1MDA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    synopsis: '토르가 새로운 모험을 떠나며 잃어버린 사랑을 되찾으려 노력하는 이야기입니다.',
    director: '타이카 와이티티',
    cast: ['크리스 헴스워스', '나탈리 포트만', '크리스찬 베일', '테사 톰슨'],
    status: 'upcoming',
    isPopular: false,
    budget: 250000000
  },
  {
    id: '8',
    title: '블랙 팬서: 와칸다 포에버',
    originalTitle: 'Black Panther: Wakanda Forever',
    genre: ['액션', 'SF', '드라마'],
    releaseDate: '2025-03-20',
    runtime: 161,
    rating: 0,
    reviewCount: 0,
    poster: 'https://images.unsplash.com/photo-1713392824135-a7c7db3d9465?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMGZpbG1pbmclMjBjYW1lcmF8ZW58MXx8fHwxNzU5NTkxNzY5fDA&ixlib-4.1.0&q=80&w=400',
    backdrop: 'https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb3ZpZSUyMHRoZWF0ZXIlMjBjaW5lbWF8ZW58MXx8fHwxNzU5NTE1MDA4fDA&ixlib=rb-4.1.0&q=80&w=1080',
    synopsis: '와칸다 왕국이 새로운 위협에 맞서 티찰라의 유산을 지켜나가는 이야기입니다.',
    director: '라이언 쿠글러',
    cast: ['레티시아 라이트', '안젤라 바셋', '루피타 뇽오', '다나이 구리라'],
    status: 'upcoming',
    isPopular: false,
    budget: 250000000
  }
];

export const mockReviews: Review[] = [
  {
    id: '1',
    movieId: '1',
    userId: 'user1',
    userName: '영화광123',
    rating: 9.5,
    content: '정말 완벽한 마무리였습니다. 11년간의 여정이 이렇게 끝날 줄이야... 감동 그 자체',
    createdAt: '2024-01-15T10:30:00Z',
    likes: 245
  },
  {
    id: '2',
    movieId: '1',
    userId: 'user2',
    userName: '마블팬',
    rating: 8.8,
    content: '액션 시퀀스는 정말 최고였지만, 스토리가 조금 아쉬웠어요. 그래도 볼만합니다!',
    createdAt: '2024-01-14T15:45:00Z',
    likes: 89
  },
  {
    id: '3',
    movieId: '2',
    userId: 'user3',
    userName: 'SF러버',
    rating: 9.2,
    content: '시각적 스펙터클이 압도적이었습니다. 드니 빌뇌브 감독의 연출력에 감탄했어요.',
    createdAt: '2024-02-20T09:15:00Z',
    likes: 156
  }
];

export const movieGenres = [
  '전체', '액션', 'SF', '드라마', '코미디', '로맨스', '스릴러', 
  '공포', '애니메이션', '판타지', '어드벤처', '범죄', '전기', '다큐멘터리'
];