
## Bem vindo, vamos começar!

Primeiramente, bem vindo ao projeto MEM, meuEstagioMed!
O projeto foi construído com os seguintes frameworks e libs:

- [Next.js](https://nextjs.org/docs)
- [Shadcn/ui](https://ui.shadcn.com/)
- [NextAuth](https://next-auth.js.org/)
- [ReactHookForm](https://react-hook-form.com/)
- [Zod](https://zod.dev/)

Para rodar o projeto, após o clone do repositório, crei um #env com base no exemplo do projeto e após:


```bash
yarn 

# e depois

yarn dev
```

O projeto foi dividido em sessões, sendo:

- Admin 
    - Área administrativa `src/app/(Admin)/admin/page.tsx`;
- App
    - Área de uso dos usuários, desenvolvida para "após" o cadastro `src/app/(App)/app/page.tsx`;
- Home
    - Área de contato inicial dos usuários `src/app/(Home)/page.tsx`;
- api
    - Área necessário para o NextAuth Funcionar;
- Auth
    - Área de login/cadastro/solicitação de senha `src/app/(Auth)/../page.tsx`

## Estrutura básica

Cada página, seguiu-se uma estrutura básica, sendo.

- Estrutura base em Service Page (`.../page.tsx`)
- Estrutura componentização em Client Components (`src/components/PageStrutures`) 
- Caso necessário, utilizou-se mais de uma ramificação de compontens, estando-os presentes em (`src/components`)
- Em caso de formulários, eles estão anexados em ( `src/components/Forms`), com inputs presentes em  ( `src/components/Inputs`)


## Mecanismo de Auth/Refresh Token

Foi utilizado o sistema de Auth/Refresh token através de um Hook presente em (`src/lib/hooks`).
Em todos as requests que precisariam de refresh, foi utilizado o useAxiosAuth (`src/lib/hooks/useAxiosAuth.ts`), entretanto, essa request acontece apenas em componentes Client Components.

## Regra de negócio

Assim que cadastrado, o usuário precisa confirmar o 

