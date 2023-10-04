import * as React from 'react';
import axios from 'axios';

import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Stack from '@mui/material/Stack';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';

import SendIcon from '@mui/icons-material/Send';

import RoundedBox from '../../components/RoundedBox';

const settings = [
    {value: 'category', label: '투자방식'},
    {value: 'sales', label: '판매회사'},
    {value: 'country', label: '투자국가'},
    {value: 'sector', label: '투자섹터'},
    {value: 'investment_type', label: '투자성격'},
];

const Alert = React.forwardRef(function Alert(props, ref) {
    return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function ContentBox(props)
{
    const { children, value, index, ...other } = props;

    return (
        <div
            role="tabpanel"
            hidden={value != index}
            id={`tabpannel-${index}`}
            aria-labelledby={`tab-${index}`}
            {...other}
        >
            {value == index && (
                <RoundedBox p={2} mt={2} fs="0.9rem">
                    {children}
                </RoundedBox>
            )}
        </div>
    );
}

function a11yProps(index)
{
    return {
        id: `simple-tab-${index}`,
        'aria-controls': `simple-tabpannel-${index}`,
    };
}

export default function AssetSettingVariables()
{
    const [tab, setTab] = React.useState(settings[0].value);
    const [alertOpen, setAlertOpen] = React.useState(false);
    const [message, setMessage] = React.useState('');
    const [inputText, setInputText] = React.useState({});

    const handleChange = (event, newTab) => {
        setTab(newTab);
    };

    const showAlertMessage = () => {
        setAlertOpen(true);
    }

    const closeAlertMessage = (event, reason) => {
        if (reason == 'clickaway') {
            return;
        }

        setAlertOpen(false);
    }

    const changeValue = (event) => {
        setInputText({
            ...inputText,
            [event.target.name]: event.target.value,
        });
    }

    const submitCategory = async () => {
        let category = inputText.category_name;

        if (!category) {
            setMessage('투자방식 이름으로 2자 이상을 입력해주세요.');
            showAlertMessage();
            return;
        }

        let data = {name: category};

        await axios.post('/assets/settings/variables/category', data)
        .then((res) => {
            if (res.data.result == 'ok') {
                setInputText({category_name: ''});
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    return (
        <React.Fragment>
            <RoundedBox>
                <Tabs
                    value={tab}
                    onChange={handleChange}
                    variant='scrollable'
                    scrollButtons
                    sx={{
                        [`& .${tabsClasses.scrollButtons}`]: {
                            '&.Mui-disabled': { opacity: 0.3 },
                        },
                    }}
                >
                    {settings.map((item) => (
                        <Tab value={item.value} label={item.label} {...a11yProps(item.value)} />
                    ))}
                </Tabs>
            </RoundedBox>
            <ContentBox value={tab} index={settings[0].value}>
                <Stack direction="row" spacing={1} alignItems="enc">
                    <Input value={inputText.category_name} name="category_name" placeholder="추가할 투자방식 입력" sx={{ fontSize: '0.9rem' }} onChange={changeValue} />
                    <Button variant="contained" size="small" endIcon={<SendIcon />} onClick={submitCategory}>추가</Button>
                </Stack>
            </ContentBox>
            <ContentBox value={tab} index={settings[1].value}>
                판매회사
            </ContentBox>
            <ContentBox value={tab} index={settings[2].value}>
                투자국가
            </ContentBox>
            <ContentBox value={tab} index={settings[3].value}>
                투자섹터
            </ContentBox>
            <ContentBox value={tab} index={settings[4].value}>
                투자성격
            </ContentBox>
            <Snackbar anchorOrigin={{horizontal: 'center', vertical: 'top'}} open={alertOpen} autoHideDuration={6000} onClose={closeAlertMessage}>
                <Alert onClose={closeAlertMessage} severity="error" sx={{ width: '100%' }}>{message}</Alert>
            </Snackbar>
        </React.Fragment>
    );
}