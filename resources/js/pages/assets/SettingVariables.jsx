import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DataGrid } from '@mui/x-data-grid';

import { TabMenu } from '../../include/assets';

const columns = {};
const rows = {};

columns.category = [
    {
        field: 'id',
        headerName: 'ID',
        width: 70,
    },
    {
        field: 'name',
        headerName: '투자방식',
        width: 130,
    },
];

rows.category = [
    {id: 1, name: '투자방식 1'},
    {id: 2, name: '투자방식 2'},
];

export default function AssetSettingVariables()
{
    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ flex: 'auto' }}>
                <Typography variant='h5' gutterBottom>환경변수 추가/삭제</Typography>
                <Typography variant='h6' gutterBottom>투자방식</Typography>
                <Typography variant='subtitle2' gutterBottom>유동자산, 주식, 수익증권 등 투자처의 종류를 추가 또는 삭제합니다.</Typography>
                <Box sx={{ height: 300, maxWidth: 600, mb: 3 }}>
                    <DataGrid
                        rows={rows.category}
                        columns={columns.category}
                        initialState={{
                            pagination: {
                                paginationModel: { page: 0, pageSize: 5 },
                            },
                        }}
                        pageSizeOptions={[5, 10]}
                        checkboxSelection
                    />
                </Box>
                <Typography variant='h6' gutterBottom>판매회사</Typography>
                <Typography variant='subtitle2' gutterBottom>투자상품을 판매하는 회사를 추가 또는 삭제합니다. 여기에서 회사는 KB국민은행, KB증권 등 투자상품을 취급하는 금융기관을 말합니다.</Typography>
                <Typography variant='h6' gutterBottom>투자국가</Typography>
                <Typography variant='subtitle2' gutterBottom>투자상품이 주로 투자하거나 투자처가 위치한 국가를 추가 또는 삭제합니다.</Typography>
                <Typography variant='h6' gutterBottom>투자섹터</Typography>
                <Typography variant='subtitle2' gutterBottom>투자상품 또는 투자처의 산업군과 투자섹터를 추가 또는 삭제합니다. 투자섹터는 최대한 세부적인 사항을 입력해야 합니다.</Typography>
                <Typography variant='h6' gutterBottom>투자성격</Typography>
                <Typography variant='subtitle2' gutterBottom>투자처에 투자하는 원인 또는 이유를 추가 또는 삭제합니다. 자본투자, 미래가치투자 등 투자의 원인을 설명할 수 있어야 합니다.</Typography>
            </Box>
            <TabMenu width="240" />
        </Box>
    );
}