import ReactDOM from 'react-dom/client';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Layout from './components/Layout';
import theme from './components/Theme';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

ReactDOM.createRoot(document.getElementById('app')).render(
    <ThemeProvider theme={ theme }>
        <CssBaseline />
        <Layout>
            
        </Layout>
    </ThemeProvider>
);