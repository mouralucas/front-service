import { ReactElement } from "react";
import DataGridComp from "../../../../components/table/DataGridV2"
import { Box, IconButton } from "@mui/material"
import { GridColDef } from "@mui/x-data-grid";
import { useQuery } from "@apollo/client"
import { apolloLibraryClient } from '../../../../services/apollo/client/ApolloLibraryService';
import AutorenewOutlined from "@mui/icons-material/AutorenewOutlined";

const CollectionsTable = (): ReactElement => {
    const {data: collectionsData, loading: collectionsLoading, refetch: collectionsRefetch } = useQuery(QUERY_COLLECTION, {
        client: apolloLibraryClient,
    })

    const columns: GridColDef[] = [
        { field: "collectionId", headerName: "Id", flex: .5 },
        { field: "collectionName", headerName: "Nome", flex: 2 },
        { field: "description", headerName: "Descrição"}
    ]

    return (
        <Box sx={{ display: "block" }} >
            <Box sx={{ display: 'flex', justifyContent: 'right', gap: 2, mb: 2, me: 4 }}>
                <IconButton
                    aria-label="Atualizar"
                    onClick={collectionsRefetch}
                    loading={collectionsLoading}
                >
                    <AutorenewOutlined />
                </IconButton>
            </Box>
            <DataGridComp 
                columns={columns}
                data={collectionsData?.getCollections?.collections}
                isLoading={collectionsLoading}
                getRowId={(row) => row.collectionId}
                columnVisibilityModel={{
                    collectionId: false
                }}
            />
        </Box>
    )
}

export default CollectionsTable;