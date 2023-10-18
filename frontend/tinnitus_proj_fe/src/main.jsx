import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
// import { PassageProvider } from '@passageidentity/passage-react';



ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
     <BrowserRouter>
      <App />
    </BrowserRouter>

  // </React.StrictMode>
);
