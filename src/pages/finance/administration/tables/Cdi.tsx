import { useQuery } from "@apollo/client";
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined';
import { Box, IconButton, Stack } from "@mui/material";
import { GridColDef } from '@mui/x-data-grid';
import { ReactElement, useEffect, useState } from "react";
import DataGridComp from "../../../../components/table/DataGrid";
import { Ipca } from "../../../../interfaces/Finance";
import { apolloFinanceClient } from "../../../../services/apollo/client/ApolloFinanceService";
import { QUERY_INDEXER_SERIES, QUERY_PERIODICITY } from "../../../../services/apollo/queries/Finance";
import SelectAutocomplete from "../../../../components/form/SelectAutocomplete";


const CdiTable = (): ReactElement => {
    const [selectedPeriodocity, setSelectedPeriodicity] = useState("")
    
    const { data, loading, refetch } = useQuery(QUERY_INDEXER_SERIES, {
        client: apolloFinanceClient,
        variables: { params: { 
            indexerId: "2a2b100f-17d9-4c61-b3b4-f06662113953",
            periodicityId: selectedPeriodocity !== "" ? selectedPeriodocity : undefined
        } },
        skip: selectedPeriodocity === ""
    });

    const { data: periodicityData } = useQuery(QUERY_PERIODICITY, {
        client: apolloFinanceClient
    });

    useEffect(() => {
        setSelectedPeriodicity(periodicityData?.getPeriodicity.periodicities[0]?.id || "")
    }, [periodicityData]);


    const columns: GridColDef<Ipca>[] = [
        { field: 'id', headerName: 'ID', flex: 1 },
        { field: 'indexerName', headerName: 'Indexador', flex: 1 },
        { field: 'period', headerName: 'Período', flex: 1 },
        { field: 'value', headerName: 'Valor (%)', flex: 1, type: 'number' },
        { field: 'periodicityName', headerName: 'Periodicidade', flex: 1 }
    ]

    return (
        <Box sx={{ display: 'block' }}>
            <Box sx={{ display: 'flex', justifyContent: 'right', gap: 0, mb: 2, me: 2 }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    <SelectAutocomplete
                        label="Periodicidade"
                        value={selectedPeriodocity}
                        options={periodicityData?.getPeriodicity?.periodicities || []}
                        getOptionLabel={(option: any) => option.name}
                        getOptionValue={(option: any) => option.id}
                        onChange={(e: any) => setSelectedPeriodicity(e)}
                        width={200}
                    />
                </Stack>
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
                columnVisibilityModel={{ id: false }}
            />
        </Box>
    )
}

export default CdiTable;