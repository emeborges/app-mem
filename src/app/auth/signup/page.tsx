import NewSteps from "@/components/PageStrutures/Signup/NewSteps";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import { Metadata } from "next";

export const metadata: Metadata = {
  description: "Cadastro | Meuestagiomed",
  icons: '../favicon.ico'
}; 

export default function Signin() {
  return (
    <div className="h-screen flex align-center">
      <div className="m-auto max-w-md w-full">
        <Card className="max-w-md w-full m-auto">
          <CardHeader>
            <CardTitle className="text-2xl ">Cadastre-se:</CardTitle>
          </CardHeader>
          <NewSteps />
        </Card>
      </div>
    </div>
  );
}
