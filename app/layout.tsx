import type { Metadata } from "next";
import { Inter, Noto_Sans_JP } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const notoSansJP = Noto_Sans_JP({
  variable: "--font-noto-sans-jp",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "GalaxyMind — 模索する、すべてのひとへ",
  description:
    "誰もが、自らの内なる好奇心に出会い、自分だけの夢を語れる社会へ。GalaxyMindは理念駆動型プラットフォームです。",
  openGraph: {
    title: "GalaxyMind — 模索する、すべてのひとへ",
    description:
      "誰もが、自らの内なる好奇心に出会い、自分だけの夢を語れる社会へ。",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ja">
      <body
        className={`${inter.variable} ${notoSansJP.variable} font-sans antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
