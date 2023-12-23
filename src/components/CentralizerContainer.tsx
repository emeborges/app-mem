export const CentralizerContainer = ({
  children,
  align,
  justify,
  outhers,
}: {
  children: React.ReactNode;
  align?: string;
  outhers?: string;
  justify?:
    | "justify-start"
    | "justify-end"
    | "justify-center"
    | "justify-between"
    | "justify-around"
    | "justify-evenly";
}) => {
  return (
    <div
      className={`
        max-w-screen-xl m-auto w-full h-full flex text-muted-foreground
        ${justify ? justify : "justify-between"}
        ${align ? align : "items-center"}
        ${outhers ?? outhers}
        
        `}
    >
      {children}
    </div>
  );
};
