/**
 * Email Capture Utility
 * Handles email submission to n8n and localStorage management
 */

export interface EmailCaptureData {
  email: string;
  challenge?: string;
  source: 'calendly_gate' | 'exit_intent' | 'chatbot' | 'lead_magnet';
  timestamp: number;
}

const EMAIL_STORAGE_KEY = 'emailCaptured';
const EXPIRY_HOURS = 24;

/**
 * Check if email has been captured in this session
 */
export const isEmailCaptured = (): boolean => {
  if (typeof window === 'undefined') return false;

  const stored = localStorage.getItem(EMAIL_STORAGE_KEY);
  if (!stored) return false;

  try {
    const data = JSON.parse(stored);
    const expiryTime = data.timestamp + (EXPIRY_HOURS * 60 * 60 * 1000);

    if (Date.now() > expiryTime) {
      localStorage.removeItem(EMAIL_STORAGE_KEY);
      return false;
    }

    return true;
  } catch {
    localStorage.removeItem(EMAIL_STORAGE_KEY);
    return false;
  }
};

/**
 * Get stored email if available
 */
export const getStoredEmail = (): string | null => {
  if (typeof window === 'undefined') return null;

  const stored = localStorage.getItem(EMAIL_STORAGE_KEY);
  if (!stored) return null;

  try {
    const data = JSON.parse(stored);
    return data.email;
  } catch {
    return null;
  }
};

/**
 * Submit email to n8n webhook
 */
export const submitEmail = async (data: EmailCaptureData): Promise<boolean> => {
  try {
    const response = await fetch('https://n8n.shahzaibai.site/webhook/email-capture', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error('Failed to submit email');
    }

    // Store in localStorage
    localStorage.setItem(EMAIL_STORAGE_KEY, JSON.stringify({
      email: data.email,
      timestamp: data.timestamp,
    }));

    // Track with GA4
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', 'email_captured', {
        method: data.source,
      });
    }

    return true;
  } catch (error) {
    console.error('Email capture error:', error);
    return false;
  }
};

/**
 * Generate Calendly URL with pre-filled email
 */
export const getCalendlyUrl = (email?: string): string => {
  const baseUrl = 'https://calendly.com/shahzaibbuilds/30min';
  if (!email) return baseUrl;

  return `${baseUrl}?email=${encodeURIComponent(email)}`;
};
