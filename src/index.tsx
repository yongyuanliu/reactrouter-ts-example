import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from './search-params/index';

const reactRoot = document.querySelector("#react_root");
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    reactRoot
);