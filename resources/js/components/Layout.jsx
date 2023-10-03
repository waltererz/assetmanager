import * as React from 'react';
import { Outlet, useNavigate, useHref } from 'react-router-dom';

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

import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';

import website from '../include/website';
import { fontColor, borderColor } from '../include/theme';

export default function Layout()
{
    const navigate = useNavigate();
    const current_path = useHref();

    const initial_states = {};
    website.map((item) => {
        if (item.children && item.children.length >= 1) {
            item.children.map((subitem) => {
                if (subitem.path == current_path) {
                    initial_states[item.name] = true;
                }
            });

            if (initial_states[item.name] != true) {
                initial_states[item.name] = false;
            }
        } else {
            initial_states[item.name] = false;
        }
    });

    const [menuOpen, setMenuOpen] = React.useState(initial_states);

    const handleMenuClick = (item) => {
        if (item.children && item.children.length >= 1) {
            setMenuOpen({
                ...menuOpen,
                [item.name]: !menuOpen[item.name]
            });
        } else {
            navigate(item.path);
        }
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
                        <Box component="div" sx={{
                            cursor: 'pointer',
                            display: 'inline-block',
                        }} onClick={() => {navigate('/')}}>Asset Manager</Box>
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
                    {website.map((item) => (
                        <List component="nav" key={item.name}>
                            <ListItemButton selected={current_path == item.path} onClick={() => { handleMenuClick(item) }}>
                                <ListItemIcon>{item.icon}</ListItemIcon>
                                <ListItemText primary={item.value} />
                                {item.children && menuOpen[item.name] ? <ExpandLess /> : <ExpandMore />}
                            </ListItemButton>
                            {item.children && item.children.length >= 1 ? (
                            <Collapse in={menuOpen[item.name]} timeout="auto" unmountOnExit>
                                <List component="nav" disablePadding>
                                    {item.children.map((subitem) => (   
                                        <ListItemButton selected={current_path == subitem.path} sx={{ pl: 4 }} onClick={() => { handleMenuClick(subitem) }}>
                                            <ListItemIcon>{subitem.icon}</ListItemIcon>
                                            <ListItemText primary={subitem.value} />
                                        </ListItemButton>
                                    ))}
                                </List>
                            </Collapse>) : null}
                        </List>
                    ))}
                </Box>
            </Drawer>
            <Box component="main" sx={{ flexGrow: 1, p: 3, color: fontColor }}>
                <Toolbar />
                <Typography sx={{ color: fontColor }}>
                    <Outlet />
                </Typography>
            </Box>
        </Box>
    );
}