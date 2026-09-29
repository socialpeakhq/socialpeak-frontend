import type { Metadata } from "next";
import Providers from "./providers";
import { inter, plusJakartaSans } from "./fonts";
import AlertPopUp from "@/components/shared/Alert";
import AppDialog from "@/components/shared/AppDialog";

import "./globals.scss";

export const metadata: Metadata = {
  title: "SocialPeak",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${inter.variable} ${plusJakartaSans.variable}`}
      suppressHydrationWarning
    >
      <body className="antialiased">
        <Providers>
          {children}
          <AlertPopUp />
          <AppDialog />
        </Providers>
      </body>
    </html>
  );
}
