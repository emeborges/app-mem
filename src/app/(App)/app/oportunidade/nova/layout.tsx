import { getServerSession } from "next-auth";
import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";

interface PrivateLayoutProps {
	children: ReactNode
}

export const metadata = {
	title: "Nova Oportunidade | MeuEstagioMed",
  };

export default async function NewVagaLayout({ children }: PrivateLayoutProps){
	const session = await getServerSession(nextAuthOptions)

	if (session?.scope === 'student') {
		redirect('/app')
	}

	return <>{children}</>
}