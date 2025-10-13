# 🎬 모르고 - VSCode에서 시작하기

## ⚡ 빠른 시작 (5분이면 완료!)

### 1️⃣ 준비물 확인
- ✅ **Node.js 18+** 설치됨? → [다운로드](https://nodejs.org/)
- ✅ **VSCode** 설치됨? → [다운로드](https://code.visualstudio.com/)
- ✅ **Git** 설치됨? (선택) → [다운로드](https://git-scm.com/)

### 2️⃣ 프로젝트 다운로드

**방법 A: 수동 복사 (초보자 추천)**
1. 새 폴더 만들기: `morugo-movie-db`
2. 이 프로젝트의 **모든 파일과 폴더**를 복사
3. VSCode에서 폴더 열기

**방법 B: Git 사용**
```bash
git clone [저장소 URL]
cd morugo-movie-db
code .
```

### 3️⃣ 로고 이미지 준비
1. `public/images/` 폴더 생성
2. 로고 이미지를 `public/images/logo.png`로 저장

### 4️⃣ 터미널에서 실행
```bash
# VSCode 터미널 열기: Ctrl+` (Windows) 또는 Cmd+` (Mac)

# 1. 패키지 설치
npm install

# 2. 개발 서버 시작
npm run dev
```

### 5️⃣ 완료! 🎉
브라우저가 자동으로 열리고 앱이 실행됩니다!
→ http://localhost:5173

---

## 📁 필수 파일 체크리스트

다운로드 후 이 파일들이 있는지 확인하세요:

```
morugo-movie-db/
├─ 📄 package.json          ✅ 있어야 함
├─ 📄 tsconfig.json         ✅ 있어야 함
├─ 📄 vite.config.ts        ✅ 있어야 함
├─ 📄 index.html            ✅ 있어야 함
├─ 📄 main.tsx              ✅ 있어야 함
├─ 📄 App.tsx               ✅ 있어야 함
├─ 📁 components/           ✅ 여러 .tsx 파일들
├─ 📁 components/ui/        ✅ 30+ 파일들
├─ 📁 services/            ✅ tmdb.ts
├─ 📁 styles/              ✅ globals.css
└─ 📁 public/images/       ✅ logo.png
```

---

## 🚨 문제 해결

### 에러: "Cannot find module"
```bash
npm install
```

### 에러: "Port 5173 is already in use"
다른 앱이 포트를 사용 중입니다.
```bash
# vite.config.ts에서 포트 변경
# port: 5173 → port: 3000
```

### 로고 이미지가 안 보임
`public/images/logo.png` 파일이 있는지 확인하세요.

### TypeScript 에러가 많음
모든 파일이 제대로 복사되었는지 확인하세요.

---

## 📚 더 자세한 가이드

- **설치 가이드**: `SETUP_GUIDE.md` 참고
- **다운로드 방법**: `DOWNLOAD_INSTRUCTIONS.md` 참고
- **프로젝트 설명**: `README.md` 참고

---

## 🛠️ 개발 명령어

```bash
# 개발 서버 시작
npm run dev

# 프로덕션 빌드
npm run build

# 빌드 미리보기
npm run preview

# 린트 체크
npm run lint
```

---

## 🎨 커스터마이징 시작하기

### 색상 변경
`styles/globals.css` 파일에서 CSS 변수 수정

### 컴포넌트 수정
`components/` 폴더에서 원하는 컴포넌트 수정

### API 설정 변경
`services/tmdb.ts` 파일 수정

---

## 🚀 배포하기

### Vercel (가장 쉬움)
1. GitHub에 프로젝트 푸시
2. [vercel.com](https://vercel.com)에서 Import
3. 자동 배포! ✨

### Netlify
1. GitHub에 프로젝트 푸시
2. [netlify.com](https://netlify.com)에서 New site
3. Build: `npm run build`
4. Publish: `dist`

---

## 💡 VSCode 추천 확장

설치하면 개발이 더 편해집니다:

1. **ESLint** - 코드 품질 체크
2. **Prettier** - 코드 자동 포맷팅
3. **Tailwind CSS IntelliSense** - Tailwind 자동완성
4. **TypeScript Vue Plugin (Volar)** - TS 지원

→ VSCode에서 자동으로 설치 추천 팝업이 뜰 거예요!

---

## 🎓 다음 단계

1. ✅ 프로젝트 실행 완료
2. 📖 코드 살펴보기
3. 🎨 디자인 커스터마이징
4. ⚡ 새 기능 추가하기
5. 🚀 배포하기
6. 💪 포트폴리오에 추가!

---

## 🤝 도움이 필요하세요?

- TMDB API: https://developers.themoviedb.org/3
- React 문서: https://react.dev
- Tailwind CSS: https://tailwindcss.com
- Vite 문서: https://vitejs.dev

---

**즐거운 개발 되세요! 화이팅! 🔥**

---

_Made with ❤️ by Figma Make_
