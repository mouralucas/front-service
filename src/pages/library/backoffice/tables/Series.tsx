import { ReactElement } from "react";
import DataGridComp from "../../../../components/table/DataGridV2"
import { Box, IconButton } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@apollo/client"
import { apolloLibraryClient } from '../../../../services/apollo/client/ApolloLibraryService';
import AutorenewOutlined from "@mui/icons-material/AutorenewOutlined";
import { QUERY_SERIES } from "../../../../services/apollo/queries/Library";

const SeriesTable = (): ReactElement => {
    const { data: seriesData, loading: seriesLoading, refetch: seriesRefetch } = useQuery(QUERY_SERIES, {
        client: apolloLibraryClient,
    })

    const columns: GridColDef[] = [
        { field: "serieId", headerName: "Id", flex: .5 },
        { field: "serieName", headerName: "Nome", flex: 2 },
        { field: "originalName", headerName: "Nome Original", flex: 2 },
        { field: "description", headerName: "Descrição", flex: 1},
        { field: "countryName", headerName: "País", flex: 1 },
    ]

    return (
        <Box sx={{ display: "block" }} >
            <Box sx={{ display: 'flex', justifyContent: 'right', gap: 2, mb: 2, me: 4 }}>
                <IconButton
                    aria-label="Atualizar"
                    onClick={() => seriesRefetch()}
                    loading={seriesLoading}
                >
                    <AutorenewOutlined />
                </IconButton>
            </Box>
            <DataGridComp
                columns={columns}
                data={seriesData?.getSeries?.series}
                isLoading={seriesLoading}
                getRowId={(row) => row.serieId}
                columnVisibilityModel={{
                    seriesId: false
                }}
            />
        </Box>
    )
}

export default SeriesTable;
