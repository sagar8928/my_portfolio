'use client';

import { useEffect, useRef, useState, useSyncExternalStore } from 'react';
import { usePathname } from 'next/navigation';
import { createAvatar } from '@bible-strong/avatar-react';
// Path assumes this file is src/component/FloatingMascot.jsx and the JSON is in the
// project root. If your "component" folder is NOT inside "src", use '../strobi.avatar.json'.
import avatarJson from '../../strobi.avatar.json';
import { MASCOT_EVENTS } from './mascotEvents';

// Validates the JSON once and returns a React component for this exact avatar.
const Strobi = createAvatar(avatarJson);

/* ------------------------------ Settings ------------------------------ */

const IDLE_MS = 30_000; // no activity for this long -> drowsy
const DROWSY_MS = 10_000; // extra time in drowsy before sleeping
const WAKE_MS = 1_600; // how long "waking" plays before returning to idle

// Strobi lives on the right edge and only slides up and down.
// On a desktop with a mouse: 'cursor' = follows the height of your mouse,
// 'scroll' = follows how far the page is scrolled. Phones always use 'scroll'.
const DESKTOP_FOLLOW = 'cursor';
const SLIDE_EASE = 0.1; // 0-1, higher = snappier
const TOP_PAD = 88; // never slide higher than this (keeps clear of your navbar)
const BOTTOM_PAD = 84; // never slide lower than this (keeps clear of the voice button)
const TIP_COOLDOWN_MS = 30_000; // a section's tip can show again after this long

// Thinking -> message sequence
const THINK_MS = 1_000; // Strobi "thinks" (cloud with dots) this long before the message appears
const TYPE_MS = 28; // time per letter while the message types out
const HOLD_MS = 6_000; // how long the message stays after it finished typing
const TIP_DELAY_MS = 600; // wait this long after a section is reached before reacting
const BUBBLE_ROOM = 210; // below this height the bubble opens under Strobi instead of above

// Add data-mascot-cta to your main call-to-action to trigger the "excited" reaction.
const CTA_SELECTOR = '[data-mascot-cta]';

// Tips, keyed by section name. A section is matched by its id (id="projects"),
// or by its heading text (a heading containing "project" counts as "projects").
// You can also set a custom tip on any section: <section data-mascot-tip="Your tip">
const SECTION_TIPS = {
  home: 'Hi, I’m Sagar! The Resume link in the menu has the full details.',
  about: 'A quick look at the developer behind the code.',
  skills:
    'Frontend, backend and full stack: this is the toolkit behind every project.',
  projects:
    'Use the filters to switch between Full Stack and Frontend projects.',
  experience: 'Hands-on experience that shaped how Sagar builds.',
  services: 'Looking for help? This is what Sagar can build for you.',
  contact: 'Have an idea? Send a quick message and Sagar will get back to you.',
};

// Used when a section has no matching id. Checked in order against its first h1/h2.
const HEADING_HINTS = [
  ['contact', /contact|get in touch|hire|reach/i],
  ['projects', /project|my work|portfolio|featured/i],
  ['skills', /skill|tech stack|tools|technolog|what i do|expertise/i],
  ['experience', /experience|journey|career/i],
  ['about', /about|who i am/i],
];

const INTERACTIVE_SELECTOR =
  'a[href], button, input, select, textarea, summary, [role="button"], [tabindex]:not([tabindex="-1"])';
const FIELD_SELECTOR =
  'input:not([type="button"]):not([type="submit"]):not([type="checkbox"]):not([type="radio"]), textarea, select, [contenteditable="true"]';

/* ------------------------------- Styles -------------------------------- */
// The component carries its own CSS, so nothing needs to be added to globals.css.

