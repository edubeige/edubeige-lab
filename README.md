# edubeige-lab

GitHub Pages(`github.io`)에 배포하는 교원 연수용 정적 웹사이트의 기준 문서다. 이 문서는 기존 PRD를 바탕으로, 학교망 제약과 `GitHub Pages only` 운영 조건에 맞게 범위와 구현 방식을 현실화한 `PRD + 배포 가이드` 통합 문서다.

## 1. 프로젝트 개요

### 목적
- 선생님들이 연수 전·중·후에 한 사이트에서 준비, 실습, 프롬프트 복사, 자료 다운로드, 결과 공유까지 자연스럽게 이어서 사용할 수 있게 한다.
- 운영자는 디자인이나 코드보다 콘텐츠 중심으로 회차를 복제하고 수정해 재배포할 수 있어야 한다.
- 구현자는 이 문서만 보고 MVP를 바로 착수할 수 있어야 한다.

### 대상 사용자
- 참가자: 연수에 참여하는 교사
- 운영자: 강사, 연수 담당 장학사, 관리자

### 운영 제약
- 배포는 GitHub Pages 프로젝트 사이트 기준으로 한다.
- 기준 URL은 `https://edubeige.github.io/edubeige-lab/` 이다.
- 참가자 로그인은 없다.
- MVP에서 관리자 로그인도 없다.
- 학교망 환경을 고려해 외부 서비스 의존성을 최소화한다.
- 외부 embed보다 직접 링크를 우선한다.
- 서버, DB, 별도 백엔드는 두지 않는다.

### 왜 GitHub Pages 기준인가
- Vercel, Netlify 등 외부 호스팅이 교육청 망에서 차단될 수 있다.
- GitHub Pages는 정적 사이트 배포에 적합하고 운영 비용이 낮다.
- 콘텐츠 파일 기반 운영과 버전 관리가 쉽다.

## 2. 제품 비전

이 사이트는 단발성 행사 페이지가 아니라 장기적으로 재사용 가능한 연수 운영 허브다. 콘텐츠는 크게 두 층으로 나눈다.

### 상시 자산
- 프롬프트 허브
- 자료실
- 사례 갤러리
- FAQ / 문제 해결
- AI 도구 바로가기

### 회차 자산
- 오늘 연수 홈
- 일정표
- 공지 및 준비사항
- Padlet 또는 공유 링크
- 회차별 슬라이드 및 실습 자료
- 회차별 모듈 상세 페이지

## 3. 사용자와 핵심 여정

### 참가자
- 지금 진행 중인 연수의 흐름을 빠르게 파악하고 싶다.
- 링크를 헤매지 않고 바로 실습 화면으로 들어가고 싶다.
- 프롬프트를 그대로 복사해 수업에 적용하고 싶다.
- 연수 후에도 자료와 사례를 다시 찾아보고 싶다.

### 운영자
- 이전 회차 구성을 복제해 새 연수를 빠르게 만들고 싶다.
- 날짜, 장소, 순서, 파일, 링크, 프롬프트만 바꿔 재배포하고 싶다.
- 디자인이나 코드 수정 없이 콘텐츠만 관리하고 싶다.

### 사용자 여정
#### 연수 전
1. 사이트에 접속한다.
2. 날짜, 장소, 준비물, 계정 준비 여부를 확인한다.
3. 실습 도구 링크를 미리 열어본다.

#### 연수 중
1. 홈에서 현재 회차와 일정표를 확인한다.
2. 모듈 상세 페이지에 진입한다.
3. 체크리스트를 보고 실습 환경을 맞춘다.
4. 단계별 안내를 따라 실습한다.
5. 프롬프트를 복사하고 결과물을 공유한다.

#### 연수 후
1. 프롬프트 허브에서 다시 검색한다.
2. 수업용 자료를 다운로드한다.
3. 사례 갤러리를 참고해 자기 교과에 맞게 재활용한다.

#### 운영 흐름
1. 콘텐츠 파일 또는 `/admin`에서 회차 정보를 수정한다.
2. 브라우저 로컬 draft를 확인한다.
3. JSON 또는 Markdown 파일로 export 한다.
4. GitHub 저장소에 반영한다.
5. GitHub Actions로 GitHub Pages에 재배포한다.

