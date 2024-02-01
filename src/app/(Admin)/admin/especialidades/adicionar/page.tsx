import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { CentralizerContainer } from "@/components/CentralizerContainer";
import { EspecialidadesForm } from "@/components/Forms/Especialidade/EspecialidadesForm";
import { getServerSession } from "next-auth";

export default async function Admin() {
  const session = await getServerSession(nextAuthOptions);
  return (
    <CentralizerContainer outhers="pt-[5rem] flex-col h-screen ">
      <div className="rounded-lg full border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
        <EspecialidadesForm />
      </div>
    </CentralizerContainer>
  );
}
