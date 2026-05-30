import { useQuery } from "@apollo/client";
import { Divider, Paper, Typography } from "@mui/material";
import { ChartsTooltipContainer, useAxesTooltip } from "@mui/x-charts";
import { useEffect } from "react";
import Line from "../../../../../components/chart/Line.tsx";
import { apolloFinanceClient } from "../../../../../services/apollo/client/ApolloFinanceService.tsx";
import { getPeriodName } from "../../../../../utils/datetime.tsx";
import { QUERY_INVESTMENT_PERFORMANCE } from "../../api/queries.ts";

interface InvestmentPerformanceProps {
    investmentId: string;
    refreshKey: number;
}

const App = (props: InvestmentPerformanceProps) => {

    const { data: performanceData, loading: performanceLoading, refetch: performanceRefetch } = useQuery(
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

    function CustomAxisTooltip() {
        const tooltipData = useAxesTooltip();
        const firstAxisData: any = tooltipData?.[0];

        if (!firstAxisData) return null;

        return (
            <ChartsTooltipContainer>
                <Paper
                    sx={{
                        p: 2,
                        minWidth: 160,
                        backgroundColor: (theme) => theme.palette.background.default,
                        border: (theme) => `1px solid ${theme.palette.divider}`,
                        boxShadow: (theme) => theme.shadows[2],
                    }}
                >
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }} align="center">
                        {getPeriodName(parseInt(firstAxisData.axisValue))}
                    </Typography>

                    <Divider variant="middle" sx={{
                        mb: 3,
                        borderColor: (theme) => theme.palette.text.primary,
                        opacity: 0.2,
                    }} />

                    {firstAxisData.seriesItems.map((s: any) => (
                        <div key={s.seriesId} style={{ display: 'flex', alignItems: 'center', marginBottom: 4 }}>
                            <div
                                style={{
                                    width: 10,
                                    height: 10,
                                    borderRadius: 2,
                                    backgroundColor: s.color,
                                    marginRight: 8,
                                }}
                            />
                            <Typography variant="body2" sx={{ flex: 1 }}>
                                {s.formattedLabel}:
                            </Typography>
                            <Typography variant="body2" sx={{ ml: 2 }}>{s.formattedValue}%</Typography>
                        </div>
                    ))}
                </Paper>
            </ChartsTooltipContainer>
        );
    }
    return (
        <>
            <Line
                series={performance?.data || []}
                xLabels={performance?.xLabel}
                title="Evolução do investimento"
                subtitle={`Evolução, em %, dos investimentos comparados ao ${performance?.indexerName}`}
                customAxisTooltip={CustomAxisTooltip}
                loading={performanceLoading}
            />
        </>
    )
}

export default App;