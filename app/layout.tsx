
import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "OneAtlas AI | Discover AI Models",
  description:
    "Discover, explore, and compare AI models from leading providers in one platform.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
