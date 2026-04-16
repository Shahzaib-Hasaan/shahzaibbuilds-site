/**
 * Single source of truth for the Calendly booking URL.
 *
 * This is the only place in the codebase where the Calendly handle should be
 * written. If it ever changes, update it here and everything else follows.
 *
 * NOTE: Verify this URL is live before deploying. A dead Calendly link kills
 * every conversation that reaches a "book a call" moment.
 */
export const CALENDLY_URL = 'https://calendly.com/shahxeebhassan/30min';

/**
 * Returns the Calendly URL with an optional email pre-filled via the
 * Calendly `?email=` query param. Pre-filling removes one step of friction
 * at the booking screen.
 */
export function getBookingUrl(email?: string): string {
  if (!email) return CALENDLY_URL;
  const sep = CALENDLY_URL.includes('?') ? '&' : '?';
  return `${CALENDLY_URL}${sep}email=${encodeURIComponent(email)}`;
}
