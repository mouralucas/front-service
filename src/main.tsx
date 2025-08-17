import {StrictMode} from 'react'

import {createRoot} from 'react-dom/client'
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import 'devextreme/dist/css/dx.light.css';
import "react-datepicker/dist/react-datepicker.css";
import './index.css';
import './assets/core/colors.css';
import './assets/core/errors.css';
import App from './App.tsx';
import { ThemeProvider } from '@mui/material';
import theme from './assets/core/theme.tsx'


createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ThemeProvider theme={theme}>
            <App/>
        </ThemeProvider>
    </StrictMode>,
)