## 4. MVP 범위와 정보 구조

### 공개 페이지
- `/` : 오늘 연수 홈
- `/events` : 연수 일정 및 아카이브
- `/events/[slug]` : 회차 상세
- `/modules/[slug]` : 모듈 상세 실습 페이지
- `/prompts` : 프롬프트 허브
- `/resources` : 자료실
- `/gallery` : 사례 갤러리
- `/faq` : 자주 묻는 질문 및 문제 해결

### 관리자 페이지
- `/admin` : 단일 관리자 페이지

### `/admin` MVP 역할
- 회차, 모듈, 프롬프트, 자료, 갤러리 항목을 한 화면에서 편집
- 정렬 순서 변경
- 로컬 draft 저장
- export / import
- 정적 미리보기 링크 확인

### MVP에 포함하지 않는 관리자 라우트
- `/admin/events`
- `/admin/modules`
- `/admin/prompts`
- `/admin/resources`
- `/admin/settings`
- `/admin/publish`

이들 라우트는 MVP에서 제거한다. 관리자 기능은 `/admin` 단일 라우트 안에 통합한다.

### 페이지별 요구사항

#### 홈
- 오늘 연수의 제목, 날짜, 장소, 강사, 핵심 소개를 상단에 노출
- 오늘의 빠른 링크 제공
  - Padlet 또는 공유 보드
  - 프롬프트 허브
  - 자료실
  - 주요 AI 도구 링크
- 일정표와 공지사항 제공
- 선택 항목으로 QR 코드, 요약 PDF 제공 가능

#### 회차 상세
- 회차 개요
- 모듈 목록
- 회차 전용 자료
- 관련 프롬프트 묶음
- 공지 및 주의사항
- 공유 링크

#### 모듈 상세
- 제목, 목표, 예상 시간
- 준비 체크리스트
- 단계별 실습 가이드
- 관련 프롬프트 카드
- 예시 결과물
- 결과 공유 CTA
- 자주 막히는 문제

#### 프롬프트 허브
- 검색창
- 메타데이터 필터
  - AI 도구
  - 교과
  - 활용 목적
  - 난이도
  - 연수 유형
- 프롬프트 카드
  - 제목
  - 요약
  - 태그
  - 프롬프트 본문
  - 복사 버튼
  - 관련 카드

#### 자료실
- 검색
- 파일 유형 필터
- 회차별 자료와 상시 자료 구분
- 다운로드 버튼
- 관련 모듈과 프롬프트 연결

#### 사례 갤러리
- 카드형 목록
- 사용 도구 배지
- 제목과 설명
- 교과 및 활용 목적 필터

#### FAQ
- 계정 관련
- 브라우저 관련
- 복사 및 다운로드 오류
- 학교망 이슈
- Padlet 공유 안내

## 5. 기능 우선순위

### MVP
- 홈
- 회차 상세
- 모듈 상세
- 프롬프트 허브
- 자료실
- 사례 갤러리
- FAQ
- `/admin` 단일 관리자 페이지
- GitHub Pages 배포

### Phase 2
- GitHub Personal Access Token 기반 직접 저장
- GitHub API를 통한 원클릭 publish
- QR 코드 생성
- 최근 본 프롬프트
- 즐겨찾기
- 다회차 아카이브 강화
- Pagefind 기반 전문 검색

### Phase 3
- 다국어
- 오프라인/PWA
- 간단한 분석 대시보드
- 다크모드

## 6. 콘텐츠 모델

콘텐츠는 `src/content` 아래 JSON, Markdown, YAML 중 하나로 관리한다. MVP에서는 구조가 명확한 JSON과 Markdown 조합을 권장한다.

### siteConfig
```json
{
  "siteTitle": "edubeige-lab",
  "siteSubtitle": "교원 연수 운영을 위한 실습형 콘텐츠 허브",
  "siteBasePath": "/edubeige-lab/",
  "featuredEventSlug": "2026-03-ai-teacher-workshop",
  "contactEmail": "",
  "footerLinks": [],
  "theme": {
    "accent": "blue",
    "rounded": "xl"
  }
}
```

