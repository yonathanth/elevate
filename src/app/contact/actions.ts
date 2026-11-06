"use server";

import { PHONE_RE } from "@/lib/form";

export type ContactState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<"name" | "phone" | "question", string>>;
  values?: Record<string, string>;
};

export async function sendMessage(_prev: ContactState, formData: FormData): Promise<ContactState> {
  const values = {
    name: String(formData.get("name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    question: String(formData.get("question") ?? "").trim(),
  };

  const errors: ContactState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (!PHONE_RE.test(values.phone)) errors.phone = "Please enter a valid phone number.";
  if (values.question.length < 3) errors.question = "Please add your question.";

  if (Object.keys(errors).length > 0) return { status: "error", errors, values };

  // TODO: deliver the enquiry (email, CRM, Telegram bot, …). Nothing is sent yet.
  console.log("[contact] new enquiry", values);

  return { status: "success" };
}
