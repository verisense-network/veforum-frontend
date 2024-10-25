import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import WalletProvider from './context/WalletProvider'
import theme from './theme.js'
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import ArticlesProvider from './context/ArticlesContext.jsx';

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <WalletProvider>
          <ArticlesProvider>
            <App />
          </ArticlesProvider>
        </WalletProvider>
      </ThemeProvider>
    </BrowserRouter>
  </StrictMode>,
)
