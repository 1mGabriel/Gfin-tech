import React from 'react'
import { useContext, useState } from "react";
import { StatesContext } from "../context/Context";
// css:
import "./Home.css"

const Home = () => {
    const {saldo, setSlado , showInfos, setShowInfos,   extract, setExtract,
      extractValue,
      setExtractValue,
      data,
      setData,
      type,
      setType,} =useContext(StatesContext)

      const[emptySaldo, setEmptySaldo] = useState(false)
    const [handlePlusSaldo, setHandlePlusSaldo] = useState("")
    const [handleMinusSaldo, setHandleMinusSaldo] = useState("")



     // Pegar a data atual:
      // Obtem a data atual
      const currentDate = new Date();
      // Extrai o dia e o mês
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1; // Exemplo: 'January'





    const plusSaldo = ()=>{
      if(handlePlusSaldo == ""){
        setEmptySaldo(true)
        setTimeout(()=>{
          setEmptySaldo(false)
        },1000)
      }else{
        setSlado((prevs) => prevs +  parseFloat(handlePlusSaldo))
        setHandlePlusSaldo("")
        setType("-")
        setExtractValue(handlePlusSaldo)
        setData(day + "/" + month)
           // Adiciona a nova transação ao extract
       setExtract(prevExtract => [...prevExtract, {
         type: "+",
         value: formatarSaldo(handlePlusSaldo),
         data: day + "/" + month,
     }]);
     setHandlePlusSaldo("")
      console.log(extract)
      }
    }

  

    const minusSaldo = ()=>{
      if(handleMinusSaldo == ""){
        setEmptySaldo(true)
        setTimeout(()=>{
          setEmptySaldo(false)
        },1000)
      }else{
        setSlado((prevs) => prevs -  parseFloat(handleMinusSaldo))
        setHandleMinusSaldo("")
        setType("-")
        setExtractValue(handleMinusSaldo)
        setData(day + "/" + month)
           // Adiciona a nova transação ao extract
       setExtract(prevExtract => [...prevExtract, {
         type: "-",
         value: formatarSaldo(handleMinusSaldo),
         data: day + "/" + month,
     }]);
     setHandleMinusSaldo("")
      console.log(extract)
      }

    
     
    }
   
    const formatarSaldo = (valor) => {
        return new Intl.NumberFormat('pt-BR', {
          style: 'currency',
          currency: 'BRL'
        }).format(valor);
      };
   
   
   
      return (
   
   <div className='home-container'>
      <div className="saldo-content">
    <p>Saldo Atual</p>
    {!showInfos ?   <h2>******</h2> : <h2>{formatarSaldo(saldo)}</h2>}
        <hr /><br />
       Entrada/Saída
        <div className="saldo-action">
            <input type="number"  value={handlePlusSaldo} onChange={(e)=>setHandlePlusSaldo(e.target.value)}/>
            <button id='plus' onClick={(e)=>plusSaldo(e)}><i class="fa-solid fa-plus"></i></button>
            <button id='minus' onClick={(e)=>minusSaldo(e)}><i class="fa-solid fa-minus"></i></button>
            <input type="number"  value={handleMinusSaldo} onChange={(e)=>setHandleMinusSaldo(e.target.value)} />
          
        </div>
        <p className={!emptySaldo ? "empty-saldo" : "empty-show"}>Insira um valor para transação</p>
        
    </div>
   
      <div className="extract-content">
        <p>Extrato</p>
        <div className="extracts">
          {extract.length  == 0 ? (
            <p id='if-none'>Nenhuma transação recente</p>            
          ):(
            extract.slice().reverse().map((trasition , index)=>(
              <div className="trasition-extract" key={index}>
                <p id={trasition.type == "+" ? "plus-value" : "minus-value"}>{trasition.type} {trasition.value}</p>
                <p id='transition-data'>{trasition.data}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  )
}

export default Home
