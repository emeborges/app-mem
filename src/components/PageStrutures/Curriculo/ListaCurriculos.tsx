import { CentralizerContainer } from "@/components/CentralizerContainer";
import { CurriculoForm } from "@/components/Forms/Curriculo/CurriculoForm";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { StudentI } from "@/types/geralsI";
import { formatarCPF, getPrimeiraLetra } from "@/utils/functions";
import { format } from "date-fns";
import { FileDown } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";

interface Props {
  student?: StudentI;
}

export default function ListaCurriculos({ student }: Props) {
  const curriculum = student?.curriculums && student?.curriculums[0];

  return (
    <div className="w-full">
      <CardContent>
        <h2 className="text-3xl">Currículo Cadastrado</h2>
        <div className="p-2 flex flex-col gap-4  w-full flax-wrap ">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]"></TableHead>
                <TableHead>Descrição</TableHead>
                <TableHead>Arquivo</TableHead>
                <TableHead className="w-[100px]"></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell />
                <TableCell className=" ">{curriculum?.description}</TableCell>
                <TableCell>
                  <Button variant={"outline"}>
                    <FileDown
                      onClick={() =>
                        window.location.assign(`${curriculum?.url}`)
                      }
                    />
                  </Button>
                </TableCell>

                <TableCell>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline">Editar</Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-[425px]">
                      <CurriculoForm  initialValues={curriculum}/>
                    </DialogContent>
                  </Dialog>
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </div>
  );
}
