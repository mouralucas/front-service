import { useQuery } from '@apollo/client';
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined';
import QueryStatsutlined from '@mui/icons-material/QueryStatsOutlined';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { ReactElement, useCallback, useEffect, useState } from 'react';
import DataGrid from '../../../../../components/table/DataGrid.tsx';
import { apolloFinanceClient } from '../../../../../services/apollo/client/ApolloFinanceService.tsx';
import { formatDate } from '../../../../../utils/datetime.tsx';
import { QUERY_INVESTMENTS } from '../../api/queries.ts';
import { Investment } from '../../types/Investment.ts';
import ModalInvestmentPerformance from '../modals/InvestmentPerformance.tsx'


const InvestmentSettledTable = (): ReactElement => {
    const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState<boolean>(false)

    const [investmentId, setInvestmentId] = useState<string>('')
    const [investmentName, setInvestmentName] = useState<string>('')

    const { data: investmentData, loading: investmentLoading, refetch: investmentRefetch } = useQuery(
        QUERY_INVESTMENTS,
        {
            client: apolloFinanceClient,
            variables: { params: { isSettled: true } },
            fetchPolicy: "no-cache",
        }
    )
    
    const onPerformanceModalToggle = useCallback((e: any) => {
        if (typeof e.row !== 'undefined') {
            setInvestmentId(e.row.id);
            setInvestmentName(e.row.name);
        }

        if (isPerformanceModalOpen) {
            setInvestmentId('');
            setInvestmentName('');
        }

        setIsPerformanceModalOpen(!isPerformanceModalOpen);
    }, [isPerformanceModalOpen])

    const columns: GridColDef<Investment>[] = [
        { field: 'id', headerName: 'Id', flex: 1 },
        { field: 'name', headerName: 'Nome', flex: 3 },
        {
            field: 'maturityDate',
            headerName: 'Vencimento',
            flex: 1,
            valueFormatter: (value) => {
                if (!value) return '';
                return formatDate(value);
            },
        },
        {
            field: 'settlementDate',
            headerName: 'Liquidado',
            flex: 1,
            valueFormatter: (value) => {
                if (!value) return '';
                return formatDate(value);
            },
        },
        {
            field: 'settlementAmount',
            headerName: 'Valor',
            flex: 1,
            type: 'number',
            valueFormatter: (value: number, row) => {
                if (!value) return '';
                return value.toLocaleString('pt-BR', { style: 'currency', currency: row.currencyId });
            }
        },
        { field: 'contractedRate', headerName: 'Taxa', flex: 1 },
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
                        aria-label="performance"
                        color="primary"
                        onClick={onPerformanceModalToggle.bind(null, params)}
                    >
                        <QueryStatsutlined />
                    </IconButton>
                </Box>
            ),
        },
    ]

    return (
        <Box sx={{ display: 'block ' }} >
            <Box sx={{ display: 'flex', justifyContent: 'right', gap: 0, mb: 2, me: 2 }}>
                <IconButton
                    aria-label="Atualizar"
                    onClick={investmentRefetch}
                    loading={investmentLoading}
                >
                    <AutorenewOutlined />
                </IconButton>
            </Box>
            <DataGrid
                columns={columns}
                data={investmentData?.getInvestments?.investments}
                isLoading={investmentLoading}
                pageSize={100}
                getRowId={(row) => row.id}
                columnVisibilityModel={{
                    id: false,
                }}
            />
            <ModalInvestmentPerformance
                isOpen={isPerformanceModalOpen}
                onToggle={onPerformanceModalToggle}
                investmentId={investmentId}
                investmentName={investmentName} />
        </Box>

    )
}

export default InvestmentSettledTable;