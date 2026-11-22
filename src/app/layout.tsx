import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en" className="scroll-smooth">
      <body className="antialiased font-sans bg-white text-[#0B1220]">
        {children}
      </body>
    </html>
  );
}
