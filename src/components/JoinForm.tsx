"use client";

import { useActionState, useState } from "react";
import Link from "next/link";
import { requestMembership, type JoinState } from "@/app/join/actions";
import { CATEGORIES } from "@/lib/offerings";
import { inputClass } from "@/lib/form";

export type JoinSelection = {
  /** Shown on the chip, e.g. "Muay Thai" */
  label: string;
  /** Submitted with the request, e.g. "Muay Thai (Combat sports)" */
  value: string;
  /** Pre-checked if the visitor switches back to the pills */
  categoryTitle: string;
};

function Form({ selection, onSent }: { selection?: JoinSelection; onSent: () => void }) {
  // Coming from an offering, show that choice instead of the pills until the visitor changes it
  const [showPicker, setShowPicker] = useState(!selection);
  const [state, action, pending] = useActionState<JoinState, FormData>(
    async (prev, formData) => {
      const next = await requestMembership(prev, formData);
      if (next.status === "success") onSent();
      return next;
    },
    { status: "idle" },
  );
  const v = state.values ?? {};
  const e = state.errors ?? {};
  const firstError = e.name ?? e.phone;
  const border = (key: keyof typeof e) => (e[key] ? "border-red-400/70" : "border-white/10");

  return (
    <form action={action} noValidate className="flex flex-col items-center">
      <div className="grid w-full gap-3 sm:grid-cols-2">
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

      {selection && !showPicker ? (
        <div className="mt-6 flex flex-col items-center">
          <p className="text-sm font-medium text-white/75">You&apos;re joining for</p>
          <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-gradient-brand py-1.5 pl-4 pr-1.5 text-sm font-semibold text-black">
            {selection.label}
            <button
              type="button"
              onClick={() => setShowPicker(true)}
              aria-label={`Change from ${selection.label}`}
              className="grid h-6 w-6 place-items-center rounded-full bg-black/10 transition-colors hover:bg-black/25"
            >
              <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" aria-hidden>
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            </button>
          </div>
          <input type="hidden" name="interests" value={selection.value} />
        </div>
      ) : (
        <fieldset className="mt-6 w-full">
          <legend className="mx-auto text-sm font-medium text-white/75">
            What are you into? <span className="font-normal text-white/40">Optional</span>
          </legend>
          <div className="mt-3 flex flex-wrap justify-center gap-1.5 sm:gap-2">
            {CATEGORIES.map((c) => (
              <label key={c.id} className="cursor-pointer">
                <input
                  type="checkbox"
                  name="interests"
                  value={c.title}
                  defaultChecked={
                    v.interests?.includes(c.title) || c.title === selection?.categoryTitle
                  }
                  className="peer sr-only"
                />
                <span className="inline-flex items-center rounded-full border border-white/10 px-3.5 py-1.5 text-[13px] font-medium text-white/70 transition-colors hover:text-white peer-checked:border-transparent peer-checked:bg-gradient-brand peer-checked:text-black peer-focus-visible:ring-2 peer-focus-visible:ring-brand sm:px-4 sm:py-2 sm:text-sm">
                  {c.short}
                </span>
              </label>
            ))}
          </div>
        </fieldset>
      )}

      <button
        type="submit"
        disabled={pending}
        className="group mt-8 inline-flex w-full items-center justify-between gap-3 rounded-full bg-gradient-brand py-2 pl-7 pr-2 text-base font-semibold text-black transition-transform hover:scale-[1.02] disabled:pointer-events-none disabled:opacity-70 sm:w-80"
      >
        {pending ? "Sending…" : "Join now"}
        <span className="grid h-10 w-10 place-items-center rounded-full bg-black text-brand transition-transform group-hover:rotate-45">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M7 17L17 7M8 7h9v9" />
          </svg>
        </span>
      </button>

      {firstError && (
        <p role="alert" className="mt-3 text-sm text-red-400">
          {firstError}
        </p>
      )}
    </form>
  );
}

export default function JoinForm({ selection }: { selection?: JoinSelection }) {
  const [sent, setSent] = useState(false);

  if (sent) {
    return (
      <div role="status" className="flex flex-col items-center">
        <span className="bg-gradient-brand grid h-12 w-12 place-items-center rounded-full text-black">
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M5 12l5 5L20 7" />
          </svg>
        </span>
        <p className="mt-4 text-2xl font-semibold tracking-tight">You&apos;re in.</p>
        <p className="mt-2 text-[15px] text-white/60">
          We&apos;ll reach out shortly to set up your membership.
        </p>
        <Link
          href="/offerings"
          className="mt-5 text-[15px] font-medium text-white/80 underline-offset-4 hover:text-brand hover:underline"
        >
          Explore our offerings
        </Link>
      </div>
    );
  }

  return <Form selection={selection} onSent={() => setSent(true)} />;
}
