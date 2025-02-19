import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {BrowserRouter} from 'react-router-dom'
import AdimContextProvider from './context/adminContext.jsx'
import DoctorContextProvider from './context/DoctorConext.jsx'
import AppContextProvider from './context/AppContext.jsx'

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AdimContextProvider>
      <DoctorContextProvider>
        <AppContextProvider>
          <App />
        </AppContextProvider>
      </DoctorContextProvider>
    </AdimContextProvider>
  </BrowserRouter>
);


