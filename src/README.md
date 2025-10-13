# 모르고 (Morugo) - 영화 데이터베이스

TMDB API를 활용한 종합 영화 정보 플랫폼입니다.

## 주요 기능

- 🎬 **실시간 영화 데이터**: TMDB API를 통한 최신 영화 정보
- 🔍 **고급 검색**: 제목, 장르, 감독, 배우 등 다양한 조건으로 검색
- 📊 **카테고리별 탐색**: 인기 영화, 최신 영화, 상영 예정작, 평점 높은 영화
- ⭐ **평점 및 리뷰**: 사용자 평점 및 리뷰 시스템
- 💝 **개인화**: 즐겨찾기 및 시청 목록 관리
- 🤖 **AI 챗봇**: 영화 추천 및 정보 제공
- 📱 **반응형 디자인**: 모바일부터 데스크톱까지 완벽 지원

## 기술 스택

- **Frontend**: React, TypeScript, Tailwind CSS
- **API**: TMDB (The Movie Database)
- **UI Components**: shadcn/ui
- **Icons**: Lucide React
- **Build Tool**: Vite

## 시작하기

### 1. TMDB API 키 발급

1. [TMDB](https://www.themoviedb.org/) 계정 생성
2. [API 설정 페이지](https://www.themoviedb.org/settings/api)에서 API 키 발급
3. API Read Access Token (Bearer Token) 복사

### 2. Figma Make에서 사용

현재 TMDB API Access Token이 `/services/tmdb.ts` 파일에 설정되어 있어 바로 사용 가능합니다.

### 3. 로컬 개발 환경 설정 (VS Code)

#### 프로젝트 복사

Figma Make에서 모든 파일을 로컬로 복사합니다.

#### 패키지 설치

```bash
npm install
# 또는
yarn install
# 또는
pnpm install
```

#### 필수 dependencies

```json
{
  "dependencies": {
    "react": "^18.3.1",
    "react-dom": "^18.3.1",
    "lucide-react": "latest",
    "class-variance-authority": "latest",
    "clsx": "latest",
    "tailwind-merge": "latest"
  },
  "devDependencies": {
    "@types/react": "^18.3.1",
    "@types/react-dom": "^18.3.1",
    "@vitejs/plugin-react": "^4.3.4",
    "typescript": "^5.7.2",
    "vite": "^6.0.3",
    "tailwindcss": "^4.0.0",
    "autoprefixer": "latest",
    "postcss": "latest"
  }
}
```

#### 환경 변수 설정 (선택사항)

보안을 위해 환경 변수를 사용하려면:

1. `.env` 파일 생성:
```bash
cp .env.example .env
```

2. `.env` 파일에 API 키 추가:
```
VITE_TMDB_ACCESS_TOKEN=your_actual_token_here
```

3. `/services/tmdb.ts` 수정:
```typescript
const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN || 'fallback_token';
```

#### 개발 서버 실행

```bash
npm run dev
# 또는
yarn dev
# 또는
pnpm dev
```

브라우저에서 `http://localhost:5173` 접속

## 프로젝트 구조

```
├── App.tsx                 # 메인 애플리케이션 컴포넌트
├── components/            
│   ├── Header.tsx         # 헤더 및 네비게이션
│   ├── MovieCard.tsx      # 영화 카드 컴포넌트
│   ├── MovieDetail.tsx    # 영화 상세 모달
│   ├── SearchFilters.tsx  # 검색 필터
│   ├── LoginModal.tsx     # 로그인 모달
│   ├── Chatbot.tsx        # AI 챗봇
│   └── ui/                # shadcn/ui 컴포넌트
├── services/
│   └── tmdb.ts            # TMDB API 서비스
├── data/
│   └── movieData.ts       # 데이터 타입 정의
└── styles/
    └── globals.css        # 글로벌 스타일

## API 엔드포인트

### 사용 중인 TMDB API

- `/movie/popular` - 인기 영화
- `/movie/top_rated` - 평점 높은 영화
- `/movie/upcoming` - 상영 예정작
- `/movie/now_playing` - 현재 상영 중
- `/search/movie` - 영화 검색
- `/movie/{id}` - 영화 상세 정보
- `/movie/{id}/credits` - 출연진 및 제작진
- `/movie/{id}/videos` - 예고편 및 영상
- `/discover/movie` - 고급 필터링

### API 응답 캐싱

현재 API 응답은 캐싱되지 않습니다. 프로덕션 환경에서는 다음을 고려하세요:

- React Query 또는 SWR 사용
- 로컬 스토리지 캐싱
- Service Worker 활용

## Supabase 연동 (선택사항)

사용자 데이터를 영구 저장하려면 Supabase를 연동할 수 있습니다:

### 저장할 데이터
- 사용자 프로필
- 즐겨찾기 목록
- 시청 목록
- 사용자 리뷰 및 평점

### 연동 방법

1. Figma Make에서 Supabase Connect 도구 사용
2. 또는 수동으로 Supabase 프로젝트 생성 후 클라이언트 설정

## 배포

### Vercel

```bash
# Vercel CLI 설치
npm i -g vercel

# 배포
vercel
```

### Netlify

```bash
# Netlify CLI 설치
npm i -g netlify-cli

# 배포
netlify deploy --prod
```

### 환경 변수 설정

배포 시 플랫폼의 환경 변수 설정에서 `VITE_TMDB_ACCESS_TOKEN`을 추가하세요.

## 라이선스

이 프로젝트는 TMDB API를 사용합니다. 
TMDB 사용 약관: https://www.themoviedb.org/terms-of-use

영화 데이터 및 이미지의 저작권은 각 저작권자에게 있습니다.

## 기여

버그 리포트 및 기능 제안은 이슈로 등록해주세요.

## 문의

프로젝트 관련 문의사항이 있으시면 이슈를 생성해주세요.
