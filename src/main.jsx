import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { App } from './App'
import { ThemeProvider } from '@mui/material';
import { customMuiTheme } from './styles/muiTheme';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ThemeProvider theme={customMuiTheme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>,
);
