import * as React from 'react';
import { Outlet, useNavigate, useHref } from 'react-router-dom';

import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListSubheader from '@mui/material/ListSubheader';
import ListItem from '@mui/material/ListItem';
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
    let is_third_depth = '';

    for (let i = 0; i < website.length; i++) {
        let item = website[i];
        if (item.children && item.children.length >= 1) {
            for (let j = 0; j < item.children.length; j++) {
                let subitem = item.children[j];
                if (subitem.elements && subitem.elements.length >= 1) {
                    for (let k = 0; k < subitem.elements.length; k++) {
                        let element = subitem.elements[k];
                        if (element.contents && element.contents.length >= 1) {
                            for (let l = 0; l < element.contents.length; l++) {
                                let content = element.contents[l];
                                if (content.path == current_path) {
                                    initial_states[item.name] = true;
                                    is_third_depth = subitem.path;
                                    break;
                                }
                            }

                            if (initial_states[item.name]) {
                                break;
                            }
                        }
                    }
                }
                if (initial_states[item.name]) {
                    break;
                } else if (subitem.path == current_path && initial_states[item.name] != true) {
                    initial_states[item.name] = true;
                    is_third_depth = '';
                    break;
                }
            }

            if (initial_states[item.name] != true) {
                initial_states[item.name] = false;
                is_third_depth = '';
            } else {
                break;
            }
        } else {
            initial_states[item.name] = false;
        }
    }

    for (let i = 0; i < website.length; i++) {
        if (typeof initial_states[website[i].name] == undefined) {
            initial_states[website[i].name] = false;
        }
    }

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

    const fetchRightElements = () => {
        let elements = null;

        for (let i = 0; i < website.length; i++) {
            let item = website[i];
            if (item.children && item.children.length >= 1) {
                for (let j = 0; j < item.children.length; j++) {
                    let subitem = item.children[j];
                    if (subitem.path == current_path || (is_third_depth != '' && subitem.path == is_third_depth)) {
                        if (subitem.elements && subitem.elements.length) {
                            elements = subitem.elements;
                            break;
                        }
                    }
                }

                if (elements != null && elements.length >= 1) {
                    break;
                }
            }
        }

        if (elements != null && elements.length >= 1) {
            return (
                <React.Fragment>
                    {elements.map((element) => (
                            <List subheader={element.group ? <ListSubheader sx={{ fontWeight: 'bold' }}>{element.group}</ListSubheader> : null}>
                            {element.contents ? (
                                <React.Fragment>
                                    {element.contents.map((content) => (
                                        <ListItem disablePadding>
                                            <ListItemButton dense onClick={() => { navigate(content.path) }}>
                                            <ListItemText primary={content.value} sx={current_path == content.path ? {textDecoration: 'underline'} : {}} />
                                            </ListItemButton>
                                        </ListItem>
                                    ))}
                                </React.Fragment>
                            ) : ''}
                            </List>
                    ))}
                </React.Fragment>
            );
        } else {
            return '';
        }
    }

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
                    }}>
                        <Box component="div" sx={{
                            cursor: 'pointer',
                            display: 'inline-block',
                            color: fontColor,
                        }} onClick={() => {navigate('/')}}>Asset Manager</Box>
                    </Typography>
                </Toolbar>
            </AppBar>
            <Box component="main" sx={{ display: 'flex', flexGrow: 1, justifyContent: 'space-between', p: 3 }}>
                <Drawer
                    variant="permanent"
                    sx={{
                        width: 240,
                        flexShrink: 0,
                        [`& .MuiDrawer-paper`]: {
                            width: 240,
                            boxSizing: 'border-box',
                            borderRight: '1px solid ' + borderColor,
                        },
                    }}
                >
                    <Toolbar />
                    <Box sx={{ overflow: 'auto' }}>
                        {website.map((item) => (
                            <List component="nav" key={item.name} sx={{ pb: 0 }}>
                                <ListItemButton selected={current_path == item.path} onClick={() => { handleMenuClick(item) }} dense>
                                    <ListItemIcon>{item.icon}</ListItemIcon>
                                    <ListItemText primary={item.value} />
                                    {item.children && menuOpen[item.name] ? <ExpandLess /> : <ExpandMore />}
                                </ListItemButton>
                                {item.children && item.children.length >= 1 ? (
                                <Collapse in={menuOpen[item.name]} timeout="auto" unmountOnExit>
                                    <List component="nav" disablePadding>
                                        {item.children.map((subitem) => (   
                                            <ListItemButton selected={current_path == subitem.path || is_third_depth == subitem.path} sx={{ pl: 4 }} onClick={() => { handleMenuClick(subitem) }} dense>
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
                <Typography sx={{ maxWidth: 980, flexGrow: 1 }}>
                    <Toolbar />
                    <Box>
                        <Outlet />
                    </Box>
                </Typography>
                <Drawer sx={{
                    width: 240,
                    flexShrink: 0,
                    [`& .MuiDrawer-paper`]: {
                        width: 240,
                        boxSizing: 'border-box',
                        borderColor: borderColor,
                    }
                    }}
                    variant="permanent"
                    anchor="right"
                >
                    <Toolbar />
                    {fetchRightElements()}
                </Drawer>
            </Box>
        </Box>
    );
}