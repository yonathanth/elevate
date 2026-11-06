"use server";

import { PHONE_RE } from "@/lib/form";

export type JoinState = {
  status: "idle" | "success" | "error";
  errors?: Partial<Record<"name" | "phone", string>>;
  values?: { name?: string; phone?: string; interests?: string[] };
};

export async function requestMembership(_prev: JoinState, formData: FormData): Promise<JoinState> {
  const values = {
    name: String(formData.get("name") ?? "").trim(),
    phone: String(formData.get("phone") ?? "").trim(),
    interests: formData.getAll("interests").map(String),
  };

  const errors: JoinState["errors"] = {};
  if (values.name.length < 2) errors.name = "Please enter your name.";
  if (!PHONE_RE.test(values.phone)) errors.phone = "Please enter a valid phone number.";

  if (Object.keys(errors).length > 0) return { status: "error", errors, values };

  // TODO: deliver the sign-up request (email, CRM, Telegram bot, …). Nothing is sent yet.
  console.log("[join] new membership request", values);

  return { status: "success" };
}
