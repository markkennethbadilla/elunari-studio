import type { Metadata, Viewport } from "next";
import { ThemeProvider } from "next-themes";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import "./globals.css";

export const metadata: Metadata = {
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
  openGraph: {
    type: "website",
    locale: "en_US",
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
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: dark)", color: "#030712" },
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
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
