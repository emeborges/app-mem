"use client";

import ButtonLogout from "@/components/ButtonLogout";
import { Button } from "@/components/ui/button";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import axios from "axios";
import { getServerSession } from "next-auth";
import { useState } from "react";

export default function Admin() {
  const [dados, setDados] = useState<any>();
  const axiosAuth = useAxiosAuth();
  console.log("session");

  const fetchMe = async () => {
    const res = await axiosAuth.get("/me");

    setDados(res.data);
  };

  const postData = async () => {
    const res = await axiosAuth.post("/opening", {
      opening: {
        location: { id: "kmci9wPqZgf4o38fkQkrrK" },
        speciality: "Dermatologia",
        activities: ["Cirurgia"],
        due_date: "2023-12-20T03:00:00.000Z",
        start_date: "2023-12-21T03:00:00.000Z",
        end_date: "2023-12-29T03:00:00.000Z",
        school_term_min: 11,
        school_term_max: 12,
        total_hours: 12331,
        description: "1233",
        name: "Estágio em Dermatologia",
      },
    });
  };
  console.log(dados);
  return (
    <div className="w-full h-screen flex flex-col items-center justify-center">
      <h1 className="text-2xl mb-8">Olá, Bem vindo(a)!</h1>
      <ButtonLogout />
      <div>
        <button onClick={fetchMe}>/Me</button>
      </div>
      <div>
        Botao para testar o post
        <button onClick={postData}>Pòst</button>
        <Button>Click me</Button>
      </div>
    </div>
  );
}
