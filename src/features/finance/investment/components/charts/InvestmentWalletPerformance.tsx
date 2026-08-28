import { useQuery } from "@apollo/client";
import { Divider, Paper, Typography } from "@mui/material";
import { ChartsTooltipContainer, useAxesTooltip } from "@mui/x-charts";
import { useEffect, useState } from "react";
import Select from "react-select";
import Line from "../../../../../components/chart/LineChart.tsx";
import { apolloFinanceClient } from "../../../../../services/apollo/client/ApolloFinanceService.tsx";
import { getIndexers } from "../../../../../services/getCommonData/Finance.tsx";
import { getPeriodName } from "../../../../../utils/datetime.tsx";
import { Indexer } from "../../../type/Finance.ts";
import { QUERY_INVESTMENT_PERFORMANCE } from "../../api/queries.ts";
import { QueryInvestmentPerformance } from "../../types/InvestmentQueries.ts";
import { LineChartSeries } from "../../../../../types/finance/LineChartTypes.ts";

const periodsRange = [
    {
        value: 6,
        label: '6 meses'
    },
    {
        value: 12,
        label: '12 meses'
    },
    {
        value: 24,
        label: '24 meses'
    },
    {
        value: 0,
        label: 'Desde o início'
    },
]

const App = () => {
    const [indexers, setIndexers] = useState<Indexer[]>([])

    const [filters, setFilters] = useState({
        selectedIndexer: '2a2b100f-17d9-4c61-b3b4-f06662113953', // CDI
        selectedPeriod: 12,
    });

    const { data: performanceData, loading: performanceLoading } = useQuery<QueryInvestmentPerformance>(
        QUERY_INVESTMENT_PERFORMANCE,
        {
            client: apolloFinanceClient,
            variables: {
                params: {
                    indexerId: filters.selectedIndexer,
                    periodRange: filters.selectedPeriod,
                }
            }
        }
    );

    const fetchPerformanceData = async () => {
        setIndexers(await getIndexers(true));
    }

    useEffect(() => {
        fetchPerformanceData().then();
    }, []);

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

    //TODO: add type to data in param here
    const buildPerformanceChartData = (data: any) => {
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

    const performance = performanceData?.getInvestmentPerformance
    const chartData = performance ? buildPerformanceChartData(performance) : []
    const periodRange = performance
        ? performance.periodRange.map(period => getPeriodName(period))
        : [];


    useEffect(() => {
        console.log(chartData)
    }, [chartData])

    return (
        <>
            <div className="row mb-3">
                <div className="col-4"></div>
                <div className="col-4">
                    <Select
                        options={periodsRange}
                        value={periodsRange.find((c: any) => c.value === filters.selectedPeriod)}
                        placeholder={'Selecione'}
                        onChange={(val: any) => setFilters(prev => ({ ...prev, selectedPeriod: val.value }))}
                    />
                </div>
                <div className="col-4">
                    <Select
                        options={indexers}
                        value={indexers.find((c: any) => c.value === filters.selectedIndexer)}
                        placeholder={'Selecione'}
                        onChange={(val: any) => setFilters(prev => ({ ...prev, selectedIndexer: val.value }))}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Line
                        series={chartData}
                        xAxis={{
                            data: periodRange
                        }}
                        yAxis={{
                            label: "Porcentagem (%)"
                        }}
                        loading={performanceLoading}
                    />
                </div>
            </div>
        </>
    )
}

export default App;