import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { CentralizerContainer } from "@/components/CentralizerContainer";
import { OportunidadesAdmin } from "@/components/PageStrutures/Admin/Oportunidades/StudentHomePage";
import { getServerSession } from "next-auth";

export default async function Admin() {
  const session = await getServerSession(nextAuthOptions);
  return (
    <CentralizerContainer outhers="pt-[5rem] flex-col h-screen ">
      <OportunidadesAdmin session={session} />
    </CentralizerContainer>
  );
}