### event
```json
{
  "id": "event-2026-03-15",
  "slug": "2026-03-ai-teacher-workshop",
  "title": "오늘의 연수: 생성형 AI로 열어가는 미래 교육",
  "date": "2026-03-15",
  "venue": "본교 2층 멀티미디어실",
  "speaker": "AI 교육 지원단",
  "heroSummary": "실습 중심의 AI 활용 연수",
  "quickLinks": [
    {
      "label": "오늘의 Padlet",
      "url": "https://example.com/padlet"
    }
  ],
  "notices": [
    "개인 계정 로그인 여부를 미리 확인하세요."
  ],
  "toolLinks": [
    {
      "label": "ChatGPT",
      "url": "https://chatgpt.com/"
    }
  ],
  "scheduleItems": ["module-1", "module-2", "module-3"],
  "resourceIds": ["slides-day1"],
  "galleryIds": ["gallery-lessonplan-climate"]
}
```

### module
```json
{
  "id": "module-1",
  "slug": "gemini-basic-text-generation",
  "eventId": "event-2026-03-15",
  "order": 1,
  "title": "Gemini 기초와 텍스트 생성",
  "summary": "생성형 AI 원리 이해와 기본 인터페이스 익히기",
  "learningGoals": [
    "생성형 AI 기본 원리를 설명할 수 있다.",
    "기본 프롬프트 입력 흐름을 실습할 수 있다."
  ],
  "startTime": "09:00",
  "endTime": "09:50",
  "tags": ["실습 위주", "계정 필수"],
  "checklist": [
    "구글 계정 로그인 확인",
    "브라우저 탭 2개 이하로 정리"
  ],
  "steps": [
    {
      "title": "기본 프롬프트 입력",
      "body": "간단한 역할 지정과 요청 문장을 입력한다."
    }
  ],
  "promptIds": ["prompt-feedback-science"],
  "resourceIds": ["slides-day1"],
  "shareLinks": [
    {
      "label": "결과 공유 Padlet",
      "url": "https://example.com/padlet"
    }
  ]
}
```

### prompt
```json
{
  "id": "prompt-feedback-science",
  "title": "[과학] 실험 보고서 피드백 프롬프트",
  "tool": "ChatGPT",
  "subjects": ["과학"],
  "purposes": ["학생 피드백"],
  "trainingTypes": ["AI 활용"],
  "difficulty": "basic",
  "summary": "학생 보고서를 분석해 구체적 피드백 생성",
  "template": "당신은 초등학교 [학년] 교사입니다. 다음 실험 주제와 학생 답안을 바탕으로 긍정 피드백 1개와 개선점 2개를 작성하세요.",
  "variables": ["학년", "실험 주제", "학생 답안"],
  "notes": "학생 개인정보를 넣지 않도록 안내한다.",
  "relatedIds": []
}
```

### resource
```json
{
  "id": "slides-day1",
  "title": "오늘의 강의 슬라이드",
  "type": "pdf",
  "scope": "event",
  "eventId": "event-2026-03-15",
  "description": "연수 발표 자료",
  "url": "/edubeige-lab/files/slides-day1.pdf",
  "downloadLabel": "다운로드"
}
```

### galleryItem
```json
{
  "id": "gallery-lessonplan-climate",
  "title": "기후 위기 토론 교수안",
  "tool": "ChatGPT",
  "subjects": ["사회"],
  "thumbnail": "/edubeige-lab/images/gallery/climate.svg",
  "summary": "2차시 토론 수업 설계 예시",
  "detail": "상세 설명 또는 연결 링크"
}
```

## 7. 기술 설계

### 프레임워크
- Astro를 사용한다.
- 이유
  - 콘텐츠 중심 정적 사이트에 적합하다.
  - GitHub Pages 배포가 쉽다.
  - 라우팅과 정적 생성이 단순하다.
  - Content Collections와 함께 쓰기 좋다.

