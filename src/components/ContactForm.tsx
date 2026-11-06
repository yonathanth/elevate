"use client";

import { useActionState, useState } from "react";
import { sendMessage, type ContactState } from "@/app/contact/actions";
import { inputClass } from "@/lib/form";

function Form({ defaultQuestion, onSent }: { defaultQuestion?: string; onSent: () => void }) {
  const [state, action, pending] = useActionState<ContactState, FormData>(
    async (prev, formData) => {
      const next = await sendMessage(prev, formData);
      if (next.status === "success") onSent();
      return next;
    },
    { status: "idle" },
  );
  const v = state.values ?? {};
  const e = state.errors ?? {};
  const firstError = e.name ?? e.phone ?? e.question;
  const border = (key: keyof typeof e) => (e[key] ? "border-red-400/70" : "border-white/10");

  return (
    <form action={action} noValidate className="space-y-3">
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          name="name"
          aria-label="Your name"
          autoComplete="name"
          defaultValue={v.name}
          aria-invalid={!!e.name}
          className={`${inputClass} ${border("name")}`}
          placeholder="Your name"
        />
        <input
          name="phone"
          type="tel"
          aria-label="Phone number"
          autoComplete="tel"
          defaultValue={v.phone}
          aria-invalid={!!e.phone}
          className={`${inputClass} ${border("phone")}`}
          placeholder="Phone number"
        />
      </div>
      <textarea
        name="question"
        aria-label="Your question"
        rows={3}
        defaultValue={v.question ?? defaultQuestion}
        aria-invalid={!!e.question}
        className={`${inputClass} ${border("question")} resize-none`}
        placeholder="What would you like to know?"
      />

      <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:justify-between">
        <p className={`text-sm ${firstError ? "text-red-400" : "text-white/45"}`} role={firstError ? "alert" : undefined}>
          {firstError ?? "We'll answer you, usually within a day."}
        </p>
        <button
          type="submit"
          disabled={pending}
          className="group inline-flex shrink-0 items-center justify-between gap-3 self-start rounded-full bg-gradient-brand py-1.5 pl-6 pr-1.5 text-[15px] font-semibold text-black transition-transform hover:scale-[1.03] disabled:pointer-events-none disabled:opacity-70 sm:self-auto"
        >
          {pending ? "Sending…" : "Ask us"}
          <span className="grid h-9 w-9 place-items-center rounded-full bg-black text-brand transition-transform group-hover:rotate-45">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <path d="M7 17L17 7M8 7h9v9" />
            </svg>
          </span>
        </button>
      </div>
    </form>
  );
}

export default function ContactForm({ defaultQuestion }: { defaultQuestion?: string }) {
  const [sent, setSent] = useState(false);
  const [formKey, setFormKey] = useState(0);

  return (
    <div>
      <h2 className="text-2xl font-semibold tracking-tight sm:text-3xl">
        {sent ? "Got it, thanks!" : "Have a question?"}
      </h2>

      {sent ? (
        <div role="status" className="mt-3">
          <p className="text-[15px] leading-relaxed text-white/60">
            We&apos;ve got your question and will answer you shortly.
          </p>
          <button
            onClick={() => {
              setSent(false);
              setFormKey((k) => k + 1);
            }}
            className="mt-5 text-[15px] font-medium text-white/80 underline-offset-4 hover:text-brand hover:underline"
          >
            Ask something else
          </button>
        </div>
      ) : (
        <>
          <p className="mb-6 mt-2 text-[15px] text-white/55">
            Leave your name and number and we&apos;ll get back to you.
          </p>
          <Form key={formKey} defaultQuestion={defaultQuestion} onSent={() => setSent(true)} />
        </>
      )}
    </div>
  );
}
