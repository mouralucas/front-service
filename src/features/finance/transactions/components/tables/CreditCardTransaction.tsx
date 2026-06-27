import { useMutation, useQuery } from '@apollo/client';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { Box, IconButton } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ptBR } from "date-fns/locale/pt-BR";
import { ReactElement, useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import SelectAutocomplete from '../../../../../components/form/SelectAutocomplete';
import DataGrid from '../../../../../components/table/DataGrid';
import { apolloFinanceClient } from '../../../../../services/apollo/client/ApolloFinanceService';
import { formatDate, getLastPeriods, getPeriodFromDate } from '../../../../../utils/datetime';
import { QUERY_CREDIT_CARDS } from '../../../api/queries';
import { DELETE_CREDIT_CARD_TRANSACTION_MUTATION } from '../../api/mutations';
import { QUERY_CREDIT_CARD_TRANSACTIONS } from '../../api/queries';
import { CreditCardTransaction } from '../../types/CreditCard';
import { DeleteCreditCardTransactionMutation } from '../../types/CreditCardMutations';
import { CreditCardTransactionQuery } from '../../types/CreditCardQueries';
import ConfirmDeleteCreditCardTransaction from '../modals/ConfirmDeleteCreditCardTransaction';
import CreditCardTransactionModal from '../modals/CreditCardTransaction';

const CreditCardTransactionTable = (): ReactElement => {

    const [isTransactionModalOpen, setIsTransactionModalOpen] = useState<boolean>(false);
    const [selectedCreditCard, setSelectedCreditCard] = useState(null);
    const [selectedTransactionId, setSelectedTransactionId] = useState<number>();
    const [isDeleteConfirmModalOpen, setIsDeleteConfirmModalOpen] = useState<boolean>(false);
    const [selectedTransactionToDelete, setSelectedTransactionToDelete] = useState<CreditCardTransaction | null>(null);

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
            transactionRefetch()
        }
    }, [startDate, endDate])

    const onTransactionModalToggle = useCallback((e: any) => {
        if (typeof e.row !== 'undefined') {
            console.log(typeof (e.row.id))
            setSelectedTransactionId(Number(e.row.id));
        }

        if (isTransactionModalOpen) {
            updateDateRange([startDate, endDate]);
            setSelectedTransactionId(undefined);
        }
        setIsTransactionModalOpen(!isTransactionModalOpen);
    }, [isTransactionModalOpen, startDate, endDate])

    const { data: creditCardData } = useQuery(QUERY_CREDIT_CARDS, {
        client: apolloFinanceClient
    })

    const { data: transactionData, loading: transactionLoading, refetch: transactionRefetch } = useQuery<CreditCardTransactionQuery>(
        QUERY_CREDIT_CARD_TRANSACTIONS, {
        client: apolloFinanceClient,
        variables: {
            params: {
                startPeriod: getPeriodFromDate(startDate),
                endPeriod: getPeriodFromDate(endDate),
                creditCardId: selectedCreditCard
            }
        },
        fetchPolicy: 'no-cache',
        skip: !startDate || !endDate
    });

    const updateDateRange = useCallback((dates: any) => {
        if (dates[1] !== null) {
            transactionRefetch();
        }
    }, [transactionRefetch]);

    const [deleteTransaction] = useMutation<DeleteCreditCardTransactionMutation>(DELETE_CREDIT_CARD_TRANSACTION_MUTATION, {
        client: apolloFinanceClient,
        onCompleted: () => {
            toast.success(
                'Extrato deletado com sucesso'
            );
            transactionRefetch();
        },
        onError: (error) => {
            toast.error(`Erro: ${error.message}`);
        },
    })

    const onDeleteConfirmModalToggle = useCallback((params?: any) => {
        const isRowPayload = params && typeof params === 'object' && 'row' in params;
        const isTransactionPayload = params && typeof params === 'object' && !('currentTarget' in params) && ('id' in params || 'creditCardId' in params);

        if (isRowPayload || isTransactionPayload) {
            const transaction = isRowPayload ? params.row : params;
            setSelectedTransactionToDelete(transaction);
            setIsDeleteConfirmModalOpen(true);
            return;
        }

        setSelectedTransactionToDelete(null);
        setIsDeleteConfirmModalOpen((current) => !current);
    }, []);

    const confirmDeleteTransaction = async () => {
        if (!selectedTransactionToDelete) {
            onDeleteConfirmModalToggle();
            return;
        }

        await deleteTransaction({
            variables: {
                id: Number(selectedTransactionToDelete.id)
            }
        });
        onDeleteConfirmModalToggle();
    }

    const columns: GridColDef<CreditCardTransaction>[] = [
        { field: 'id', headerName: 'Id', flex: 1 },
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
        { field: 'categoryName', headerAlign: "center", headerName: 'Categoria', flex: 1.5 },
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
                    <IconButton
                        aria-label="editar"
                        color="primary"
                        onClick={() => onDeleteConfirmModalToggle(params)}
                    >
                        <DeleteForeverOutlinedIcon />
                    </IconButton>
                </Box>
            ),
        },
    ];

    const filterCreditCards = (val: any) => {
        setSelectedCreditCard(val);
    }

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
                <SelectAutocomplete
                    label="Cartão de crédito"
                    value={selectedCreditCard}
                    options={creditCardData?.getCreditCards?.creditCards || []}
                    getOptionLabel={(option: any) => option.nickname}
                    getOptionValue={(option: any) => option.creditCardId}
                    onChange={(val) => filterCreditCards(val)}
                    width={250}
                />
                <IconButton
                    aria-label="Novo Registro"
                    onClick={onTransactionModalToggle}
                    color='primary'
                    loading={transactionLoading}
                >
                    <AddCircleOutline />
                </IconButton>
                <IconButton
                    aria-label="Atualizar"
                    onClick={() => updateDateRange([startDate, endDate])}
                    color='primary'
                    loading={transactionLoading}
                >
                    <AutorenewOutlined />
                </IconButton>
            </Box>
            <DataGrid
                columns={columns}
                data={transactionData?.getCreditCardTransactions?.transactions}
                isLoading={transactionLoading}
                getRowId={(row) => row.id}
                columnVisibilityModel={{
                    id: false
                }}
            />
            <ConfirmDeleteCreditCardTransaction
                isOpen={isDeleteConfirmModalOpen}
                onToggle={onDeleteConfirmModalToggle}
                onConfirm={confirmDeleteTransaction}
                transaction={selectedTransactionToDelete}
            />
            <CreditCardTransactionModal
                isOpen={isTransactionModalOpen}
                onToggle={onTransactionModalToggle}
                transactionId={selectedTransactionId}
            />
        </Box>
    )
}

export default CreditCardTransactionTable;