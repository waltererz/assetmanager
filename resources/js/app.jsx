import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider, redirect } from 'react-router-dom';

import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import Layout from './components/Layout';
import theme from './include/theme';

import AssetList from './pages/assets/List';
import AssetSettingVariables from './pages/assets/SettingVariables';

import ProfitReport from './pages/profit/Report';
import ProfitBasePrice from './pages/profit/BasePrice';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

const router = createBrowserRouter([{
    path: '/',
    element: <Layout />,
    children: [
        {
            path: 'assets/list',
            element: <AssetList />,
        },
        {
            path: 'assets/settings/variables',
            element: <AssetSettingVariables />,
        },
        {
            path: 'profit/report',
            element: <ProfitReport />,
        },
        {
            path: 'profit/baseprice',
            element: <ProfitBasePrice />,
        }
    ],
}]);

ReactDOM.createRoot(document.getElementById('app')).render(
    <ThemeProvider theme={ theme }>
        <CssBaseline />
        <RouterProvider router={router} />
    </ThemeProvider>
);