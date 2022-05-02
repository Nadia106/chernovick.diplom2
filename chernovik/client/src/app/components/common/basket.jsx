import React from "react";

const Basket = ({status, ...rest}) => {
    return (
        <div>
            <button {...rest}>
                <i className={"bi bi-cart" + (status ? "-check-fill" : "")}></i>
            </button>
        </div>

    )
}
export default Basket;