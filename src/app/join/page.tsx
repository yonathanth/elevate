import type { Metadata } from "next";
import { Suspense } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import JoinForm from "@/components/JoinForm";
import { PHONES } from "@/lib/contact";
import { CATEGORIES } from "@/lib/offerings";

export const metadata: Metadata = {
  title: "Join — Elevate Gym",
  description:
    "Become a member of Elevate Gym, the biggest gym in Ethiopia & East Africa. Open 24/7 at Mount Moriah Mall, Ayat.",
};

// /join?interest=combat&offering=Muay%20Thai (from "Book now" on /offerings) shows that
// offering in place of the interest pills. Only names that exist in the category are
// accepted. Reading searchParams is request-time data, so this streams in under <Suspense>.
async function PreselectedJoinForm({
  searchParams,
}: {
  searchParams: PageProps<"/join">["searchParams"];
}) {
  const { interest, offering } = await searchParams;
  const category = CATEGORIES.find((c) => c.id === interest);
  if (!category) return <JoinForm />;

  const item = category.items.find((i) => i.name === offering);
  return (
    <JoinForm
      selection={{
        label: item?.name ?? category.title,
        value: item ? `${item.name} (${category.title})` : category.title,
        categoryTitle: category.title,
      }}
    />
  );
}

export default function JoinPage(props: PageProps<"/join">) {
  const phone = PHONES[0];

  return (
    <main>
      <Header />

      <section className="relative flex min-h-svh items-center overflow-hidden px-6 py-32 md:px-12">
        {/* Soft brand glow behind the form */}
        <div
          aria-hidden
          className="pointer-events-none absolute left-1/2 top-1/2 h-[520px] w-[820px] max-w-[140vw] -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand/10 blur-[120px]"
        />

        <div className="relative mx-auto w-full max-w-3xl text-center">
          <h1 className="rise text-4xl font-semibold tracking-tight sm:text-5xl">
            Join Elevate.
          </h1>
          <p
            className="rise mx-auto mt-4 max-w-md text-[15px] leading-relaxed text-white/65 sm:text-base"
            style={{ animationDelay: "100ms" }}
          >
            Leave your name and number. We&apos;ll handle the rest.
          </p>

          <div className="rise mt-10" style={{ animationDelay: "200ms" }}>
            <Suspense fallback={<JoinForm />}>
              <PreselectedJoinForm searchParams={props.searchParams} />
            </Suspense>
          </div>

          <p
            className="rise mt-8 text-sm text-white/45"
            style={{ animationDelay: "300ms" }}
          >
            Rather talk?{" "}
            <a
              href={`tel:${phone.tel}`}
              className="font-medium text-white/80 underline-offset-4 hover:text-brand hover:underline"
            >
              Call {phone.display}
            </a>
          </p>
        </div>
      </section>

      <Footer />
    </main>
  );
}
