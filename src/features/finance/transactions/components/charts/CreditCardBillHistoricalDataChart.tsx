import { useQuery } from '@apollo/client';
import { useCallback, useEffect, useState } from "react";
import BarChart from '../../../../../components/chart/BarChart.tsx';
import { BarChartReferenceLine } from '../../../../../interfaces/BarChart.ts';
import { apolloFinanceClient } from '../../../../../services/apollo/client/ApolloFinanceService.tsx';
import { getLastPeriods, getPeriodFromDate } from "../../../../../utils/datetime.tsx";
import { QUERY_CREDIT_CARDS_MONTHLY_BILL_EVOLUTION as QUERY_CREDIT_CARD_BILL_HITORICAL_DATA } from '../../api/queries.ts';
import { GetCreditCardBillHistoricalDataQuery } from '../../types/CreditCardQueries.ts';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { ptBR } from 'date-fns/locale';
import { Box } from '@mui/material';

const CreditCardBillEvolution = () => {
    // Filter date range
    const [startDate, setStartDate] = useState<Date | null>(null);
    const [endDate, setEndDate] = useState<Date | null>(null);

    useEffect(() => {
        const range = getLastPeriods();
        setStartDate(new Date(range[0]));
        setEndDate(new Date(range[1]));
        updateDateRange(getLastPeriods());
    }, []);



    const startPeriod = startDate ? getPeriodFromDate(startDate) : undefined;
    const endPeriod = endDate ? getPeriodFromDate(endDate) : undefined;

    const { data: historyData, refetch: historyRefetch } = useQuery<GetCreditCardBillHistoricalDataQuery>(QUERY_CREDIT_CARD_BILL_HITORICAL_DATA, {
        client: apolloFinanceClient,
        skip: startPeriod === undefined || endPeriod === undefined,
        variables: {
            params: {
                startPeriod: getPeriodFromDate(startDate),
                endPeriod: getPeriodFromDate(endDate),
            }
        }
    })

    const updateDateRange = useCallback((dates: any) => {
        if (dates[1] !== null) {
            historyRefetch();
        }
    }, [historyRefetch]);

    const historicalData = historyData?.getCreditCardBillHistoricalData.historicalData;
    const referenceLine: BarChartReferenceLine[] = historicalData
        ? [
            {
                value: historicalData.historicalAverage,
                label: "Média histórica",
                labelAlign: "start",
            },
            {
                value: historicalData.goal,
                label: "Meta",
                labelAlign: "start",
            },
        ]
        : [];

    useEffect(() => {
        console.log(historicalData);
    }, [historicalData])

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
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'right', gap: 2, mb: 2, me: 4, mt: 6 }}>
                <BarChart
                    data={historicalData?.historicalData ?? []}
                    serie={historicalData?.periodRange ?? []}
                    referenceLine={referenceLine}
                />
            </Box>
        </Box>
    )
}

export default CreditCardBillEvolution;