import { cacheLife } from "next/cache";

// Cache Components won't render a bare `new Date()`; cache the year and refresh it daily.
export default async function CurrentYear() {
  "use cache";
  cacheLife("days");
  return <>{new Date().getFullYear()}</>;
}
