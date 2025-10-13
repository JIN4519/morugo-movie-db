# 🎬 모르고 (MORUGO) - 로컬 개발 환경 설정 가이드

## 📋 필수 준비사항

- **Node.js**: 18.0.0 이상 (권장: 20.x LTS)
- **npm** 또는 **yarn** 또는 **pnpm**
- **VSCode** (권장 에디터)

## 🚀 설치 및 실행 단계

### 1단계: 프로젝트 폴더 생성 및 이동

```bash
# 원하는 위치에 폴더 생성
mkdir morugo-movie-db
cd morugo-movie-db
```

### 2단계: 모든 파일 복사

Figma Make에서 다음 파일/폴더들을 모두 복사해서 프로젝트 폴더에 붙여넣으세요:

```
morugo-movie-db/
├── components/          # 모든 컴포넌트 파일
├── services/           # TMDB API 서비스
├── styles/             # CSS 파일
├── data/               # 영화 데이터
├── imports/            # 로고 SVG 파일
├── App.tsx             # 메인 앱
├── main.tsx            # 엔트리 포인트
├── index.html          # HTML 템플릿
├── package.json        # 의존성 설정
├── tsconfig.json       # TypeScript 설정
├── vite.config.ts      # Vite 설정
└── README.md           # 프로젝트 설명
```

### 3단계: 로고 이미지 파일 처리

⚠️ **중요**: `figma:asset` 경로로 된 이미지는 로컬에서 작동하지 않습니다.

**해결 방법:**

1. **로고 이미지를 다운로드** 받으세요 (제공된 로고 파일)
2. 프로젝트 폴더에 `public/images/` 폴더 생성:
   ```bash
   mkdir -p public/images
   ```
3. 로고 이미지를 `public/images/logo.png`로 저장
4. `components/NewMorugoLogo.tsx` 파일 수정:
   ```tsx
   // 수정 전:
   import logoImage from 'figma:asset/...';

   // 수정 후:
   const logoImage = '/images/logo.png';
   ```

### 4단계: 의존성 설치

```bash
# npm 사용 시
npm install

# yarn 사용 시
yarn install

# pnpm 사용 시
pnpm install
```

### 5단계: 개발 서버 실행

```bash
# npm 사용 시
npm run dev

# yarn 사용 시
yarn dev

# pnpm 사용 시
pnpm dev
```

브라우저가 자동으로 열리고 `http://localhost:5173`에서 앱이 실행됩니다! 🎉

## 🔑 TMDB API 키 (이미 설정됨)

현재 `services/tmdb.ts` 파일에 TMDB API 토큰이 이미 포함되어 있습니다.

**보안을 위해 환경 변수로 변경하기 (선택사항):**

1. 프로젝트 루트에 `.env` 파일 생성:
   ```bash
   touch .env
   ```

2. `.env` 파일에 다음 추가:
   ```
   VITE_TMDB_ACCESS_TOKEN=your_tmdb_access_token_here
   ```

3. `services/tmdb.ts` 수정:
   ```typescript
   // 수정 전:
   const TMDB_ACCESS_TOKEN = 'eyJhbGciOiJIUzI1NiJ9...';

   // 수정 후:
   const TMDB_ACCESS_TOKEN = import.meta.env.VITE_TMDB_ACCESS_TOKEN || '';
   ```

4. `.gitignore`에 `.env` 추가 (이미 추가되어 있을 가능성 높음)

## 📦 빌드 (배포용)

```bash
# 프로덕션 빌드
npm run build

# 빌드 결과 미리보기
npm run preview
```

빌드된 파일은 `dist/` 폴더에 생성됩니다.

## 🛠️ VSCode 권장 확장 프로그램

- **ESLint**: 코드 린팅
- **Prettier**: 코드 포맷팅
- **Tailwind CSS IntelliSense**: Tailwind 자동완성
- **TypeScript Vue Plugin (Volar)**: TypeScript 지원

## 📁 주요 폴더 구조 설명

```
morugo-movie-db/
├── components/
│   ├── ui/              # Shadcn UI 컴포넌트
│   ├── Header.tsx       # 헤더/네비게이션
│   ├── MovieCard.tsx    # 영화 카드
│   ├── MovieDetail.tsx  # 영화 상세 모달
│   ├── Chatbot.tsx      # AI 챗봇
│   └── ...
├── services/
│   └── tmdb.ts         # TMDB API 통신
├── styles/
│   └── globals.css     # 전역 스타일 (Tailwind 포함)
└── App.tsx             # 메인 애플리케이션
```

## 🎨 커스터마이징

- **색상 변경**: `styles/globals.css`의 CSS 변수 수정
- **컴포넌트 수정**: `components/` 폴더의 각 파일 수정
- **API 추가**: `services/` 폴더에 새 서비스 추가

## 🐛 문제 해결

### 포트 충돌 오류
```bash
# vite.config.ts에서 포트 변경
server: {
  port: 3000,  // 원하는 포트로 변경
}
```

### 이미지 로딩 실패
- `public/images/` 폴더에 로고 이미지가 있는지 확인
- `NewMorugoLogo.tsx`에서 경로가 올바른지 확인

### TypeScript 오류
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

## 🚢 배포

### Vercel 배포 (권장)
1. GitHub에 프로젝트 푸시
2. [Vercel](https://vercel.com) 에서 Import
3. 자동으로 빌드 및 배포

### Netlify 배포
1. GitHub에 프로젝트 푸시
2. [Netlify](https://netlify.com) 에서 New site from Git
3. 빌드 설정:
   - Build command: `npm run build`
   - Publish directory: `dist`

## 📞 도움이 필요하신가요?

- TMDB API 문서: https://developers.themoviedb.org/3
- Vite 문서: https://vitejs.dev
- React 문서: https://react.dev

---

**즐거운 개발 되세요! 🎬✨**
