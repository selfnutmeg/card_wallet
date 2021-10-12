import React from "react";
import MyButtonSecond from "./UI/buttonSecond/MyButton";

const Popup = ({title, visible, clickFunction}) => {

    const rootClasses = ["popup"];

    if(visible) {
        rootClasses.push("popup--active");
    }

    return (
        <div className={rootClasses.join(' ')}>
            <div className="app-wrapper">
                <h1 className="popup__headtitle headtitle">{title}</h1>

                <div className="popup__container">
                    <div className="popup__image">
                        <img src="/images/check-success.svg" alt="" />
                    </div>
                    <p className="popup__text">Все получилось</p>
                    <MyButtonSecond onClick={clickFunction}>Обратно к картам</MyButtonSecond>
                </div>
            </div>
        </div>
    );
};

export default Popup;
