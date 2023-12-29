import NextAuth from "next-auth";
import { StudentI } from "./geralsI";

declare module "next-auth" {
  interface Session {
    AcessToken: string;
    RefreshToken: string;
    IdToken: string;
    name: string;
    scope: string;
    picture?: string;
    id: string;
    email: string;
    school_term: string;
  }
}
