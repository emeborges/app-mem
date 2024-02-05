import { CentralizerContainer } from "@/components/CentralizerContainer";
import { MedicEditAdmin } from "@/components/PageStrutures/Admin/Medicos/EditMedic";

export default async function Admin() {
  return (
    <CentralizerContainer outhers="pt-[5rem] flex-col h-screen ">
      <MedicEditAdmin />
    </CentralizerContainer>
  );
}
