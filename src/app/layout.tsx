import type { Metadata } from "next";
import { Poppins, Inter } from "next/font/google";
import { ApplyProvider } from "@/components/apply/ApplyContext";
import ApplyModal from "@/components/apply/ApplyModal";
import "./globals.css";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Peace International School, Harihar | Shaping Minds. Building Futures.",
  description:
    "Peace International School, Harihar — Shaping Minds. Building Futures. For A Better Tomorrow. Structured curriculum, experienced faculty, and a vibrant campus life.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <ApplyProvider>
          {children}
          <ApplyModal />
        </ApplyProvider>
      </body>
    </html>
  );
}
