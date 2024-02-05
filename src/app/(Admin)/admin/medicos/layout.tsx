import { ReactNode } from "react";


interface PrivateLayoutProps {
	children: ReactNode
}

export const metadata = {
	title: "Médicos | Admin | MeuEstagioMed",
  };

export default async function RootLayout({ children }: PrivateLayoutProps){

	return <>{children}</>
}