import { useNavigate } from 'react-router-dom';

import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';

import { fontColor, borderColor } from '../include/theme';

export function TabMenu(props)
{
    const navigate = useNavigate();

    return (
        <Drawer sx={{
            width: props.width + 'px',
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
                width: props.width + 'px',
                boxSizing: 'border-box',
                borderColor: borderColor,
                color: fontColor,
            }
        }}
        variant='permanent'
        anchor='right'
        >
            <Toolbar />
            <List subheader={<ListSubheader sx={{ fontWeight: 'bold' }}>설정</ListSubheader>}>
                <ListItem disablePadding>
                    <ListItemButton dense onClick={() => { navigate('/assets/settings/variables') }}>
                        <ListItemText primary="환경변수 추가/삭제" />
                    </ListItemButton>
                </ListItem>
            </List>
        </Drawer>
    );
}