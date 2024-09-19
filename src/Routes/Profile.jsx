import React from "react";
import "./Profile.css";
import { Link } from "react-router-dom";
import { useContext, useState } from "react";
import { StatesContext } from "../context/Context";
const Profile = () => {
  const { name, setName, notificationName, setNotificationName } =
    useContext(StatesContext);
  const [handleName, setHandleName] = useState("");
  const setUserName = () => {
    setName(handleName);
    setNotificationName(true);
    setTimeout(() => {
      setNotificationName(false);
    }, 2000);
    setHandleName("");
  };
  return (
    <div className="profile-container">
      <input
        type="text"
        placeholder="Insira o seu nome completo"
        value={handleName}
        onChange={(e) => setHandleName(e.target.value)}
      />
      <i onClick={setUserName} class="fa-solid fa-pen-to-square"></i>
      <p
        className={
          !notificationName ? "name-notification" : "name-notification show"
        }
      >
        Nome alterado com sucesso
      </p>
      <div className="welcome">
        <p>
          Olá, <span>{name}</span>, me Chamo Gabriel Pereira, este é um projeto
          desenvolvido em React com fins de mostrar a você um pouco do meu
          dominio do frameWork. <br /> Aqui há importação e uso de State,
          Contexts e Providers, tudo isso é o que possibilita essa navegação em
          singlePage <br /> Veja mais dos meus projetos{" "}
          <Link to="https://www.linkedin.com/in/gabriel-mata-pereira-a81358302/">
            Aqui
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Profile;
