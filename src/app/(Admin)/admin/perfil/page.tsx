import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { CentralizerContainer } from "@/components/CentralizerContainer";
import { PerfilAdmin } from "@/components/PageStrutures/Admin/Perfil";

import { getServerSession } from "next-auth";

export default async function PerfilUser() {
  const session = await getServerSession(nextAuthOptions)

  return (
    <CentralizerContainer outhers="pt-[5rem] flex-col h-screen">
      <PerfilAdmin session={session} />
    </CentralizerContainer>
  );
}
