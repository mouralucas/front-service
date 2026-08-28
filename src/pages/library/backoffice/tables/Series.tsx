import { useQuery } from "@apollo/client";
import AddCircleOutline from "@mui/icons-material/AddCircleOutline";
import AutorenewOutlined from "@mui/icons-material/AutorenewOutlined";
import { Box, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ReactElement, useCallback, useState } from "react";
import DataGrid from "../../../../components/table/DataGrid.tsx";
import { Serie } from "../../../../types/Library.tsx";
import { apolloLibraryClient } from '../../../../services/apollo/client/ApolloLibraryService';
import SerieModal from "../modals/Serie.tsx";
import { QUERY_SERIES } from "../../../../features/library/api/queries.ts";

const SeriesTable = (): ReactElement => {
    const [selectedSerie, setSelectedSerie] = useState<Serie>();
    const [isSerieModalOpen, setIsSerieModalOpen] = useState<boolean>(false);

    const onSerieModalToggle = useCallback((e: any) => {
        if (e !== undefined && e.row !== undefined) {
            // Nomalize itemId to number
            setSelectedSerie({ ...e.row, itemId: Number(e.row.itemId) });
        } else {
            setSelectedSerie(undefined);
        }

        if (isSerieModalOpen) {
            seriesRefetch();
        }

        setIsSerieModalOpen(!isSerieModalOpen);

    }, [isSerieModalOpen])

    const { data: seriesData, loading: seriesLoading, refetch: seriesRefetch } = useQuery(QUERY_SERIES, {
        client: apolloLibraryClient,
    })

    const columns: GridColDef[] = [
        { field: "id", headerName: "Id", flex: .5 },
        { field: "name", headerName: "Nome", flex: 2 },
        { field: "originalName", headerName: "Nome Original", flex: 2 },
        { field: "description", headerName: "Descrição", flex: 1 },
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
                <IconButton
                    aria-label="Novo Registro"
                    onClick={onSerieModalToggle}
                    loading={seriesLoading}
                >
                    <AddCircleOutline />
                </IconButton>
            </Box>
            <DataGrid
                columns={columns}
                data={seriesData?.getSeries?.series}
                isLoading={seriesLoading}
                getRowId={(row) => row.id}
                columnVisibilityModel={{
                    seriesId: false
                }}
            />
            <SerieModal 
                isOpen={isSerieModalOpen}
                onToggle={onSerieModalToggle}
                serie={selectedSerie}
            />
        </Box>
    )
}

export default SeriesTable;
