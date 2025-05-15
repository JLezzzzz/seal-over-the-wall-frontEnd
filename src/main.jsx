// import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import 'keen-slider/keen-slider.min.css';


// React Component
import App from './App.jsx'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { AuthProvider } from "./context/AuthContext.jsx";

createRoot(document.getElementById('root')).render(
    <AuthProvider>
        <App/>
    </AuthProvider>
        
)




