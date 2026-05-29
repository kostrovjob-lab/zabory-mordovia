import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileStickyBar from "@/components/MobileStickyBar";
import SchemaMarkup from "@/components/SchemaMarkup";
import YandexMetrika from "@/components/YandexMetrika";
import { localBusinessSchema } from "@/lib/seo";
import { SITE_NAME } from "@/lib/constants";

const inter = Inter({ subsets: ["latin", "cyrillic"], variable: "--font-inter" });

export const metadata: Metadata = {
  metadataBase: new URL("https://zabory-mordovia.ru"),
  title: { default: SITE_NAME, template: `%s | ${SITE_NAME}` },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className={`${inter.variable} font-sans pb-20 md:pb-0`}>
        <SchemaMarkup data={localBusinessSchema()} />
        <YandexMetrika />
        <Header />
        <main>{children}</main>
        <Footer />
        <MobileStickyBar />
      </body>
    </html>
  );
}
