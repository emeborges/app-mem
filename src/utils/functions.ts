export function formatarCPF(cpf: string) {
  // Remover caracteres não numéricos
  const cpfNumerico = cpf?.replace(/\D/g, "");

  // Formatar o CPF
  const cpfFormatado =
    "###" +
    "." +
    "###" +
    "." +
    cpfNumerico.substring(6, 9) +
    "-" +
    cpfNumerico.substring(9);

  return cpfFormatado;
}

export function getPrimeiraLetra(string: string | undefined) {
  if (string == undefined) {
    return;
  }
  // Converte a string para letras minúsculas
  string = string.toLowerCase();

  // Divide a string em palavras
  const palavras = string.split(" ");

  // Retorna um array com as primeiras letras das palavras
  return palavras.map((palavra: string) => palavra[0].toLocaleUpperCase());
}

export function maior(stringTest?: any, stringReferencia?: any) {

  return Number(stringTest) < Number(stringReferencia)

}