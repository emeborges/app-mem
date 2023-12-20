

export const StepsHome: StepsHomeI = [{
    name:"Médico",
    items: [
    {item: 1, texto:"Cadastre-se"},
    {item: 2, texto:"Seus dados serão conferidos pela nossa equipe interna"},
    {item: 3, texto:"Crie o estágio disponível"},
    {item: 4, texto:"Nossa Equipe fará uma validação da vaga"},
    {item: 5, texto:"A vaga será disponibilizada para os estudantes disponíveis"},{item: 6, texto:"Os estudantes se candidataram para o estágio"},
    {item: 7, texto:"Você poderá selecionar seu estágiario"},
    {item: 8, texto:"Agora é só esperar o estágio começar"},
    ]
    },
    {
    name:"Estudante",
    items: [
    {item: 1, texto:"Cadastre-se"},
    {item: 2, texto:"Seus dados serão conferidos pela nossa equipe interna"},
    {item: 3, texto:"Crie o estágio disponível"},
    {item: 4, texto:"Nossa Equipe fará uma validação da vaga"},
    {item: 5, texto:"A vaga será disponibilizada para os estudantes disponíveis"},{item: 6, texto:"Os estudantes se candidataram para o estágio"},
    {item: 7, texto:"Você poderá selecionar seu estágiario"},
    {item: 8, texto:"Agora é só esperar o estágio começar"},
    ]
    }
    ]

export type StepsHomeI = MacroItemI[]

export interface MacroItemI {
  name: string
  items: Items[]
}

export interface Items {
  item: number
  texto: string
}