import React from "react";

const MenuItem = ({name, picture, ingredients, price}) => {

    return(
        <div className="menuItem">
            <img src={picture} className="card-img-top" alt={name} />
            <div className="textContent">
                <div className="contentHead">
                    <p>{name}</p>
                    <p>{price}</p>
                </div>
                <p>{ingredients}</p>
            </div>
        </div>
    )
}

export default MenuItem;