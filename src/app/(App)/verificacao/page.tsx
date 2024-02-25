import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";

export default async function Page() {
  const session = await getServerSession(nextAuthOptions);
  return (
    <div className="pt-[5rem] flex flex-col h-screen items-center justify-center">
      <div className="max-w-[500px] break-all text-center">
        <p>Olá, {session?.name.toLocaleUpperCase()}.</p>
        <p className="pt-2">
          Nossa equipe está verificando suas informações de cadastro para
          garantir a seguraça de nossa página. Quando tudo estiver pronto,
          enviaremos um e-mail para te alertar. Essa operação deve durar
          aproximadamente 30 minutos
        </p>
        <p className="pt-2">Muito obrigado,</p>
        <p className="pt-2">Equipe MEM.</p>
      </div>
    </div>
  );
}
