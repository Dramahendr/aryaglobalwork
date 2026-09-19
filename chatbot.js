/* Website chat widget, shown as Dr. Ashish Mahendra (clearly labelled as his AI assistant).
   Talks to /api/chat (netlify/functions/chat.mjs). Self-contained: injects its own styles and markup.
   Every answer is followed by a WhatsApp button so the team can take the conversation further. */
(function () {
  'use strict';
  if (window.__aryaChat) return;
  window.__aryaChat = true;

  var ENDPOINT = '/api/chat';
  var WHATSAPP = 'https://wa.me/919956052200';
  var AVATAR = 'images/chatbot-avatar.webp';
  var STORE_KEY = 'arya-chat-v1';
  var MAX_LEN = 600;
  var HISTORY_SENT = 10;
  var reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var WELCOME = "Namaste! This is Dr. Ashish Mahendra's AI assistant. Ask me about jobs abroad: destinations, documents, the process, fees or our licence. You can write in English or Hindi.";
  var SUGGESTIONS = [
    'Which countries do you recruit for?',
    'What documents do I need?',
    'How does the process work?',
    'Is Arya Global Workforce licensed?'
  ];

  var css = [
    '.agc-launcher{position:fixed;right:20px;bottom:calc(88px + env(safe-area-inset-bottom));z-index:45;width:62px;height:62px;border-radius:50%;border:3px solid #fff;padding:0;background:#4B0AF3;cursor:pointer;box-shadow:0 14px 34px rgba(75,10,243,.35),0 4px 12px rgba(20,12,51,.2);transition:transform .25s cubic-bezier(.22,.61,.36,1),box-shadow .25s ease}',
    '@media (min-width:1024px){.agc-launcher{right:28px;bottom:28px;width:66px;height:66px}}',
    '.agc-launcher:hover{transform:translateY(-3px) scale(1.04)}',
    '.agc-launcher:focus-visible{outline:none;box-shadow:0 0 0 3px #F8F7FF,0 0 0 6px #4B0AF3}',
    '.agc-launcher img{width:100%;height:100%;border-radius:50%;object-fit:cover;display:block}',
    '.agc-launcher .agc-badge{position:absolute;right:-4px;bottom:-4px;width:26px;height:26px;border-radius:50%;background:#F6CE7D;color:#140C33;display:grid;place-items:center;font-size:14px;border:2px solid #fff}',
    '.agc-launcher::before{content:"";position:absolute;inset:-3px;border-radius:50%;border:2px solid #A468F2;opacity:0;animation:agc-ping 2.4s cubic-bezier(.22,.61,.36,1) 1.5s 3}',
    '@keyframes agc-ping{0%{transform:scale(1);opacity:.8}100%{transform:scale(1.55);opacity:0}}',
    '.agc-launcher.agc-enter{animation:agc-pop .7s cubic-bezier(.34,1.56,.64,1) .8s both}',
    '@keyframes agc-pop{from{transform:scale(0) rotate(-20deg);opacity:0}to{transform:none;opacity:1}}',
    '.agc-nudge{position:fixed;right:92px;bottom:calc(98px + env(safe-area-inset-bottom));z-index:45;max-width:220px;background:#fff;color:#140C33;border:1px solid rgba(20,12,51,.1);border-radius:16px 16px 4px 16px;padding:10px 34px 10px 14px;font:600 13px/1.4 "Plus Jakarta Sans",sans-serif;box-shadow:0 14px 34px rgba(20,12,51,.16);transform-origin:bottom right;animation:agc-rise .45s cubic-bezier(.22,.61,.36,1) both}',
    '@media (min-width:1024px){.agc-nudge{right:106px;bottom:40px}}',
    '.agc-nudge button{position:absolute;right:6px;top:6px;width:24px;height:24px;border:0;border-radius:50%;background:transparent;color:rgba(20,12,51,.55);cursor:pointer;display:grid;place-items:center}',
    '.agc-nudge button:hover{background:#EFECFF;color:#140C33}',
    '.agc-panel{position:fixed;z-index:60;inset:0;display:flex;flex-direction:column;background:#F8F7FF;color:#140C33;font-family:"Plus Jakarta Sans",sans-serif;opacity:0;transform:translateY(16px) scale(.97);transform-origin:bottom right;pointer-events:none;visibility:hidden;transition:opacity .28s ease,transform .38s cubic-bezier(.22,.61,.36,1),visibility 0s linear .38s}',
    '@media (min-width:640px){.agc-panel{inset:auto 24px 106px auto;width:390px;height:min(640px,calc(100dvh - 140px));border-radius:26px;overflow:hidden;box-shadow:0 30px 80px rgba(20,12,51,.28);border:1px solid rgba(20,12,51,.08)}}',
    '@media (min-width:1024px){.agc-panel{right:28px;bottom:108px}}',
    '.agc-panel.agc-open{opacity:1;transform:none;pointer-events:auto;visibility:visible;transition:opacity .28s ease,transform .38s cubic-bezier(.22,.61,.36,1),visibility 0s}',
    '.agc-head{position:relative;display:flex;align-items:center;gap:12px;padding:calc(14px + env(safe-area-inset-top)) 16px 14px;background:#140C33;color:#fff}',
    '.agc-head img{width:44px;height:44px;border-radius:50%;object-fit:cover;border:2px solid #F6CE7D;flex-shrink:0}',
    '.agc-title{margin:0;font-weight:800;font-size:15.5px;line-height:1.2}',
    '.agc-sub{margin:2px 0 0;font-size:12px;color:rgba(255,255,255,.72);display:flex;align-items:center;gap:6px}',
    '.agc-sub::before{content:"";width:7px;height:7px;border-radius:50%;background:#4ADE80;box-shadow:0 0 0 3px rgba(74,222,128,.2)}',
    '.agc-close{margin-left:auto;width:40px;height:40px;border:0;border-radius:12px;background:rgba(255,255,255,.1);color:#fff;font-size:18px;display:grid;place-items:center;cursor:pointer;transition:background .2s ease}',
    '.agc-close:hover{background:rgba(255,255,255,.2)}',
    '.agc-close:focus-visible,.agc-send:focus-visible,.agc-chip:focus-visible,.agc-wa:focus-visible{outline:none;box-shadow:0 0 0 3px #fff,0 0 0 5px #4B0AF3}',
    '.agc-stripes{display:flex;height:4px;flex-shrink:0}.agc-stripes span{display:block}',
    '.agc-stripes span:nth-child(1){flex:41;background:#4B0AF3}.agc-stripes span:nth-child(2){flex:27;background:#6D62F4}.agc-stripes span:nth-child(3){flex:18;background:#A468F2}.agc-stripes span:nth-child(4){flex:14;background:#F6CE7D}',
    '.agc-log{flex:1;overflow-y:auto;overscroll-behavior:contain;padding:18px 14px 8px;display:flex;flex-direction:column;gap:12px;scroll-behavior:smooth}',
    '.agc-msg{display:flex;gap:8px;align-items:flex-end;max-width:100%;animation:agc-rise .35s cubic-bezier(.22,.61,.36,1) both}',
    '@keyframes agc-rise{from{opacity:0;transform:translateY(10px)}to{opacity:1;transform:none}}',
    '.agc-msg img{width:28px;height:28px;border-radius:50%;object-fit:cover;flex-shrink:0}',
    '.agc-bubble{padding:11px 14px;border-radius:18px;font-size:14px;line-height:1.55;max-width:82%;overflow-wrap:anywhere}',
    '.agc-bubble p{margin:0}.agc-bubble p+p,.agc-bubble p+ul,.agc-bubble ul+p{margin-top:6px}',
    '.agc-bubble ul{margin:0;padding-left:18px}.agc-bubble li+li{margin-top:3px}',
    '.agc-bot .agc-bubble{background:#fff;border:1px solid rgba(20,12,51,.08);border-bottom-left-radius:6px;box-shadow:0 4px 14px rgba(20,12,51,.05)}',
    '.agc-user{justify-content:flex-end}',
    '.agc-user .agc-bubble{background:#4B0AF3;color:#fff;border-bottom-right-radius:6px}',
    '.agc-wa{align-self:flex-start;margin:-4px 0 0 36px;display:inline-flex;align-items:center;gap:8px;min-height:40px;padding:8px 14px;border-radius:999px;background:#1FA855;color:#fff;font-size:13px;font-weight:700;text-decoration:none;box-shadow:0 8px 20px rgba(31,168,85,.25);transition:transform .2s ease,filter .2s ease;animation:agc-rise .35s cubic-bezier(.22,.61,.36,1) .1s both}',
    '.agc-wa:hover{transform:translateY(-1px);filter:brightness(1.07)}',
    '.agc-typing .agc-bubble{display:inline-flex;gap:5px;align-items:center;padding:14px 16px}',
    '.agc-typing i{width:7px;height:7px;border-radius:50%;background:#A468F2;animation:agc-dot 1.1s ease-in-out infinite}',
    '.agc-typing i:nth-child(2){animation-delay:.15s}.agc-typing i:nth-child(3){animation-delay:.3s}',
    '@keyframes agc-dot{0%,80%,100%{transform:translateY(0);opacity:.45}40%{transform:translateY(-5px);opacity:1}}',
    '.agc-chips{display:flex;flex-wrap:wrap;gap:8px;padding:0 14px 10px 50px}.agc-chips[hidden]{display:none}',
    '.agc-chip{border:1px solid rgba(75,10,243,.25);background:#fff;color:#4B0AF3;border-radius:999px;padding:8px 12px;font:600 12.5px/1.2 "Plus Jakarta Sans",sans-serif;cursor:pointer;text-align:left;transition:background .2s ease,color .2s ease,border-color .2s ease}',
    '.agc-chip:hover{background:#4B0AF3;color:#fff;border-color:#4B0AF3}',
    '.agc-form{display:flex;align-items:flex-end;gap:8px;padding:10px 12px;border-top:1px solid rgba(20,12,51,.08);background:#fff}',
    '.agc-input{flex:1;resize:none;max-height:120px;min-height:44px;border:1px solid rgba(20,12,51,.15);border-radius:16px;padding:11px 14px;font:16px/1.4 "Plus Jakarta Sans",sans-serif;color:#140C33;background:#F8F7FF;transition:border-color .2s ease,box-shadow .2s ease}',
    '@media (min-width:640px){.agc-input{font-size:14.5px}}',
    '.agc-input:focus{outline:none;border-color:#4B0AF3;box-shadow:0 0 0 4px rgba(75,10,243,.14)}',
    '.agc-send{width:44px;height:44px;flex-shrink:0;border:0;border-radius:50%;background:#4B0AF3;color:#fff;font-size:18px;display:grid;place-items:center;cursor:pointer;transition:background .2s ease,transform .2s ease}',
    '.agc-send:hover{background:#3A06C4}.agc-send:disabled{background:#C4A0FF;cursor:not-allowed}',
    '.agc-note{margin:0;padding:0 14px calc(10px + env(safe-area-inset-bottom));background:#fff;font-size:11px;line-height:1.4;color:rgba(20,12,51,.6)}',
    '.agc-sr{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);white-space:nowrap;border:0}',
    '@media (prefers-reduced-motion: reduce){.agc-launcher,.agc-launcher::before,.agc-nudge,.agc-msg,.agc-wa,.agc-typing i{animation:none!important}.agc-panel,.agc-launcher,.agc-chip,.agc-input,.agc-send,.agc-wa{transition:none!important}}'
  ].join('\n');

  var style = document.createElement('style');
  style.id = 'agc-styles';
  style.textContent = css;
  document.head.appendChild(style);

  function el(tag, attrs, html) {
    var node = document.createElement(tag);
    if (attrs) Object.keys(attrs).forEach(function (k) { node.setAttribute(k, attrs[k]); });
    if (html != null) node.innerHTML = html;
    return node;
  }
  function escapeHtml(s) {
    return s.replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; });
  }
  // Plain text to HTML: "- " lines become a list, blank lines split paragraphs.
  function formatReply(text) {
    var out = [], list = [];
    function flush() { if (list.length) { out.push('<ul>' + list.join('') + '</ul>'); list = []; } }
    text.replace(/\*\*/g, '').split(/\n/).forEach(function (line) {
      var t = line.trim();
      if (!t) { flush(); return; }
      var m = t.match(/^(?:[-•*]|\d+[.)])\s+(.*)$/);
      if (m) list.push('<li>' + escapeHtml(m[1]) + '</li>');
      else { flush(); out.push('<p>' + escapeHtml(t) + '</p>'); }
    });
    flush();
    return out.join('');
  }
  function whatsappHref(question) {
    var msg = 'Hi Arya Global Workforce, I was chatting on your website.' + (question ? ' My question: ' + question.slice(0, 300) : '');
    return WHATSAPP + '?text=' + encodeURIComponent(msg);
  }
  function load() {
    try { var v = JSON.parse(sessionStorage.getItem(STORE_KEY) || '[]'); return Array.isArray(v) ? v : []; } catch (e) { return []; }
  }
  function save() {
    try { sessionStorage.setItem(STORE_KEY, JSON.stringify(history.slice(-30))); } catch (e) { /* storage unavailable */ }
  }

  /* ---------- Markup ---------- */
  var launcher = el('button', { type: 'button', class: 'agc-launcher' + (reduceMotion ? '' : ' agc-enter'), 'aria-label': 'Chat with Dr. Ashish Mahendra (AI assistant)', 'aria-expanded': 'false', 'aria-controls': 'agcPanel' },
    '<img src="' + AVATAR + '" alt="" width="96" height="96"><span class="agc-badge" aria-hidden="true"><i class="ph-fill ph-chat-circle-dots"></i></span>');

  var panel = el('section', { id: 'agcPanel', class: 'agc-panel', role: 'dialog', 'aria-modal': 'false', 'aria-labelledby': 'agcTitle', 'aria-hidden': 'true' },
    '<div class="agc-head"><img src="' + AVATAR + '" alt="" width="96" height="96">' +
    '<div><p class="agc-title" id="agcTitle">Dr. Ashish Mahendra</p><p class="agc-sub">AI assistant · Arya Global Workforce</p></div>' +
    '<button type="button" class="agc-close" aria-label="Close chat"><i class="ph ph-x" aria-hidden="true"></i></button></div>' +
    '<div class="agc-stripes" aria-hidden="true"><span></span><span></span><span></span><span></span></div>' +
    '<div class="agc-log" role="log" aria-live="polite" aria-relevant="additions"></div>' +
    '<div class="agc-chips" aria-label="Suggested questions"></div>' +
    '<form class="agc-form" novalidate><label for="agcInput" class="agc-sr">Type your question</label>' +
    '<textarea id="agcInput" class="agc-input" rows="1" maxlength="' + MAX_LEN + '" placeholder="Type your question…" autocomplete="off"></textarea>' +
    '<button type="submit" class="agc-send" aria-label="Send message"><i class="ph-fill ph-paper-plane-right" aria-hidden="true"></i></button></form>' +
    '<p class="agc-note">AI answers can be wrong; please confirm with our team on WhatsApp. Don\'t share passport or bank details here.</p>');

  document.body.appendChild(panel);
  document.body.appendChild(launcher);

  var log = panel.querySelector('.agc-log');
  var chips = panel.querySelector('.agc-chips');
  var form = panel.querySelector('.agc-form');
  var input = panel.querySelector('.agc-input');
  var send = panel.querySelector('.agc-send');
  var closeBtn = panel.querySelector('.agc-close');
  var history = load();
  var pending = false;
  var nudge = null;

  function scrollDown() { log.scrollTop = log.scrollHeight; }
  function addBot(text, question, withWhatsApp) {
    var row = el('div', { class: 'agc-msg agc-bot' }, '<img src="' + AVATAR + '" alt="" width="96" height="96"><div class="agc-bubble">' + formatReply(text) + '</div>');
    log.appendChild(row);
    if (withWhatsApp) {
      log.appendChild(el('a', { class: 'agc-wa', href: whatsappHref(question), target: '_blank', rel: 'noopener noreferrer' },
        '<i class="ph ph-whatsapp-logo" aria-hidden="true" style="font-size:17px"></i> Continue on WhatsApp'));
    }
    scrollDown();
  }
  function addUser(text) {
    log.appendChild(el('div', { class: 'agc-msg agc-user' }, '<div class="agc-bubble"><p>' + escapeHtml(text) + '</p></div>'));
    scrollDown();
  }
  function renderChips() {
    chips.innerHTML = '';
    if (history.length) { chips.hidden = true; return; }
    chips.hidden = false;
    SUGGESTIONS.forEach(function (q) {
      var b = el('button', { type: 'button', class: 'agc-chip' });
      b.textContent = q;
      b.addEventListener('click', function () { ask(q); });
      chips.appendChild(b);
    });
  }
  function renderAll() {
    log.innerHTML = '';
    addBot(WELCOME, '', false);
    var lastQuestion = '';
    history.forEach(function (m) {
      if (m.role === 'user') { lastQuestion = m.content; addUser(m.content); }
      else addBot(m.content, lastQuestion, true);
    });
    renderChips();
  }
  function setPending(on) {
    pending = on;
    send.disabled = on;
    var typing = log.querySelector('.agc-typing');
    if (on && !typing) {
      log.appendChild(el('div', { class: 'agc-msg agc-bot agc-typing', 'aria-label': 'Dr. Ashish Mahendra is typing' }, '<img src="' + AVATAR + '" alt="" width="96" height="96"><div class="agc-bubble"><i></i><i></i><i></i></div>'));
      scrollDown();
    } else if (!on && typing) typing.remove();
  }

  function ask(question) {
    question = (question || '').trim().slice(0, MAX_LEN);
    if (!question || pending) return;
    history.push({ role: 'user', content: question });
    save();
    chips.hidden = true;
    addUser(question);
    setPending(true);
    var controller = 'AbortController' in window ? new AbortController() : null;
    var timer = setTimeout(function () { if (controller) controller.abort(); }, 20000);
    fetch(ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ messages: history.slice(-HISTORY_SENT) }),
      signal: controller ? controller.signal : undefined
    }).then(function (res) {
      return res.json().catch(function () { return {}; }).then(function (data) { return { status: res.status, data: data }; });
    }).then(function (r) {
      var reply = r.data && r.data.reply;
      if (r.status === 429) reply = "You're sending messages quickly. Please wait a minute, or message our team on WhatsApp.";
      if (!reply) reply = "Sorry, I can't answer right now. Please message our team on WhatsApp and they will help you directly.";
      finish(reply, question, r.status === 200);
    }).catch(function () {
      finish("Sorry, I couldn't connect. Please check your internet, or message our team on WhatsApp.", question, false);
    }).then(function () { clearTimeout(timer); });
  }
  function finish(reply, question, keep) {
    setPending(false);
    if (keep) { history.push({ role: 'assistant', content: reply }); save(); }
    else { history.pop(); save(); }
    addBot(reply, question, true);
  }

  /* ---------- Open / close ---------- */
  var isOpen = false;
  var lockScroll = window.matchMedia('(max-width: 639px)');
  function openChat() {
    if (isOpen) return;
    isOpen = true;
    if (nudge) { nudge.remove(); nudge = null; }
    try { sessionStorage.setItem(STORE_KEY + '-seen', '1'); } catch (e) { /* ignore */ }
    if (!log.childElementCount) renderAll();
    panel.classList.add('agc-open');
    panel.setAttribute('aria-hidden', 'false');
    launcher.setAttribute('aria-expanded', 'true');
    launcher.setAttribute('aria-label', 'Close chat');
    if (lockScroll.matches) { document.body.style.overflow = 'hidden'; launcher.style.visibility = 'hidden'; }
    setTimeout(function () { input.focus({ preventScroll: true }); scrollDown(); }, reduceMotion ? 0 : 250);
  }
  function closeChat() {
    if (!isOpen) return;
    isOpen = false;
    panel.classList.remove('agc-open');
    panel.setAttribute('aria-hidden', 'true');
    launcher.setAttribute('aria-expanded', 'false');
    launcher.setAttribute('aria-label', 'Chat with Dr. Ashish Mahendra (AI assistant)');
    document.body.style.overflow = '';
    launcher.style.visibility = '';
    launcher.focus({ preventScroll: true });
  }
  launcher.addEventListener('click', function () { isOpen ? closeChat() : openChat(); });
  closeBtn.addEventListener('click', closeChat);
  panel.addEventListener('keydown', function (e) { if (e.key === 'Escape') closeChat(); });

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    var q = input.value;
    input.value = '';
    input.style.height = '';
    ask(q);
  });
  input.addEventListener('keydown', function (e) {
    if (e.key === 'Enter' && !e.shiftKey && !e.isComposing) { e.preventDefault(); form.requestSubmit ? form.requestSubmit() : form.dispatchEvent(new Event('submit')); }
  });
  input.addEventListener('input', function () {
    input.style.height = 'auto';
    input.style.height = Math.min(input.scrollHeight, 120) + 'px';
  });

  /* One gentle nudge per visit, after the visitor has had time to look around. */
  var seen = false;
  try { seen = !!sessionStorage.getItem(STORE_KEY + '-seen'); } catch (e) { /* ignore */ }
  if (!seen) {
    setTimeout(function () {
      if (isOpen) return;
      nudge = el('div', { class: 'agc-nudge', role: 'status' }, 'Have a question about jobs abroad? Ask me.<button type="button" aria-label="Dismiss"><i class="ph ph-x" aria-hidden="true"></i></button>');
      document.body.appendChild(nudge);
      nudge.querySelector('button').addEventListener('click', function () { nudge.remove(); nudge = null; });
      setTimeout(function () { if (nudge) { nudge.remove(); nudge = null; } }, 9000);
    }, 9000);
  }
})();
