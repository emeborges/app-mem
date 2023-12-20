import { CentralizerContainer } from "../CentralizerContainer";

export const FooterHome = () => {
  return (
    <div className="bg-[#f2f2f2] text-xs mt-4 p-2">
      <CentralizerContainer>
        <div className="flex flex-col">
          <text>
            Copyright ® 2023 - Mem Ensino e Treinamento LTDA - CNPJ: 51.557.555/0001-70
          </text>
        </div>
        <div>
          <text>Todos os direitos reservados.</text>
        </div>
      </CentralizerContainer>
    </div>
  );
};
