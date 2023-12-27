import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { CentralizerContainer } from "@/components/CentralizerContainer";
import { Perfil } from "@/components/PageStrutures/Perfil";

import { getServerSession } from "next-auth";

export default async function PerfilUser() {
  const session = await getServerSession(nextAuthOptions)

  return (
    <CentralizerContainer outhers="pt-[5rem] flex-col h-screen">
      <Perfil scope={session?.scope} />
    </CentralizerContainer>
  );
}
