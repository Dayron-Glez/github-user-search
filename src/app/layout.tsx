import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import NavBar from "./components/NavBar";

const space_grotesk = Space_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "DevFinder",
  description: "Search and explore GitHub user profiles",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={space_grotesk.className}>
        <div
          className="bg-orbs theme-transition min-h-screen flex items-center justify-center px-4"
          style={{ backgroundColor: "var(--color-bg-primary)" }}
        >
          <div className="relative z-10 w-full max-w-240 py-8">
            <NavBar />
            {children}
          </div>
        </div>
      </body>
    </html>
  );
}
