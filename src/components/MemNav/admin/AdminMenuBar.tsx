import Image from "next/image";
import { AuthItens, ManuItensAppEstudante, ManuItensAppMedico } from "@/utils/menuitens";
import Link from "next/link";

import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import { Menubar } from "@/components/ui/menubar";
import { CentralizerContainer } from "@/components/CentralizerContainer";
import { AdminNav } from "./AdminNav";



export const AdminMenuBar = async () => {
  const session = await getServerSession(nextAuthOptions)
  
  return(
        <Menubar>
            <CentralizerContainer>
              <div>
                <Link href={"/app"} className="cursor-pointer">
                  <Image src="/MEM_BLUE.svg" alt="logo" height={50} width={120} />
                </Link>
              </div>
              <div className="flex  items-center space-x-4 text-muted-foreground">
                <div className="hidden md:flex space-x-4">
   
                  {
                    AuthItens.map((x,i) => 
                    <Link
                    key={i}
                        href={x.route}
                        className=" transition duration-500 ease-in-out border-b-4 border-transparent hover:border-primary"
                      >
                        {x.item}
                      </Link>
                    )
                  }
                      
                  
                </div>
                <AdminNav name={session?.name} email={session?.email} scope={session?.scope} />
              </div>
            </CentralizerContainer>
          </Menubar>
    )
}