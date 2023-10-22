import * as React from 'react';
import axios from 'axios';
import { DataGrid } from '@mui/x-data-grid';

import RoundedBox from '../../components/RoundedBox';

export default function AssetList()
{
    const [assets, setAssets] = React.useState([]);

    const columns = [
        { field: 'id', headerName: 'ID', width: 100 },
        { field: 'created_at', headerName: '투자개시일', width: 100 },
        { field: 'name', headerName: '아이템', width: 200 },
        { field: 'units', headerName: '투자단위', width: 100 },
        { field: 'price', headerName: '단위가격', width: 100 },
        { field: 'charge', headerName: '수수료', width: 100 },
        { field: 'category_name', headerName: '투자방식', width: 100 },
        { field: 'sales_name', headerName: '판매회사', width: 100 },
        { field: 'country_name', headerName: '투자국가', width: 100 },
        { field: 'sector_name', headerName: '투자섹터', width: 100 },
        { field: 'investment_type_name', headerName: '투자성격', width: 100 },
    ];

    const updateData = async () => {
        await axios.get('/assets/lists')
        .then((res) => {
            if (res.status == 200) {
                console.log(res.data.result);
                setAssets(res.data.result);
            }
        }).catch((error) => {
            console.log(error);
        });
    };

    React.useEffect(() => {
        updateData();
    }, []);

    return (
        <RoundedBox p={2} fs="0.9rem">
            <DataGrid autoHeight rows={assets} columns={columns} />
        </RoundedBox>
    );
}