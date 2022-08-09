import creditCardType from "credit-card-type";
import { useEffect, useRef, useState } from "react";
import NumberFormat from "react-number-format";
import validate from "../utils/validator";
import Image from "next/image";

export default function Home() {
    const [name, setName] = useState("");
    const [dNumber, setDNumber] = useState("");
    const [cardNumber, setCardNumber] = useState("0");
    const [MM, setMM] = useState("");
    const [YY, setYY] = useState("");
    const [CVC, setCVC] = useState("");
    const [cardType, setCardType] = useState([]);
    const [completed, setCompleted] = useState(false);

    useEffect(() => {
        setCardNumber(dNumber.split(" ").join(""));
        let creditCardType = require("credit-card-type");
        let creditCard = creditCardType(`${dNumber ? dNumber.slice(0, 4) : "0000"}`);
        setCardType(creditCard);
    }, [dNumber]);

    const makeMask = () => {
        let mask = [];
        if (cardType[0]?.lengths) {
            for (let i = 0; i < cardType[0].lengths[0]; i++) {
                mask.push("#");
            }
            for (let i = 0, j = 0; i < cardType[0].gaps.length; i++, j++) {
                mask.splice(cardType[0].gaps[i] + j, 0, " ");
            }

            return mask.join("");
        } else {
            return "#### #### #### ####";
        }
    };

    const cardLogo = () => {
        if (cardType[0]) {
            if (cardType[0].type === "visa") {
                return "/images/visa.svg";
            }
            if (cardType[0].type === "mastercard") {
                return "/images/mastercard.svg";
            }
            if (cardType[0].type === "american-express") {
                return "/images/american.svg";
            }
        }

        return "/images/card-logo.svg";
    };

    const handleSubmit = e => {
        e.preventDefault();

        let data = {
            name: name,
            number: cardNumber,
            mm: MM,
            yy: YY,
            cvc: CVC,
        };

        console.log(data);
        validate(data);
        setCompleted(validate(data));
    };

    return (
        <div className="main-container">
            <div className="card-container">
                <div className="card-front">
                    <img className="card-logo" src={cardLogo()} alt="" />
                    <div className="card-number">{`${dNumber ? dNumber : "0000 0000 0000 0000"} `}</div>
                    <div className="name">{name ? name.toUpperCase() : "JANE APPLESEED"}</div>
                    <div className="exp-date">{`${MM ? MM : "00"}/${YY ? YY : "00"}`}</div>
                </div>
                <div className="card-back">
                    <div className="CVC">{`${CVC ? CVC : "000"}`}</div>
                </div>
            </div>

            {completed === false && (
                <div className="form-container">
                    <div className="form" action="">
                        <div className="form-row">
                            <label htmlFor="">CARDHOLDER NAME</label>
                            <input
                                type="text"
                                id={"refName"}
                                placeholder="e.g. Jane Apleseed"
                                value={name}
                                name="name"
                                onChange={e => setName(e.target.value)}
                                onFocus={e => {
                                    e.target.classList.remove("input-error");
                                    document.getElementById("e-name").classList.add("hidden-error");
                                }}
                            />
                            <div id="e-name" className="error hidden-error">
                                Can't be blank
                            </div>
                        </div>
                        <div className="form-row">
                            <label htmlFor="">CARD NUMBER</label>
                            <NumberFormat
                                type="text"
                                placeholder="e.g. 1234567891230000"
                                value={dNumber}
                                id={"refNumber"}
                                format={makeMask()}
                                //onChange={e => handleNumber(e.target.value)}
                                onChange={e => setDNumber(e.target.value)}
                                onFocus={e => {
                                    e.target.classList.remove("input-error");
                                    document.getElementById("e-number").classList.add("hidden-error");
                                }}
                            />
                            <div id="e-number" className="error hidden-error">
                                Can't be blank
                            </div>
                        </div>
                        <div className="row-container">
                            <label className="date-label" htmlFor="">
                                EXP. DATE (mm/yy)
                            </label>
                            <NumberFormat
                                type="text"
                                className="MM"
                                placeholder="MM"
                                value={MM}
                                id={"refMM"}
                                onChange={e => setMM(e.target.value)}
                                min="1"
                                max="12"
                                format="##"
                                onFocus={e => {
                                    e.target.classList.remove("input-error");
                                    document.getElementById("e-date").classList.add("hidden-error");
                                }}
                            />
                            <NumberFormat
                                type="text"
                                className="YY"
                                placeholder="YY"
                                id={"refYY"}
                                value={YY}
                                onChange={e => setYY(e.target.value)}
                                min="0"
                                max="99"
                                format="##"
                                onFocus={e => {
                                    e.target.classList.remove("input-error");
                                    document.getElementById("e-date").classList.add("hidden-error");
                                }}
                            />
                            <div id="e-date" className="error e-date hidden-error">
                                Can't be blank
                            </div>
                            <label className="CVC-label" htmlFor="">
                                CVC
                            </label>
                            <NumberFormat
                                type="text"
                                className="formCVC"
                                placeholder="e.g. 123"
                                id={"refCVC"}
                                onChange={e => setCVC(e.target.value)}
                                min="0"
                                max="999"
                                format="####"
                                onFocus={e => {
                                    e.target.classList.remove("input-error");
                                    document.getElementById("e-CVC").classList.add("hidden-error");
                                }}
                            />
                            <div id="e-CVC" className="error e-CVC hidden-error" value={CVC}>
                                Can't be blank
                            </div>
                        </div>

                        <button className="btn" type="submit" value="Confirm" onClick={e => handleSubmit(e)}>
                            Confirm
                        </button>
                    </div>
                </div>
            )}
            {completed === true && (
                <div className="thanks-container">
                    <img src="/images/icon-complete.svg" alt="" />
                    <h1>THANK YOU!</h1>
                    <p>We've added your card details</p>
                    <button className="btn" onClick={() => setCompleted(false)}>
                        Continue
                    </button>
                </div>
            )}
        </div>
    );
}
