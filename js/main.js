(function () {
  'use strict';

  var D = window.LANDING_DATA;
  var reduce = !!(window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  var $ = function (id) { return document.getElementById(id); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var later = function (fn, ms) { if (reduce || !ms) fn(); else setTimeout(fn, ms); };
  var CHECK = '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#1F7A4D" stroke-width="2.4"><path d="M4 12l5 5L20 6"/></svg>';
  var CROSS = '<svg aria-hidden="true" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#5A6472" stroke-width="2"><path d="M6 6l12 12M18 6L6 18"/></svg>';

  /* ---------- Toast ---------- */
  var toastTimer;
  function showToast(msg) {
    var wrap = $('toast');
    wrap.innerHTML = '<div class="toast fade">' + esc(msg) + '</div>';
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { wrap.innerHTML = ''; }, 3500);
  }

  /* ---------- Header: shrink on scroll + mobile menu ---------- */
  var header = $('header');
  var onScroll = function () { header.classList.toggle('is-scrolled', (window.scrollY || 0) > 80); };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  var menuBtn = $('menu-btn');
  var menu = $('menu-mob');
  function setMenu(open) {
    menu.hidden = !open;
    menuBtn.setAttribute('aria-expanded', open ? 'true' : 'false');
    menuBtn.setAttribute('aria-label', open ? '전체 메뉴 닫기' : '전체 메뉴 열기');
  }
  menuBtn.addEventListener('click', function () { setMenu(menu.hidden); });
  menu.addEventListener('click', function (e) { if (e.target.closest('a')) setMenu(false); });

  /* ---------- S1 Hero: scenes + worry check-out ticket ---------- */
  var heroImg = $('hero-img');
  var heroBg = $('hero-bg');
  heroImg.addEventListener('error', function () { heroImg.classList.add('is-missing'); });
  heroImg.addEventListener('load', function () { heroImg.classList.remove('is-missing'); });

  var bars = $('scene-bars');
  bars.innerHTML = D.scenes.map(function () { return '<span></span>'; }).join('');
  var scene = 0;
  var paused = reduce;
  function renderScene() {
    var s = D.scenes[scene];
    heroImg.src = s.src;
    heroBg.src = s.src;
    heroImg.alt = s.alt;
    heroImg.style.objectPosition = s.pos;
    $('hero-caption').textContent = s.caption;
    Array.prototype.forEach.call(bars.children, function (b, i) { b.classList.toggle('is-on', i === scene); });
  }
  renderScene();

  var pauseBtn = $('pause-btn');
  function renderPause() {
    pauseBtn.classList.toggle('is-paused', paused);
    pauseBtn.setAttribute('aria-label', paused ? '배경 영상 재생' : '배경 영상 일시정지');
  }
  renderPause();
  pauseBtn.addEventListener('click', function () { paused = !paused; renderPause(); });
  if (!reduce) {
    setInterval(function () {
      if (paused) return;
      scene = (scene + 1) % D.scenes.length;
      renderScene();
    }, 5000);
  }

  var worriesEl = $('worries');
  worriesEl.innerHTML = D.worries.map(function (t) {
    return '<span class="strike">' + esc(t) + '<span class="sr-only"></span></span>';
  }).join('');
  function strike(i) {
    var w = worriesEl.children[i];
    w.classList.add('on');
    w.querySelector('.sr-only').textContent = ' (해결됨)';
  }
  if (reduce) {
    D.worries.forEach(function (_, i) { strike(i); });
    $('worry-ok').classList.add('is-on');
  } else {
    D.worries.forEach(function (_, i) { setTimeout(function () { strike(i); }, 800 + i * 900); });
    setTimeout(function () { $('worry-ok').classList.add('is-on'); }, 800 + D.worries.length * 900);
  }

  /* ---------- S2 Compare slider ---------- */
  $('cmp-now').innerHTML = D.compare.map(function (c) {
    return '<div class="cmp-row"><span class="cmp-row__label">' + esc(c.label) + '</span>' + CHECK +
      '<span class="cmp-row__text">' + esc(c.now) + '</span></div>';
  }).join('');
  $('cmp-old').innerHTML = D.compare.map(function (c) {
    return '<div class="cmp-row"><span class="cmp-row__label">' + esc(c.label) + '</span>' + CROSS +
      '<span class="cmp-row__text">' + esc(c.old) + '</span></div>';
  }).join('');

  var cmp = $('cmp');
  var range = $('cmp-range');
  var showOld = $('show-old');
  var showNew = $('show-new');
  function setPos(p) {
    p = Math.max(0, Math.min(100, p));
    cmp.style.setProperty('--pos', p + '%');
    range.value = p;
    range.setAttribute('aria-valuetext',
      p >= 100 ? '예전 패키지 전체' : p <= 0 ? '지금 다섯팩 전체' : '예전 ' + p + '%, 지금 ' + (100 - p) + '%');
    showOld.setAttribute('aria-pressed', p === 100 ? 'true' : 'false');
    showNew.setAttribute('aria-pressed', p === 0 ? 'true' : 'false');
  }
  setPos(50);
  range.addEventListener('input', function () { setPos(Number(range.value)); });
  showOld.addEventListener('click', function () { setPos(100); });
  showNew.addEventListener('click', function () { setPos(0); });

  // 손잡이/화면 드래그 (키보드·버튼은 range와 토글이 대체 수단)
  var dragging = false;
  function posFromEvent(e) {
    var r = cmp.getBoundingClientRect();
    return Math.round(((e.clientX - r.left) / r.width) * 10) * 10;
  }
  cmp.addEventListener('pointerdown', function (e) {
    dragging = true;
    cmp.setPointerCapture(e.pointerId);
    setPos(posFromEvent(e));
  });
  cmp.addEventListener('pointermove', function (e) { if (dragging) setPos(posFromEvent(e)); });
  cmp.addEventListener('pointerup', function () { dragging = false; });
  cmp.addEventListener('pointercancel', function () { dragging = false; });
  cmp.style.touchAction = 'pan-y';

  /* ---------- S3 Proof count-up ---------- */
  var nums = document.querySelectorAll('[data-count]');
  function countUp() {
    var start = performance.now();
    var step = function (t) {
      var p = Math.min(1, (t - start) / 1200);
      var k = 1 - Math.pow(1 - p, 3);
      nums.forEach(function (n) { n.textContent = Math.round(Number(n.dataset.count) * k); });
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }
  if (!reduce && 'IntersectionObserver' in window) {
    nums.forEach(function (n) { n.textContent = '0'; });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { io.disconnect(); countUp(); } });
    }, { threshold: 0.35 });
    io.observe($('proof-grid'));
  }

  /* ---------- S4 Travel styles (tabs) ---------- */
  var tabsEl = $('style-tabs');
  var CHECK_W = '<svg aria-hidden="true" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#FFFFFF" stroke-width="2.6"><path d="M4 12l5 5L20 6"/></svg>';
  tabsEl.innerHTML = D.styles.map(function (s, i) {
    return '<button role="tab" id="style-tab-' + i + '" aria-controls="style-panel" aria-selected="false" tabindex="-1" class="style-card card-h" data-i="' + i + '">' +
      '<div class="ph ' + s.img + ' style-card__img"><span class="style-card__check">' + CHECK_W + '</span></div>' +
      '<span class="style-card__name">' + esc(s.name) + '</span>' +
      '<span class="style-card__desc">' + esc(s.desc) + '</span></button>';
  }).join('');

  var curStyle = -1;
  function pickStyle(i, focus) {
    if (i === curStyle) return;
    curStyle = i;
    var s = D.styles[i];
    Array.prototype.forEach.call(tabsEl.children, function (b, j) {
      b.setAttribute('aria-selected', j === i ? 'true' : 'false');
      b.tabIndex = j === i ? 0 : -1;
    });
    if (focus) tabsEl.children[i].focus();
    var panel = $('style-panel');
    panel.setAttribute('aria-labelledby', 'style-tab-' + i);
    panel.setAttribute('aria-label', s.name + ' 대표 상품');
    $('style-title').textContent = s.name + ' 대표 상품';
    $('style-all').textContent = s.name + ' 전체 보기';
    $('products').innerHTML = s.products.map(function (p) {
      return '<a href="#" class="product card-h fade">' +
        '<div class="ph ' + p.img + ' product__img"><span class="caption-chip">' + esc(p.caption) + '</span></div>' +
        '<div class="product__body">' +
        '<span class="product__name">' + esc(p.name) + '</span>' +
        '<span class="product__meta">' + esc(p.date) + ' 출발 · ★ ' + esc(p.rating) + '</span>' +
        '<span class="product__price">' + esc(p.price) + '원~</span>' +
        '</div></a>';
    }).join('');
  }
  pickStyle(0);
  tabsEl.addEventListener('click', function (e) {
    var b = e.target.closest('[role="tab"]');
    if (b) pickStyle(Number(b.dataset.i));
  });
  tabsEl.addEventListener('keydown', function (e) {
    var n = D.styles.length;
    var map = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 };
    if (e.key in map) { e.preventDefault(); pickStyle((curStyle + map[e.key] + n) % n, true); }
    else if (e.key === 'Home') { e.preventDefault(); pickStyle(0, true); }
    else if (e.key === 'End') { e.preventDefault(); pickStyle(n - 1, true); }
  });

  /* ---------- S5 Quiz ---------- */
  var answers = [];
  var locked = false;
  var quizBox = $('quiz-box');
  var total = D.questions.length;

  function resultType() {
    var tally = D.types.map(function () { return 0; });
    answers.forEach(function (a) { tally[a]++; });
    var best = 0;
    tally.forEach(function (v, i) { if (v > tally[best]) best = i; });
    return D.types[best];
  }

  function renderQuiz(focusTarget) {
    var done = answers.length >= total;
    var n = Math.min(answers.length, total);
    $('q-fill').style.width = (n / total * 100) + '%';
    $('q-bar').setAttribute('aria-valuenow', n);
    $('q-count').textContent = n + ' / ' + total;

    if (!done) {
      var q = D.questions[answers.length];
      quizBox.innerHTML =
        '<fieldset class="quiz-q fade"><legend>Q' + (answers.length + 1) + '. ' + esc(q.q) + '</legend>' +
        q.opts.map(function (t, i) {
          return '<label class="quiz-opt"><input type="radio" name="quiz-q" value="' + i + '">' + esc(t) + '</label>';
        }).join('') +
        (answers.length > 0 ? '<button type="button" class="btn-text quiz-back" data-act="back">이전 문항</button>' : '') +
        '</fieldset>';
      if (focusTarget === 'q') { var first = quizBox.querySelector('input'); if (first) first.focus(); }
    } else {
      var r = resultType();
      quizBox.innerHTML =
        '<div class="result fade">' +
        '<div class="result__card">' +
        '<div class="ph ' + r.img + ' result__img" role="img" aria-label="' + esc(r.name) + ' 대표 장면"></div>' +
        '<div class="result__body">' +
        '<div class="mono-row"><span>MY TRAVEL TYPE</span><span>DASEOTOUR</span></div>' +
        '<div class="dash"></div>' +
        '<h3 tabindex="-1">' + esc(r.name) + '</h3>' +
        '<p class="body">' + esc(r.desc) + '</p>' +
        '<span class="result__style">추천 여행 방식 · ' + esc(r.style) + '</span>' +
        '</div></div>' +
        '<div class="result__btns">' +
        '<button type="button" data-act="save">이미지 저장</button>' +
        '<button type="button" data-act="kakao">카카오톡 공유</button>' +
        '</div>' +
        '<div class="result__foot">' +
        '<a href="#styles" data-act="go-style">' + esc(r.style) + ' 상품 보기</a>' +
        '<button type="button" class="btn-text" data-act="reset">다시 하기</button>' +
        '</div></div>';
      quizBox.querySelector('h3').focus();
    }
  }
  renderQuiz();

  quizBox.addEventListener('change', function (e) {
    if (e.target.name !== 'quiz-q' || locked) return;
    locked = true;
    var i = Number(e.target.value);
    e.target.closest('.quiz-opt').classList.add('is-on');
    later(function () {
      answers.push(i);
      locked = false;
      renderQuiz('q');
    }, 300);
  });
  quizBox.addEventListener('click', function (e) {
    var t = e.target.closest('[data-act]');
    if (!t) return;
    var act = t.dataset.act;
    if (act === 'back') { answers.pop(); renderQuiz('q'); }
    else if (act === 'reset') { answers = []; renderQuiz('q'); }
    else if (act === 'save') showToast('시안: 결과 카드를 1080×1350 이미지로 저장하는 자리예요.');
    else if (act === 'kakao') showToast('시안: 카카오톡 공유 창이 열리는 자리예요.');
    else if (act === 'go-style') pickStyle(resultType().styleIdx);
  });

  /* ---------- S6 H-AI ---------- */
  var aiBody = $('ai-body');
  var askInput = $('hai-input');
  var day = 0;
  var askSeq = 0;

  function renderAiIdle() {
    aiBody.innerHTML = '<div class="ai-empty">추천 질문을 누르거나 고민을 적어 보내면<br>H-AI가 만든 일정이 여기에 나와요.</div>';
  }
  function renderAiDone() {
    var plan = D.aiPlan;
    aiBody.innerHTML =
      '<div class="ai-done fade">' +
      '<strong>' + esc(plan.title) + '</strong>' +
      '<div class="day-tabs" role="tablist" aria-label="일자">' +
      plan.days.map(function (_, i) {
        return '<button type="button" role="tab" class="day-tab" data-day="' + i + '" aria-selected="' + (i === day) + '">DAY ' + (i + 1) + '</button>';
      }).join('') +
      '</div>' +
      '<div class="day-items" role="tabpanel">' +
      plan.days[day].map(function (it) {
        return '<div class="day-item fade"><span class="day-item__time">' + esc(it.time) + ' · ' + esc(it.place) + '</span>' +
          '<span class="day-item__what">' + esc(it.what) + '</span></div>';
      }).join('') +
      '</div>' +
      '<span class="note">* AI 생성 예시이며 실제 상품·일정과 다를 수 있어요.</span>' +
      '<button type="button" class="btn-outline btn-outline--sm" data-act="app">앱에서 일정 완성하기</button>' +
      '</div>';
  }
  function ask(text) {
    if (!text) return;
    askInput.value = text;
    day = 0;
    var seq = ++askSeq;
    aiBody.innerHTML = '<div class="ai-loading"><div class="dots" aria-hidden="true"><span></span><span></span><span></span></div>' +
      '<span>"' + esc(text) + '" 일정을 만드는 중이에요</span></div>';
    later(function () { if (seq === askSeq) renderAiDone(); }, 1100);
  }
  renderAiIdle();

  $('chips').innerHTML = D.chips.map(function (t) {
    return '<button type="button" class="chip">' + esc(t) + '</button>';
  }).join('');
  $('chips').addEventListener('click', function (e) {
    var c = e.target.closest('.chip');
    if (c) ask(c.textContent);
  });
  $('ask-form').addEventListener('submit', function (e) {
    e.preventDefault();
    ask(askInput.value.trim());
  });
  aiBody.addEventListener('click', function (e) {
    var tab = e.target.closest('[data-day]');
    if (tab) {
      day = Number(tab.dataset.day);
      renderAiDone();
      aiBody.querySelector('[data-day="' + day + '"]').focus();
      return;
    }
    if (e.target.closest('[data-act="app"]')) showToast('시안: 앱이 있으면 일정이 앱으로, 없으면 스토어로 이동해요.');
  });

  /* ---------- S7 Reviews ---------- */
  var revList = $('reviews-list');
  revList.innerHTML = D.reviews.map(function (r) {
    return '<article class="review">' +
      '<div class="ph ' + r.img + ' review__img" role="img" aria-label="' + esc(r.alt) + '"><span class="caption-chip">' + esc(r.caption) + '</span></div>' +
      '<div class="review__body">' +
      '<span class="review__head">' + esc(r.head) + '</span>' +
      '<p class="review__text">' + esc(r.text) + '</p>' +
      '<span class="note">' + esc(r.by) + '</span>' +
      '</div></article>';
  }).join('');
  var scrollRev = function (dir) { revList.scrollBy({ left: dir * 300, behavior: reduce ? 'auto' : 'smooth' }); };
  $('rev-prev').addEventListener('click', function () { scrollRev(-1); });
  $('rev-next').addEventListener('click', function () { scrollRev(1); });

  /* ---------- S8 Coupon + QR ---------- */
  var couponDone = false;
  $('coupon-btn').addEventListener('click', function () {
    if (couponDone) { showToast('시안: 내 쿠폰함으로 이동하는 자리예요.'); return; }
    couponDone = true;
    $('coupon-stamp').hidden = false;
    this.textContent = '받은 쿠폰 보기';
    showToast('50,000원 쿠폰이 발급됐어요. (시안: 실제로는 로그인 후 발급)');
  });

  var qrHtml = '';
  for (var i = 0; i < 49; i++) qrHtml += '<span' + (D.qrPattern[i] === '1' ? ' class="on"' : '') + '></span>';
  $('qr').innerHTML = qrHtml;
})();
