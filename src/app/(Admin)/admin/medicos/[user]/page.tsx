import { CentralizerContainer } from "@/components/CentralizerContainer";

import { UserAdmin } from "@/components/PageStrutures/Admin/Users/Users";

export default async function Admin() {
  return (
    <CentralizerContainer outhers="pt-[5rem] flex-col h-screen ">
      <UserAdmin scope="medic" />
    </CentralizerContainer>
  );
}
