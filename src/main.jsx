import './index.css'
import {
BrowserRouter,

} from 'react-router'

import React from 'react'

import App from './App'

const root = ReactDom.createRoot(document.getElementById('root'));
root.render(
<BrowserRouter>
    <App />
</BrowserRouter>
);