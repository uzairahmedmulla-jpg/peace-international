import Logo from "./Logo";
import NewsletterForm from "./NewsletterForm";

const quickLinks = [
  { label: "Home", href: "#home" },
  { label: "About Us", href: "#about" },
  { label: "Academics", href: "#academics" },
  { label: "Admissions", href: "#admissions" },
  { label: "Campus Life", href: "#campus-life" },
  { label: "News & Events", href: "#news" },
];

const usefulLinks = [
  { label: "Parent Reviews", href: "/reviews" },
  { label: "Academic Calendar", href: "/#admissions" },
  { label: "Fee Payment", href: "#admissions" },
  { label: "Transport Services", href: "#admissions" },
  { label: "Careers", href: "#contact" },
  { label: "Privacy Policy", href: "#home" },
];

const socials = [
  {
    label: "Facebook",
    href: "https://facebook.com",
    d: "M14 9h3V6h-3c-2.2 0-4 1.8-4 4v2H7v3h3v7h3v-7h3l1-3h-4v-2c0-.6.4-1 1-1Z",
  },
  {
    label: "Instagram",
    href: "https://instagram.com",
    d: "M9 5h6a4 4 0 0 1 4 4v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4V9a4 4 0 0 1 4-4Zm3 4.2A2.8 2.8 0 1 1 9.2 12 2.8 2.8 0 0 1 12 9.2Zm3.6-.5h.01",
  },
  {
    label: "YouTube",
    href: "https://youtube.com",
    d: "M21.5 12s0-3.3-.4-4.9c-.2-.9-.9-1.6-1.8-1.8C17.6 5 12 5 12 5s-5.6 0-7.3.3c-.9.2-1.6.9-1.8 1.8C2.5 8.7 2.5 12 2.5 12s0 3.3.4 4.9c.2.9.9 1.6 1.8 1.8 1.7.3 7.3.3 7.3.3s5.6 0 7.3-.3c.9-.2 1.6-.9 1.8-1.8.4-1.6.4-4.9.4-4.9ZM10 9.5l5 2.5-5 2.5v-5Z",
  },
  {
    label: "X",
    href: "https://x.com",
    d: "M18.9 3H22l-6.8 7.8L23 21h-6.3l-4.9-6.4L6.2 21H3l7.3-8.3L1.5 3H8l4.4 5.9L18.9 3Zm-1.1 16h1.7L7.5 4.7H5.6L17.8 19Z",
  },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-foreground text-white">
      <div className="pointer-events-none absolute -top-40 left-1/4 h-80 w-80 rounded-full bg-primary/40 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-80 w-80 rounded-full bg-secondary/30 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 pt-16 pb-8 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[1.3fr_0.8fr_0.8fr_1fr]">
          <div>
            <div className="flex items-center gap-3">
              <Logo className="h-10 w-10" />
              <span className="leading-tight">
                <span className="block font-heading text-lg font-bold">Peace International</span>
                <span className="block text-xs font-medium tracking-widest text-white/60 uppercase">
                  School, Harihar
                </span>
              </span>
            </div>
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-white/70">
              Shaping Minds. Building Futures. For A Better Tomorrow — a CBSE
              school in Harihar dedicated to academic excellence, values and
              character development.
            </p>
            <div className="mt-6 flex gap-3">
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={s.label}
                  className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 transition-all duration-300 hover:-translate-y-1 hover:bg-accent"
                >
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path d={s.d} stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
                  </svg>
                </a>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold tracking-wider text-accent uppercase">
              Quick Links
            </h4>
            <ul className="mt-4 space-y-3">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-accent"
                  >
                    <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold tracking-wider text-accent uppercase">
              Useful Links
            </h4>
            <ul className="mt-4 space-y-3">
              {usefulLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="group inline-flex items-center gap-1.5 text-sm text-white/70 transition-colors hover:text-accent"
                  >
                    <span className="h-px w-0 bg-accent transition-all duration-300 group-hover:w-3" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-heading text-sm font-semibold tracking-wider text-accent uppercase">
              Contact
            </h4>
            <ul className="mt-4 space-y-3 text-sm text-white/70">
              <li>Peace International School, Harihar, Karnataka</li>
              <li>
                <a href="tel:+919876543210" className="transition-colors hover:text-accent">
                  +91 98765 43210
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@peaceinternational.edu.in"
                  className="transition-colors hover:text-accent"
                >
                  info@peaceinternational.edu.in
                </a>
              </li>
              <li>Mon – Sat · 8:30 AM – 4:30 PM</li>
            </ul>

            <div className="mt-6">
              <h4 className="font-heading text-sm font-semibold tracking-wider text-accent uppercase">
                Newsletter
              </h4>
              <p className="mt-2 text-xs text-white/60">
                Subscribe for admissions updates, events and achievements.
              </p>
              <NewsletterForm />
            </div>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row">
          <p>
            © {new Date().getFullYear()} Peace International School, Harihar. All rights reserved.
          </p>
          <p>
            Shaping Minds. <span className="text-accent">Building Futures.</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
