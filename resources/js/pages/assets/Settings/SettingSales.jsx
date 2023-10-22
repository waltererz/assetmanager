import * as React from 'react';
import axios from 'axios';

import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import TableContainer from '@mui/material/TableContainer';
import Table from '@mui/material/Table';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import TableCell from '@mui/material/TableCell';
import TableBody from '@mui/material/TableBody';
import TablePagination from '@mui/material/TablePagination';
import OutlinedInput from '@mui/material/OutlinedInput';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Checkbox from '@mui/material/Checkbox';

import SendIcon from '@mui/icons-material/Send';
import DeleteIcon from '@mui/icons-material/Delete';

const columns = [
    { id: 'name', label: '판매회사', minWidth: 100 },
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

export default function SettingSales()
{
    const [inputText, setInputText] = React.useState('');
    const [sales, setSales] = React.useState([]);
    const [tablePage, setTablePage] = React.useState(0);
    const [checked, setChecked] = React.useState({});

    const changeInput = (e) => {
        setInputText(e.target.value);
    }

    const changeChecked = (e) => {
        setChecked({
            ...checked,
            [`${e.target.value}`]: !checked[e.target.value],
        });
    }

    const handleTablePage = (e, newPage) => {
        setTablePage(newPage);
    }

    const updateData = async () => {
        await axios.get('/assets/settings/variables/sales')
        .then((res) => {
            if (res.status == 200) {
                setSales(res.data.result);
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const store = async () => {
        if (!inputText || inputText.length <= 1) {
            alert('판매회사 이름은 2자 이상 입력해주세요.');
            return;
        }

        await axios.post('/assets/settings/variables/sales', { name: inputText })
        .then((res) => {
            if (res.status == 200 && res.data.result == 'ok') {
                setInputText('');
                updateData();
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const remove = async () => {
        const data = [];
        
        Object.entries(checked).map(([key, value]) => {
            if (value) {
                data.push(key);
            }
        });
        
        await axios.post('/assets/settings/variables/sales/delete', { data: data })
        .then((res) => {
            if (res.status == 200 && res.data.result == 'ok') {
                updateData();
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    const fetchSales = () => {
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
                            {sales
                                .slice(tablePage * 5, tablePage * 5 + 5)
                                .map((company) => {
                                    return (
                                        <TableRow hover role="checkbox" tableIndex={-1} key={company.id}>
                                            <TableCell padding="checkbox">
                                                <Checkbox value={company.id} checked={checked[company.id]} color="primary" onChange={changeChecked} />
                                            </TableCell>
                                            {columns.map((column) => {
                                                const value = company[column.id];
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
                    count={sales.length}
                    rowsPerPage={5}
                    page={tablePage}
                    rowsPerPageOptions={-1}
                    onPageChange={handleTablePage}
                />
            </Paper>
        );
    }

    React.useEffect(() => {
        updateData();
    }, []);

    return (
        <React.Fragment>
            <Stack direction="row" spacing={1} alignItems="enc">
                <OutlinedInput size="small" value={inputText} name="category_name" placeholder="추가할 판매회사 입력" sx={{ fontSize: '0.9rem' }} onChange={changeInput} />
                <Button variant="contained" size="small" endIcon={<SendIcon />} onClick={store}>추가</Button>
            </Stack>
            <Box sx={{ width: 'fit-content', maxWidth: 500 }}>
                {fetchSales()}
                <Box sx={{ mt: 1, textAlign: 'right' }}><Button variant="contained" color="error" size="small" endIcon={<DeleteIcon />} onClick={remove}>삭제</Button></Box>
            </Box>
        </React.Fragment>
    )
}