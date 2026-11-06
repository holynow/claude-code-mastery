# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 언어 및 커뮤니케이션 규칙
- **기본 응답 언어**: 한국어
- **코드 주석**: 한국어로 작성
- **커밋 메시지**: 한국어로 작성
- **문서화**: 한국어로 작성
- **변수명/함수명**: 영어 (코드 표준 준수)

## 프로젝트 현황
개발자 웹 이력서(싱글 페이지 정적 사이트) 프로젝트입니다. `index.html`, `css/style.css`, `js/main.js`, `assets/images/`(자리표시 SVG)로 9개 섹션 전체가 구현되어 있습니다. 다크 기본 + 오렌지(#FF5A1F) 포인트 디자인이며, 색은 `css/style.css`의 CSS 변수 토큰을 Tailwind config에서 참조합니다. 계획 문서 `Roadmap.md`는 현재 저장소에 없습니다.

## 기술 스택 및 제약
- HTML5(시맨틱 태그), CSS3, Vanilla JavaScript(ES6+), Tailwind CSS(CDN)
- 빌드 도구, 패키지 매니저, 테스트/린트 설정이 없습니다. `index.html`을 브라우저로 직접 열어 확인합니다. 필요하다면 `python3 -m http.server`로 로컬 서버를 띄울 수 있습니다.
- 프레임워크(React 등)는 도입하지 않습니다. Roadmap에 있는 React는 이력서에 적는 기술 스택 항목일 뿐입니다.

## 계획된 구조 (Roadmap.md 기준)
- `index.html`: 전체 섹션(Header, Hero, About, Skills, Experience, Projects, Education, Contact, Footer)을 담는 단일 페이지
- `css/style.css`: Tailwind 유틸리티로 표현하기 어려운 커스텀 스타일만 둡니다.
- `js/main.js`: 다크모드 토글(localStorage 저장), 모바일 메뉴, 스크롤 시 네비 하이라이트, IntersectionObserver 애니메이션
- `assets/images/`: 프로필 및 프로젝트 이미지

## 개발 시 유의사항
- 모바일 우선(Mobile First)으로 작성하고 320px ~ 1920px에서 레이아웃이 깨지지 않아야 합니다.
- 다크/라이트 모드 전환 후 설정이 유지되어야 합니다.
- 이력서 내용은 현재 가상의 샘플(홍길동)이므로 실제 정보로 교체될 수 있습니다. 내용은 HTML에 하드코딩하되 교체하기 쉽도록 섹션별로 구분합니다.
- 완료 기준: Lighthouse 성능/접근성/SEO 90점 이상.
