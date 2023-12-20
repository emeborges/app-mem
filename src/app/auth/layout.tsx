import NextAuthSessionProvider from "@/providers/sessionProvider";
import "../globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";

export const metadata: Metadata = {
  title: "AAAAAASDFASD",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(nextAuthOptions);

  if (session) {
    redirect("/auth/admin");
  }

  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body>
        <NextAuthSessionProvider>{children}</NextAuthSessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
