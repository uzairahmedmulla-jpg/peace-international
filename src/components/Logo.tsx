export default function Logo({ className = "h-10 w-10" }: { className?: string }) {
  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/school-logo.jpg"
      alt="Peace International School, Harihar logo"
      className={`${className} rounded-xl object-cover shadow-[0_4px_16px_rgba(23,26,58,0.2)]`}
    />
  );
}
