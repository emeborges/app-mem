import { CentralizerContainer } from "@/components/CentralizerContainer";
import { LocationsAdmin } from "@/components/PageStrutures/Admin/Locations";

export default async function Admin() {
  return (
    <CentralizerContainer outhers="pt-[5rem] flex-col h-screen ">
      <LocationsAdmin />
    </CentralizerContainer>
  );
}
