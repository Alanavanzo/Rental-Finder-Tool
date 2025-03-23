import React, { useState } from "react";
import rentalyzeLogo from '../styling/images/rentalyzeLogo.png';

const LogoComponent = () => {
    const rentalyzeLogoURL = chrome.runtime.getURL(rentalyzeLogo);
    return (
        <img src={rentalyzeLogoURL} alt="rentalyze logo" />
    )
};

export default LogoComponent;