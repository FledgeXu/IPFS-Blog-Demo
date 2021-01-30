'use strict'
import React from 'react'
import ReactDOM from 'react-dom'
import App from './app.jsx'

const mainElement = document.createElement("div");
document.body.appendChild(mainElement);
ReactDOM.render(<App/>, mainElement);
