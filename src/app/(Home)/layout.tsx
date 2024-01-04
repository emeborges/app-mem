import { Menubar } from "@/components/ui/menubar";
import "../globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Link from "next/link";
import { MenuItensHome } from "@/utils/menuitens";
import Image from "next/image";
import { CentralizerContainer } from "@/components/CentralizerContainer";
import { LoginList } from "@/components/MemNav/LoginList";
import { HamburguerMenu } from "@/components/MemNav/MenuHamburguer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Início | MeuEstagioMed ",
};

export default function HomeRootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="scrool-smooth">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className={`${inter.className}`}>
        <Menubar>
          <CentralizerContainer>
            <div>
              <Link
                href={"/"}
                className=" transition duration-500 ease-in-out border-b-4 border-transparent hover:border-primary"
              >
                <Image src="/MEM_BLUE.svg" alt="logo" height={50} width={120} />
              </Link>
            </div>
            <div className="hidden md:flex space-x-4 ">
              {MenuItensHome.map((item) => (
                <Link
                  key={item.route}
                  href={item.route}
                  className=" transition duration-500 ease-in-out border-b-4 border-transparent hover:border-primary"
                >
                  {item.item}
                </Link>
              ))}
            </div>
            <div className="hidden md:flex">
              <LoginList />
            </div>
            <HamburguerMenu />
          </CentralizerContainer>
        </Menubar>
        {children}
      </body>
    </html>
  );
}
