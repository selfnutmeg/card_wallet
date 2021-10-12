import React, { useState } from "react";
import { BrowserRouter , Route, Switch, Redirect } from "react-router-dom";
import CardFormPage from "./pages/CardFormPage";
import CardsPage from "./pages/CardsPage";

import "./styles/App.css";

const ValidSum = {
  MIN: 10,
  MAX: 1000000,
  MIN_LENGTH: 2,
  MAX_LENGTH: 7,
};

const App = () => {
  const [cards, setCards] = useState([]);
  const [transactionCards, setTransactionCards] = useState({
    cardFrom: "",
    cardTo: "",
    sum: "",
  });
  const [validTransaction, setValidTransaction] = useState({
    cardFromValid: false,
    cardToValid: false,
    sumValid: false,
  });

  const clearTransaction = () => {
    setTransactionCards({cardTo: "", cardFrom: "", sum: ""});
    setValidTransaction({cardFromValid: false, cardToValid: false, sumValid: false});
  };

  const defineCardFrom = (evt) => {
    if (transactionCards.cardTo !== evt.target.value) {
      setTransactionCards({...transactionCards, cardFrom: evt.target.value});
      setValidTransaction({...validTransaction, cardFromValid: true});
    } else {
      setTransactionCards({...transactionCards, cardFrom: evt.target.value, cardTo: ""});
      setValidTransaction({...validTransaction, cardFromValid: true, cardToValid: false});
    }
  };

  const defineCardTo = (evt) => {
    if (transactionCards.cardFrom !== evt.target.value) {
      setTransactionCards({...transactionCards, cardTo: evt.target.value});
      setValidTransaction({...validTransaction, cardToValid: true});
    } else {
      setTransactionCards({...transactionCards, cardTo: evt.target.value, cardFrom: ""});
      setValidTransaction({...validTransaction, cardFromValid: false, cardToValid: true});
    }

  };

  const defineSum = (evt) => {
    let sumFormatted = evt.target.value.replace(/\D/g, '').substring(0,7);
        setTransactionCards({...transactionCards, sum: sumFormatted});

        const checkIsValid = (value) => {
          if (!value)
            return false;

          if (value.length > ValidSum.MAX_LENGTH || value.length < ValidSum.MIN_LENGTH)
            return false;

          if (parseInt(value) > ValidSum.MAX || parseInt(value) < ValidSum.MIN)
            return false;

          return true;
        };

        setValidTransaction({...validTransaction, sumValid: checkIsValid(evt.target.value)});
  };

  const createCard = (newCard) => {
    setCards([...cards, newCard]);
    clearTransaction();
  };

  const removeCard = (card) => {
    setCards(cards.filter(currentCard => currentCard.id !== card.id));
    clearTransaction();
  };

  return (
    <BrowserRouter>
      <Switch>
        <Route path="/cards">
          <CardsPage
            cards={cards}
            removeCard={removeCard}
            title={"Мои карты"}
            defineCardFrom={defineCardFrom}
            defineCardTo={defineCardTo}
            defineSum={defineSum}
            transactionCards={transactionCards}
            validTransaction={validTransaction}
            clearTransaction={clearTransaction}
          />
        </Route>

        <Route path="/add-new-card">
          <CardFormPage
            createCard={createCard}
            cards={cards}
            title={"Привязка банковской карты"}
          />
        </Route>

        <Redirect to="/cards" />
      </Switch>
    </BrowserRouter>
  );
};

export default App;
