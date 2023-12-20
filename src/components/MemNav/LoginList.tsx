import Link from "next/link";

export const LoginList = () => {
    return (
      <div className="flex flex-col md:flex-row justify-items-center items-center space-y-4 md:space-y-0  md:space-x-4 ">
        <Link className=" transition duration-500 ease-in-out border-b-4 border-transparent hover:border-primary" href={"/auth/signin"}>login</Link>
        <Link
          href={"/auth/signup"}
          className="p-2 bg-primary transition duration-500 ease-in-out hover:font-semibold  rounded m-0 text-white"
        >
          Cadastre-se
        </Link>
      </div>
    );
}