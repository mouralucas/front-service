import { useQuery } from '@apollo/client';
import AccountBalanceWalletOutlined from '@mui/icons-material/AccountBalanceWalletOutlined';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined';
import ClearIcon from '@mui/icons-material/Clear';
import EditOutlined from '@mui/icons-material/EditOutlined';
import QueryStatsutlined from '@mui/icons-material/QueryStatsOutlined';
import { Box, TextField } from "@mui/material";
import IconButton from '@mui/material/IconButton';
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ReactElement, useCallback, useState } from "react";
import DataGrid from '../../../../../components/table/DataGridV2';
import { Investment } from "../../../../../interfaces/Finance";
import { apolloFinanceClient } from '../../../../../services/apollo/client/ApolloFinanceService';
import { QUERY_INVESTMENTS } from '../../../../../services/apollo/queries/Finance';
import { formatDate, isLessThanMonths } from "../../../../../utils/datetime";
import ModalInvestment from '../modals/Investment';
import ModalInvestmentPerformance from '../modals/Performance';
import ModalInvestmentStatement from '../modals/Statement';


const InvestmentV2 = (): ReactElement => {
    // Modals States
    const [isInvestmentModalOpen, setIsInvestmentModalOpen] = useState<boolean>(false);
    const [selectedInvestmentId, setSelectedInvestmentId] = useState<string>("");

    const [isStatementModalOpen, setIsStatementModalOpen] = useState<boolean>(false);
    const [isPerformanceModalOpen, setIsPerformanceModalOpen] = useState<boolean>(false);

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

    const onInvestmentModalToggle = useCallback((e: any) => {
        if (typeof e?.row !== 'undefined') {
            setSelectedInvestmentId(e.row.id);
        }

        if (isInvestmentModalOpen) {
            investmentRefetch();
        }

        setIsInvestmentModalOpen(!isInvestmentModalOpen);
    }, [isInvestmentModalOpen])


    const onStatementModalToggle = useCallback((e: any) => {
        if (typeof e.row !== 'undefined') {
            setSelectedInvestmentId(e.row.id);
        }

        setIsStatementModalOpen(!isStatementModalOpen);
    }, [isStatementModalOpen])


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

    const getRowClassName = (params: any) => {
        // The check order is based on importance, 
        //  negative performance should be shown first, 
        // then near settle investments, and finally the default row style.
        const perc = parseFloat(params.row.percentageChange);
        if (perc < 0) {
            return 'danger-mui-row'
        }

        if (!params.row.maturityDate) {
            return
        }

        if (isLessThanMonths(params.row.maturityDate, 0)) {
            return 'success-mui-row'
        }

        if (isLessThanMonths(params.row.maturityDate, 3)) {
            return 'info-mui-row'
        }

    }

    const columns: GridColDef<Investment>[] = [
        { field: 'id', headerName: 'ID', flex: 1 },
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
            headerName: 'Total Investido',
            flex: 1,
            type: 'number',

            renderCell: (params: GridRenderCellParams) => {
                const { totalContribution, totalWithdrawn, currencyId, amount } = params.row;
                const formattedAmount = amount.toLocaleString('pt-BR', { style: 'currency', currency: currencyId });

                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Box>{formattedAmount}</Box>

                        {totalContribution !== 0 && totalContribution !== amount && totalContribution && (
                            <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                                +{totalContribution.toLocaleString('pt-BR', { style: 'currency', currency: currencyId })}
                            </Box>
                        )}
                        {totalWithdrawn !== 0 && totalWithdrawn && (
                            <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                                -{totalWithdrawn.toLocaleString('pt-BR', { style: 'currency', currency: currencyId })}
                            </Box>
                        )}
                    </Box>
                );
            }
        },
        {
            field: 'grossAmount',
            headerName: 'Valor Bruto',
            flex: 1.5,
            type: 'number',
            valueFormatter: (value: string, row) => {
                if (!value) return 'R$ 0.00 (0.00%)';
                const formattedAmount = parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: row.currencyId });
                return `${formattedAmount}`
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
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        flex: 1,
                        height: '100%',
                    }}
                >
                    <IconButton
                        aria-label="editar"
                        color="primary"
                        onClick={onInvestmentModalToggle.bind(null, params)}
                    >
                        <EditOutlined />
                    </IconButton>
                    <IconButton
                        aria-label="extrato"
                        color="primary"
                        onClick={onStatementModalToggle.bind(null, params)}
                    >
                        <AccountBalanceWalletOutlined />
                    </IconButton>
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

    const investments = investmentData?.getInvestments?.investments

    const filterdRows = investmentFilter
        ? investments.filter((row: { name: string; }) => row.name.toLowerCase().includes(investmentFilter.toLowerCase()))
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
                    onFocus={(e) => e.currentTarget.select()}
                    slotProps={{
                        input: {
                            endAdornment: investmentFilter && (
                                <ClearIcon
                                    onClick={() => setInvestmentFilter('')}
                                    sx={{ cursor: 'pointer' }}
                                />
                            ),
                        },
                    }}
                />
                <IconButton
                    aria-label="Novo Registro"
                    onClick={onInvestmentModalToggle}
                    loading={investmentLoading}
                >
                    <AddCircleOutline />
                </IconButton>
                <IconButton
                    aria-label="Atualizar"
                    onClick={() => investmentRefetch()}
                    loading={investmentLoading}
                >
                    <AutorenewOutlined />
                </IconButton>
            </Box>
            <DataGrid
                columns={columns}
                data={filterdRows}
                getRowId={(row) => row.id.toString()}
                isLoading={investmentLoading}
                getRowClassName={getRowClassName}
                columnVisibilityModel={{
                    id: false,
                }}
                pageSize={50}
            />
            <ModalInvestment
                isOpen={isInvestmentModalOpen}
                onToggle={onInvestmentModalToggle}
                investmentId={selectedInvestmentId}
            />
            <ModalInvestmentStatement
                isOpen={isStatementModalOpen}
                onToggle={onStatementModalToggle}
                investmentId={selectedInvestmentId}
            />
            <ModalInvestmentPerformance
                isOpen={isPerformanceModalOpen}
                onToggle={onPerformanceModalToggle}
                investmentId={investmentId}
                investmentName={investmentName} />
        </Box>
    )
}

export default InvestmentV2;