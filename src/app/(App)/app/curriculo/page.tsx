import { CentralizerContainer } from "@/components/CentralizerContainer";
import { Curriculo } from "@/components/PageStrutures/Curriculo";

import { getServerSession } from "next-auth";

export default async function PerfilUser() {
  return (
    <CentralizerContainer outhers="pt-[5rem] flex-col h-screen">
      <Curriculo />
    </CentralizerContainer>
  );
}
