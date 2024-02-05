import { ReactNode } from "react";


interface PrivateLayoutProps {
	children: ReactNode
}

export const metadata = {
	title: "Universidades | Admin | MeuEstagioMed",
  };

export default async function RootLayout({ children }: PrivateLayoutProps){

	return <>{children}</>
}