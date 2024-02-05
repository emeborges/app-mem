import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { CentralizerContainer } from "@/components/CentralizerContainer";
import { EstudantesAdmin } from "@/components/PageStrutures/Admin/Estudantes";
import { getServerSession } from "next-auth";

export default async function Admin() {
  return (
    <CentralizerContainer outhers="pt-[5rem] flex-col h-screen ">
      <EstudantesAdmin />
    </CentralizerContainer>
  );
}
