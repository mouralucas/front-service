import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { ReactElement, useState } from 'react';
import DataGrid from '../../../../../components/table/DataGridV2';
import { InvestmentObjective } from '../../../../../interfaces/Finance';
import { formatDate } from '../../../../../utils/datetime';
import ObjectiveModal from '../modals/Objectives.tsx';
import { useQuery } from '@apollo/client';
import { apolloFinanceClient } from '../../../../../services/apollo/client/ApolloFinanceService.tsx';
import { QUERY_INVESTMENT_OBJECTIVES } from '../../../../../services/apollo/queries/Finance.tsx';


const InvestmentObjectivesTable = (): ReactElement => {
    const [modalObjectivesState, setModalObjectivesState] = useState<boolean>(false)

    const [selectedObjective, setSelectedObjective] = useState<InvestmentObjective | undefined>()

    const {data: objectivesData, loading: objectivesLoading, refetch: objectivesRefetch} = useQuery(QUERY_INVESTMENT_OBJECTIVES,
        {
            client: apolloFinanceClient,
            fetchPolicy: "no-cache",
        }
    )

    const showObjectiveModal = (e: any) => {
        if (typeof e.row != "undefined") {
            setSelectedObjective(e.row);
        }

        setModalObjectivesState(true)
    }

    const hideObjectiveModal = () => {
        setSelectedObjective(undefined);
        setModalObjectivesState(false);
    }

    const columns: GridColDef<InvestmentObjective>[] = [
        { field: 'id', headerName: 'Id', flex: 1 },
        { field: 'title', headerName: 'Título', flex: 1 },
        { field: 'description', headerName: 'Descrição', flex: 3 },
        {
            field: 'amount',
            headerName: 'Valor',
            flex: 1,
            type: 'number',
            valueFormatter: (value: number) => {
                return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            }
        },
        {
            field: 'currentAmount',
            headerName: 'Valor Atual',
            flex: 1,
            type: 'number',
            valueFormatter: (value: number, row) => {
                return value.toLocaleString('pt-BR', { style: 'currency', currency: row.currencyId });
            }
        },
        {
            field: 'estimateDeadline',
            headerName: 'Prazo Estimado',
            flex: 1,
            valueFormatter: (value) => {
                if (!value) return '';
                return formatDate(value);
            },
        },
        {
            field: 'actions',
            headerName: 'Ações',
            flex: 1,
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',      // vertical
                        justifyContent: 'center',  // horizontal
                        gap: 1,
                        flex: 1,                   // ocupa toda a largura da célula
                        height: '100%',            // ocupa toda a altura
                    }}
                >
                    <IconButton
                        aria-label="editar"
                        color="primary"
                        onClick={showObjectiveModal.bind(null, params)}
                    >
                        <EditOutlined />
                    </IconButton>
                </Box>
            ),
        },
    ]

    return (
        <Box sx={{ display: 'block', me: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'right', gap: 0, mb: 2, me: 2 }}>
                <IconButton
                    aria-label="Novo Registro"
                    onClick={showObjectiveModal}
                    loading={objectivesLoading}
                >
                    <AddCircleOutline />
                </IconButton>
                <IconButton
                    aria-label="Atualizar"
                    onClick={objectivesRefetch}
                    loading={objectivesLoading}
                >
                    <AutorenewOutlined />
                </IconButton>
            </Box>
            <DataGrid
                columns={columns}
                data={objectivesData?.getInvestmentObjectives?.objectives}
                isLoading={objectivesLoading}
                getRowId={(row) => row.id}
                columnVisibilityModel={{
                    id: false, // Hide the ID column
                }}
            />
            <ObjectiveModal modalState={modalObjectivesState} hideModal={hideObjectiveModal} objective={selectedObjective} />
        </Box>
    )
}

export default InvestmentObjectivesTable;