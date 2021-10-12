import React, { useRef, useState } from "react";
import MyButton from "../components/UI/button/MyButton";
import { Link, useHistory } from "react-router-dom";
import Popup from "../components/Popup";

const CardFormPage = ({createCard, cards, title}) => {
    const [modal, setModal] = useState(false);
    const [inputedCVC, setInputedCVC] = useState('');
    const [form, setForm] = useState({
        numberInputValid: false,
        dateInputValid: false,
        cvcInputValid: false,
    });
    const numberInputRef = useRef();
    const validityInputRef = useRef();
    const cvcInputRef = useRef();
    
    const ValidDate = {
        MONTH_MIN: 1,
        MONTH_MAX: 12,
        YEAR_MIN: 21,
        YEAR_MAX: 51,
    };

    const router = useHistory();

    const redirectToCards = (evt) => {
        evt.preventDefault();
        router.push("/cards/");
    };

    const addNewCard = (evt) => {
        evt.preventDefault();

        const newCard = {
            id: Date.now(),
            number: numberInputRef.current.value,
            validity: validityInputRef.current.value,
            cvc: cvcInputRef.current.value,
        };

        createCard(newCard);
        setModal(true);
    };

    const handleNumberInput = (evt) => {
        let cardCode = evt.target.value.replace(/\D/g, '').substring(0,16);

        if(cardCode)
            cardCode = cardCode.match(/.{1,4}/g).join(' ');

        evt.target.value = cardCode;

        const checkIsValid = (value) => {
            if (value.length !== 19)
                return false;

            if (cards.length > 0) {
                for (let i = 0; i < cards.length; i++) {
                    if (cards[i].number === value)
                        return false;
                }
            }

            return true;
        };

        setForm({...form, numberInputValid: checkIsValid(evt.target.value)});
    };

    const handleValidityInput = (evt) => {
        let cardDate = evt.target.value.replace(/\D/g, '').substring(0,4);

        if(cardDate)
            cardDate = cardDate.match(/.{1,2}/g).join('/');

        evt.target.value = cardDate;

        const checkIsValid = (value) => {
            if (value.length !== 5)
                return false;
            else if (parseInt(value.slice(0,2)) > ValidDate.MONTH_MAX || parseInt(value.slice(0,2)) < ValidDate.MONTH_MIN)
                return false;
            else if (parseInt(value.slice(-2)) > ValidDate.YEAR_MAX || parseInt(value.slice(-2)) < ValidDate.YEAR_MIN)
                return false;
            return true;
        };

        setForm({...form, dateInputValid: checkIsValid(evt.target.value)});
    };

    const handleCVCInput = (evt) => {
        let cardCVC = evt.target.value.replace(/\D/g, '').substring(0,3);
        evt.target.value = cardCVC;

        let stars = ''
        for(let i = 0; i < evt.target.value.length; i++)
            {
                stars += '*';
            }

        setInputedCVC(stars);

        const isValid = evt.target.value.length === 3;
        setForm({...form, cvcInputValid: isValid});
    };
    
    return (
        <div className="app-wrapper">
            <h1 className="headtitle">{title}</h1>

            <form 
                className="card-form"
            >
                <div className="card-form__container"> 
                    <div className="card-form__upper">
                        <div className="card-form__system-logo card-form__system-logo--mastercard">
                            <img src="/images/mastercard_logo.svg" alt="" />
                        </div>
                        <div className="card-form__system-logo card-form__system-logo--visa">
                            <img src="/images/visa_logo.svg" alt="" />
                        </div>
                        <div className="card-form__system-logo card-form__system-logo--mir">
                            <img src="/images/mir_logo.svg" alt="" />
                        </div>
                    </div>

                    <div className="card-form__middle">
                        <input type="text" 
                        className="card-form__input"
                        ref={numberInputRef}
                        placeholder="Номер карты"
                        maxLength="19"
                        onInput={handleNumberInput}
                        autoComplete="off" />
                    </div>

                    <div className="card-form__lower">
                        <div className="card-form__lower-left">
                            <input type="text" 
                            className="card-form__input card-form__input--data"
                            ref={validityInputRef}
                            placeholder="ММ/ГГ"
                            maxLength="5"
                            onInput={handleValidityInput}
                            autoComplete="off" />
                        </div>

                        <div className="card-form__lower-right">
                            <small className="card-form__cvc-prompt">Три цифры<br/>на обороте</small>

                            <div className="card-form__cvc-wrapper">
                                <input type="text" 
                                id="cvc-input"
                                onInput={handleCVCInput}
                                className="card-form__input card-form__input--cvc"
                                ref={cvcInputRef}
                                placeholder="CVC" 
                                pattern="[0-9]{3}" 
                                maxLength="3"
                                autoComplete="off" />

                                <label htmlFor="cvc-input">{inputedCVC}</label>
                            </div>
                        </div>
                    </div>
                </div>
                
                <div className="card-form__buttons">
                    <Link to="/cards" className="link-button link-button--back">Отменить</Link>
                    <MyButton disabled={!(form.numberInputValid && form.dateInputValid && form.cvcInputValid)} onClick={addNewCard}>Продолжить</MyButton>
                </div>
            </form>

            <Popup title={title} visible={modal} setVisible={setModal} clickFunction={redirectToCards} />
        </div>
    );
};

export default CardFormPage;
