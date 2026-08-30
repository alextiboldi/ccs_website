"use server";

import { Resend } from "resend";

const CONTACT_EMAIL = process.env.CONTACT_EMAIL ?? "hello@clearcloudsoftware.com";

export type ContactFormState = { ok: boolean; error?: string };

export async function sendContactMessage(
  _prevState: ContactFormState,
  formData: FormData,
): Promise<ContactFormState> {
  // ponytail: honeypot field, real captcha (Turnstile/reCAPTCHA) can replace this if spam gets bad
  if (formData.get("company")) {
    return { ok: true };
  }

  const name = formData.get("name")?.toString().trim();
  const email = formData.get("email")?.toString().trim();
  const subject = formData.get("subject")?.toString().trim();
  const message = formData.get("message")?.toString().trim();

  if (!name || !email || !subject || !message) {
    return { ok: false, error: "Fill in every field." };
  }

  try {
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: "Clear Cloud Software <onboarding@resend.dev>",
      to: CONTACT_EMAIL,
      replyTo: email,
      subject: `[Get In Touch] ${subject}`,
      text: `From: ${name} <${email}>\n\n${message}`,
    });
    return { ok: true };
  } catch {
    return { ok: false, error: "Something broke. Email us directly instead." };
  }
}
