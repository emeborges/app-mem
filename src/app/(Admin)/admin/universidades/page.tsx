
import { CentralizerContainer } from "@/components/CentralizerContainer";
import { UniversidadesAdmin } from "@/components/PageStrutures/Admin/Universidades";


export default async function Admin() {
  return (
    <CentralizerContainer outhers="pt-[5rem] flex-col h-screen ">
      <UniversidadesAdmin />
    </CentralizerContainer>
  );
}
