import type { Metadata, Viewport } from "next";
import { Space_Grotesk, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#0d0e10",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  metadataBase: new URL("https://vecta-engineering.com"),
  title: "VECTA // Engenharia Estrutural e Civil AG — Zurique · Londres · Nova York",
  description:
    "Engenharia, construção e execução de projetos para infraestruturas monumentais, balanços cinéticos e torres superaltas monolíticas de alta permanência. Validação SIA-142 e EN 1990.",
  keywords: [
    "Engenharia Estrutural",
    "Engenharia Civil",
    "Núcleos de Torres Superaltas",
    "Análise de Elementos Finitos",
    "Balanços Cinéticos",
    "Vecta Structural AG",
    "Engenharia Zurique",
  ],
  authors: [{ name: "Vecta Structural Engineering AG" }],
  openGraph: {
    title: "VECTA // Engenharia Estrutural e Civil AG",
    description: "A engenharia que ganha forma. Permanência monolítica em ambientes complexos.",
    url: "https://vecta-engineering.com",
    siteName: "Vecta Engenharia Estrutural e Civil",
    images: [
      {
        url: "/images/riverfront_citadel.jpg",
        width: 1920,
        height: 1080,
        alt: "Vecta Engenharia Estrutural — Riverfront Citadel",
      },
    ],
    locale: "pt_BR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "VECTA // Engenharia Estrutural e Civil AG",
    description: "A engenharia que ganha forma. Permanência monolítica em ambientes complexos.",
    images: ["/images/riverfront_citadel.jpg"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="pt-BR"
      className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrainsMono.variable} dark h-full bg-[#0d0e10]`}
    >
      <body className="min-h-full flex flex-col bg-[#0d0e10] text-[#e3e2e5] font-sans antialiased selection:bg-[#c5a880] selection:text-[#281800]">
        {children}
      </body>
    </html>
  );
}

