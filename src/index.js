import "bulma/css/bulma.css";
import App from "./App";
import React from 'react';
import { createRoot } from 'react-dom/client';

const container = document.querySelector('#content');
const root = createRoot(container);
root.render(<App />);