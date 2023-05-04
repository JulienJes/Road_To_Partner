import { createRoot } from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import './styles/index.scss'
import { AuthProvider } from "./components/twitch/AuthContext";

const container = document.getElementById('root');
const root = createRoot(container); 

root.render(
  <AuthProvider>
    <BrowserRouter >
      <App />
    </BrowserRouter>
  </AuthProvider>
)