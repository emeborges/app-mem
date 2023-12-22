import { TypesI } from "@/types/geralsI";

export const Semestres = [
    { label: "1", value: "1" },
    { label: "2", value: "2" },
    { label: "3", value: "3" },
    { label: "4", value: "4" },
    { label: "5", value: "5" },
    { label: "6", value: "6" },
    { label: "7", value: "7" },
    { label: "8", value: "8" },
    { label: "9", value: "9" },
    { label: "10", value: "10" },
    { label: "11", value: "11" },
    { label: "12", value: "12" },
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
    { label: "Pr", value: "Pr" },
    { label: "Sp", value: "Sp" },
  ]

  export const enumTypeObj = (strings: string[]): TypesI[] => {
    const novoObj = strings.map((x, idx) => {return({id: idx.toString(), name: x})})
    
    console.log('abc', strings, novoObj)
    return novoObj
  }

  export const optionsSelects = (arr: any[], chaveValue: string, chaveLabel: string) => {
    return arr.map(x => ({'value': x[chaveValue], 'label': x[chaveLabel] }))
  }