const MASCOT_CSS = `
.strobi-host {
  position: fixed;
  z-index: 45;
  width: 76px;
  height: 76px;
  right: 16px;
  bottom: calc(76px + env(safe-area-inset-bottom, 0px));
  pointer-events: none;
}
@media (min-width: 640px) {
  .strobi-host {
    width: 120px;
    height: 120px;
    right: 24px;
    bottom: calc(84px + env(safe-area-inset-bottom, 0px));
  }
}
/* Sliding modes: JS moves it up and down with translateY only */
.strobi-host[data-follow="cursor"],
.strobi-host[data-follow="scroll"] {
  top: 0;
  bottom: auto;
  will-change: transform;
}
.strobi-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.35s ease, opacity 0.25s ease;
}
.strobi-inner.is-ghost {
  opacity: 0.3;
}
.strobi-inner.is-tucked {
  opacity: 0;
  transform: translateX(calc(100% + 32px));
}
/* Speech bubble: sits above Strobi, right-aligned, with two small trailing circles */
.strobi-bubble {
  position: absolute;
  z-index: 1;
  right: -2px;
  bottom: calc(100% + 26px);
  width: max-content;
  min-width: 58px;
  max-width: 200px;
  padding: 10px 14px;
  border-radius: 20px;
  background: #eaf0ff;
  border: 1px solid rgba(91, 127, 229, 0.35);
  color: #0f172a;
  font-size: 13px;
  font-weight: 600;
  line-height: 1.35;
  text-align: left;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.18);
  pointer-events: none;
  transform-origin: 85% 100%;
  animation: strobi-pop 0.28s cubic-bezier(0.2, 0.9, 0.3, 1.3);
}
@media (min-width: 640px) {
  .strobi-bubble {
    max-width: 240px;
    font-size: 14px;
  }
}
.strobi-bubble::before,
.strobi-bubble::after {
  content: "";
  position: absolute;
  border-radius: 50%;
  background: #eaf0ff;
  border: 1px solid rgba(91, 127, 229, 0.35);
}
.strobi-bubble::before {
  width: 12px;
  height: 12px;
  right: 38px;
  bottom: -17px;
}
.strobi-bubble::after {
  width: 7px;
  height: 7px;
  right: 31px;
  bottom: -28px;
}
/* Near the top of the screen the bubble opens underneath instead */
.strobi-host[data-v="below"] .strobi-bubble {
  bottom: auto;
  top: calc(100% + 26px);
  transform-origin: 85% 0;
}
.strobi-host[data-v="below"] .strobi-bubble::before {
  bottom: auto;
  top: -17px;
}
.strobi-host[data-v="below"] .strobi-bubble::after {
  bottom: auto;
  top: -28px;
}
@keyframes strobi-pop {
  from { opacity: 0; transform: scale(0.6); }
  to { opacity: 1; transform: scale(1); }
}
/* The "thinking" dots */
.strobi-dots {
  display: flex;
  align-items: center;
  gap: 5px;
  height: 19px;
  padding: 0 2px;
}
.strobi-dots i {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  background: #5b7fe5;
  animation: strobi-dot 1s infinite ease-in-out;
}
.strobi-dots i:nth-child(2) { animation-delay: 0.15s; }
.strobi-dots i:nth-child(3) { animation-delay: 0.3s; }
@keyframes strobi-dot {
  0%, 80%, 100% { transform: translateY(0); opacity: 0.45; }
  40% { transform: translateY(-4px); opacity: 1; }
}
.strobi-voice {
  position: fixed;
  z-index: 45;
  right: 16px;
  bottom: calc(16px + env(safe-area-inset-bottom, 0px));
  display: grid;
  place-items: center;
  width: 40px;
  height: 40px;
  padding: 0;
  border: 1px solid rgba(15, 23, 42, 0.12);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.92);
  color: #0f172a;
  box-shadow: 0 4px 14px rgba(15, 23, 42, 0.15);
  cursor: pointer;
  -webkit-tap-highlight-color: transparent;
  transition: opacity 0.25s ease, transform 0.25s ease, background-color 0.2s ease, color 0.2s ease;
}
@media (min-width: 640px) {
  .strobi-voice {
    right: 24px;
    bottom: calc(24px + env(safe-area-inset-bottom, 0px));
  }
}
.strobi-voice.is-on {
  background: #5651e5;
  border-color: #5651e5;
  color: #fff;
}
.strobi-voice.is-hidden {
  opacity: 0;
  transform: translateX(24px);
  pointer-events: none;
}
.strobi-voice:focus-visible {
  outline: 3px solid #5651e5;
  outline-offset: 3px;
}
@media (prefers-reduced-motion: reduce) {
  .strobi-host,
  .strobi-inner,
  .strobi-voice {
    transition: none;
  }
  .strobi-bubble,
  .strobi-dots i {
    animation: none;
  }
}
`;

