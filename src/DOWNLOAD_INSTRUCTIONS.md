# 📥 프로젝트 다운로드 및 설치 가이드

## 방법 1: ZIP 파일로 다운로드 (가장 쉬움) ✅

### Figma Make에서:
1. **파일 내보내기** 기능 사용 (있다면)
2. 또는 각 파일을 수동으로 복사

### 수동 복사 방법:

#### 1단계: 로컬에 프로젝트 폴더 생성
```bash
mkdir morugo-movie-db
cd morugo-movie-db
```

#### 2단계: 필수 파일들 생성

**루트 파일들 (순서대로 생성):**

1. `package.json` - 복사해서 붙여넣기
2. `tsconfig.json` - 복사해서 붙여넣기
3. `vite.config.ts` - 복사해서 붙여넣기
4. `index.html` - 복사해서 붙여넣기
5. `main.tsx` - 복사해서 붙여넣기
6. `App.tsx` - 복사해서 붙여넣기
7. `.gitignore` - 복사해서 붙여넣기

**폴더 구조 생성:**
```bash
mkdir -p components/ui
mkdir -p components/figma
mkdir -p services
mkdir -p styles
mkdir -p data
mkdir -p imports
mkdir -p public/images
```

**components/ 폴더:**
- `Header.tsx`
- `MovieCard.tsx`
- `MovieDetail.tsx`
- `SearchFilters.tsx`
- `LoginModal.tsx`
- `Chatbot.tsx`
- `NewMorugoLogo.tsx`
- (기타 로고 파일들)

**components/ui/ 폴더:**
- 모든 shadcn/ui 컴포넌트 파일들 (30+ 파일)

**components/figma/ 폴더:**
- `ImageWithFallback.tsx`

**services/ 폴더:**
- `tmdb.ts`

**styles/ 폴더:**
- `globals.css`

**data/ 폴더:**
- `movieData.ts`

**imports/ 폴더:**
- `Layer1.tsx`
- `svg-tnk13tj4ga.ts`

#### 3단계: 로고 이미지 저장
제공된 로고 이미지를 `public/images/logo.png`로 저장하세요.

#### 4단계: 의존성 설치
```bash
npm install
```

#### 5단계: 실행!
```bash
npm run dev
```

---

## 방법 2: Git 사용 (추천) 🔥

### 1단계: GitHub에 저장소 생성
1. GitHub에서 새 저장소 생성 (예: `morugo-movie-db`)
2. 로컬에 클론:
```bash
git clone https://github.com/your-username/morugo-movie-db.git
cd morugo-movie-db
```

### 2단계: 파일 복사
위의 "방법 1"과 동일하게 모든 파일 복사

### 3단계: Git 커밋
```bash
git add .
git commit -m "Initial commit: Morugo Movie Database"
git push origin main
```

### 4단계: 설치 및 실행
```bash
npm install
npm run dev
```

---

## 방법 3: 개별 파일 다운로드 스크립트

VSCode에서 터미널을 열고 다음 스크립트를 실행하세요:

```bash
# 1. 프로젝트 폴더 생성
mkdir morugo-movie-db && cd morugo-movie-db

# 2. 폴더 구조 생성
mkdir -p components/ui components/figma services styles data imports public/images

# 3. Git 초기화 (선택사항)
git init

# 4. 이제 Figma Make에서 파일들을 복사하세요!
```

---

## ⚠️ 중요 체크리스트

복사 완료 후 반드시 확인하세요:

- [ ] `package.json` 파일이 있나요?
- [ ] `node_modules/` 폴더가 생성되었나요? (npm install 후)
- [ ] `public/images/logo.png` 파일이 있나요?
- [ ] `services/tmdb.ts`에 API 토큰이 있나요?
- [ ] `styles/globals.css` 파일이 있나요?
- [ ] 모든 `components/ui/` 파일들이 있나요?

---

## 🚀 빠른 시작 명령어

모든 파일을 복사한 후:

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 브라우저에서 확인
# http://localhost:5173 자동으로 열림
```

---

## 🐛 문제 해결

### "Cannot find module" 오류
```bash
# node_modules 삭제 후 재설치
rm -rf node_modules package-lock.json
npm install
```

### 이미지가 로딩되지 않음
- `public/images/logo.png` 파일이 있는지 확인
- `NewMorugoLogo.tsx`에서 경로 확인

### TypeScript 오류가 많이 남
- 모든 파일이 제대로 복사되었는지 확인
- `tsconfig.json`이 올바른지 확인

### 포트 충돌
```bash
# vite.config.ts에서 포트 변경
server: {
  port: 3000,  // 다른 포트로 변경
}
```

---

## 📦 필수 파일 목록 (체크용)

### 루트 파일 (8개)
- [ ] `package.json`
- [ ] `tsconfig.json`
- [ ] `vite.config.ts`
- [ ] `index.html`
- [ ] `main.tsx`
- [ ] `App.tsx`
- [ ] `.gitignore`
- [ ] `README.md`

### 주요 폴더
- [ ] `components/` (7+ 파일)
- [ ] `components/ui/` (30+ 파일)
- [ ] `services/` (1 파일)
- [ ] `styles/` (1 파일)
- [ ] `data/` (1 파일)
- [ ] `public/images/` (로고 파일)

---

## 🎉 완료!

모든 단계를 완료하셨다면:

```bash
npm run dev
```

브라우저에서 `http://localhost:5173`을 열고 **모르고** 영화 데이터베이스를 즐기세요! 🎬

---

## 💡 다음 단계

1. **커스터마이징**: 색상, 레이아웃 등을 원하는 대로 수정
2. **기능 추가**: 새로운 기능 개발
3. **배포**: Vercel, Netlify 등에 배포
4. **공유**: GitHub에 공유하고 다른 개발자들과 협업

---

**궁금한 점이 있으시면 `SETUP_GUIDE.md`를 참고하세요!**
