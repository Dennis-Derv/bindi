export const SECRETARIAT_EMAIL = 'ubindir@yahoo.com';

const WEB3FORMS_ENDPOINT = 'https://api.web3forms.com/submit';
const FAILURE_MESSAGE = `We couldn't send your message right now. Please try again, or email us directly at ${SECRETARIAT_EMAIL}.`;

export interface InquiryResult {
  success: boolean;
  message: string;
}

interface Inquiry {
  subject: string;
  name: string;
  email: string;
  message: string;
  // Extra labelled details shown in the delivered email (empty values are dropped)
  details: Record<string, string | undefined>;
  // Honeypot value; Web3Forms rejects the submission when it is set
  botcheck: boolean;
}

// Delivers the inquiry to the BKC secretariat's inbox through Web3Forms (the email's Reply-To is the visitor).
export async function sendInquiry(inquiry: Inquiry, successMessage: string): Promise<InquiryResult> {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY;
  if (!accessKey) {
    console.error('NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY is not set; inquiries cannot be delivered.');
    return { success: false, message: FAILURE_MESSAGE };
  }

  const details = Object.fromEntries(Object.entries(inquiry.details).filter(([, value]) => value));

  try {
    const res = await fetch(WEB3FORMS_ENDPOINT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify({
        access_key: accessKey,
        subject: inquiry.subject,
        from_name: 'BKC Website',
        name: inquiry.name,
        email: inquiry.email,
        ...details,
        message: inquiry.message,
        botcheck: inquiry.botcheck
      })
    });
    const data = await res.json();

    if (res.ok && data.success) {
      return { success: true, message: successMessage };
    }
    console.error('Web3Forms rejected the inquiry:', data.message);
    return { success: false, message: FAILURE_MESSAGE };
  } catch (err) {
    console.error('Could not reach Web3Forms:', err);
    return { success: false, message: FAILURE_MESSAGE };
  }
}
