import { Menubar } from "../ui/menubar"
import Image from "next/image";
import { ManuItensAppEstudante, ManuItensAppMedico } from "@/utils/menuitens";
import Link from "next/link";
import { CentralizerContainer } from "../CentralizerContainer";
import { UserNav } from "./UserNav";
import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";



export const AuthMenuBar = async () => {
  const session = await getServerSession(nextAuthOptions)
  
  return(
        <Menubar>
            <CentralizerContainer>
              <div>
                <Image src="/logo-simples-azul.png" alt="logo" height={50} width={120} />
              </div>
              <div className="flex  items-center space-x-4">
                <div className="hidden md:flex space-x-4">
   
                  {session?.scope === 'medic' ?
                    (ManuItensAppMedico.map((item) => (
                      <Link
                        key={item.route}
                        href={item.route}
                        className=" transition duration-500 ease-in-out border-b-4 border-transparent hover:border-primary"
                      >
                        {item.item}
                      </Link>)))
                  : (ManuItensAppEstudante.map((item) => (
                    <Link
                      key={item.route}
                      href={item.route}
                      className=" transition duration-500 ease-in-out border-b-4 border-transparent hover:border-primary"
                    >
                      {item.item}
                    </Link>)
                  ))}
                </div>
                <UserNav name={session?.name} email={session?.email} scope={session?.scope} />
              </div>
            </CentralizerContainer>
          </Menubar>
    )
}