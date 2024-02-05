import { CentralizerContainer } from "@/components/CentralizerContainer";

import { EstudanteEditAdmin } from "@/components/PageStrutures/Admin/Estudantes/EditEstudantes";

export default async function Admin() {
  return (
    <CentralizerContainer outhers="pt-[5rem] flex-col h-screen ">
      <EstudanteEditAdmin />
    </CentralizerContainer>
  );
}
