"use client";

import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";

interface Props {
  handleChangeUserType: (id: number, stepNumber?: number) => void;
}

const users = [
  { id: 0, label: "Médico", img: "/medico.svg" },
  { id: 1, label: "Estudante", img: "/estudante.svg" },
];

export const UserTypes = ({handleChangeUserType}: Props) => {
  return (
    <div className="flex flex-col md:w-full">
      <CardContent className="flex py-2 gap-2">
        {users.map(x => <Card
          onClick={() => handleChangeUserType(x.id, 1)}
          key={x.id}
          className=" w-[50%] h-[10rem] flex flex-col justify-around hover:bg-hover cursor-pointer"
        >
          <div>
            <Image
              src={x.img}
              height={120}
              width={120}
              alt="imagem_tipo_medico"
              className="m-auto"
            />
          </div>
          <div className="text-center w-full">
            <text className={"text-lg "}>{x.label}</text>
          </div>
        </Card>)}
        
      </CardContent>
    </div>
  );
};
