"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Separator } from "@/components/ui/separator";

import { ManuItensAppEstudante, ManuItensAppMedico } from "@/utils/menuitens";
import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface Props {
  name?: string;
  email?: string;
  scope?: string;
}

export function UserNav({ name, email, scope}: Props) {
  const router = useRouter();

  function getPrimeiraLetra(string: string | undefined) {
    if (string == undefined) {
      return;
    }
    // Converte a string para letras minúsculas
    string = string.toLowerCase();

    // Divide a string em palavras
    const palavras = string.split(" ");

    // Retorna um array com as primeiras letras das palavras
    return palavras.map((palavra: string) => palavra[0].toLocaleUpperCase());
  }

  async function logout() {
		await signOut({
			redirect: false
		})

		router.replace('/')
	}

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-primary">{getPrimeiraLetra(name)}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">{name}</p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <Separator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer hover:bg-gray-200"
            onClick={() => router.replace(`/app/perfil`)}
          >
            Perfil
          </DropdownMenuItem>
          {scope == "medic"
            ? ManuItensAppMedico.map((item) => (
                <DropdownMenuItem
                  onClick={() => router.replace(`${item.route}`)}
                  className="cursor-pointer hover:bg-gray-200"
                  key={item.item}
                >
                  {item.item}
                </DropdownMenuItem>
              ))
            : ManuItensAppEstudante.map((item) => (
                <DropdownMenuItem
                  className="cursor-pointer hover:bg-gray-200"
                  onClick={() => router.replace(`${item.route}`)}
                  key={item.item}
                >
                  {item.item}
                </DropdownMenuItem>
              ))}
        </DropdownMenuGroup>
        <Separator />
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={logout}>Sair</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
