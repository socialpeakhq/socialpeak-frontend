import { Inter, Plus_Jakarta_Sans } from "next/font/google";

// Both are variable fonts — leaving `weight` out loads every weight, so bold
// text isn't synthesized by the browser

export const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta-sans",
  subsets: ["latin"],
});
