// Tiny bridge so any component (like your contact form) can talk to the mascot
// without importing the mascot itself.

export const MASCOT_EVENTS = {
  success: 'mascot:success', // -> "celebrate"
  error: 'mascot:error', // -> "confused"
};

export function mascotSuccess() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(MASCOT_EVENTS.success));
}

export function mascotError() {
  if (typeof window === 'undefined') return;
  window.dispatchEvent(new CustomEvent(MASCOT_EVENTS.error));
}
