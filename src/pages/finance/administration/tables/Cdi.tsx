import { gql, useQuery } from "@apollo/client";
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined';
import { Box, IconButton } from "@mui/material";
import { GridColDef } from '@mui/x-data-grid';
import { ReactElement } from "react";
import DataGridComp from "../../../../components/table/DataGridV2";
import { Ipca } from "../../../../interfaces/Finance";
import { apolloFinanceClient } from "../../../../services/apollo/client/ApolloFinanceService";
import { QUERY_INDEXER_SERIES } from "../../../../services/apollo/queries/Finance";


const CdiTable = (): ReactElement => {
    const { data, loading, refetch } = useQuery(QUERY_INDEXER_SERIES, {
        client: apolloFinanceClient,
        variables: { params: { indexerId: "2a2b100f-17d9-4c61-b3b4-f06662113953" } }
    });

    const columns: GridColDef<Ipca>[] = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'indexer_name', headerName: 'Indexador', flex: 1},
        { field: 'period', headerName: 'Período', flex: 1 },
        { field: 'value', headerName: 'Valor (%)', flex: 1, type: 'number' },
        { field: 'periodicity_name', headerName: 'Periodicidade', flex: 1 }
    ]

    return (
        <Box sx={{ display: 'block' }}>
            <Box sx={{ display: 'flex', justifyContent: 'right', gap: 0, mb: 2, me: 2 }}>
                <IconButton
                    aria-label="Atualizar"
                    onClick={() => refetch()}
                    loading={loading}
                >
                    <AutorenewOutlined />
                </IconButton>
            </Box>
            <DataGridComp
                columns={columns}
                data={data?.getIndexerSeries.series}
                isLoading={loading}
                getRowId={(row) => row.id}
                columnVisibilityModel={{id: false}}
            />
        </Box>
    )
}

export default CdiTable;