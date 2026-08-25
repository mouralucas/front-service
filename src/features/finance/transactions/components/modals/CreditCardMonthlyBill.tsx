import { useQuery } from '@apollo/client';
import { ReactElement, SyntheticEvent, useEffect, useMemo, useState } from "react";
import Modal from '../../../../../components/Modal';
import { apolloFinanceClient } from '../../../../../services/apollo/client/ApolloFinanceService';
import { QUERY_CREDIT_CARDS_MONTHLY_BILL } from '../../api/queries';
import { GetCreditCardMonthlyBillQuery } from '../../types/CreditCardQueries';
import CreditCardMonthlyBillTransactionsTable from '../tables/CreditCardMonthlyBillTransactions';
import { Box, Paper, Typography } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import Tab from '@mui/material/Tab';
import CircularLoader from '../../../../../components/Loader';
import { CreditCardTransaction } from '../../types/CreditCard';

interface CreditCardMonthlyBillProps {
    isOpen: boolean;
    onToggle: any;
    period?: number;
}

const formatPeriod = (period: number): string => {
    const periodString = String(period);
    const year = periodString.slice(0, 4);
    const month = periodString.slice(4).padStart(2, '0');
    return `${month}/${year}`;
};

const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', {
        style: 'currency',
        currency: 'BRL',
    });
};

const CreditCardMonthlyBillModal = (props: CreditCardMonthlyBillProps): ReactElement => {
    const [selectedTab, setSelectedTab] = useState('0');
    const [selectedTransactions, setSelectedTransactions] = useState<CreditCardTransaction[]>([]);

    const { data: billData, loading: billLoading } = useQuery<GetCreditCardMonthlyBillQuery>(
        QUERY_CREDIT_CARDS_MONTHLY_BILL,
        {
            client: apolloFinanceClient,
            variables: {
                period: props.period ?? 0,
            },
            skip: !props.period,
        }
    );

    const bills = billData?.getCreditCardMonthlyBill?.bill ?? [];

    useEffect(() => {
        if (bills.length > 0) {
            setSelectedTab('0');
        }
    }, [bills.length]);

    useEffect(() => {
        if (!props.isOpen) {
            setSelectedTransactions([]);
        }
    }, [props.isOpen])

    const handleTabChange = (_event: SyntheticEvent, newValue: string) => {
        setSelectedTab(newValue);
        setSelectedTransactions([]);
    };

    const selectedAmount = useMemo(
        () =>
            selectedTransactions.reduce(
                // Multiplied to -1 cause is the total selected.
                (sum, transaction) => sum + (transaction.amount * -1),
                0
            ),
        [selectedTransactions]
    );

    const body: ReactElement = (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {billLoading && (
                <CircularLoader />
            )}

            {!billLoading && bills.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                    Nenhuma fatura encontrada para o período selecionado.
                </Typography>
            )}

            {bills.length > 0 && (
                <TabContext value={selectedTab}>
                    <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <TabList
                            onChange={handleTabChange}
                            variant="scrollable"
                            scrollButtons="auto"
                            aria-label="Abas de faturas de crédito"
                        >
                            {bills.map((bill, index) => (
                                <Tab
                                    key={`${bill.creditCardId}-${bill.period}`}
                                    label={`${bill.creditCardNickname ?? 'Cartão'} ${formatPeriod(bill.period)}`}
                                    value={String(index)}
                                />
                            ))}
                        </TabList>
                    </Box>

                    {bills.map((bill, index) => (
                        <TabPanel
                            key={`${bill.creditCardId}-${bill.period}`}
                            value={String(index)}
                            sx={{ px: 0, py: 2 }}
                        >
                            <Paper
                                variant="outlined"
                                sx={{
                                    p: 2,
                                    mb: 2,
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    flexWrap: 'wrap',
                                    gap: 2,
                                }}
                            >
                                <Box>
                                    <Typography variant="overline" color="text.secondary">
                                        Total gasto
                                    </Typography>
                                    <Typography variant="h5" fontWeight={700}>
                                        {formatCurrency(bill.totalAmount)}
                                    </Typography>
                                </Box>
                                {selectedTransactions.length > 0 &&
                                <Box>
                                    <Typography variant="overline" color="text.secondary">
                                        Total selecionado
                                    </Typography>
                                    <Typography variant="h5" fontWeight={700}>
                                        {formatCurrency(selectedAmount)}
                                    </Typography>
                                </Box>
                                }
                                <Box textAlign="right">
                                    <Typography variant="overline" color="text.secondary">
                                        Transações
                                    </Typography>
                                    <Typography variant="h6" fontWeight={600}>
                                        {bill.quantityTransactions ?? bill.transactions.length}
                                    </Typography>
                                </Box>
                            </Paper>

                            <CreditCardMonthlyBillTransactionsTable
                                transactions={bill.transactions}
                                isLoading={billLoading}
                                onSelectionChange={setSelectedTransactions}
                            />
                        </TabPanel>
                    ))}
                </TabContext>
            )}
        </Box>
    );

    return (
        <Modal
            isOpen={props.isOpen}
            onToggle={props.onToggle}
            body={body}
            title="Faturas de cartão"
            size="modal-xl"
        />
    );
};

export default CreditCardMonthlyBillModal;