import { useQuery } from '@apollo/client';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { Box, IconButton } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ptBR } from "date-fns/locale/pt-BR";
import { ReactElement, useCallback, useEffect, useState } from "react";
import SelectAutocomplete from '../../../../../components/form/SelectAutocomplete';
import DataGrid from '../../../../../components/table/DataGrid';
import { apolloFinanceClient } from '../../../../../services/apollo/client/ApolloFinanceService';
import { formatDate, getLastPeriods, getPeriodFromDate } from '../../../../../utils/datetime';
import { QUERY_ACCOUNTS } from '../../../api/queries';
import { AccountTransaction } from '../../../transactions/types/Account';
import { QUERY_ACCOUNT_TRANSACTIONS } from '../../api/queries';
import ModalStatement from '../modals/AccountTransaction';



const AccountTransactionTable = (): ReactElement => {
    const [selectedTransaction, setSelectedTransaction] = useState<AccountTransaction | null>();
    const [isTransactionModalOpen, setIsModalTransactionOpen] = useState<boolean>(false);

    // Filter date range
    const [selectedAccount, setSelectedAccount] = useState(null)
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    const { data: transactionData, loading, refetch } = useQuery(QUERY_ACCOUNT_TRANSACTIONS, {
        client: apolloFinanceClient,
        variables: {
            params: {
                startPeriod: getPeriodFromDate(startDate),
                endPeriod: getPeriodFromDate(endDate),
                accountId: selectedAccount
            }
        },
        skip: !startDate || !endDate
    });

    const { data: accountData } = useQuery(QUERY_ACCOUNTS, {
        client: apolloFinanceClient,
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

    const onTransactionModalToggle = useCallback((e: any) => {
        if (typeof e.row !== 'undefined') {
            console.log(e.row)
            setSelectedTransaction(e.row);
        }

        if (isTransactionModalOpen) {
            setSelectedTransaction(null);
            updateDateRange([startDate, endDate]);
        }

        setIsModalTransactionOpen(!isTransactionModalOpen);
    }, [isTransactionModalOpen])

    const updateDateRange = (dates: any) => {
        if (dates[1] !== null) {
            refetch()
        }
    }

    const columns: GridColDef<AccountTransaction>[] = [
        { field: 'id', headerName: 'Id', headerAlign: "center", flex: 1, type: 'number' },
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
                        color="primary"
                        onClick={onTransactionModalToggle.bind(null, params)}
                    >
                        <EditOutlined />
                    </IconButton>
                </Box>
            ),
        },
    ]

    const filterAccounts = (val: any) => {
        setSelectedAccount(val);
    }

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
                <SelectAutocomplete
                    label="Conta"
                    value={selectedAccount}
                    options={accountData?.getAccounts?.accounts || []}
                    getOptionLabel={(option: any) => option.nickname}
                    getOptionValue={(option: any) => option.accountId}
                    onChange={(val) => filterAccounts(val)}
                    width={250}
                />
                <IconButton
                    aria-label="Novo Registro"
                    onClick={onTransactionModalToggle}
                    color='primary'
                    loading={loading}
                >
                    <AddCircleOutline />
                </IconButton>
                <IconButton
                    aria-label="Atualizar"
                    onClick={updateDateRange.bind(null, [startDate, endDate])}
                    color='primary'
                    loading={loading}
                >
                    <AutorenewOutlined />
                </IconButton>
            </Box>
            <DataGrid
                columns={columns}
                data={transactionData?.getAccountTransactions?.transactions}
                isLoading={loading}
                getRowId={(row) => row.id}
                columnVisibilityModel={{
                    id: false
                }}
            />
            <ModalStatement
                isOpen={isTransactionModalOpen}
                onToggle={onTransactionModalToggle}
                transaction={selectedTransaction} />
        </Box>
    )
}

export default AccountTransactionTable;