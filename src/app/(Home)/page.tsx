"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { CentralizerContainer } from "@/components/CentralizerContainer";
import { StepsMedic, StepsStudent } from "@/utils/textos";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { StartAnimation } from "@/components/ScrollAnimation";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { Separator } from "@/components/ui/separator";
import { InfosForm } from "@/components/Forms/Home/InfosForm";
import { FooterHome } from "@/components/Footer/FooterHome";

export default function Home() {
  const router = useRouter();
  const [selected, setSelected] = useState(false);

  return (
    <div>
      <StartAnimation>
        <div className="h-100 min-h-[400px] pt-20 md:pt-32 px-2">
          <div className="h-full w-full py-10">
            <div className=" max-w-screen-xl flex m-auto w-full h-full items-center justify-around flex-wrap">
              <div className="w-50 max-w-[600px] pb-4 md:pb-0">
                <h1 className="text-3xl w-3/4 py-4 md:text-4xl">
                  Bem vindo ao
                </h1>
                <div className="py-4">
                  <Image
                    src="/logo-completo-preto.png"
                    alt="logo"
                    height={120}
                    width={380}
                  />
                </div>
                <h3 className="py-4 text-sm md:text-xl w:1/2 md:w-3/4">
                  O elo entre o aprendizado e a jornada médica.
                </h3>
              </div>

              <Image src={"/doctors.svg"} alt={""} height={500} width={500} />
            </div>
          </div>
        </div>
      </StartAnimation>

      <div
        className="py-8 md:py-8 px-2 text-xs md:text-base"
        id="funcionamento"
      >
        <CentralizerContainer>
          <h2 className="text-3xl font-bold m-auto">Como funciona</h2>
        </CentralizerContainer>
        <CentralizerContainer justify={"justify-center"} outhers="py-8">
          <div className="flex items-center gap-3">
            <Label
              htmlFor="airplane-mode"
              className={`text-lg ${
                selected ? "muted-foreground" : "text-secondary"
              }`}
            >
              Estudante
            </Label>

            <Switch
              checked={selected}
              onCheckedChange={() => setSelected(!selected)}
              className="data-[state=unchecked]:bg-secondary"
            />
            <Label
              htmlFor="airplane-mode"
              className={`text-lg ${
                selected ? "text-primary" : "muted-foreground"
              }`}
            >
              Médico
            </Label>
          </div>
        </CentralizerContainer>
        <CentralizerContainer
          align="justify-evenly"
          outhers="flex-col md:flex-row gap-2 py-4 "
        >
          <Card className="border rounded-xl shadow-md bg-background p-4">
            <div className="flex-col ">
              <h3 className="text-xl text-muted-foreground">
                {selected ? "Médico" : "Estudante"}
              </h3>
              {selected
                ? StepsMedic.map((i, index) => (
                    <div key={index} className="flex items-center pt-6 ml-2">
                      <span
                        className={`${
                          selected ? "bg-primary" : "bg-secondary"
                        } px-3 py-2 rounded-full text-white`}
                      >
                        {i.item}.
                      </span>{" "}
                      <h4 className="px-2 text-muted-foreground">{i.texto}</h4>
                    </div>
                  ))
                : StepsStudent.map((i, index) => (
                    <div key={index} className="flex items-center pt-6 ml-2">
                      <span
                        className={`${
                          selected ? "bg-primary" : "bg-secondary"
                        } px-3 py-2 rounded-full text-white`}
                      >
                        {i.item}.
                      </span>{" "}
                      <h4 className="px-2 text-muted-foreground">{i.texto}</h4>
                    </div>
                  ))}
            </div>
          </Card>
        </CentralizerContainer>
      </div>

      <div
        className="py-8 md:py-8 px-2 text-xs md:text-base bg-[#f2f2f2]"
        id="quemsomos"
      >
        <CentralizerContainer
          outhers="pt-4 px-2 gap-5 items-start min-h-[20rem] h-full flex-wrap"
          justify="justify-center"
        >
          <div className="max-w-[100%] md:max-w-[49%] h-full">
            <div>
              <div className="flex gap-2">
                <h2 className="text-2xl font-bold ">Quem somos </h2>
                <Separator className="my-4 bg-muted-foreground w-[80px]" />
              </div>
            </div>
            <div>
              <p className="py-3 text-md md:text-md w:1/2 md:w-3/4">
                A MEM acredita que a
                experiência prática é fundamental para criar futuros médicos
                excepcionais.
              </p>

              <p className="py-3 text-md md:text-md w:1/2 md:w-3/4">
                Nosso compromisso é proporcionar oportunidades de estágios
                informais que transcendam a sala de aula, oferecendo aos alunos
                a chance de aplicar seus conhecimentos em um ambiente real de
                trabalho.
              </p>
            </div>
          </div>
          <div className="max-w-[100%] md:max-w-[49%] w-full  flex flex-col items-end md:items-end justify-around min-h-[15rem] h-full">
            <div className="w-full flex justify-end">
              <div className="flex gap-2 ">
                <Separator className="my-4 bg-muted-foreground bg-black w-[80px]" />
                <h2 className="text-2xl font-bold ">Parceiros </h2>
              </div>
            </div>
            <div className="flex flex-wrap justify-end  items-center gap-3 w-full max-w-[20rem] h-full">
              
              <Image
                src="/inovasanta.png"
                height={200}
                width={200}
                alt="Inova Santa"
                className=""
              />
              <Image
                src="/gastros-logo-1.svg"
                height={200}
                width={200}
                alt="Inova Santa"
                className=""
              />
              <Image
                src="/medeasy.png"
                height={200}
                width={200}
                alt="Inova Santa"
                className="bg-[#111433]"
              />
            </div>
          </div>
        </CentralizerContainer>
      </div>

      <div className="py-8 px-2" id="faleconosco">
        <CentralizerContainer outhers="w-full md:w-[40rem] flex-col">
          <h2 className="text-2xl font-bold py-4">Fale Conosco</h2>
          <InfosForm />
        </CentralizerContainer>
      </div>

      <FooterHome />
    </div>
  );
}
