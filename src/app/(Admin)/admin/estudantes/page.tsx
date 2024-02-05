import { CentralizerContainer } from "@/components/CentralizerContainer";
import { EstudantesAdmin } from "@/components/PageStrutures/Admin/Estudantes";

export default async function Admin() {
  return (
    <CentralizerContainer outhers="pt-[5rem] flex-col h-screen ">
      <EstudantesAdmin />
    </CentralizerContainer>
  );
}
