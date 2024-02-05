import { CentralizerContainer } from "@/components/CentralizerContainer";
import { EditUniversidadeAdmin } from "@/components/PageStrutures/Admin/Universidades/EditUniversidade";

export default async function Admin() {
  return (
    <CentralizerContainer outhers="pt-[5rem] flex-col h-screen ">
      <div className="rounded-lg full border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
        <EditUniversidadeAdmin />
      </div>
    </CentralizerContainer>
  );
}
