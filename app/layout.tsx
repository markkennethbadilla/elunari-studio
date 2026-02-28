import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://studio.elunari.uk"),
  title: {
    default: "Elunari Studio | Web Development That Converts",
    template: "%s | Elunari Studio",
  },
  description:
    "Tell us your vision — via text, voice, video, or sketch. Our AI-powered process turns your ideas into stunning, high-converting websites. Free templates. Transparent pricing.",
  keywords: [
    "web development",
    "freelance web developer",
    "website builder",
    "custom website",
    "AI web design",
    "Elunari",
    "web studio",
  ],
  authors: [{ name: "Elunari Studio" }],
  manifest: "/manifest.json",
  icons: {
    icon: [
      { url: "/favicon.ico", sizes: "48x48" },
      { url: "/icon-192.png", sizes: "192x192", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://studio.elunari.uk",
    siteName: "Elunari Studio",
    title: "Elunari Studio | Web Development That Converts",
    description:
      "Tell us your vision any way you want. We build websites that convert.",
  },
  twitter: {
    card: "summary_large_image",
    title: "Elunari Studio | Web Development That Converts",
    description:
      "Tell us your vision any way you want. We build websites that convert.",
  },
  alternates: {
    canonical: "https://studio.elunari.uk",
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#0c0a09" },
    { media: "(prefers-color-scheme: light)", color: "#fafaf9" },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <ThemeProvider attribute="class" defaultTheme="dark" enableSystem>
          <Navbar />
          <main className="min-h-screen">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
