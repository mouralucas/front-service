import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import Line from "../../../../../components/chart/LineChart.tsx";
import { apolloFinanceClient } from "../../../../../services/apollo/client/ApolloFinanceService.tsx";
import { LineChartSeries } from "../../../../../types/finance/LineChartTypes.ts";
import { getPeriodName } from "../../../../../utils/datetime.tsx";
import { QUERY_INVESTMENT_PERFORMANCE } from "../../api/queries.ts";
import { InvestmentPerformance } from "../../types/Investment.ts";


interface InvestmentPerformanceProps {
    /** Identifier of the investment whose performance is displayed. */
    investmentId: string;
    /** Used when related info are updated and the chart must refresh. */
    refreshKey: number;
}

const App = (props: InvestmentPerformanceProps) => {

    const { data: performanceData, loading: performanceLoading, refetch: performanceRefetch } = useQuery(
        QUERY_INVESTMENT_PERFORMANCE,
        {
            client: apolloFinanceClient,
            variables: {
                params: {
                    investmentId: props.investmentId,
                    periodRange: 0,
                }
            },
            skip: !props.investmentId,
            fetchPolicy: 'no-cache'
        }
    )

    // Update the chart if some statement is updated in the table
    useEffect(() => {
        performanceRefetch();
    }, [props.refreshKey])


    const buildPerformanceChartData = (data: InvestmentPerformance) => {
        let series: LineChartSeries[] = [
            {
                "id": "investment",
                "label": "Investimento",
                "data": data.investmentSerie,
                "showMark": false,
            },
            {
                "id": data.indexerName,
                "label": data.indexerName,
                "data": data.indexerSerie,
                "showMark": false
            }
        ]
        return series
    };

    const performance = performanceData?.getInvestmentPerformance.performance
    const chartData = performance ? buildPerformanceChartData(performance) : []
    const periodRange = performance
        ? performance.periodRange.map((period: number | undefined) => getPeriodName(period))
        : [];

    return (
        <>
            <Line
                series={chartData}
                xAxis={{
                    data: periodRange
                }}
                yAxis={{
                    label: "Porcentagem (%)"
                }}
                loading={performanceLoading}
                title="Performance do investimento"
            />
        </>
    )
}

export default App;