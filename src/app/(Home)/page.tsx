'use client'

import { useRouter } from "next/navigation"
import Image from "next/image";
import { CentralizerContainer } from "@/components/CentralizerContainer";
import { StepsHome } from "@/utils/textos";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function Home() {
  const router = useRouter()

  return (
    <div>

        <div className="h-100 min-h-[400px] pt-20 md:pt-32 px-2">
          <div className="h-full w-full">
            <div className=" max-w-screen-xl flex m-auto w-full h-full items-center flex-wrap">
              <div className="w-50 max-w-[600px] pb-4 md:pb-0">
                <h1 className="text-3xl w-3/4 py-4 md:text-4xl">
                  Bem vindo ao 
                </h1>
                <div className="py-4">
                  <Image src='/logo-completo-preto.png' alt='logo' height={120} width={380} />
                </div>
                <h3 className="py-4text-md md:text-xl w:1/2 md:w-3/4">
                  Somos a ponte entre médicos dispostos a ensinar e alunos
                  disponíveis para aprender.
                </h3>
              </div>

              <Image src={"/doctors.svg"} alt={""} height={500} width={500} />
            </div>
          </div>
        </div>

        <div className="pt-6 md:pt-4 px-2 bg-[linear-gradient(175deg,_#ffffff_70%,_#058dc9_30%)] text-xs md:text-base">
          <CentralizerContainer>
            <h2 className="text-2xl font-bold">Como funciona:</h2>
          </CentralizerContainer>
          <CentralizerContainer
            align="justify-evenly"
            outhers="flex-col md:flex-row gap-2 py-4 "
          >
              {StepsHome.map((i, index) => (
            <Card key={index} className="border rounded-xl shadow-md bg-background p-4">
                <div className="flex-col ">
                  <h3 className="text-xl">{i.name}</h3>
                  {i.items.map((i,index) => (
                    <div key={index} className="flex items-center pt-6 ml-2">
                    <span className="bg-primary px-3 py-2 rounded-full text-white">
                      {i.item}.
                    </span>{" "}
                    <h4 className="px-2">{i.texto}</h4>
                  </div>
                  ))}
                </div>
            </Card>
          ))}
            
          </CentralizerContainer>
        </div>


        <div className="pt-4 px-2 bg-primaryEdit text-xs md:text-base">
          <CentralizerContainer>
            <h2 className="text-2xl font-bold text-white">Parceiros:</h2>
          </CentralizerContainer>
          <CentralizerContainer justify="justify-around" outhers="py-4">
            <div className="conteiner bg-background rounded-xl w-[150px] h-[130px] flex items-center justify-center">
              <Image
                src="/usp.png"
                height={100}
                width={140}
                alt="usp"
                className=""
              />
            </div>
            <div className="conteiner bg-background rounded-xl w-[150px] h-[130px] flex items-center justify-center">
              <Image
                src="/sca.jpg"
                height={100}
                width={140}
                alt="usp"
                className="rounded-xl"
              />
            </div>
          </CentralizerContainer>
        </div>


        <div className="pt-4 px-2 bg-[linear-gradient(175deg,_#058dc9_70%,_#ffffff_30%)]">
          <CentralizerContainer>
            <h2 className="text-2xl font-bold text-white">Quem somos:</h2>
          </CentralizerContainer>
          <CentralizerContainer
            justify="justify-around"
            outhers="py-4 gap-2 overflow-auto"
          >
            <Card className="conteiner bg-background border rounded-xl shadow-md p-4 ">
              <Image
                src={"/modelo.jpg"}
                alt={"fotopersonal"}
                width={180}
                height={180}
                className="rounded"
              ></Image>
              <h3 className="text-xl text-center">Nome</h3>
              <div className="flex justify-between gap-2">
                <Badge>ECONOMISTA</Badge>
                <Badge>INSPER</Badge>
              </div>
            </Card>
            <Card className="conteiner bg-background border rounded-xl shadow-md p-4">
              <Image
                src={"/modelo.jpg"}
                alt={"fotopersonal"}
                width={180}
                height={180}
                className="rounded"
              ></Image>
              <h3 className="text-xl text-center">Nome</h3>
              <div className="flex justify-between gap-2">
                <Badge>ECONOMISTA</Badge>
                <Badge>INSPER</Badge>
              </div>
            </Card>
            <Card className="conteiner bg-background border rounded-xl shadow-md p-4">
              <Image
                src={"/modelo.jpg"}
                alt={"fotopersonal"}
                width={180}
                height={180}
                className="rounded"
              ></Image>
              <h3 className="text-xl text-center">Nome</h3>
              <div className="flex justify-between gap-2">
                <Badge>ECONOMISTA</Badge>
                <Badge>INSPER</Badge>
              </div>
            </Card>
            <Card className="conteiner bg-background border rounded-xl shadow-md p-4">
              <Image
                src={"/modelo.jpg"}
                alt={"fotopersonal"}
                width={180}
                height={180}
                className="rounded"
              ></Image>
              <h3 className="text-xl text-center">Nome</h3>
              <div className="flex justify-between gap-2">
                <Badge>ECONOMISTA</Badge>
                <Badge>INSPER</Badge>
              </div>
            </Card>
          </CentralizerContainer>
        </div>

        <div className="pt-4 px-2">
          <CentralizerContainer>
            <h2 className="text-2xl font-bold">Fale Conosco:</h2>
          </CentralizerContainer>
          <CentralizerContainer outhers="w-full md:w-[40rem]">
            {/* <ProfileForm /> */}asdf
          </CentralizerContainer>
        </div>

      {/* <Footer /> */}
    </div>
  );
}
