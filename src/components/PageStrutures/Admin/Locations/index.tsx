"use client";


import { LocationForm } from "@/components/Forms/Locations/LocationsForm";
import useAxiosAuth from "@/lib/hooks/useAxiosAuth";
import { LocationsI, MedicI } from "@/types/geralsI";
import { Loader2 } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";


export const LocationsAdmin = () => {
  const axiosAuth = useAxiosAuth();
  const route = useRouter();
  const { id } = useParams();
  const [load, setLoad] = useState(true);
  const [location, setLocation] = useState<LocationsI>();

  const getDetail = async () => {

      await axiosAuth.get(`/location/${id}`).then((e) => setLocation(e.data));

      setLoad(false);
      return;

  };

  useEffect(() => {
    setTimeout(getDetail, 4000);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="h-full w-full ">
      {load ? (
        <div className="rounded-lg full border h-full w-full flex items-center justify-center mt-2">
          <Loader2 className="h-[4rem] w-[4rem] text-muted-foreground animate-spin" />
        </div>
      ) : (
        <div className="rounded-lg full border bg-card text-card-foreground shadow-sm flex flex-col flex-wrap justify-around md:justify-start gap-2 w-full p-2 my-2">
          <LocationForm initialValues={location}/>
        </div>
      )}
    </div>
  );
};
