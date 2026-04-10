import { useQuery } from "@apollo/client";
import { useEffect } from "react";
import Line from "../../../../../components/chart/Line.tsx";
import { apolloFinanceClient } from "../../../../../services/apollo/client/ApolloFinanceService.tsx";
import { QUERY_INVESTMENT_PERFORMANCE } from "../../../../../services/apollo/queries/Finance.tsx";

interface InvestmentPerformanceProps {
    investmentId: string;
    refreshKey: number;
}

const App = (props: InvestmentPerformanceProps) => {

    const { data: performanceData, loading: performanceLoading, refetch: performanceRefetch} = useQuery(
        QUERY_INVESTMENT_PERFORMANCE,
        {
            client: apolloFinanceClient,
            variables: { params: { investmentId: props.investmentId, isSettled: true } },
            skip: !props.investmentId,
            fetchPolicy: 'no-cache'
        }
    )

    // Update the chart if some statement is updated in the table
    useEffect(() => {
        performanceRefetch();
    }, [props.refreshKey])

    const performance = performanceData?.getInvestmentPerformance
    return (
        <>
            <Line
                series={performance?.data || []}
                xLabels={performance?.xLabel}
                title="Evolução do investimento"
                subtitle={`Evolução, em %, dos investimentos comparados ao ${performance?.indexerName}`}
                loading={performanceLoading}
            />
        </>
    )
}

export default App;