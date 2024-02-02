import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "../../api/auth/[...nextauth]/route";

interface PrivateLayoutProps {
	children: ReactNode
}

export const metadata = {
	title: "Painel | MeuEstagioMed",
  };

export default async function PrivateLayout({ children }: PrivateLayoutProps){
	const session = await getServerSession(nextAuthOptions)

	if (!session) {
		redirect('/')
	}

	if(session.scope === 'admin') {
		redirect('/admin')
	}

	return <>{children}</>
}