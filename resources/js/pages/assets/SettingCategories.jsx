import * as React from 'react';
import axios from 'axios';

import Stack from '@mui/material/Stack';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';

import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
    { id: 'category', label: '투자방식', minWidth: 100 },
    {
        id: 'created_at',
        label: '생성날짜',
        minWidth: 170,
        align: 'right',
        format: (value) => {
            const date = new Date(value);
            const time = date.getHours().toString().padStart(2, '0') + ':' + date.getMinutes().toString().padStart(2, '0');
            return `${date.getFullYear()}/${(date.getMonth() + 1).toString().padStart(2, '0')}/${date.getDay().toString().padStart(2, '0')} ${time}`;
        },
    },
];

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export default function SettingCategories()
{
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [inputText, setInputText] = React.useState('');
    const [checked, setChecked] = React.useState({});
    const [categories, setCategories] = React.useState([]);
    const [tablePage, setTablePage] = React.useState(0);

    const handleTablePage = (e, newPage) => {
        setTablePage(newPage);
    }

    const showAlertMessage = () => {
        setAlertOpen(true);
    }

    const closeAlertMessage = (e, reason) => {
        if (reason == 'clickaway') {
            return;
        }

        setAlertOpen(false);
    }

    const changeInput = (e) => {
        setInputText(e.target.value);
    }

    const changeChecked = (e) => {
        setChecked({
            ...checked,
            [`${e.target.value}`]: !checked[e.target.value],
        });
    }

    const store = async () => {
        if (!inputText || inputText.length <= 1) {
            setMessage('투자방식 이름은 2자 이상 입력해주세요.');
            showAlertMessage();
            return;
        }

        await axios.post('/assets/settings/variables/categories', { name: inputText })
        .then((res) => {
            if (res.status == 200 && res.data.result == 'ok') {
                setInputText('');
                update();
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    const update = async () => {
        await axios.get('/assets/settings/variables/categories')
        .then((res) => {
            if (res.status == 200) {
                setCategories(res.data.result);
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    const remove = async () => {
        const data = [];
        
        Object.entries(checked).map(([key, value]) => {
            if (value) {
                data.push(key);
            }
        });
        
        await axios.post('/assets/settings/variables/categories/delete', { data: data })
        .then((res) => {
            if (res.status == 200 && res.data.result == 'ok') {
                update();
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    const fetchCategories = () => {
        return (
            <Paper sx={{ mt: 2, width: '100%', overflow: 'hidden' }}>
                <TableContainer sx={{ maxHeight: 300 }}>
                    <Table size="small" stickyHeader>
                        <TableHead>
                            <TableRow>
                                <TableCell padding="checkbox"></TableCell>
                                {columns.map((column) => (
                                    <TableCell key={column.id} align="center" sx={{ minWidth: column.minWidth }}>
                                        {column.label}
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {categories
                                .slice(tablePage * 5, tablePage * 5 + 5)
                                .map((category) => {
                                    return (
                                        <TableRow hover role="checkbox" tableIndex={-1} key={category.id}>
                                            <TableCell padding="checkbox">
                                                <Checkbox value={category.id} checked={checked[category.id]} color="primary" onChange={changeChecked} />
                                            </TableCell>
                                            {columns.map((column) => {
                                                const value = category[column.id];
                                                return (
                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format ? column.format(value) : value}
                                                    </TableCell>
                                                );
                                            })}
                                        </TableRow>
                                    )
                                }
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    component="div"
                    count={categories.length}
                    rowsPerPage={5}
                    page={tablePage}
                    rowsPerPageOptions={-1}
                    onPageChange={handleTablePage}
                />
            </Paper>
        );
    }

    React.useEffect(() => {
        update();
    }, []);

    return (
        <React.Fragment>
            <Snackbar anchorOrigin={{horizontal: 'center', vertical: 'top'}} open={alertOpen} autoHideDuration={2000} onClose={closeAlertMessage}>
                <Alert onClose={closeAlertMessage} severity="error" sx={{ width: '100%' }}>{message}</Alert>
            </Snackbar>
            <Stack direction="row" spacing={1} alignItems="enc">
                <OutlinedInput size="small" value={inputText} name="category_name" placeholder="추가할 투자방식 입력" sx={{ fontSize: '0.9rem' }} onChange={changeInput} />
                <Button variant="contained" size="small" endIcon={<SendIcon />} onClick={store}>추가</Button>
            </Stack>
            <Box sx={{ width: 'fit-content', maxWidth: 500 }}>
                {fetchCategories()}
                <Box sx={{ mt: 1, textAlign: 'right' }}><Button variant="contained" color="error" size="small" endIcon={<DeleteIcon />} onClick={remove}>삭제</Button></Box>
            </Box>
        </React.Fragment>
    );
}