/* ------------------------------- Helpers ------------------------------- */

function warnIfFailed(result) {
  if (result && !result.ok && process.env.NODE_ENV !== 'production') {
    console.warn('[FloatingMascot]', result.error?.message);
  }
}

const noopSubscribe = () => () => {};
const getVoiceSupport = () =>
  typeof window !== 'undefined' &&
  'speechSynthesis' in window &&
  typeof window.SpeechSynthesisUtterance !== 'undefined';

function tipKeyFor(el, isFirstSection) {
  if (el.dataset.mascotTip) return `tip:${el.dataset.mascotTip}`;
  if (SECTION_TIPS[el.id]) return el.id;
  if (el.tagName === 'SECTION') {
    const heading = el.querySelector('h1, h2')?.textContent ?? '';
    for (const [key, pattern] of HEADING_HINTS) {
      if (pattern.test(heading)) return key;
    }
    if (isFirstSection) return 'home';
  }
  return '';
}

const tipText = (key) =>
  key.startsWith('tip:') ? key.slice(4) : SECTION_TIPS[key];

// True when `el` visually overlaps any link, button or field (ignoring the mascot's own controls).
function overlapsInteractive(el) {
  const box = el.getBoundingClientRect();
  if (box.width === 0 || box.height === 0) return false;
  const pad = 6;
  for (const node of document.querySelectorAll(INTERACTIVE_SELECTOR)) {
    if (node.closest('.strobi-root')) continue;
    const r = node.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) continue;
    // Ignore page-wide wrappers (full-screen backgrounds, overlays): they would match everything.
    if (r.width * r.height > window.innerWidth * window.innerHeight * 0.35)
      continue;
    if (
      r.right > box.left - pad &&
      r.left < box.right + pad &&
      r.bottom > box.top - pad &&
      r.top < box.bottom + pad
    ) {
      return true;
    }
  }
  return false;
}

/* Types a message out letter by letter (all at once when `instant`). */
function TypedText({ text, instant }) {
  const [count, setCount] = useState(instant ? text.length : 0);

  useEffect(() => {
    if (instant) return undefined;
    let i = 0;
    const id = setInterval(() => {
      i += 1;
      setCount(i);
      if (i >= text.length) clearInterval(id);
    }, TYPE_MS);
    return () => clearInterval(id);
  }, [text, instant]);

  return <>{text.slice(0, count)}</>;
}

/* ----------------------------- Component ------------------------------ */

