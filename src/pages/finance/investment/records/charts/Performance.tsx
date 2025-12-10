import Line from "../../../../../components/chart/Line.tsx";

// Import this css to test tooltip style
import { useState } from "react";
import '../../../../../assets/core/components/tooltip.css';
import Loader from "../../../../../components/Loader.tsx";
import { useQuery } from "@apollo/client";
import { apolloFinanceClient } from "../../../../../services/apollo/client/ApolloFinanceService.tsx";
import { QUERY_INVESTMENT_PERFORMANCE } from "../../../../../services/apollo/queries/Finance.tsx";

interface InvestmentPerformanceProps {
    investmentId: string;
}

const App = (props: InvestmentPerformanceProps) => {

    const { data: performanceData, loading: performanceLoading } = useQuery(
        QUERY_INVESTMENT_PERFORMANCE,
        {
            client: apolloFinanceClient,
            variables: { params: { investmentId: props.investmentId } },
            skip: !props.investmentId
        }
    )

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