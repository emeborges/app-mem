import { nextAuthOptions } from "@/app/api/auth/[...nextauth]/route";
import ButtonLogout from "@/components/ButtonLogout";
import { CentralizerContainer } from "@/components/CentralizerContainer";
import { MedicHomePage } from "@/components/PageStrutures/AuthHome/MedicHomePage";
import { Button } from "@/components/ui/button";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { getServerSession } from "next-auth";
import { useSession } from "next-auth/react";
import { useEffect, useState } from "react";

export default async function Admin() {
  const session = await getServerSession(nextAuthOptions);
  return (
    <CentralizerContainer outhers="pt-[5rem] flex-col h-screen ">
      {session && <MedicHomePage session={session} />}
    </CentralizerContainer>
  );
}
