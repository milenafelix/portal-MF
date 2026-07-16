import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

// Importando o  Header e footer
import Header from "../src/components/Header";
import Footer from "../src/components/Footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "Portal MF",
    template: "%s | Portal MF",
  },
  description: "As melhores notícias de cultura pop, resenhas e críticas em um só lugar.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.className} flex flex-col min-h-screen bg-black`}>
        <Header />
        
        {/* O conteúdo da página fica aqui no meio e ocupa o espaço que sobrar */}
        <div className="flex-grow">
          {children}
        </div>

        <Footer /> {/* <- Adicione aqui no final! */}
      </body>
    </html>
  );
}