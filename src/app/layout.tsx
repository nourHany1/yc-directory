import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/global/Navbar";
import "easymde/dist/easymde.min.css";

export const metadata: Metadata = {
  title: "YC Directory",
  description: "Pitch, vote and Grow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`antialiased`}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
