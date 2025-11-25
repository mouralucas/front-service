import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined';
import QueryStatsutlined from '@mui/icons-material/QueryStatsOutlined';
import { Box } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { ReactElement, useEffect, useState } from 'react';
import DataGridComp from '../../../../../components/table/DataGridV2';
import { Investment } from '../../../../../interfaces/Finance.tsx';
import { InvestmentResponse } from '../../../../../interfaces/FinanceRequest.tsx';
import { URL_FINANCE_INVESTMENT } from '../../../../../services/axios/ApiUrls.tsx';
import { getFinanceData } from '../../../../../services/axios/Get.tsx';
import { formatDate } from '../../../../../utils/datetime.tsx';
import ModalInvestmentPerformance from '../modals/Performance.tsx';


const InvestmentSettledTable = (): ReactElement => {
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const [modalInvestmentPerformanceState, setModalInvestmentPerformanceState] = useState<boolean>(false)

    const [investmentId, setInvestmentId] = useState<string>('')
    const [investmentName, setInvestmentName] = useState<string>('')
    const [investments, setInvestments] = useState<Investment[]>([])

    useEffect(() => {
        getInvestment();
    }, [])

    const showInvestmentPerformanceModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setInvestmentId(e.row.investmentId);
            setInvestmentName(e.row.name);
            setModalInvestmentPerformanceState(true);
        }

    }

    const hideInvestmentPerformanceModal = () => {
        setModalInvestmentPerformanceState(false);
        setInvestmentId('');
        setInvestmentName('');
    }

    const getInvestment = () => {
        setIsLoading(true);
        getFinanceData(URL_FINANCE_INVESTMENT, { isSettled: true }).then((response: InvestmentResponse) => {
            setInvestments(response.investments);
            setIsLoading(false);
        }).catch(() => {
            // toast.error('Houve um erro ao buscar os investimentos')
            setIsLoading(false);
        })
    }

    const columns: GridColDef<Investment>[] = [
        { field: 'investmentId', headerName: 'Id', flex: 1 },
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
                        color="secondary"
                        onClick={showInvestmentPerformanceModal.bind(null, params)}
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
                    onClick={getInvestment}
                    loading={isLoading}
                >
                    <AutorenewOutlined />
                </IconButton>
            </Box>
            <DataGridComp
                columns={columns}
                data={investments}
                isLoading={isLoading}
                pageSize={100}
                getRowId={(row) => row.investmentId}
                columnVisibilityModel={{
                    investmentId: false,
                }}
            />
            <ModalInvestmentPerformance modalState={modalInvestmentPerformanceState} hideModal={hideInvestmentPerformanceModal} investmentId={investmentId} investmentName={investmentName} />
        </Box>

    )
}

export default InvestmentSettledTable;