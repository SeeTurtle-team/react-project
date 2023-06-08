import React from 'react';
import ReactDOM from 'react-dom/client';
import 'primereact/resources/themes/lara-light-indigo/theme.css';   // theme
import 'primereact/resources/primereact.css';                       // core css
import 'primeicons/primeicons.css';                                 // icons
import 'primeflex/primeflex.css';                                   // css utility
import './index.css';
import './flags.css';
import App from './App';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import BoardCreate from './views/BoardCreate';
import BoardEdit from './views/BoardEdit';

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/BoardCreate" element={<BoardCreate />} />
        <Route path="/BoardEdit" element={<BoardEdit />} />
      </Routes>
    </BrowserRouter>
);