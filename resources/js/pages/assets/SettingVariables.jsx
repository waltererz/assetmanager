import * as React from 'react';

import Tabs, { tabsClasses } from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

import SettingCategories from './SettingCategories';
import RoundedBox from '../../components/RoundedBox';

const settings = [
    { value: 'category', label: '투자방식' },
    { value: 'sales', label: '판매회사' },
    { value: 'country', label: '투자국가' },
    { value: 'sector', label: '투자섹터' },
    { value: 'investment_type', label: '투자성격' },
];

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

    const handleChange = (e, newTab) => {
        setTab(newTab);
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
                <SettingCategories />
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
        </React.Fragment>
    );
}