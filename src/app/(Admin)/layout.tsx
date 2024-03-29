import NextAuthSessionProvider from "@/providers/sessionProvider";
import "../globals.css";
import type { Metadata } from "next";
import { getServerSession } from "next-auth";
import { nextAuthOptions } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { Toaster } from "@/components/ui/toaster";
import { AuthMenuBar } from "@/components/MemNav/AuthMenuBar";
import { AdminMenuBar } from "@/components/MemNav/admin/AdminMenuBar";


export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  return (
    <html lang="pt-br" suppressHydrationWarning>
      <body>
        <NextAuthSessionProvider>
          <AdminMenuBar />
          {children}
          </NextAuthSessionProvider>
        <Toaster />
      </body>
    </html>
  );
}
