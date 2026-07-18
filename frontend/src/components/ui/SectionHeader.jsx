import clsx from "clsx";

function SectionHeader({
  eyebrow,
  title,
  description,
  align = "center",
  className,
}) {
  const isCenter = align === "center";

  return (
    <div
      className={clsx(
        "mb-16",
        isCenter ? "text-center" : "text-left",
        className
      )}
    >
      {eyebrow && (
        <p className="text-xs sm:text-sm font-bold tracking-[0.2em] text-[#F97316] uppercase mb-4">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-[40px] font-extrabold text-[#0F172A] leading-tight tracking-tight mb-4">
        {title}
      </h2>
      {description && (
        <p
          className={clsx(
            "text-[#334155] text-base md:text-lg leading-relaxed",
            isCenter && "max-w-3xl mx-auto"
          )}
        >
          {description}
        </p>
      )}
    </div>
  );
}

export default SectionHeader;
