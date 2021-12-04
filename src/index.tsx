import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from './auth/app';

const reactRoot = document.querySelector("#react_root");
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    reactRoot
);