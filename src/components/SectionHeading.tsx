import Reveal from "./Reveal";

type SectionHeadingProps = {
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  light?: boolean;
};

export default function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  light = false,
}: SectionHeadingProps) {
  return (
    <Reveal
      className={`max-w-2xl ${
        align === "center" ? "mx-auto text-center" : "text-left"
      }`}
    >
      <span className="inline-flex items-center gap-2 text-sm font-semibold tracking-wide text-accent uppercase">
        <span className="h-px w-6 bg-accent" />
        {eyebrow}
        {align === "center" && <span className="h-px w-6 bg-accent" />}
      </span>
      <h2
        className={`mt-3 font-heading text-3xl font-bold text-balance sm:text-4xl ${
          light ? "text-white" : "text-foreground"
        }`}
      >
        {title}
      </h2>
      {description && (
        <p
          className={`mt-4 text-lg leading-relaxed ${
            light ? "text-white/80" : "text-foreground/70"
          }`}
        >
          {description}
        </p>
      )}
    </Reveal>
  );
}
