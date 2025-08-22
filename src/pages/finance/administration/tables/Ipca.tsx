import { gql, useQuery } from "@apollo/client";
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined';
import { Box, IconButton } from "@mui/material";
import { GridColDef } from '@mui/x-data-grid';
import { ReactElement } from "react";
import DataGridComp from "../../../../components/table/DataGridV2";
import { Ipca } from "../../../../interfaces/Finance";
import { apolloFinanceClient } from "../../../../services/apollo/ApolloFinanceService";


const query = gql`
        query {
            getIndexerSeries(params: {indexer_id:"2a2b100f-17d9-4c61-b3b4-f06662113953"}) {
              quantity
              series {
                id
                indexer_name
                period
                value
                periodicity_name
              }
            }
        }
        `

const IpcaTable = (): ReactElement => {
    const { data, loading, refetch } = useQuery(query, {
        client: apolloFinanceClient,
        // pollInterval: 30000,
    });

    const columns: GridColDef<Ipca>[] = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'indexer_name', headerName: 'Indexador', flex: 1},
        { field: 'period', headerName: 'Período', flex: 1 },
        { field: 'value', headerName: 'Valor (%)', flex: 1, type: 'number' },
        { field: 'periodicity_name', headerName: 'Periodicidade', flex: 1 }
    ]

    /*
    Possible way to update the grid rows, avoid undefined and add possible
        missing ID required by the grid. Otherwise use data direct in te grid

    const rows = data.getIndexerSeries.series.map((s: any, index: number) => ({
        id: index,
        indexerName: s.indexer_name,
        period: s.period,
        value: s.value,
    }));
    */

    return (
        <Box sx={{ display: 'block' }}>
            <Box>
                <IconButton
                    aria-label="Atualizar"
                    onClick={() => refetch({}, { fetchPolicy: "network-only" })}
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

export default IpcaTable;