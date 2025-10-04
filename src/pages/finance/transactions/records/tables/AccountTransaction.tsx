import { useQuery } from '@apollo/client';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { Box, IconButton, TextField } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ptBR } from "date-fns/locale/pt-BR";
import { ReactElement, useEffect, useState } from "react";
import DataGrid from '../../../../../components/table/DataGridV2';
import { AccountTransaction } from "../../../../../interfaces/Finance";
import { apolloFinanceClient } from '../../../../../services/apollo/client/ApolloFinanceService.tsx';
import { QUERY_ACCOUNT_TRANSACTIONS } from '../../../../../services/apollo/queries/Finance.tsx';
import { formatDate, getLastPeriods, getPeriodFromDate } from "../../../../../utils/datetime";
import ModalStatement from '../modals/AccountTransaction.tsx';


const AccountTransactionTable = (): ReactElement => {
    const [selectedTransaction, setSelectedTransaction] = useState<AccountTransaction | null>()
    const [modalState, setModalState] = useState<boolean>(false)

    // Filter date range
    const [accountFilter, setAccountFilter] = useState('');
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const { data: transactionData, loading, refetch } = useQuery(QUERY_ACCOUNT_TRANSACTIONS, {
        client: apolloFinanceClient,
        variables: {
            params: {
                startPeriod: getPeriodFromDate(startDate),
                endPeriod: getPeriodFromDate(endDate)
            }
        },
        skip: !startDate || !endDate
    })

    useEffect(() => {
        const range = getLastPeriods();
        setStartDate(new Date(range[0]));
        setEndDate(new Date(range[1]));
        updateDateRange(getLastPeriods());
    }, []);

    useEffect(() => {
        if (startDate && endDate) {
            refetch()
        }
    }, [startDate, endDate])

    const showAccountTransactionModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            console.log(e.row)
            setSelectedTransaction(e.row);
        } else {
            setSelectedTransaction(null);
        }
        setModalState(true);
    }

    const hideModal = () => {
        setModalState(false);
        setSelectedTransaction(undefined);
        updateDateRange([startDate, endDate]);
    }

    const updateDateRange = (dates: any) => {
        if (dates[1] !== null) {
            refetch()
        }
    }

    const columns: GridColDef<AccountTransaction>[] = [
        { field: 'transactionId', headerName: 'Id', headerAlign: "center", flex: 1, type: 'number' },
        { field: 'accountNickname', headerName: 'Conta', headerAlign: "center", flex: 1 },
        {
            field: 'transactionDate',
            headerName: 'Data',
            headerAlign: "center",
            flex: 1,
            valueFormatter: (value) => {
                if (!value) return '';

                const start = formatDate(value);
                return start;
            },
        },
        {
            field: 'amount',
            headerName: 'Valor',
            headerAlign: "center",
            flex: 1,
            valueFormatter: (value: number, row) => {
                return value.toLocaleString('pt-BR', { style: 'currency', currency: row.currencyId });
            }
        },
        { field: 'description', headerName: 'Descrição', headerAlign: "center", flex: 1 },
        { field: 'categoryName', headerName: 'Categoria', headerAlign: "center", flex: 1 },
        {
            field: 'actions',
            headerName: 'Ações',
            headerAlign: "center",
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
                        color="success"
                        onClick={showAccountTransactionModal.bind(null, params)}
                    >
                        <EditOutlined />
                    </IconButton>
                </Box>
            ),
        },
    ]

    // Filtra as transações pelo accountName usando accountFilter
    const filteredTransactions = transactionData?.getAccountTransactions?.transactions?.filter(
        (transaction: AccountTransaction) =>
            transaction.accountNickname?.toLowerCase().includes(accountFilter.toLowerCase())
    ) ?? transactionData?.getAccountTransactions?.transactions;

    return (
        <Box sx={{ display: 'block', me: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'right', gap: 2, mb: 2, me: 4 }}>
                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                    <DatePicker
                        label="Data inicial"
                        views={["month", "year"]}
                        value={startDate}
                        onChange={(newValue) => {
                            setStartDate(newValue);
                            if (endDate && newValue && endDate < newValue) {
                                setEndDate(newValue);
                            }
                        }}
                        maxDate={endDate || undefined}
                        slotProps={{
                            textField: {
                                size: "small",
                                fullWidth: false
                            },
                        }}
                    />
                    <DatePicker
                        label="Data final"
                        views={["month", "year"]}
                        value={endDate}
                        onChange={(newValue) => {
                            setEndDate(newValue);
                            if (startDate && newValue && startDate > newValue) {
                                setStartDate(newValue);
                            }
                        }}
                        minDate={startDate || undefined}
                        slotProps={{
                            textField: {
                                size: "small",
                                fullWidth: false
                            },
                        }}
                    />
                </LocalizationProvider>
                <TextField
                    label="Filtrar por conta"
                    variant="outlined"
                    size="small"
                    value={accountFilter}
                    onChange={e => setAccountFilter(e.target.value)}
                    sx={{ minWidth: 250 }}
                />
                <IconButton
                    aria-label="Novo Registro"
                    onClick={showAccountTransactionModal}
                    loading={loading}
                >
                    <AddCircleOutline />
                </IconButton>
                <IconButton
                    aria-label="Atualizar"
                    onClick={updateDateRange.bind(null, [startDate, endDate])}
                    loading={loading}
                >
                    <AutorenewOutlined />
                </IconButton>
            </Box>
            <DataGrid
                columns={columns}
                data={filteredTransactions}
                isLoading={loading}
                getRowId={(row) => row.transactionId}
                columnVisibilityModel={{
                    transactionId: false
                }}
            />
            <ModalStatement modalState={modalState} hideAccountTransactionModal={hideModal} transaction={selectedTransaction} />
        </Box>
    )
}

export default AccountTransactionTable;