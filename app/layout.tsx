import "./globals.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import NextAuthProvider from "@/lib/auth/Provider";
import { Toaster } from "@/components/ui/toaster";

const inter = Poppins({
  subsets: ["latin"],
  weight: ["200", "400", "700", "900"],
});

export const metadata: Metadata = {
  title: "Lainh - Discord",
  description: "Discord app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NextAuthProvider>
          {children}
          <Toaster />
        </NextAuthProvider>
      </body>
    </html>
  );
}
