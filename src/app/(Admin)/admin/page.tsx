import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { CentralizerContainer } from "@/components/CentralizerContainer";

import { getServerSession } from "next-auth";

export default async function Admin() {
  const session = await getServerSession(nextAuthOptions);
  return (
    <CentralizerContainer outhers="pt-[5rem] flex-col h-screen text-center items-center">
      <div className=" mt-20">
        Bem Vindo a <br />
        <p className="font-bold">Área Administrativa</p>
      </div>
    </CentralizerContainer>
  );
}
