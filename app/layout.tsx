import type { Metadata } from "next";
import Providers from "./providers";
import { geistMono, geistSans } from "./fonts";

import "./globals.scss"

export const metadata: Metadata = {
  title: "SocialPeak",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
