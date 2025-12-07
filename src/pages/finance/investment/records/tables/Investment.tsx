import AccountBalanceWalletOutlined from '@mui/icons-material/AccountBalanceWalletOutlined';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import QueryStatsutlined from '@mui/icons-material/QueryStatsOutlined';
import { Box, TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ReactElement, useEffect, useState } from "react";
import DataGrid from '../../../../../components/table/DataGridV2';
import { Investment } from "../../../../../interfaces/Finance";
import { formatDate, isLessThanMonths } from "../../../../../utils/datetime";
import ModalInvestment from '../modals/Investment';
import ModalInvestmentPerformance from '../modals/Performance';
import ModalInvestmentStatement from '../modals/Statement';
import { useQuery } from '@apollo/client';
import { QUERY_INVESTMENTS } from '../../../../../services/apollo/queries/Finance';
import { apolloFinanceClient } from '../../../../../services/apollo/client/ApolloFinanceService';


const InvestmentV2 = (): ReactElement => {
    // Modals States
    const [modalInvestmentState, setModalInvestmentState] = useState<boolean>(false);
    const [selectedInvestment, setSelectedInvestment] = useState<Investment | undefined>();

    const [modalInvestmentStatementState, setModalInvestmentStatementState] = useState<boolean>(false)
    const [modalInvestmentPerformanceState, setModalInvestmentPerformanceState] = useState<boolean>(false)

    // Table Filter
    const [investmentFilter, setInvestmentFilter] = useState('');

    // Investment information for the stats modal - soon to be deprecated
    const [investmentId, setInvestmentId] = useState<string>('')
    const [investmentName, setInvestmentName] = useState<string>('')

    const { data: investmentData, loading: investmentLoading, refetch: investmentRefetch } = useQuery(
        QUERY_INVESTMENTS,
        {
            client: apolloFinanceClient,
            variables: { params: { isSettled: false } },
            fetchPolicy: "no-cache",
        }
    )

    // Modals Open/Close functions
    const showInvestmentModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setSelectedInvestment(e.row);
        }
        setModalInvestmentState(true);
    }

    const hideInvestmentModal = () => {
        setModalInvestmentState(false);
        setSelectedInvestment(undefined);
        investmentRefetch();
    }

    const showInvestmentStatementModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setSelectedInvestment(e.row)
        }
        setModalInvestmentStatementState(true);
    }

    const hideInvestmentStatementModal = () => {
        setModalInvestmentStatementState(false);
        setSelectedInvestment(undefined);
        investmentRefetch()
    }

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

    const getRowClassName = (params: any) => {
        // The check order is based in importance, negative performance should be shown first, then near settle investments, and finally the default row style.
        const perc = parseFloat(params.row.percentageChange);
        if (perc < 0) {
            return 'danger-mui-row'
        }

        if (isLessThanMonths(params.row.maturityDate, 0)) {
            return 'success-mui-row'
        }

        if (isLessThanMonths(params.row.maturityDate, 3)) {
            return 'info-mui-row'
        }

    }

    const columns: GridColDef<Investment>[] = [
        { field: 'investmentId', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Nome', flex: 2.5 },
        {
            field: 'transactionDate',
            headerName: 'Data => vencimento',
            flex: 1,
            valueFormatter: (value, row) => {
                if (!value) return '';

                const start = formatDate(value, 'MM/yy'); // transactionDate
                const end = formatDate(row.maturityDate, 'MM/yy'); // maturityDate
                return end ? `${start} => ${end}` : start;
            },
        },
        {
            field: 'amount',
            headerName: 'Valor Inicial',
            flex: 1,
            type: 'number',
            valueFormatter: (value: number, row) => {
                return value.toLocaleString('pt-BR', { style: 'currency', currency: row.currencyId });
            }
        },
        {
            field: 'totalContribution',
            headerName: 'Aportes',
            flex: 1,
            type: 'number',
            valueFormatter: (value: number, row) => {
                if (!value) return 'R$ 0.00'
                return value.toLocaleString('pt-BR', { style: 'currency', currency: row.currencyId });
            }
        },
        {
            field: 'totalWithdrawn',
            headerName: 'Retiradas',
            flex: 1,
            type: 'number',
            valueFormatter: (value: number, row) => {
                if (!value) return 'R$ 0.00'
                return value.toLocaleString('pt-BR', { style: 'currency', currency: row.currencyId });
            }
        },
        {
            field: 'grossAmount',
            headerName: 'Valor Bruto',
            flex: 1.5,
            type: 'number',
            valueFormatter: (value: string, row) => {
                if (!value) return 'R$ 0.00 (0.00%)';
                const percentageChange: number = !row.percentageChange ? 0.00 : row.percentageChange;

                const formattedValue = parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: row.currencyId });
                const formattedPercChange: string = percentageChange.toFixed(2);
                return `${formattedValue} (${formattedPercChange}%)`;
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
                        aria-label="editar"
                        color="success"
                        onClick={showInvestmentModal.bind(null, params)}
                    >
                        <EditOutlined />
                    </IconButton>
                    <IconButton
                        aria-label="extrato"
                        color="secondary"
                        onClick={showInvestmentStatementModal.bind(null, params)}
                    >
                        <AccountBalanceWalletOutlined />
                    </IconButton>
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

    const investments = investmentData?.getInvestments?.investments

    useEffect(() => {
        console.log(investments);
    }, [investments])

    const filterdRows = investmentFilter
        ? investments.filter(row => row.name.toLowerCase().includes(investmentFilter.toLowerCase()))
        : investments

    return (
        <Box sx={{ display: 'block', me: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'right', gap: 0, mb: 2, me: 2 }}>
                <TextField
                    label='Filtrar por nome'
                    variant='outlined'
                    size='small'
                    value={investmentFilter}
                    onChange={e => setInvestmentFilter(e.target.value)}
                    sx={{ minWidth: 250 }}
                />
                <IconButton
                    aria-label="Novo Registro"
                    onClick={showInvestmentModal}
                    loading={investmentLoading}
                >
                    <AddCircleOutline />
                </IconButton>
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
                data={filterdRows}
                getRowId={(row) => row.investmentId.toString()}
                isLoading={investmentLoading}
                getRowClassName={getRowClassName}
                columnVisibilityModel={{
                    investmentId: false,
                }}
                pageSize={50}
            />
            <ModalInvestment modalState={modalInvestmentState} hideModal={hideInvestmentModal} investment={selectedInvestment} />
            <ModalInvestmentStatement modalState={modalInvestmentStatementState} hideModal={hideInvestmentStatementModal} investment={selectedInvestment} />
            <ModalInvestmentPerformance modalState={modalInvestmentPerformanceState} hideModal={hideInvestmentPerformanceModal} investmentId={investmentId} investmentName={investmentName} />
        </Box>
    )
}

export default InvestmentV2;