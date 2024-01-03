export type StepsHomeI = MacroItemI[];

export interface MacroItemI {
  name: string;
  items: Items[];
}

export interface Items {
  item: number;
  texto: string;
}


export const StepsMedic: Items[] = [
  { item: 1, texto: "Cadastre-se" },
  {
    item: 2,
    texto: "Seus dados serão conferidos pela nossa equipe interna",
  },
  { item: 3, texto: "Crie o estágio disponível" },
  { item: 4, texto: "Nossa equipe fará uma validação da vaga" },
  {
    item: 5,
    texto: "A vaga será disponibilizada para os estudantes",
  },
  { item: 6, texto: "Os estudantes se candidatarão para o estágio" },
  { item: 7, texto: "Você poderá selecionar seu estágiario" },
  { item: 8, texto: "Agora é só esperar o estágio começar" },
]


export const StepsStudent: Items[] = [
  { item: 1, texto: "Cadastre-se" },
  {
    item: 2,
    texto: "Seus dados serão conferidos pela nossa equipe interna",
  },
  { item: 3, texto: "⁠Crie um currículo" },
  { item: 4, texto: "⁠Visualize as oportunidades disponíveis" },
  {
    item: 5,
    texto: "Candidate-se para uma oportunidade",
  },
  { item: 6, texto: "⁠Sua candidatura será disponibilizada para o médico responsável" },
  { item: 7, texto: "Você poderá ser selecionado" },
  { item: 8, texto: "Agora é só esperar o estágio começar" },
]