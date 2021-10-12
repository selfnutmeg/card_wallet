import React, { useState } from "react";
import CardList from "../components/CardList";
import { Link } from "react-router-dom";
import Transaction from "../components/Transaction";
import Popup from "../components/Popup";

const CardsPage = ({cards, removeCard, defineSum, defineCardFrom, defineCardTo, title, validTransaction, transactionCards, clearTransaction}) => {

    const [popupDisplay, setPopupDisplay] = useState(false);

    const showPopup = () => {
        setPopupDisplay(true);
        clearTransaction();
    };
    const hidePopup = () => setPopupDisplay(false);

    return (
        <div className="app-wrapper">
            <CardList remove={removeCard} cards={cards} title={title} />
            <Link to="/add-new-card" className="link-button">{cards.length ? 'Привязать ещё одну карту' : 'Привязать карту'}</Link>
            <Transaction
            title={"Перевод на кошелёк"}
            defineCardFrom={defineCardFrom}
            defineCardTo={defineCardTo}
            defineSum={defineSum}
            transactionCards={transactionCards}
            validTransaction={validTransaction}
            cards={cards}
            showPopup={showPopup}
            />
            <Popup title={"Перевод на кошелёк"} visible={popupDisplay} clickFunction={hidePopup} />
        </div>
    );
};

export default CardsPage;
