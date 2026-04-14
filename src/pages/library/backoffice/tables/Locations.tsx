import { useQuery } from "@apollo/client";
import { AddCircleOutline, AutorenewOutlined } from "@mui/icons-material";
import { Box, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ReactElement, useCallback } from "react";
import DataGrid from "../../../../components/table/DataGrid";
import { apolloLibraryClient } from "../../../../services/apollo/client/ApolloLibraryService";
import { QUERY_ITEM_LOCATIONS } from "../../../../services/apollo/queries/Library";


const ItemLocationTable = (): ReactElement => {
    const { data: locationData, loading: locationLoading, refetch: locationRefetch } = useQuery(QUERY_ITEM_LOCATIONS, {
        client: apolloLibraryClient,
    })

    const toggleItemLocationModal = useCallback(() => {
        console.log("Modal de localização de item");
    }, [])

    const columns: GridColDef[] = [
        { field: "id", headerName: "Id", flex: .5 },
        { field: "name", headerName: "Nome", flex: 1 },
        { field: "physicalLocation", headerName: "Localização física", flex: 2 },
    ]

    return (
        <Box sx={{ display: "block" }}>
            <Box sx={{ display: 'flex', justifyContent: 'right', gap: 2, mb: 2, me: 4 }}>
                <IconButton
                    aria-label="Novo Registro"
                    onClick={toggleItemLocationModal}
                    loading={locationLoading}
                >
                    <AddCircleOutline />
                </IconButton>
                <IconButton
                    aria-label="Atualizar"
                    onClick={() => locationRefetch()}
                    loading={locationLoading}
                >
                    <AutorenewOutlined />
                </IconButton>
            </Box>
            <DataGrid
                columns={columns}
                data={locationData?.getItemLocations?.locations}
                isLoading={locationLoading}
                getRowId={(row) => row.id}
                columnVisibilityModel={{
                    collectionId: false
                }}
            />
        </Box>
    )
}

export default ItemLocationTable;