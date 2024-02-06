"use client";

import { TrocarSenha } from "../../Perfil/ModalTrocarSenha";
import { Session } from "next-auth";

interface Props {
  session?: Session | null;
}

export const PerfilAdmin = ({ session }: Props) => {

  return (
    <div className="h-full w-full ">
      <div className="rounded-lg full border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
        <div className="flex items-center flex-col w-full justify-between">
          <div className="px-4 py-2">
            <div>
              <div>
                <p>Nome:</p>
              </div>
              <h3 className="text-3xl">{session?.name}</h3>
            </div>
          </div>
          <div className="px-4 py-2">
            <div>
              <div>
                <p>Email:</p>
              </div>
              <h3 className="text-xl">{session?.email}</h3>
            </div>
          </div>
        </div>

        <div className="flex flex-col w-full gap-2 items-center justify-center">
          <TrocarSenha />
        </div>
      </div>
    </div>
  );
};
