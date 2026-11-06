/* =========================================================
   홍길동 웹 이력서 - 인터랙션
   1. 다크/라이트 테마 토글 (localStorage 저장)
   2. 모바일 메뉴
   3. 스크롤 위치에 따른 내비게이션 하이라이트
   4. 스크롤 등장 애니메이션 (IntersectionObserver)
   5. 헤더 스크롤 상태
   ========================================================= */
(() => {
  'use strict';

  const root = document.documentElement;
  const THEME_KEY = 'theme';
  const THEME_COLORS = { dark: '#0B0B0C', light: '#F6F4F1' };
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  const hasIO = 'IntersectionObserver' in window;

  /* ---------- 1. 테마 ---------- */
  const themeToggle = document.getElementById('theme-toggle');
  const themeMeta = document.querySelector('meta[name="theme-color"]');

  // 현재 테마를 문서와 토글 버튼 상태에 반영합니다.
  function applyTheme(theme) {
    const isDark = theme === 'dark';
    root.setAttribute('data-theme', theme);
    if (themeToggle) {
      themeToggle.setAttribute('aria-pressed', String(isDark));
      themeToggle.setAttribute('title', isDark ? '라이트 모드로 전환' : '다크 모드로 전환');
    }
    if (themeMeta) themeMeta.setAttribute('content', THEME_COLORS[theme]);
  }

  // 저장 공간을 쓸 수 없는 환경(시크릿 모드 등)에서도 오류 없이 동작하게 합니다.
  function saveTheme(theme) {
    try {
      localStorage.setItem(THEME_KEY, theme);
    } catch (e) {
      /* 저장 실패는 무시합니다. */
    }
  }

  // <head>의 초기화 스크립트가 정한 값을 그대로 이어받습니다.
  applyTheme(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

  themeToggle?.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    applyTheme(next);
    saveTheme(next);
  });

  /* ---------- 2. 모바일 메뉴 ---------- */
  const menuToggle = document.getElementById('menu-toggle');
  const mobileMenu = document.getElementById('mobile-menu');
  const pageRegions = [document.getElementById('main'), document.querySelector('.site-footer')];
  const desktopQuery = window.matchMedia('(min-width: 1024px)');

  function isMenuOpen() {
    return menuToggle?.getAttribute('aria-expanded') === 'true';
  }

  function setMenu(open, { restoreFocus = true } = {}) {
    if (!menuToggle || !mobileMenu) return;

    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
    mobileMenu.classList.toggle('is-open', open);
    root.classList.toggle('menu-open', open);

    // 메뉴가 열려 있는 동안 뒤쪽 콘텐츠로 포커스가 이동하지 않게 합니다.
    pageRegions.forEach((region) => {
      if (region) region.inert = open;
    });

    if (open) {
      mobileMenu.querySelector('a')?.focus();
    } else if (restoreFocus) {
      menuToggle.focus();
    }
  }

  menuToggle?.addEventListener('click', () => setMenu(!isMenuOpen()));

  // 메뉴 링크를 누르면 닫고 해당 섹션으로 이동합니다.
  mobileMenu?.addEventListener('click', (event) => {
    if (event.target.closest('a')) setMenu(false, { restoreFocus: false });
  });

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && isMenuOpen()) setMenu(false);
  });

  // 데스크톱 너비로 바뀌면 메뉴를 닫습니다.
  desktopQuery.addEventListener('change', (event) => {
    if (event.matches && isMenuOpen()) setMenu(false, { restoreFocus: false });
  });

  /* ---------- 3. 스크롤 스파이 ---------- */
  const navLinks = Array.from(document.querySelectorAll('[data-nav-link]'));
  const sectionIds = ['home', ...new Set(navLinks.map((link) => link.getAttribute('href').slice(1)))];
  const sections = sectionIds.map((id) => document.getElementById(id)).filter(Boolean);

  function setActiveLink(id) {
    navLinks.forEach((link) => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', isActive);
      if (isActive) {
        link.setAttribute('aria-current', 'true');
      } else {
        link.removeAttribute('aria-current');
      }
    });
  }

  if (hasIO && sections.length) {
    // 화면 세로 중앙 띠에 걸친 섹션을 현재 섹션으로 봅니다.
    const spy = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveLink(entry.target.id);
        });
      },
      { rootMargin: '-45% 0px -50% 0px' }
    );
    sections.forEach((section) => spy.observe(section));
  }

  /* ---------- 4. 스크롤 등장 애니메이션 ---------- */
  const revealTargets = document.querySelectorAll('.reveal');

  if (reducedMotion.matches || !hasIO) {
    revealTargets.forEach((el) => el.classList.add('is-visible'));
  } else {
    const revealer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target); // 한 번만 실행
        });
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 }
    );
    revealTargets.forEach((el) => revealer.observe(el));
  }

  /* ---------- 5. 헤더 스크롤 상태 ---------- */
  const header = document.getElementById('site-header');

  function updateHeader() {
    header?.setAttribute('data-scrolled', String(window.scrollY > 8));
  }

  updateHeader();
  window.addEventListener('scroll', updateHeader, { passive: true });

  /* ---------- 기타: 저작권 연도 ---------- */
  const year = String(new Date().getFullYear());
  document.querySelectorAll('[data-year]').forEach((el) => {
    el.textContent = year;
  });
})();
