import React, { useState } from "react";
import { createContext } from "react";

// Criando o provedor
export const StatesContext = createContext();

const Context = ({ children }) => {
  const [name, setName] = useState("Gabriel");
  const [saldo, setSlado] = useState(0);
  const [notificationName, setNotificationName] = useState();
  const [showInfos, setShowInfos] = useState(false);
  const [extract, setExtract] = useState([]);
  const [type, setType] = useState("");
  const [extractValue, setExtractValue] = useState("");
  const [data, setData] = useState("");
  //  CONTROLE DO EXTTRATO

  return (
    <div>
      <StatesContext.Provider
        value={{
          extract, setExtract,
          extractValue,
          setExtractValue,
          data,
          setData,
          type,
          setType,
          saldo,
          setSlado,
          showInfos,
          setShowInfos,
          name,
          setName,
          notificationName,
          setNotificationName,
        }}
      >
        {children}
      </StatesContext.Provider>
    </div>
  );
};

export default Context;
