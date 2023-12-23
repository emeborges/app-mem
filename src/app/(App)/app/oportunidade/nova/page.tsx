import { CentralizerContainer } from "@/components/CentralizerContainer";
import { OportunidadeForm } from "@/components/Forms/CreateOportunity";

export default async function NovaVaga() {
  

  return (
    <CentralizerContainer outhers="pt-[5rem]">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
        <OportunidadeForm session={null} />
      </div>
    </CentralizerContainer>
  );
}
