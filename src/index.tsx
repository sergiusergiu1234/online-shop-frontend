import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { AuthProvider } from './context/AuthProvider';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(

  <BrowserRouter>
  <AuthProvider>
    <Routes>
      <Route path='/*' element={<App />} />
    </Routes>
  </AuthProvider>
  </BrowserRouter>



);

reportWebVitals();
