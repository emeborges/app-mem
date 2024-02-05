
import { CentralizerContainer } from "@/components/CentralizerContainer";
import { MinhasInscricoes } from "@/components/PageStrutures/MinhasInscricoes";



export default async function InscricoesUser() {

  return (
    <CentralizerContainer outhers="pt-[5rem] flex-col h-screen">
      <div className="rounded-lg border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
        <MinhasInscricoes />
      </div>
    </CentralizerContainer>
  );
}
