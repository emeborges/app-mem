import { TypesI } from "@/types/geralsI";

export const Anos = [
    { label: "1 ano", value: "1" },
    { label: "2 ano", value: "2" },
    { label: "3 ano", value: "3" },
    { label: "4 ano", value: "4" },
    { label: "5 ano", value: "5" },
    { label: "6 ano", value: "6" },
  ];
  
  export const Areas = [
    { label: "Ortopedia", value: "ortopedia" },
    { label: "Pisiquiatria", value: "psiquiatria" },
  ];
  
  export const Locais = [
    { label: "Clinica Particular", value: "particular" },
    { label: "Clinica Publica", value: "publica" },
    { label: "Hospital", value: "hospital" },
  ];
  
  export const Estados = [
    { label: "Acre", value: "AC" },
    { label: "Alagoas", value: "AL" },
    { label: "Amapá", value: "AP" },
    { label: "Amazonas", value: "AM" },
    { label: "Bahia", value: "BA" },
    { label: "Ceará", value: "CE" },
    { label: "Distrito Federal", value: "DF" },
    { label: "Espírito Santo", value: "ES" },
    { label: "Goiás", value: "GO" },
    { label: "Maranhão", value: "MA" },
    { label: "Mato Grosso", value: "MT" },
    { label: "Mato Grosso do Sul", value: "MS" },
    { label: "Minas Gerais", value: "MG" },
    { label: "Pará", value: "PA" },
    { label: "Paraíba", value: "PB" },
    { label: "Paraná", value: "PR" },
    { label: "Pernambuco", value: "PE" },
    { label: "Piauí", value: "PI" },
    { label: "Rio de Janeiro", value: "RJ" },
    { label: "Rio Grande do Norte", value: "RN" },
    { label: "Rio Grande do Sul", value: "RS" },
    { label: "Rondônia", value: "RO" },
    { label: "Roraima", value: "RR" },
    { label: "Santa Catarina", value: "SC" },
    { label: "São Paulo", value: "SP" },
    { label: "Sergipe", value: "SE" },
    { label: "Tocantins", value: "TO" },
  ]

  export const enumTypeObj = (strings: string[]): TypesI[] => {
    const novoObj = strings.map((x, idx) => {return({id: idx.toString(), name: x})})
    
    return novoObj
  }

  export const optionsSelects = (arr: any[], chaveValue: string, chaveLabel: string) => {
    return arr.map(x => ({'value': x[chaveValue], 'label': x[chaveLabel] }))
  }