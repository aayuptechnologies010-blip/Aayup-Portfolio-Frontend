import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-jakarta",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Aayup Technologies | Official Portfolio & Engineering Showcase",
  description:
    "Official agency portfolio of Aayup Technologies Pvt. Ltd. Leading software development, custom CRM/ERP, mobile apps, and enterprise AI automation.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`scroll-smooth ${jakarta.variable}`}>
      <body className="antialiased font-sans bg-white text-[#0B1220]">
        {children}
      </body>
    </html>
  );
}
