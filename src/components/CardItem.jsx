import React from "react";
import MyButton from "./UI/button/MyButton";

const CardItem = (props) => {

    const formatNumberHiddenPart = (number) => number.slice(0,7) + "** ****" + number.slice(-5);

    return (
        <div className="card">
            <div className="card__logos">
                <img src="/images/tinkoff-big_logo.svg" alt="" />
                <img src="/images/mastercard_logo.svg" alt="" />
            </div>
            <div className="card__content">
                <div>{formatNumberHiddenPart(props.card.number)}</div>
            </div>
            <div className="card__btns">
                <MyButton onClick={() => props.remove(props.card)}>Удалить</MyButton>
            </div>
        </div>
    );
};

export default CardItem;
