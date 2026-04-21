import { Resend } from "resend";

const FROM = process.env.RESEND_FROM || "On Call Network <hello@oncallnetwork.com.au>";
const REPLY_TO = process.env.RESEND_REPLY_TO || "hello@oncallnetwork.com.au";
const NOTIFY_TO = process.env.RESEND_NOTIFY_TO || "hello@oncallnetwork.com.au";

function getClient(): Resend | null {
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  return new Resend(key);
}

async function safeSend(
  to: string | string[],
  subject: string,
  html: string,
  replyTo?: string
): Promise<void> {
  const client = getClient();
  if (!client) return;
  try {
    await client.emails.send({
      from: FROM,
      to,
      subject,
      html,
      replyTo: replyTo || REPLY_TO,
    });
  } catch (error) {
    console.error("[email] send failed", error);
  }
}

const brand = (title: string, body: string) => `
<!doctype html><html><body style="margin:0;padding:0;background:#faf9f6;font-family:system-ui,-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,sans-serif;color:#1e3a5f">
  <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="background:#faf9f6;padding:32px 16px">
    <tr><td align="center">
      <table role="presentation" width="600" cellspacing="0" cellpadding="0" style="max-width:600px;background:#ffffff;border-radius:16px;overflow:hidden;box-shadow:0 2px 12px rgba(15,30,50,.08)">
        <tr><td style="padding:28px 32px;background:#0f1e32;color:#ffffff">
          <div style="font-size:20px;font-weight:700">On Call Network</div>
          <div style="font-size:13px;color:#d4a853">Sydney hospitality recruitment</div>
        </td></tr>
        <tr><td style="padding:28px 32px">
          <h1 style="margin:0 0 12px;font-size:22px;color:#1e3a5f">${title}</h1>
          ${body}
        </td></tr>
        <tr><td style="padding:18px 32px;border-top:1px solid #eef1f5;color:#6b7280;font-size:12px">
          On Call Network &middot; Sydney, NSW &middot; <a href="https://oncallnetwork.com.au" style="color:#1e3a5f">oncallnetwork.com.au</a><br/>
          You&apos;re receiving this because you submitted a form on oncallnetwork.com.au.
        </td></tr>
      </table>
    </td></tr>
  </table>
</body></html>`;

export async function sendVenueConfirmation(to: string, contactName: string, serviceType: string): Promise<void> {
  const html = brand(
    "We&rsquo;ve got your brief",
    `<p>Hi ${escapeHtml(contactName)},</p>
     <p>Thanks for reaching out to On Call Network. Diego has received your enquiry about <strong>${escapeHtml(serviceType)}</strong> and will personally respond within <strong>2 business hours</strong>.</p>
     <p>If it&rsquo;s urgent, call Diego on <strong>0424 195 996</strong>.</p>
     <p>&mdash; The On Call Network team</p>`
  );
  await safeSend(to, "We&rsquo;ve got your brief &mdash; On Call Network", html);
}

export async function sendVenueInternalNotice(record: {
  serviceType: string;
  venueName: string;
  contactPerson: string;
  email: string;
  phone: string;
  suburb?: string;
  positionsNeeded?: string;
  additionalNotes?: string;
}): Promise<void> {
  const rows = Object.entries(record)
    .filter(([, v]) => v && String(v).trim().length > 0)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 10px;color:#6b7280;font-size:13px;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 10px;font-size:14px;color:#1e3a5f">${escapeHtml(String(v))}</td></tr>`
    )
    .join("");
  const html = brand(
    "New venue enquiry",
    `<table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;background:#faf9f6;border-radius:10px;overflow:hidden">${rows}</table>`
  );
  await safeSend(NOTIFY_TO, `New venue enquiry: ${record.venueName}`, html, record.email);
}

export async function sendCandidateConfirmation(
  to: string,
  fullName: string,
  role: string
): Promise<void> {
  const html = brand(
    "Application received",
    `<p>Hi ${escapeHtml(fullName.split(" ")[0] || fullName)},</p>
     <p>Thanks for applying to the On Call Network for the role of <strong>${escapeHtml(role)}</strong>. Diego reviews every application personally and will reply within <strong>48 hours</strong> if there&rsquo;s a match for your profile in Sydney.</p>
     <p>In the meantime, feel free to reply to this email with anything else we should know.</p>
     <p>&mdash; Diego Sauvalle, Founder</p>`
  );
  await safeSend(to, "Application received &mdash; On Call Network", html);
}

export async function sendCandidateInternalNotice(record: {
  fullName: string;
  email: string;
  phone: string;
  suburb: string;
  roleApplyingFor: string;
  yearsInAustralia: string;
  currentVenue: string;
  certifications: string;
  availability: string;
  preferredZones: string;
  employmentType: string;
  briefIntro: string;
}): Promise<void> {
  const rows = Object.entries(record)
    .filter(([, v]) => v && String(v).trim().length > 0)
    .map(
      ([k, v]) =>
        `<tr><td style="padding:6px 10px;color:#6b7280;font-size:13px;vertical-align:top">${escapeHtml(k)}</td><td style="padding:6px 10px;font-size:14px;color:#1e3a5f">${escapeHtml(String(v))}</td></tr>`
    )
    .join("");
  const html = brand(
    "New candidate application",
    `<table role="presentation" cellspacing="0" cellpadding="0" style="width:100%;border-collapse:collapse;background:#faf9f6;border-radius:10px;overflow:hidden">${rows}</table>`
  );
  await safeSend(NOTIFY_TO, `New candidate: ${record.fullName} (${record.roleApplyingFor})`, html, record.email);
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
