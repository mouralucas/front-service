import { ReactElement } from "react"
import DataGridComp from "../../../../components/table/DataGridV2"
import { Box, IconButton } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@apollo/client"
import { apolloLibraryClient } from '../../../../services/apollo/client/ApolloLibraryService';
import { QUERY_PUBLISHERS } from "../../../../services/apollo/queries/Library";
import AutorenewOutlined from "@mui/icons-material/AutorenewOutlined";

const PublisherTable = (): ReactElement => {
    const { data: publishersData, loading: publishersLoading, refetch: publishersRefetch} = useQuery(QUERY_PUBLISHERS, {
        client: apolloLibraryClient,
    })

    const columns: GridColDef[] = [
        { field: "publisherId", headerName: "Id"},
        { field: "publisherName", headerName: "Nome", flex: 2 }, 
        { field: "description", headerName: "Descrição", flex: 2 },
        { field: "countryName", headerName: "País", flex: 1 }
    ]


    return (
        <Box sx={{ display: "block" }} >
            <Box sx={{ display: 'flex', justifyContent: 'right', gap: 2, mb: 2, me: 4 }}>
                <IconButton
                    aria-label="Atualizar"
                    onClick={() => publishersRefetch()}
                    loading={publishersLoading  }
                >
                    <AutorenewOutlined />
                </IconButton>
            </Box>
            <DataGridComp 
                columns={columns}
                data={publishersData?.getPublishers?.publishers}
                isLoading={publishersLoading}
                getRowId={(row) => row.publisherId}
                columnVisibilityModel={{
                    publisherId: false
                }}
            />
        </Box>
    )
}

export default PublisherTable;