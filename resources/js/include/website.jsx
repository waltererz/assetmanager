import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import ChecklistIcon from '@mui/icons-material/Checklist';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import EditNoteIcon from '@mui/icons-material/EditNote';
import LinearScaleIcon from '@mui/icons-material/LinearScale';

const website = [
    {
        name: 'assets',
        value: '자산관리',
        icon: <AttachMoneyIcon />,
        children: [
            {
                name: 'assetlist',
                value: '자산목록',
                icon: <ChecklistIcon />,
                path: '/assets/list',
            },
        ],
    },
    {
        name: 'profit',
        value: '수익관리',
        icon: <TrendingUpIcon />,
        children: [
            {
                name: 'profitreport',
                value: '종합수익분석',
                icon: <EditNoteIcon />,
                path: '/profit/report',
            },
            {
                name: 'baseprice',
                value: '기준가격 관리',
                icon: <LinearScaleIcon />,
                path: '/profit/baseprice',
            }
        ],
    },
];

export default website;