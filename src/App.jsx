import { Outlet, NavLink } from "react-router-dom";
import { useContext, useEffect, useState} from "react";
import { StatesContext } from "./context/Context";
import React from "react";
import "./App.css";
import image1 from "./assets/image1.png"

function App() {
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const {  extract,name, showInfos, setShowInfos} = useContext(StatesContext);

  const toggleInfos = ()=>{
    if(showInfos == false){
      setShowInfos(true)
    }else if(showInfos == true){
      setShowInfos(false)
    }
  }
  useEffect(() => {
    // Função que atualiza o estado com o tamanho da tela
    const handleResize = () => setWindowWidth(window.innerWidth);

    // Adiciona o event listener para quando a tela for redimensionada
    window.addEventListener('resize', handleResize);

    // Remove o event listener quando o componente for desmontado
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>

    
{windowWidth > 428 ? (
       <div className="screen">
        <div className="mobile-view">
        <h2>Este projeto está disponível apenas para telas com no máximo 428px</h2>
        <h3>Regule o tamanho da sua tela para visualizar o projeto ou abra o link em um smartphone</h3>
        <p>Obrigado por me visitar ☺</p>
        <div className="image-content">

        </div>
        </div>
       </div>
      ): (
        <div className="app-container">

      <header className="header">
        {!showInfos ? <p>Olá, ******</p> : <p>Olá, {name}</p>}
        <i className={!showInfos ? "fa-regular fa-eye-slash" : "fa-regular fa-eye" } onClick={(e)=>toggleInfos(e)}></i>
      </header>
     <div className="outlet">
     <Outlet />
     </div>
      <nav>
        <div className="nav-content">
          <div className="profile-button">
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "active-profile" : "")}
            >
              <i class="fa-regular fa-user"></i>
            </NavLink>
          </div>
          <div className="home-button">
            <NavLink
             to="/"
              className={({ isActive }) => (isActive ? "active-home" : "")}
            >
              <i class="fa-solid fa-house"></i>
            </NavLink>
          </div>
          <div className="card-button">
            <NavLink
            to="/card" 
             className={({ isActive }) => (isActive ? "active-card" : "")}
            >
              <i class="fa-regular fa-credit-card"></i>
            </NavLink>
          </div>
        </div>
      
      </nav>
    
    </div>
      )}
   
    </>
  );
}

export default App;
