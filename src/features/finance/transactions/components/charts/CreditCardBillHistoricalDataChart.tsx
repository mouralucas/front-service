import { useQuery } from '@apollo/client';
import { ptBR } from 'date-fns/locale';
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import BarChart from '../../../../../components/chart/BarChart.tsx';
import { apolloFinanceClient } from '../../../../../services/apollo/client/ApolloFinanceService.tsx';
import { getLastPeriods, getPeriodFromDate } from "../../../../../utils/datetime.tsx";
import { QUERY_CREDIT_CARDS_MONTHLY_BILL_EVOLUTION as QUERY_CREDIT_CARD_BILL_HITORICAL_DATA } from '../../api/queries.ts';
import { GetCreditCardBillHistoricalDataQuery } from '../../types/CreditCardQueries.ts';

const CreditCardBillEvolution = () => {
    const [dateRange, setDateRange] = useState<any[]>(getLastPeriods());
    const [startDate, endDate] = dateRange;

    const startPeriod = startDate ? getPeriodFromDate(startDate) : undefined;
    const endPeriod = endDate ? getPeriodFromDate(endDate) : undefined;

    const { data: historyData } = useQuery<GetCreditCardBillHistoricalDataQuery>(QUERY_CREDIT_CARD_BILL_HITORICAL_DATA, {
        client: apolloFinanceClient,
        skip: startPeriod === undefined || endPeriod === undefined,
        variables: {
            params: {
                startPeriod,
                endPeriod
            }
        }
    })

    const historicalData = historyData?.getCreditCardBillHistoricalData.historicalData;
    const referenceLine = [
        {
            value: historicalData.historicalAverage,
            label: "Média histórica",
            labelAlign: 'start',
        },
        {
            value: historicalData.goal, 
            label: "Meta",
            labelAlign: 'start'
        },
    ]

    useEffect(() => {
        console.log(historicalData);
    }, [historicalData])

    return (
        <>
            <div className="row mb-3">
                <div className="col-4"></div>
                <div className="col-4">
                </div>
                <div className="col-4">
                    <DatePicker
                        selectsRange={true}
                        startDate={startDate}
                        endDate={endDate}
                        onChange={(update) => {
                            setDateRange(update);
                        }}
                        showMonthYearPicker
                        dateFormat={'MMM/yyyy'}
                        locale={ptBR}
                        className={'form-control'}
                    />
                </div>
            </div>
            <BarChart
                data={historicalData?.historicalData ?? []}
                serie={historicalData?.periodRange ?? []}
                referenceLine={referenceLine}
            />
        </>
    )
}

export default CreditCardBillEvolution;