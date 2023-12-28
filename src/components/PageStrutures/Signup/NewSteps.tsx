/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserTypes } from "./UserType";
import { EstudanteSignup } from "../../Forms/Signup/EstudanteForm";
import { MedicoSignup } from "../../Forms/Signup/MedicoForm";
import { ConfirmationLogin } from "./ConfirmationSignup";

export default function NewSteps() {
  const [userType, setUserType] = useState<number | null>();
  const [tela, setTela] = useState<number>(0);

  const handleChangeUserType = (id: number, stepNumber?: number) => {
    setUserType(id);
    setTela(stepNumber ? stepNumber : 0);
  };

  const handleChanceStep = (stepNumber?: number) => {
    setTela(stepNumber ? stepNumber : 0);
  };

  useEffect(() => {
    handleUseSelectedTab(tela);
  }, [tela]);

  function handleUseSelectedTab(number: number) {
    setSelectedTab(allSteps[number]);
  }

  const allSteps = [
    {
      icon: "1",
      label: "Selecione seu tipo de Usuário",
      component: <UserTypes handleChangeUserType={handleChangeUserType} />,
      status: 0,
    },
    {
      icon: "2",
      label: "Preencha seus dados",
      component:
        userType === 1 ? (
          <EstudanteSignup handleUseSelectedTab={handleChanceStep} />
        ) : (
          <MedicoSignup
            height={"300px"}
            handleUseSelectedTab={handleChanceStep}
          />
        ),
      status: 0,
    },
    {
      icon: "3",
      label: "Confirme seu cadastro",
      component: <ConfirmationLogin />,
      status: 0,
    },
  ];

  const [selectedTab, setSelectedTab] = useState(allSteps[0]);

  return (
    <div>
      <div>
        <ol className="flex w-full px-3 justify-around items-center font-medium text-center text-gray-500">
          {allSteps.map((item) => (
            <li
              key={item.label}
              className={item === selectedTab ? "selected" : ""}
            >
              <span
                className={`flex items-center justify-center ${
                  selectedTab.icon === item.icon
                    ? "text-primary"
                    : "text-gray-500"
                } `}
              >
                <span
                  className={` m-1 rounded-full ${
                    selectedTab.icon === item.icon
                      ? "text-xs text-white rounded-full bg-primary px-2 py-1"
                      : "text-gray-500"
                  }`}
                >
                  {item.icon}
                </span>
                <span className={`whitespace-normal max-w-[8rem]`}>
                  {selectedTab.label === item.label && item.label}
                </span>
              </span>
            </li>
          ))}
        </ol>
      </div>
      <main>
        <AnimatePresence>
          <motion.div
            key={selectedTab ? selectedTab.label : "empty"}
            initial={{ y: 10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: -10, opacity: 0 }}
            transition={{ duration: 0.5 }}
          >
            {selectedTab ? selectedTab.component : "😋"}
          </motion.div>
        </AnimatePresence>
      </main>
    </div>
  );
}