### UI 구성
- 기본은 Astro 컴포넌트 중심으로 구현한다.
- `/admin`처럼 상호작용이 많은 화면만 React island 또는 순수 TypeScript를 사용한다.
- 스타일은 Tailwind 또는 CSS 변수 기반 커스텀 스타일 중 하나를 택하되, 문서 기준으로는 CSS 변수 기반 토큰 설계를 우선 권장한다.

### 검색 전략
- MVP
  - 메타데이터 필터
  - Fuse.js 기반 클라이언트 검색
- Phase 2
  - Pagefind 기반 전문 검색

### 상태 저장
- clipboard API로 프롬프트 복사 기능 제공
- localStorage로 `/admin` draft 저장

### 학교망 대응 원칙
- 외부 서비스 embed는 기본적으로 사용하지 않는다.
- Padlet, Google Drive, Canva 등은 직접 링크를 우선 제공한다.
- 자료는 가능하면 저장소 내 정적 파일로 제공한다.
- 외부 링크가 필요한 경우 대체 안내 문구를 함께 둔다.
- 폰트, 아이콘, 스크립트도 가능하면 로컬 번들 또는 최소 외부 의존성으로 구성한다.

## 8. 저장소 구조 제안

```txt
/
  public/
    files/
    images/
    favicon/
  src/
    components/
    layouts/
    pages/
      index.astro
      events/
        index.astro
        [slug].astro
      modules/
        [slug].astro
      prompts/
        index.astro
      resources/
        index.astro
      gallery/
        index.astro
      faq/
        index.astro
      admin/
        index.astro
    content/
      config/
        site.json
      events/
        *.json
      modules/
        *.json
      prompts/
        *.md
      resources/
        *.json
      gallery/
        *.json
    lib/
      schema.ts
      content.ts
      clipboard.ts
      search.ts
      export.ts
  scripts/
    build-search.mjs
  .github/
    workflows/
      deploy.yml
```

## 9. GitHub Pages 배포 가이드

### 저장소 기준
- 저장소 이름은 `edubeige-lab` 으로 한다.
- GitHub Pages는 프로젝트 사이트 방식으로 배포한다.
- 배포 URL은 `https://edubeige.github.io/edubeige-lab/` 이다.

### base path 규칙
- 사이트 전체는 `/edubeige-lab/` base path를 기준으로 동작해야 한다.
- 절대 경로 자산은 반드시 base path를 포함해야 한다.
  - 예: `/edubeige-lab/files/slides-day1.pdf`
  - 예: `/edubeige-lab/images/gallery/climate.jpg`
- 내부 링크 생성도 base path를 고려해야 한다.
- 구현 시 Astro 설정과 `siteConfig.siteBasePath` 값이 일치해야 한다.

### GitHub Actions 배포 흐름
1. 기본 브랜치에 콘텐츠 또는 코드 변경을 반영한다.
2. GitHub Actions에서 정적 사이트를 빌드한다.
3. 산출물을 GitHub Pages에 배포한다.
4. 배포 후 프로젝트 사이트 URL에서 경로와 자산을 확인한다.

### Pages 설정 체크리스트
- GitHub 저장소의 Pages 소스를 GitHub Actions로 설정
- Astro의 `site`와 `base`를 프로젝트 사이트에 맞게 설정
- 404, 새로고침, 정적 자산 경로가 base path에서 정상 동작하는지 확인

## 10. 운영 가이드

### MVP 운영 방식
MVP의 관리자 기능은 `브라우저 로컬 수정 + export/import` 방식으로 확정한다.

### 권장 운영 흐름
1. 운영자가 `/admin`에 들어가 회차, 모듈, 프롬프트, 자료를 수정한다.
2. 수정 내용은 localStorage draft로 유지한다.
3. 확인 후 JSON 또는 Markdown 파일로 export 한다.
4. export한 파일을 저장소의 `src/content` 구조에 맞게 반영한다.
5. GitHub에 커밋하면 GitHub Actions가 Pages를 재배포한다.

### import / export 원칙
- export는 사람이 읽을 수 있는 구조여야 한다.
- import는 기존 콘텐츠 스키마와 일치해야 한다.
- 스키마 검증 실패 시 어떤 필드가 잘못되었는지 안내해야 한다.

