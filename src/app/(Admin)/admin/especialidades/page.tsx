import { CentralizerContainer } from "@/components/CentralizerContainer";
import { EspecialidadesAdmin } from "@/components/PageStrutures/Admin/Especialidades";

export default async function Admin() {
  return (
    <CentralizerContainer outhers="pt-[5rem] flex-col h-screen ">
      <EspecialidadesAdmin />
    </CentralizerContainer>
  );
}
