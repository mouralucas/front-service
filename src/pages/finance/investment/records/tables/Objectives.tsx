import { ReactElement, useState, useEffect } from 'react';
import DataGrid from '../../../../../components/table/DataGridV2';
import { Box } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { InvestmentObjective } from '../../../../../interfaces/Finance';
import { formatDate } from '../../../../../utils/datetime';
import { getInvestmentObjectives } from '../../../../../services/getCommonData/Finance';
import ObjectiveModal from '../modals/Objectives.tsx'
import IconButton from '@mui/material/IconButton';
import QueryStatsutlined from '@mui/icons-material/QueryStatsOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import AccountBalanceWalletOutlined from '@mui/icons-material/AccountBalanceWalletOutlined';
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';


const InvestmentObjectivesTable = (): ReactElement => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [modalObjectivesState, setModalObjectivesState] = useState<boolean>(false)

    const [objectives, setObjectives] = useState<InvestmentObjective[]>([])
    const [selectedObjective, setSelectedObjective] = useState<InvestmentObjective | undefined>()

    const fetchObjectivesData = async () => {
        setIsLoading(true);
        setObjectives(await getInvestmentObjectives(false))
        setIsLoading(false);
    }

    const showObjectiveModal = (e: any) => {
        if (typeof e.row != "undefined") {
            setSelectedObjective(e.row);
        }

        setModalObjectivesState(true)
    }

    const hideObjectiveModal = () => {
        setSelectedObjective(undefined);
        setModalObjectivesState(false)
        fetchObjectivesData().then();
    }

    useEffect(() => {
        fetchObjectivesData().then()
    }, [])
    
    const columns: GridColDef[] = [
        {field: 'objectiveId', headerName: 'Id', flex: 1 },
        {field: 'title', headerName: 'Título', flex: 1 },
        {field: 'description', headerName: 'Descrição', flex: 3 },
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
            headerName: 'Vaor Atual',
            flex: 1
        },
        { 
            field: 'estimatedDeadline', 
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
                        color="success"
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
                    loading={isLoading}
                >
                    <AddCircleOutline />
                </IconButton>
                <IconButton
                    aria-label="Atualizar"
                    onClick={fetchObjectivesData}
                    loading={isLoading}
                >
                    <AutorenewOutlined />
                </IconButton>
            </Box>
            <DataGrid
                columns={columns}
                data={objectives}
                isLoading={isLoading}
                getRowId={(row) => row.objectiveId}
                columnVisibilityModel={{
                    objectiveId: false, // Hide the ID column
                }}
            />
             <ObjectiveModal modalState={modalObjectivesState} hideModal={hideObjectiveModal} objective={selectedObjective}/>
        </Box>
    )
}

export default InvestmentObjectivesTable;