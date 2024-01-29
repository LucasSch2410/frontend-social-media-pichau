import React from 'react';
import { AuthProvider } from './context/LoginContext';

import ReactDOM from 'react-dom/client'
import App from "./App";


ReactDOM.createRoot(document.getElementById('root')!).render(
   <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
   </React.StrictMode>
)
