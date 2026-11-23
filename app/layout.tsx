import type { Metadata, Viewport } from "next";
import "./globals.css";
import { AppProviders } from "./components/AppProviders";

export const metadata: Metadata = {
  title: {
    default: "OneAtlas AI | AI Model Intelligence",
    template: "%s | OneAtlas AI",
  },
  description: "Discover, evaluate and compare AI models from leading providers in one workspace.",
  applicationName: "OneAtlas AI",
  keywords: ["AI models", "model comparison", "AI providers", "LLM pricing", "AI discovery"],
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#090d18",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>
        <AppProviders>{children}</AppProviders>
      </body>
    </html>
  );
}
