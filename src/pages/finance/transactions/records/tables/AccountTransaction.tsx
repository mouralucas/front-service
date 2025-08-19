import { ReactElement, useState, useEffect } from "react";
import DataGrid from '../../../../../components/table/DataGridV2';
import { Box, IconButton } from "@mui/material";
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { GridColDef } from "@mui/x-data-grid";
import { AccountTransaction } from "../../../../../interfaces/Finance";
import { URL_FINANCE_ACCOUNT_TRANSACTION } from "../../../../../services/axios/ApiUrls";
import { getFinanceData } from "../../../../../services/axios/Get";
import { getLastPeriods, getPeriodFromDate } from "../../../../../utils/datetime";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import ptBR from "date-fns/locale/pt-BR";
import { AccountTransactionResponse } from "../../../../../interfaces/FinanceRequest";


const AccountTransactionTable = (): ReactElement => {
    const [transaction, setTransaction] = useState<AccountTransaction[]>([]);
    const [selectedTransaction, setSelectedTransaction] = useState<AccountTransaction | null>()
    const [modalState, setModalState] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true);

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

    const updateDateRange = (dates: any) => {
        if (dates[1] !== null) {
            getTransactions(getPeriodFromDate(dates[0]), getPeriodFromDate(dates[1]));
        }
    }

    const getTransactions = (startAt: number, endAt: number) => {
        setIsLoading(true);

        getFinanceData(URL_FINANCE_ACCOUNT_TRANSACTION, {
            startPeriod: startAt,
            endPeriod: endAt
        }).then((response: AccountTransactionResponse) => {
            setTransaction(response?.transactions);
            setIsLoading(false);
        }
        ).catch(err => {
            // toast.error('Houve um erro ao buscar extratos: ' + err)
            setIsLoading(false);
        })
    }

    const columns: GridColDef[] = [
        { field: 'transactionId', headerName: 'Id', flex: 1 },
        { field: 'accountNickname', headerName: 'Conta', flex: 1 },
        {
            field: 'transactionDate',
            headerName: 'Data',
            flex: 1
        },
        {
            field: 'amount',
            headerName: 'Valor',
            flex: 1
        },
        { field: 'description', headerName: 'Descrição', flex: 1 },
        { field: 'categoryName', headerName: 'Categoria', flex: 1 },
    ]

    return (
        <Box sx={{ display: 'block', me: 5 }}>
            <Box sx={{ display: 'flex', justifyContent: 'right', gap: 2, mb: 2, me: 4 }}>
            <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                <DatePicker
                    label="Data inicial"
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
                    value={endDate}
                    onChange={(newValue) => {
                        setEndDate(newValue);
                        if (startDate && newValue && startDate > newValue) {
                            setStartDate(newValue); // ajusta para não ficar maior
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
                    onClick={() => console.log('Novo Registro')}
                    loading={isLoading}
                >
                    <AddCircleOutline />
                </IconButton>
                <IconButton
                    aria-label="Atualizar"
                    onClick={() => console.log('Update')}
                    loading={isLoading}
                >
                    <AutorenewOutlined />
                </IconButton>
            </Box>
            <DataGrid
                columns={columns}
                data={transaction}
                isLoading={isLoading}
                getRowId={(row) => row.transactionId}
                columnVisibilityModel={{
                    transactionId: false
                }}
            />
        </Box>
    )
}

export default AccountTransactionTable;