import { createTheme } from '@mui/material/styles';

export const fontColor = 'rgba(0, 0, 0, 0.65)';
export const borderColor = 'rgba(0, 0, 0, 0.05)';

const theme = createTheme({
    palette: {
        background: {
            default: 'rgba(0, 0, 0, 0.01)',
        },
    }
});

export default theme;