export default function FloatingMascot({ bubbleEnabled = true }) {
  const pathname = usePathname();

  const avatarRef = useRef(null); // AvatarController from @bible-strong/avatar-react
  const hostRef = useRef(null);
  const voiceButtonRef = useRef(null);
  const modeRef = useRef('awake'); // 'awake' | 'drowsy' | 'sleeping'
  const followRef = useRef('dock'); // 'dock' | 'cursor' | 'scroll'
  const presenceRef = useRef('normal'); // 'normal' | 'ghost' | 'tucked'
  const voiceOnRef = useRef(false);
  const speakRef = useRef(() => {});
  const stopSpeechRef = useRef(() => {});
  const showBubbleRef = useRef(() => {}); // short notice, shown straight away
  const hideBubbleRef = useRef(() => {});
  const tipRef = useRef(() => {}); // think first, then say (and speak) a message
  const actRef = useRef(() => {}); // make Strobi play an animation, then return to idle
  const currentTipRef = useRef('');
  const shownTipsRef = useRef(new Map()); // tip key -> time it was last shown

  const [presence, setPresence] = useState('normal');
  const [voiceHidden, setVoiceHidden] = useState(false);
  const [voiceOn, setVoiceOn] = useState(false);
  const [bubble, setBubble] = useState(null); // null | { kind: 'think' } | { kind: 'say', text, instant }
  const voiceSupported = useSyncExternalStore(
    noopSubscribe,
    getVoiceSupport,
    () => false,
  );

  /* -------- 0. The bubble: think first, then say the message -------- */
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    let thinkTimer = 0;
    let hideTimer = 0;

    const clear = () => {
      clearTimeout(thinkTimer);
      clearTimeout(hideTimer);
    };
    const say = (text, holdMs) => {
      clearTimeout(hideTimer);
      const instant = mql.matches; // reduced motion: no typing effect
      setBubble({ kind: 'say', text, instant });
      hideTimer = setTimeout(
        () => setBubble(null),
        holdMs + (instant ? 0 : text.length * TYPE_MS),
      );
    };

    hideBubbleRef.current = () => {
      clear();
      setBubble(null);
    };
    // Short notices (voice off, errors): shown straight away.
    showBubbleRef.current = (text, holdMs = HOLD_MS) => {
      clear();
      say(text, holdMs);
    };
    // Normal tips: Strobi thinks first, then the message pops up and types out.
    tipRef.current = (text) => {
      clear();
      if (mql.matches) {
        say(text, HOLD_MS);
        speakRef.current(text);
        return;
      }
      setBubble({ kind: 'think' });
      actRef.current('thinking', THINK_MS + 600);
      thinkTimer = setTimeout(() => {
        say(text, HOLD_MS);
        actRef.current('happy', text.length * TYPE_MS + 1_000);
        speakRef.current(text);
      }, THINK_MS);
    };

    return clear;
  }, []);

  /* -------- 1. Behavior: reactions, activity, sleep, voice, reduced motion -------- */
  useEffect(() => {
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)');
    const canSpeak = 'speechSynthesis' in window;
    let revertTimer = 0;
    let speakTimer = 0;
    let lastActivity = Date.now();
    let lastCta = 0;
    let lastError = 0;
    let utteranceId = 0;
    let currentUtterance = null; // keeps a reference so Chrome cannot garbage-collect it mid-speech
    let voice = null;

    const play = (name) => warnIfFailed(avatarRef.current?.play(name));
    const showExpression = (name) =>
      warnIfFailed(avatarRef.current?.setExpression(name));
    const clearRevert = () => {
      clearTimeout(revertTimer);
      revertTimer = 0;
    };

    const toIdle = () => {
      modeRef.current = 'awake';
      if (mql.matches) showExpression('neutral');
      else play('idle');
    };

    // manual = true means the visitor clicked the mascot directly.
    // With reduced motion, only manual actions change anything, and only to a static face.
    const react = (name, ms, manual = false) => {
      clearRevert();
      lastActivity = Date.now();
      modeRef.current = 'awake';
      if (mql.matches) {
        if (!manual) return;
        showExpression('joyful-wide');
        revertTimer = setTimeout(() => showExpression('neutral'), 1_500);
        return;
      }
      play(name);
      revertTimer = setTimeout(toIdle, ms);
    };

    actRef.current = (name, ms) => react(name, ms);

    const wake = () => {
      clearRevert();
      modeRef.current = 'awake';
      if (mql.matches) return;
      play('waking');
      revertTimer = setTimeout(toIdle, WAKE_MS);
    };

    const onActivity = () => {
      lastActivity = Date.now();
      if (modeRef.current !== 'awake') wake();
    };

    /* ---- Voice ---- */
    // Choose an English voice installed on the device (local voices work offline).
    const pickVoice = () => {
      if (!canSpeak) return;
      const list = window.speechSynthesis.getVoices();
      if (!list.length) return;
      const english = list.filter((v) => /^en([-_]|$)/i.test(v.lang));
      voice =
        english.find((v) => /^en[-_]US$/i.test(v.lang) && v.localService) ||
        english.find((v) => v.localService) ||
        english.find((v) => /^en[-_]US$/i.test(v.lang)) ||
        english[0] ||
        null;
    };
    if (canSpeak) {
      pickVoice();
      // Chrome loads its voice list a moment after the page opens.
      window.speechSynthesis.addEventListener?.('voiceschanged', pickVoice);
    }

    // Only works after the visitor turned voice on (browsers block speech until a click).
    const speak = (text) => {
      if (!voiceOnRef.current || !canSpeak) return;
      const synth = window.speechSynthesis;
      const myId = ++utteranceId;
      clearTimeout(speakTimer);
      if (synth.speaking || synth.pending) synth.cancel();
      // Chrome silently drops a speak() that comes right after cancel(), so wait a moment.
      speakTimer = setTimeout(() => {
        if (myId !== utteranceId) return;
        pickVoice();
        const utterance = new SpeechSynthesisUtterance(text);
        if (voice) {
          utterance.voice = voice;
          utterance.lang = voice.lang;
        } else {
          utterance.lang = 'en-US';
        }
        utterance.rate = 1;
        utterance.pitch = 1.15;
        utterance.volume = 1;
        utterance.onstart = () => {
          if (
            myId !== utteranceId ||
            mql.matches ||
            modeRef.current !== 'awake'
          )
            return;
          clearRevert();
          play('happy'); // looks like talking
        };
        const finished = () => {
          if (
            myId !== utteranceId ||
            mql.matches ||
            modeRef.current !== 'awake'
          )
            return;
          if (!revertTimer) toIdle();
        };
        utterance.onend = finished;
        utterance.onerror = (e) => {
          if (myId !== utteranceId) return;
          if (process.env.NODE_ENV !== 'production') {
            console.warn('[FloatingMascot] speech error:', e.error);
          }
          if (e.error && e.error !== 'canceled' && e.error !== 'interrupted') {
            showBubbleRef.current(
              'I could not speak. Check your volume and the tab sound.',
              6_000,
            );
          }
          finished();
        };
        currentUtterance = utterance;
        synth.resume(); // Chrome can get stuck in a paused state
        synth.speak(utterance);
      }, 100);
    };
    speakRef.current = speak;
    stopSpeechRef.current = () => {
      utteranceId += 1;
      clearTimeout(speakTimer);
      currentUtterance = null;
      if (canSpeak) window.speechSynthesis.cancel();
      if (!revertTimer && modeRef.current === 'awake' && !mql.matches)
        play('idle');
    };

    // Page open: waking, then idle.
    wake();

    // One cheap check per second instead of resetting a timer on every mouse move.
    const sleepTick = setInterval(() => {
      if (mql.matches || document.hidden) return;
      const idleFor = Date.now() - lastActivity;
      if (modeRef.current === 'awake' && idleFor >= IDLE_MS) {
        modeRef.current = 'drowsy';
        clearRevert();
        hideBubbleRef.current();
        play('drowsy');
      } else if (
        modeRef.current === 'drowsy' &&
        idleFor >= IDLE_MS + DROWSY_MS
      ) {
        modeRef.current = 'sleeping';
        play('sleeping');
      }
    }, 1_000);

    const activityEvents = [
      'pointermove',
      'pointerdown',
      'keydown',
      'scroll',
      'wheel',
      'touchstart',
    ];
    activityEvents.forEach((type) =>
      window.addEventListener(type, onActivity, { passive: true }),
    );

    // Clicking Strobi itself: the mascot never intercepts clicks (so it can't block a button),
    // so a click counts as "on Strobi" when it lands inside its circle on non-interactive content.
    const onClick = (e) => {
      const host = hostRef.current;
      if (!host || presenceRef.current === 'tucked') return;
      if (e.target instanceof Element && e.target.closest(INTERACTIVE_SELECTOR))
        return;
      const r = host.getBoundingClientRect();
      const radius = r.width / 2;
      const dx = e.clientX - (r.left + radius);
      const dy = e.clientY - (r.top + r.height / 2);
      if (dx * dx + dy * dy <= radius * radius) react('laughing', 2_600, true);
    };
    window.addEventListener('click', onClick);

    // Main CTA: hover on desktop, tap on touch devices.
    const triggerCta = () => {
      const now = Date.now();
      if (now - lastCta < 4_000) return;
      lastCta = now;
      react('excited', 3_000);
    };
    const onPointerOver = (e) => {
      if (e.pointerType !== 'mouse' || !(e.target instanceof Element)) return;
      const cta = e.target.closest(CTA_SELECTOR);
      if (!cta) return;
      if (e.relatedTarget instanceof Node && cta.contains(e.relatedTarget))
        return;
      triggerCta();
    };
    const onPointerDown = (e) => {
      if (e.pointerType === 'mouse' || !(e.target instanceof Element)) return;
      if (e.target.closest(CTA_SELECTOR)) triggerCta();
    };
    document.addEventListener('pointerover', onPointerOver, { passive: true });
    document.addEventListener('pointerdown', onPointerDown, { passive: true });

    // Form feedback.
    const triggerError = () => {
      const now = Date.now();
      if (now - lastError < 3_000) return;
      lastError = now;
      react('confused', 3_000);
    };
    const onSuccess = () => react('celebrate', 4_500);
    // Browsers fire "invalid" on each field that fails native validation (required, type=email...).
    // It does not bubble, so it is listened for in the capture phase.
    document.addEventListener('invalid', triggerError, true);
    window.addEventListener(MASCOT_EVENTS.success, onSuccess);
    window.addEventListener(MASCOT_EVENTS.error, triggerError);

    // Live changes to the OS reduced-motion setting.
    const onMotionChange = () => {
      clearRevert();
      modeRef.current = 'awake';
      lastActivity = Date.now();
      if (mql.matches) showExpression('neutral');
      else wake();
    };
    mql.addEventListener('change', onMotionChange);

    return () => {
      clearRevert();
      clearTimeout(speakTimer);
      clearInterval(sleepTick);
      utteranceId += 1;
      currentUtterance = null;
      if (canSpeak) {
        window.speechSynthesis.cancel();
        window.speechSynthesis.removeEventListener?.(
          'voiceschanged',
          pickVoice,
        );
      }
      activityEvents.forEach((type) =>
        window.removeEventListener(type, onActivity),
      );
      window.removeEventListener('click', onClick);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerdown', onPointerDown);
      document.removeEventListener('invalid', triggerError, true);
      window.removeEventListener(MASCOT_EVENTS.success, onSuccess);
      window.removeEventListener(MASCOT_EVENTS.error, triggerError);
      mql.removeEventListener('change', onMotionChange);
    };
  }, []);

  /* -------- 2. Movement: stay on the right edge, slide up and down only -------- */
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)');

    let mode = 'dock';
    let raf = 0;
    let y = 0; // current vertical center of Strobi, in viewport pixels
    let targetY = 0;

    const sizeNow = () => host.offsetWidth;
    const minY = () => TOP_PAD + sizeNow() / 2;
    const maxY = () =>
      Math.max(minY(), window.innerHeight - BOTTOM_PAD - sizeNow() / 2);
    const clampY = (v) => Math.min(maxY(), Math.max(minY(), v));
    const place = () => {
      const top = Math.round(y - sizeNow() / 2);
      host.style.transform = `translate3d(0, ${top}px, 0)`;
      // Near the top of the screen the bubble opens underneath, so it never covers the navbar.
      const side = top < BUBBLE_ROOM ? 'below' : 'above';
      if (host.dataset.v !== side) host.dataset.v = side;
    };

    // Ease toward the target height. Only the vertical position ever changes.
    const tick = () => {
      raf = 0;
      const diff = targetY - y;
      if (Math.abs(diff) < 0.4) {
        y = targetY;
        place();
        return;
      }
      y += diff * SLIDE_EASE;
      place();
      raf = requestAnimationFrame(tick);
    };
    const setTarget = (value) => {
      targetY = clampY(value);
      if (!raf) raf = requestAnimationFrame(tick);
    };

    // Desktop: follow the height of the mouse.
    const onPointerMove = (e) => {
      if (mode === 'cursor' && e.pointerType === 'mouse') setTarget(e.clientY);
    };
    // Phone: slide down the edge as the page is scrolled.
    const scrollTarget = () => {
      const maxScroll = Math.max(
        1,
        document.documentElement.scrollHeight - window.innerHeight,
      );
      const progress = Math.min(1, Math.max(0, window.scrollY / maxScroll));
      return minY() + progress * (maxY() - minY());
    };
    const onScroll = () => {
      if (mode === 'scroll') setTarget(scrollTarget());
    };
    const onResize = () => {
      if (mode === 'dock') return;
      y = clampY(y);
      targetY = mode === 'scroll' ? scrollTarget() : clampY(targetY);
      place();
    };

    const evaluate = () => {
      const next = reduce.matches
        ? 'dock'
        : finePointer.matches
          ? DESKTOP_FOLLOW
          : 'scroll';
      if (next === mode && host.dataset.follow === next) return;
      mode = next;
      followRef.current = next;
      if (process.env.NODE_ENV !== 'production') {
        console.info('[FloatingMascot] follow mode:', next);
      }
      cancelAnimationFrame(raf);
      raf = 0;
      host.dataset.follow = next;
      host.dataset.v = 'above';
      host.style.transform = '';
      if (next === 'cursor') {
        y = targetY = maxY(); // start at the bottom of the right edge
        place();
      } else if (next === 'scroll') {
        y = targetY = scrollTarget();
        place();
      }
    };

    evaluate();
    reduce.addEventListener('change', evaluate);
    finePointer.addEventListener('change', evaluate);
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize);

    return () => {
      cancelAnimationFrame(raf);
      reduce.removeEventListener('change', evaluate);
      finePointer.removeEventListener('change', evaluate);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, []);

  /* -------- 3. Stay out of the way: fade or hide near links, buttons and forms -------- */
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let fieldFocused = false;
    let focusTimer = 0;

    const check = () => {
      if (document.hidden) return;
      const hostHit = overlapsInteractive(host);
      // While sliding with the mouse it only fades (ghost). When docked or travelling
      // with scroll on a phone it slides out of the way (tucked).
      const next = fieldFocused
        ? 'tucked'
        : hostHit
          ? followRef.current === 'cursor'
            ? 'ghost'
            : 'tucked'
          : 'normal';
      presenceRef.current = next;
      setPresence(next); // React skips the re-render when the value is unchanged

      const voiceButton = voiceButtonRef.current;
      setVoiceHidden(
        fieldFocused ||
          (voiceButton ? overlapsInteractive(voiceButton) : false),
      );
    };

    const onFocusIn = (e) => {
      if (e.target instanceof Element && e.target.matches(FIELD_SELECTOR)) {
        clearTimeout(focusTimer);
        fieldFocused = true;
        check();
      }
    };
    const onFocusOut = () => {
      clearTimeout(focusTimer);
      focusTimer = setTimeout(() => {
        const active = document.activeElement;
        fieldFocused =
          active instanceof Element && active.matches(FIELD_SELECTOR);
        check();
      }, 120);
    };
    document.addEventListener('focusin', onFocusIn);
    document.addEventListener('focusout', onFocusOut);

    const timer = setInterval(check, 250);
    const first = setTimeout(check, 400);

    return () => {
      clearInterval(timer);
      clearTimeout(first);
      clearTimeout(focusTimer);
      document.removeEventListener('focusin', onFocusIn);
      document.removeEventListener('focusout', onFocusOut);
    };
  }, []);

  /* -------- 4. Speech bubble: a tip for the visible section (spoken if voice is on) -------- */
  useEffect(() => {
    if (!bubbleEnabled || typeof IntersectionObserver === 'undefined')
      return undefined;

    const candidates = [
      ...new Set(
        document.querySelectorAll(
          'main section, main [id], main [data-mascot-tip]',
        ),
      ),
    ];
    const firstSection = document.querySelector('main section');
    const keys = new Map();
    candidates.forEach((el) => {
      const key = tipKeyFor(el, el === firstSection);
      if (key && tipText(key)) keys.set(el, key);
    });
    if (keys.size === 0) return undefined;

    const visible = new Map();
    const startedAt = Date.now();
    let currentKey = '';
    let showTimer = 0;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting)
            visible.set(entry.target, entry.intersectionRatio);
          else visible.delete(entry.target);
        });

        let best = null;
        let bestRatio = -1;
        visible.forEach((ratio, el) => {
          if (ratio > bestRatio) {
            best = el;
            bestRatio = ratio;
          }
        });
        if (!best) return;

        const key = `${pathname}#${keys.get(best)}`;
        if (key === currentKey) return;
        currentKey = key;
        currentTipRef.current = tipText(keys.get(best)); // used when voice is switched on

        const last = shownTipsRef.current.get(key);
        if (last && Date.now() - last < TIP_COOLDOWN_MS) return;

        // On page open, let the waking animation finish before Strobi starts thinking.
        const delay = Math.max(
          TIP_DELAY_MS,
          WAKE_MS + 300 - (Date.now() - startedAt),
        );
        clearTimeout(showTimer);
        showTimer = setTimeout(() => {
          if (modeRef.current !== 'awake' || presenceRef.current === 'tucked')
            return;
          shownTipsRef.current.set(key, Date.now());
          tipRef.current(tipText(keys.get(best)));
        }, delay);
      },
      // Only the thin band across the middle of the screen counts as "the current section".
      { rootMargin: '-35% 0px -45% 0px', threshold: [0, 0.25, 0.5, 1] },
    );

    keys.forEach((_, el) => observer.observe(el));

    return () => {
      observer.disconnect();
      clearTimeout(showTimer);
      hideBubbleRef.current();
    };
  }, [pathname, bubbleEnabled]);

  /* ------------------------------ Voice toggle ------------------------------ */

  const toggleVoice = () => {
    const next = !voiceOnRef.current;
    voiceOnRef.current = next;
    setVoiceOn(next);
    if (!next) {
      stopSpeechRef.current();
      showBubbleRef.current('Voice is off.', 2_000);
      return;
    }
    const tip = currentTipRef.current;
    const text = tip
      ? `Voice is on. ${tip}`
      : 'Voice is on. I will read a tip for each section as you scroll.';
    tipRef.current(text);
    // If the browser has no voices at all, say so instead of failing silently.
    setTimeout(() => {
      if (
        voiceOnRef.current &&
        window.speechSynthesis.getVoices().length === 0
      ) {
        showBubbleRef.current(
          'This browser has no speech voices installed.',
          6_000,
        );
      }
    }, 1_500);
  };

  /* ------------------------------- Render ------------------------------- */

  const innerClass =
    presence === 'tucked'
      ? 'strobi-inner is-tucked'
      : presence === 'ghost'
        ? 'strobi-inner is-ghost'
        : 'strobi-inner';

  return (
    <div className="strobi-root">
      <style dangerouslySetInnerHTML={{ __html: MASCOT_CSS }} />
      <div
        ref={hostRef}
        className="strobi-host"
        data-follow="dock"
        aria-hidden="true"
      >
        <div className={innerClass}>
          {bubble && presence !== 'tucked' && (
            <div className="strobi-bubble">
              {bubble.kind === 'think' ? (
                <span className="strobi-dots">
                  <i />
                  <i />
                  <i />
                </span>
              ) : (
                <TypedText
                  key={bubble.text}
                  text={bubble.text}
                  instant={bubble.instant}
                />
              )}
            </div>
          )}
          <Strobi ref={avatarRef} size="100%" defaultExpression="neutral" />
        </div>
      </div>

      {voiceSupported && (
        <button
          ref={voiceButtonRef}
          type="button"
          className={`strobi-voice${voiceOn ? ' is-on' : ''}${voiceHidden ? ' is-hidden' : ''}`}
          aria-pressed={voiceOn}
          aria-label={
            voiceOn ? 'Turn off Strobi voice' : 'Turn on Strobi voice'
          }
          title={voiceOn ? 'Voice on' : 'Let Strobi talk'}
          inert={voiceHidden || undefined}
          onClick={toggleVoice}
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="M11 5 6 9H2v6h4l5 4V5z" />
            {voiceOn ? (
              <>
                <path d="M15.5 8.5a5 5 0 0 1 0 7" />
                <path d="M18.5 5.5a9 9 0 0 1 0 13" />
              </>
            ) : (
              <>
                <path d="m16 9 5 6" />
                <path d="m21 9-5 6" />
              </>
            )}
          </svg>
        </button>
      )}
    </div>
  );
}
