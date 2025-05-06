import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Gargash Motors",
  description: "Premium luxury vehicles at Gargash Motors",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} min-h-screen bg-background antialiased`}
      >
        <Toaster position="top-center" />
        <div className="relative flex min-h-screen flex-col">
          <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
            <div className="container flex h-16 items-center justify-between">
              <div className="flex items-center gap-2 font-bold">
                <span className="text-xl">Gargash Motors</span>
              </div>
              <nav className="hidden md:flex items-center gap-6">
                <a href="/" className="text-sm font-medium transition-colors hover:text-primary">Home</a>
                <a href="/cars" className="text-sm font-medium transition-colors hover:text-primary">Cars</a>
                <a href="/test-drive" className="text-sm font-medium transition-colors hover:text-primary">Test Drive</a>
                <a href="/about" className="text-sm font-medium transition-colors hover:text-primary">About Us</a>
                <a href="/contact" className="text-sm font-medium transition-colors hover:text-primary">Contact</a>
                <a href="/ai-assistant" className="text-sm font-medium transition-colors hover:text-primary">AI Assistant</a>
              </nav>
              <div className="flex items-center gap-4">
                <a href="/auth/login" className="text-sm font-medium hover:underline">Sign In</a>
              </div>
            </div>
          </header>
          <main className="flex-1">{children}</main>
          <footer className="border-t bg-background py-6">
            <div className="container flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="text-sm text-muted-foreground">
                © {new Date().getFullYear()} Gargash Motors. All rights reserved.
              </p>
              <div className="flex gap-4">
                <a href="/terms" className="text-sm text-muted-foreground hover:underline">
                  Terms
                </a>
                <a href="/privacy" className="text-sm text-muted-foreground hover:underline">
                  Privacy
                </a>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
