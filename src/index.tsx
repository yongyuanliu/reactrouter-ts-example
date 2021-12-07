import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import App from './router-object/App';

const reactRoot = document.querySelector("#react_root");
ReactDOM.render(
    <BrowserRouter>
        <App />
    </BrowserRouter>,
    reactRoot
);