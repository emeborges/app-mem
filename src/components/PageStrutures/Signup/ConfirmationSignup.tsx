"use client";

import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { useRouter } from "next/navigation";

export function ConfirmationLogin() {
  const router = useRouter();

  return (
    <div>
      <CardContent className="grid gap-2 py-2">
        <div>
          <div className="py-4">
            <p className="text-md text-center font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
              Um link de confirmação foi enviado para o e-mail cadastrado.
            </p>
          </div>
          <Button className="w-full" onClick={() => router.push('/auth/signin')}>Retornar a área de login</Button>
        </div>
      </CardContent>
    </div>
  );
}
