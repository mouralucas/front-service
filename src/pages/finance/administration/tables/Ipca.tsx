import { useQuery } from "@apollo/client";
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined';
import { Box, IconButton, Stack } from "@mui/material";
import { GridColDef } from '@mui/x-data-grid';
import { ReactElement, useEffect, useState } from "react";
import DataGrid from "../../../../components/table/DataGrid";
import { Ipca } from "../../../../interfaces/Finance";
import { apolloFinanceClient } from "../../../../services/apollo/client/ApolloFinanceService";
import SelectAutocomplete from "../../../../components/form/SelectAutocomplete";
import { QUERY_INDEXER_SERIES, QUERY_PERIODICITY } from "../../../../features/finance/api/queries";


const IpcaTable = (): ReactElement => {
    const [selectedPeriodocity, setSelectedPeriodicity] = useState("")

    const { data, loading, refetch } = useQuery(QUERY_INDEXER_SERIES, {
        client: apolloFinanceClient,
        variables: { params: { 
            indexerId: "ef07cbb0-9b29-43c6-a060-bef73f1cc000",
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
            <DataGrid
                columns={columns}
                data={data?.getIndexerSeries.series}
                isLoading={loading}
                getRowId={(row) => row.id}
                columnVisibilityModel={{ id: false }}
            />
        </Box>
    )
}

export default IpcaTable;