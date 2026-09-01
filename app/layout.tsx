import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "PITX | Parañaque Integrated Terminal Exchange",
  description: "Experience safe, convenient, and comfortable commuting at the Philippines’ first landport.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
