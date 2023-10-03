import * as React from 'react';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';

import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ChecklistIcon from '@mui/icons-material/Checklist';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LinearScaleIcon from '@mui/icons-material/LinearScale';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

const fontColor = 'rgba(0, 0, 0, 0.65)';
const borderColor = 'rgba(0, 0, 0, 0.05)';

export default function Layout(props)
{
    const [menuOpen, setMenuOpen] = React.useState({
        asset: false,
        profit: false,
    });

    const handleMenuClick = (target) => {
        setMenuOpen({
            ...menuOpen,
            [target]: !menuOpen[target]
        });
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <AppBar position="fixed" sx={{
                zIndex: (theme) => theme.zIndex.drawer + 1,
                backgroundColor: '#ffffff',
                boxShadow: 'none',
                borderWidth: '0px 0px 1px 0px',
                borderStyle: 'solid',
                borderColor: borderColor,
            }}>
                <Toolbar>
                    <Typography variant="h6" component="div" sx={{
                        flexGrow: 1,
                        color: fontColor,
                    }}>
                        Asset Manager
                    </Typography>
                </Toolbar>
            </AppBar>
            <Drawer
                variant="permanent"
                sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: 240,
                        boxSizing: 'border-box',
                        color: fontColor,
                        borderRight: '1px solid ' + borderColor,
                    },
                }}
            >
                <Toolbar />
                <Box sx={{ overflow: 'auto' }}>
                    <List component="nav">
                        <ListItemButton data-primary="asset" onClick={() => {handleMenuClick('asset')}}>
                            <ListItemIcon><AttachMoneyIcon /></ListItemIcon>
                            <ListItemText primary="자산관리" />
                            {menuOpen['asset'] ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={menuOpen['asset']} timeout="auto" unmountOnExit>
                            <List component="nav" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon><ChecklistIcon /></ListItemIcon>
                                    <ListItemText primary="자산목록" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </List>
                    <List component="nav">
                        <ListItemButton data-primary="profit" onClick={() => {handleMenuClick('profit')}}>
                            <ListItemIcon><TrendingUpIcon /></ListItemIcon>
                            <ListItemText primary="수익관리" />
                            {menuOpen['profit'] ? <ExpandLess /> : <ExpandMore />}
                        </ListItemButton>
                        <Collapse in={menuOpen['profit']} timeout="auto" unmountOnExit>
                            <List component="nav" disablePadding>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon><EditNoteIcon /></ListItemIcon>
                                    <ListItemText primary="종합수익분석" />
                                </ListItemButton>
                                <ListItemButton sx={{ pl: 4 }}>
                                    <ListItemIcon><LinearScaleIcon /></ListItemIcon>
                                    <ListItemText primary="기준가 관리" />
                                </ListItemButton>
                            </List>
                        </Collapse>
                    </List>
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, color: fontColor }}>
                <Toolbar />
                <Typography sx={{ color: fontColor }}>
                    {props.children}
                </Typography>
            </Box>
        </Box>
    );
}