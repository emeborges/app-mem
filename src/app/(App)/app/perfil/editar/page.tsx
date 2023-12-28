import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { CentralizerContainer } from "@/components/CentralizerContainer";
import { EditarPerfil } from "@/components/PageStrutures/EditarPerfil";


import { getServerSession } from "next-auth";

export default async function Editar() {
  const session = await getServerSession(nextAuthOptions)

  return (
    <CentralizerContainer outhers="pt-[5rem] flex-col h-screen">
      <EditarPerfil scope={session?.scope} />
    </CentralizerContainer>
  );
}
