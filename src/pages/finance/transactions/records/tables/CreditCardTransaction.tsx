import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined';
import { Box, IconButton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ptBR } from "date-fns/locale/pt-BR";
import { ReactElement, useEffect, useState, useCallback } from 'react';
import DataGrid from '../../../../../components/table/DataGridV2';
import { CreditCardTransaction } from '../../../../../interfaces/Finance';
import { GetCreditCardTransactionResponse } from '../../../../../interfaces/FinanceRequest';
import { URL_CREDIT_CARD_TRANSACTION } from '../../../../../services/axios/ApiUrls';
import { getFinanceData } from '../../../../../services/axios/Get';
import { formatDate, getLastPeriods, getPeriodFromDate } from '../../../../../utils/datetime';
import CreditCardTransactionModal from '../modals/CreditCardTransaction.tsx';

const CreditCardTransactionTable = (): ReactElement => {

    const [creditCardTransaction, setCreditCardTransaction] = useState<CreditCardTransaction[]>([]);
    const [transactionModalState, setTransactionModalState] = useState<boolean>(false)
    // const [updateTransactionModalState, setUpdateTransactionModalState] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    // Filter date range
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    useEffect(() => {
        const range = getLastPeriods();
        setStartDate(new Date(range[0]));
        setEndDate(new Date(range[1]));
        updateDateRange(getLastPeriods());
    }, []);

    useEffect(() => {
        if (startDate && endDate) {
            getTransactions(getPeriodFromDate(startDate), getPeriodFromDate(endDate));
        }
    }, [startDate, endDate])

    const showCreditCardTransactionModal = () => {
        setTransactionModalState(true);
    }

    const hideCreditCardTransactionModal = () => {
        setTransactionModalState(false);
        updateDateRange([startDate, endDate]);
    }

    const getTransactions = useCallback((startAt: number, endAt: number) => {
        setIsLoading(true);

        getFinanceData(URL_CREDIT_CARD_TRANSACTION, {
            startPeriod: startAt,
            endPeriod: endAt
        }).then((response: GetCreditCardTransactionResponse) => {
            setCreditCardTransaction(response.transactions);
            setIsLoading(false);
        }).catch(() => {
            //toast.error("Erro ao buscar transações")
            setIsLoading(false);
        })
    }, []);

    const updateDateRange = useCallback((dates: any) => {
        if (dates[1] !== null) {
            getTransactions(getPeriodFromDate(dates[0]), getPeriodFromDate(dates[1]));
        }
    }, [getTransactions]);

    const columns: GridColDef<CreditCardTransaction>[] = [
        { field: 'transactionId', headerName: 'Id', flex: 1 },
        { field: 'creditCardNickname', headerAlign: "center", headerName: 'Cartão', flex: 1 },
        {
            field: 'transactionDate',
            headerName: 'Compra',
            headerAlign: "center",
            flex: 1,
            valueFormatter: (value) => {
                if (!value) return '';
                return formatDate(value);
            },

        },
        {
            field: 'dueDate',
            headerName: 'Pagamento',
            headerAlign: "center",
            flex: 1,
            valueFormatter: (value) => {
                if (!value) return '';
                return formatDate(value);
            },

        },
        {
            field: 'amount',
            headerName: 'Valor',
            flex: 1,
            type: 'number',
            headerAlign: "center",
            valueFormatter: (value: number, row) => {
                return value.toLocaleString('pt-BR', { style: 'currency', currency: row.currencyId });
            }
        },
        {
            field: 'installments',
            headerName: 'Parcelas',
            headerAlign: "center",
            flex: .5,
            valueFormatter: (value: number, row) => {
                return `${row.currentInstallment}/${value}`
            }
        },
        { field: 'description', headerAlign: "center", headerName: 'Descrição', flex: 2 },
        { field: 'categoryName', headerAlign: "center", headerName: 'Categoria', flex: 1.5 }
    ];

    return (
        <Box sx={{ display: 'block ' }} >
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
                <IconButton
                    aria-label="Novo Registro"
                    onClick={showCreditCardTransactionModal}
                    loading={isLoading}
                >
                    <AddCircleOutline />
                </IconButton>
                <IconButton
                    aria-label="Atualizar"
                    onClick={() => updateDateRange([startDate, endDate])}
                    loading={isLoading}
                >
                    <AutorenewOutlined />
                </IconButton>
            </Box>
            <DataGrid
                columns={columns}
                data={creditCardTransaction}
                isLoading={isLoading}
                getRowId={(row) => row.transactionId}
                columnVisibilityModel={{
                    transactionId: false
                }}
            />
            <CreditCardTransactionModal modalState={transactionModalState} hideModal={hideCreditCardTransactionModal} />
        </Box>
    )
}

export default CreditCardTransactionTable;