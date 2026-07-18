import clsx from "clsx";

export const inputClassName =
  "w-full px-4 py-3 rounded-lg border bg-white text-[#0F172A] text-sm transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#F97316] min-h-[44px]";

export function getInputClasses(hasError) {
  return clsx(
    inputClassName,
    hasError
      ? "border-red-300 focus-visible:ring-red-400"
      : "border-slate-200 hover:border-slate-300"
  );
}
