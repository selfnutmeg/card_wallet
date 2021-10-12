import React from "react";
import MyButton from "./UI/button/MyButton";

const Transaction = ({title, defineCardFrom, defineCardTo, defineSum, transactionCards, cards, validTransaction, showPopup}) => {

    return (
        <div className="transaction">
            <h1 className="headtitle">{title}</h1>

            <form className="transaction-form">
                <div className="transaction-form__input-wrapper">
                    <label className="transaction-form__label" htmlFor="card-to">Куда перевести</label>
                    <select
                        value={transactionCards.cardTo}
                        id="card-to"
                        className="transaction-form__select"
                        onChange={evt => defineCardTo(evt)}
                    >
                        <option value="">Номер карты</option>
                        {cards.map(card => {
                            return (
                                <option value={card.number} key={card.id}>{"**** " + card.number.slice(-4)}</option>
                            );
                        })}
                    </select>
                </div>

                <div className="transaction-form__input-wrapper">
                    <label className="transaction-form__label transaction-form__label--sum" htmlFor="sum">Сколько</label>
                    <input
                        value={transactionCards.sum}
                        onInput={evt => defineSum(evt)}
                        type="text"
                        maxLength="7"
                        id="sum"
                        className="transaction-form__input"
                        min="10"
                        max="1000000"
                        autoComplete="off"
                    />
                </div>

                <div className="transaction-form__input-wrapper">
                    <label className="transaction-form__label" htmlFor="card-from">Откуда</label>
                    <select
                        value={transactionCards.cardFrom}
                        id="card-from"
                        className="transaction-form__select"
                        onChange={evt => defineCardFrom(evt)}
                    >
                        <option value="">Номер карты</option>
                        {cards.map(card => {
                            return (
                                <option value={card.number} key={card.id}>{"**** " + card.number.slice(-4)}</option>
                            );
                        })}
                    </select>
                </div>

                <div className="transaction-form__button-wrapper">
                    <MyButton 
                        disabled={!(validTransaction.cardFromValid && validTransaction.cardToValid && validTransaction.sumValid)}
                        type="button"
                        onClick={evt => {
                            evt.preventDefault();
                            showPopup();
                        }}
                    >
                        Сделать перевод
                    </MyButton>
                </div>
            </form>
        </div>
    );
}

export default Transaction;
