import Box from '@mui/material/Box';

import { borderColor, fontColor } from '../include/theme';

export default function RoundedBox(props)
{
    return (
        <Box sx={{
            p: (props.p ? props.p : 0),
            mt: (props.mt ? props.mt : 0),
            mb: (props.mb ? props.mb : 0),
            backgroundColor: 'rgba(255, 255, 255)',
            borderWidth: 1,
            borderStyle: 'solid',
            borderColor: borderColor,
            borderRadius: 3,
            color: fontColor,
            fontSize: (props.fs ? props.fs : 'initial')
        }}>
            {props.children}
        </Box>
    );
}