export const SECRETARIAT_EMAIL = 'ubindir@yahoo.com';

// Opens the visitor's email client with the inquiry pre-filled, since the site has no backend to receive submissions.
export function sendInquiryEmail(subject: string, fields: Record<string, string | undefined>, message: string) {
  const details = Object.entries(fields)
    .filter(([, value]) => value)
    .map(([label, value]) => `${label}: ${value}`)
    .join('\n');

  const body = `${details}\n\n${message}`;
  window.location.href = `mailto:${SECRETARIAT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
