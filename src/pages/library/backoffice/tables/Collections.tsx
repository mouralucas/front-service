import { useQuery } from "@apollo/client";
import AutorenewOutlined from "@mui/icons-material/AutorenewOutlined";
import { Box, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ReactElement } from "react";
import DataGrid from "../../../../components/table/DataGrid";
import { apolloLibraryClient } from '../../../../services/apollo/client/ApolloLibraryService';
import { QUERY_COLLECTION } from "../../../../features/library/api/queries";

const CollectionsTable = (): ReactElement => {
    const {data: collectionsData, loading: collectionsLoading, refetch: collectionsRefetch } = useQuery(QUERY_COLLECTION, {
        client: apolloLibraryClient,
        
    })

    const columns: GridColDef[] = [
        { field: "id", headerName: "Id", flex: .5 },
        { field: "name", headerName: "Nome", flex: 2 },
        { field: "description", headerName: "Descrição"}
    ]

    return (
        <Box sx={{ display: "block" }} >
            <Box sx={{ display: 'flex', justifyContent: 'right', gap: 2, mb: 2, me: 4 }}>
                <IconButton
                    aria-label="Atualizar"
                    onClick={() => collectionsRefetch()}
                    loading={collectionsLoading}
                >
                    <AutorenewOutlined />
                </IconButton>
            </Box>
            <DataGrid 
                columns={columns}
                data={collectionsData?.getCollections?.collections}
                isLoading={collectionsLoading}
                getRowId={(row) => row.id}
                columnVisibilityModel={{
                    collectionId: false
                }}
            />
        </Box>
    )
}

export default CollectionsTable;