import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { CentralizerContainer } from "@/components/CentralizerContainer";
import { EstudantesAdmin } from "@/components/PageStrutures/Admin/Estudantes";
import { EstudanteEditAdmin } from "@/components/PageStrutures/Admin/Estudantes/EditEstudantes";
import { MedicosAdmin } from "@/components/PageStrutures/Admin/Medicos";
import { MedicEditAdmin } from "@/components/PageStrutures/Admin/Medicos/EditMedic";
import { UserAdmin } from "@/components/PageStrutures/Admin/Users/Users";
import { MedicHomePage } from "@/components/PageStrutures/AuthHome/MedicHomePage";
import { StudentHomePage } from "@/components/PageStrutures/AuthHome/StudentHomePage";
import { getServerSession } from "next-auth";
import { useParams } from "next/navigation";

export default async function Admin() {
  const session = await getServerSession(nextAuthOptions);
  
  return (
    <CentralizerContainer outhers="pt-[5rem] flex-col h-screen ">
      <EstudanteEditAdmin  />
    </CentralizerContainer>
  );
}
