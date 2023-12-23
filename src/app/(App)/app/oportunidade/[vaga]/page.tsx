import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { CentralizerContainer } from "@/components/CentralizerContainer";
import { Oportunity } from "@/components/PageStrutures/Oportunity";
import { getServerSession } from "next-auth";

export default async function VagaDetalhes() {
  const session = await getServerSession(nextAuthOptions);

  return (
    <CentralizerContainer outhers="h-screen pt-[5.5rem] pb-2 w-full">
      <Oportunity session={session} />
    </CentralizerContainer>
  );
}
