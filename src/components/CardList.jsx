import React from "react";
import CardItem from "./CardItem";
import CardPlaceholder from "./CardPlaceholder";

const CardList = ({cards, title, remove}) => {

    return(
        <div className="cardlist">
            <h1 className="cardlist__headtitle headtitle">{title}</h1>
            <div className="cardlist__wrapper">
            {cards.length
                ? cards.map((card) => <CardItem remove={remove} card={card} key={card.id}/> )
                : <CardPlaceholder />
            }
            </div>
        </div>
    );
};

export default CardList;
