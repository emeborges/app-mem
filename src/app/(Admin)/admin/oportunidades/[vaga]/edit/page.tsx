import { CentralizerContainer } from "@/components/CentralizerContainer";
import { OportunidadeForm } from "@/components/Forms/CreateOportunity";
import EditOportunity from "@/components/PageStrutures/EditOportunity";

export default async function EditVaga() {
  return (
    <CentralizerContainer align="items-start" outhers="h-screen pt-[5.5rem] pb-2 w-full ">
      <EditOportunity />
    </CentralizerContainer>
  );
}
