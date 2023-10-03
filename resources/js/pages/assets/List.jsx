import Box from '@mui/material/Box';

import { TabMenu } from '../../include/assets';

export default function AssetList()
{
    return (
        <Box sx={{ display: 'flex' }}>
            <Box sx={{ flex: 'auto' }}>테스트</Box>
            <TabMenu width="240" />
        </Box>
    );
}