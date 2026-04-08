import {StrictMode} from 'react'

import {createRoot} from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import './index.css';
import './assets/core/errors.css';
import App from './App.tsx';
import { CssBaseline, ThemeProvider } from '@mui/material';
import theme from './theme/theme.ts'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <CssBaseline />
            <App/>
        </ThemeProvider>
    </StrictMode>,
)
