import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import WalletProvider from './context/WalletProvider'
import theme from './theme.js'
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <WalletProvider>
          <App />
        </WalletProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