### Phase 2 확장 옵션
- 운영자가 GitHub Personal Access Token을 일시 입력해 직접 저장하는 기능은 Phase 2에서 검토한다.
- 토큰은 코드나 저장소에 저장하지 않는다.
- 브라우저 세션 범위에서만 사용할 수 있게 제한한다.

### 비권장 운영 방식
- 참가자 계정 시스템 구축
- 별도 DB 또는 서버 도입
- GitHub Pages와 분리된 동적 CMS 의존

## 11. 비기능 요구사항

### 접근성
- 키보드만으로 조작 가능해야 한다.
- 명확한 포커스 표시가 있어야 한다.
- accordion 등 인터랙션 요소는 적절한 ARIA 속성을 사용한다.
- 모바일과 데스크톱에서 모두 읽기 쉬워야 한다.

### 성능
- 초기 JS를 최소화한다.
- 이미지 lazy loading을 사용한다.
- 외부 스크립트와 외부 폰트 사용을 최소화한다.
- 학교망이나 저속 환경에서도 핵심 정보가 빠르게 보여야 한다.

### 보안과 콘텐츠 원칙
- 비밀값은 저장소에 포함하지 않는다.
- 관리자 URL을 숨기는 것 자체를 보안으로 간주하지 않는다.
- 학생 이름, 개인정보, 민감한 내부 문서는 넣지 않는다.

## 12. 수용 기준

### 참가자 기준
- 첫 화면에서 10초 안에 오늘 연수 제목과 주요 CTA를 이해할 수 있어야 한다.
- 30초 안에 실습 도구 링크, 프롬프트 허브, 자료실로 이동할 수 있어야 한다.
- 프롬프트 복사 버튼이 즉시 동작해야 한다.
- 자료실에서 원하는 파일을 2회 클릭 이내로 다운로드할 수 있어야 한다.
- 모바일과 데스크톱 모두에서 레이아웃이 깨지지 않아야 한다.

### 운영자 기준
- 기존 회차를 바탕으로 새 회차 구성을 빠르게 복제할 수 있어야 한다.
- `/admin` 한 화면에서 주요 콘텐츠를 수정할 수 있어야 한다.
- export한 파일을 저장소에 반영해 재배포하는 흐름이 문서만으로 재현 가능해야 한다.
- GitHub Pages base path 환경에서도 링크와 자산 경로가 깨지지 않아야 한다.
- 학교망에서 막힐 수 있는 외부 서비스에는 대체 링크 또는 안내 문구가 있어야 한다.

## 13. 비범위 항목

다음은 MVP 범위에 포함하지 않는다.

- 로그인
- 사용자 권한 체계
- 서버 사이드 API
- 데이터베이스
- 동적 CMS
- 원클릭 GitHub 저장
- 관리자 세부 하위 라우트 분리

## 14. 구현 메모

### 디자인 방향
- 밝고 여백이 많은 카드 중심 UI
- 흰색 surface와 옅은 회색 배경
- 포인트 컬러는 선명한 블루 계열 1개
- 그림자보다 테두리와 여백으로 계층 표현
- 모바일에서도 카드 구조를 유지

### 디자인 토큰 초안
- radius: 20~28px
- section spacing: 64~96px
- card padding: 24~32px
- border: very light gray
- button: primary / secondary / ghost

### 구현 기본 원칙
- 콘텐츠 구조와 스키마를 먼저 고정한다.
- 페이지보다 콘텐츠 재사용을 우선 설계한다.
- 외부 의존보다 정적 파일과 명시적 링크를 우선한다.
- 향후 Phase 2 확장을 막지 않되, MVP는 단순하게 유지한다.

## 15. 전제와 기본값

- 이 문서는 한국어 기준이다.
- 현재 저장소는 구현 전 단계이며, 이 문서는 기준 문서 역할을 한다.
- GitHub Pages는 프로젝트 사이트 방식으로 운영한다.
- 기준 저장소명은 `edubeige-lab` 이다.
- MVP는 정적 사이트 + 파일 기반 콘텐츠 운영을 전제로 한다.
