import React from "react";
import { useContext, useState } from "react";
import { StatesContext } from "../context/Context";
import "./Card.css";

const Card = () => {
  const {
    name,
    saldo,
    setSlado,
    showInfos,
    setShowInfos,
    extract,
    setExtract,
    extractValue,
    setExtractValue,
    data,
    setData,
    type,
    setType,
  } = useContext(StatesContext);

  const [rangeValue, setRangeValue] = useState(0);
  const [cardSaldo, setCardSaldo] = useState(0);
  const [cardLimit, setCardLimit] = useState(1000);
  const [handleTransferValue, setHandleTransferValue] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [transferName, setTransferName] = useState("");
  const [emptyValue, setEmptyValue] = useState(false);
  const [limitValue, setlimitValue] = useState(false);
  const [sucessTransfer, setSucessTransfer] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false)

   // Pegar a data atual:
      // Obtem a data atual
      const currentDate = new Date();
      // Extrai o dia e o mês
      const day = currentDate.getDate();
      const month = currentDate.getMonth() + 1; // Exemplo: 'January'

  const showPaymentOnExtract = ()=>{
    setType("-")
      setExtractValue(cardSaldo)
      setData(day + "/" + month)
               // Adiciona a nova transação ao extract
     setExtract(prevExtract => [...prevExtract, {
      type: "-",
      value: formatarSaldo(cardSaldo),
      data: day + "/" + month,
  }]);
      
  }





  const formatarSaldo = (valor) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(valor);
  };

  const handleRangeChange = (e) => {
    setRangeValue(e.target.value);
  };

  //  Manipulação do formulario de pagamento de fatura:
  const switchForm = () => {
    if (showPaymentForm == true || showForm == false) {
      setShowPaymentForm(false);
      setShowForm(true);
      setTransferName("");
      setHandleTransferValue("");
    }
  };
  const switchPaymentForm = () => {
    if (showForm == true || showPaymentForm == false) {
      setShowForm(false);
      setShowPaymentForm(true);
    }
  };

  // Fuunmção para debitar o saldo do limite
  const creditAlter = () => {
    if (handleTransferValue == "" || transferName == "") {
      setEmptyValue(true);
      setTimeout(() => {
        setEmptyValue(false);
      }, 1000);
    } else {
      if (cardLimit <= 0 || cardSaldo > 1000) {
        setlimitValue(true);
        setTimeout(() => {
          setlimitValue(false);
        }, 3000);
      } else {
        console.log(cardLimit);
        const transferValue = parseFloat(handleTransferValue);

        // Atualiza o saldo do cartão
        setCardSaldo((prevSaldo) => {
          return prevSaldo + transferValue;
        });

        // Atualiza o limite disponível, mas apenas uma vez
        setCardLimit((prevLimit) => prevLimit - transferValue);

        setShowForm(false);
        setSucessTransfer(true);
        setTimeout(() => {
          setSucessTransfer(false);
        }, 2000);
      }
    }
  };

  // Pagrar fatura:

  const payFature = ()=>{
    setSlado(saldo - cardSaldo)
    setCardSaldo(0)
    setCardLimit(cardLimit + cardSaldo)
    showPaymentOnExtract()
    setShowPaymentForm(false)
  }

  return (
    <div className="card-container">
      <div className="card-card">
        <svg
          width="56"
          height="50"
          viewBox="0 0 56 50"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M21.2613 17.2125L13.93 32.8292H9.14667L5.53933 20.3646C5.32 19.598 5.131 19.3167 4.46367 18.9938C3.37633 18.4667 1.57967 17.973 0 17.6646L0.107333 17.2125H7.80733C8.31051 17.2121 8.79729 17.3723 9.17982 17.6641C9.56234 17.956 9.81541 18.3604 9.89333 18.8042L11.7997 27.8417L16.5083 17.2125H21.2613ZM40.005 27.7313C40.0237 23.6084 33.621 23.3813 33.6653 21.5396C33.6793 20.9792 34.2767 20.3834 35.5833 20.2313C37.1147 20.1014 38.6569 20.3433 40.047 20.9313L40.8403 17.6188C39.487 17.1642 38.0536 16.9293 36.6077 16.925C32.1347 16.925 28.987 19.05 28.959 22.0896C28.931 24.3375 31.206 25.5896 32.921 26.3396C34.685 27.1042 35.2777 27.5959 35.2683 28.2792C35.2567 29.3292 33.8637 29.7896 32.5617 29.8084C30.2867 29.8396 28.9683 29.2605 27.9137 28.823L27.0947 32.2438C28.1517 32.6771 30.1023 33.0563 32.1253 33.073C36.8783 33.073 39.9887 30.9771 40.005 27.7313ZM51.814 32.8292H56L52.3483 17.2125H48.4843C48.0713 17.2083 47.6664 17.3153 47.3225 17.5198C46.9787 17.7242 46.7119 18.0165 46.557 18.3584L39.7693 32.8292H44.52L45.465 30.4959H51.2703L51.814 32.8292ZM46.767 27.2959L49.147 21.4313L50.519 27.2959H46.767ZM27.727 17.2125L23.9867 32.8292H19.46L23.205 17.2125H27.727Z"
            fill="#F8F8F8"
          />
        </svg>
        <div className="validade">
        {!showInfos ? <p>**/**</p> : <p>04/27</p>}  
        </div>
        <div className="card-name">
          {!showInfos ? <p>*********</p> : <p>{name}</p>}          
          {!showInfos ? <p>**** - **** - **** - ***</p> : <p>1234 - 5678 - 9101 - 1123</p>}          
        
        </div>
      </div>
      <div className="card-actions">
        <div className="fatura">
          <h3>Sua Fatura</h3>
          {!showInfos ? <h2>******</h2> : <h2>{formatarSaldo(cardSaldo)}</h2>}

          <input
            type="range"
            name="fatura"
            id="fatura"
            min="0"
            max="1000"
            value={cardSaldo}
            onChange={handleRangeChange}
          />
          {!showInfos ? (
            <p>Limite disponível: ******</p>
          ) : (
            <p>Limite disponível: {formatarSaldo(cardLimit)}</p>
          )}

          <button type="button" onClick={switchForm}>
            NOVA TRANSAÇÃO
          </button>
          <button type="button" onClick={switchPaymentForm}>
            PAGAR FATURA
          </button>
        </div>

        <div className={!showPaymentForm ? "pay-fatura hide" : "pay-fatura"}>
          <p>Total a pagar:</p>
          <h3>{formatarSaldo(cardSaldo)}</h3>
          <p>
            Saldo em conta: <span>{formatarSaldo(saldo)}</span>
          </p>
          <p>
            Saldo após pagamento:{" "}
            <span>{formatarSaldo(saldo - cardSaldo)}</span>
          </p>
          <div className={!showConfirmation ? "confirmation hide" : "confirmation"}>
            <p>Confirmar pagamento?</p>
            <div className="confirmation-actions">
              <button id="yes" onClick={payFature}>SIM</button>
              <button id="no" onClick={(e)=>setShowConfirmation(false)}>NÃO</button>
            </div>
          </div>
          <button className={showConfirmation ? "pay-button hide" : "pay-button"} onClick={(e)=>setShowConfirmation(true)}>PAGAR</button>
        </div>
        <div className={!showForm ? "card-transtion hide" : "card-transtion"}>
          <div className="transition-form">
            <label>
              <span>NOME:</span>
              <input
                id="name"
                type="text"
                value={transferName}
                onChange={(e) => setTransferName(e.target.value)}
              />
            </label>
            <label>
              <span>R$:</span>
              <input
                id="number"
                type="number"
                value={handleTransferValue}
                onChange={(e) => setHandleTransferValue(e.target.value)}
              />
            </label>
          </div>
          <p id={!emptyValue ? "empty-value" : "valid-value"}>
            Preencha os campos corretamente
          </p>

          <button type="button" onClick={(e) => creditAlter(e)}>
            ENVIAR
          </button>
        </div>
        <h2
          id={!sucessTransfer ? "false-notification" : "tranfer-notification"}
        >
          TRASNFERENCIA PARA <span>{transferName}</span> DE{" "}
          <span>{formatarSaldo(handleTransferValue)}</span> COM SUCESSO
        </h2>
        <p id={!limitValue ? "limit-value" : "limit-not-value"}>
          Limite indisponível Pague sua fatura para liberar seu limite
        </p>
      </div>
    </div>
  );
};

export default Card;
