import type { Metadata } from "next";
import { JetBrains_Mono, Source_Sans_3 } from "next/font/google";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { SkipLink } from "@/components/layout/SkipLink";
import { StructuredData } from "@/components/seo/StructuredData";
import { buildSearchIndex } from "@/lib/calculator-search-index";
import { defaultMetadata } from "@/lib/metadata";
import {
  getOrganizationSchema,
  getWebSiteSchema,
} from "@/lib/structured-data";
import "./globals.css";

const sourceSans = Source_Sans_3({
  variable: "--font-source-sans",
  subsets: ["latin"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = defaultMetadata;

export default function RootLayout({ children }: LayoutProps<"/">) {
  const structuredData = [getOrganizationSchema(), getWebSiteSchema()];
  const searchIndex = buildSearchIndex();

  return (
    <html
      lang="en"
      className={`${sourceSans.variable} ${jetbrainsMono.variable} h-full antialiased`}
    >
      <body className="flex min-h-full flex-col">
        <StructuredData data={structuredData} />
        <SkipLink />
        <Header searchIndex={searchIndex} />
        <main id="main-content" className="flex-1">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
