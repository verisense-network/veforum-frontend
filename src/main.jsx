import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import WalletProvider from './context/WalletProvider'
import theme from './theme.js'
import { ThemeProvider } from '@mui/material';
import { BrowserRouter } from 'react-router-dom';
import ArticlesProvider from './context/ArticlesContext.jsx';
/* import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; */
import * as buffer from 'buffer';


if (typeof window?.global === 'undefined') {
	window.global = window;
}
if (typeof window.Buffer === 'undefined') {
	window.Buffer = buffer.Buffer;
}

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ThemeProvider theme={theme}>
      {/* <ToastContainer> */}
        <WalletProvider>
          <ArticlesProvider>
            <App />
          </ArticlesProvider>
        </WalletProvider>
      {/* </ToastContainer> */}
    </ThemeProvider>
  </BrowserRouter>
  ,
)
