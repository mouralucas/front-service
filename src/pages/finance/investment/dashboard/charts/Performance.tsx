import { useEffect, useState } from "react";
import Line from "../../../../../components/chart/Line.tsx"
import { getFinanceData } from "../../../../../services/axios/Get.tsx";
import { URL_FINANCE_INVESTMENT_PERFORMANCE } from "../../../../../services/axios/ApiUrls.tsx";
import { toast, ToastOptions } from "react-toastify";
import { GetInvestmentPerformanceResponse } from "../../../../../interfaces/FinanceRequest.tsx";
import Select from "react-select";
import { Indexer } from "../../../../../interfaces/Finance.tsx";
import { getIndexers } from "../../../../../services/getCommonData/Finance.tsx";
import { ChartsTooltipContainer, useAxesTooltip } from "@mui/x-charts";
import { Divider, Paper, Typography } from "@mui/material";

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
    const [performance, setPerformance] = useState<any>([])
    const [indexers, setIndexers] = useState<Indexer[]>([])

    const [filters, setFilters] = useState({
        selectedIndexer: '2a2b100f-17d9-4c61-b3b4-f06662113953',
        selectedPeriod: 12,
        somethingElse: 35
    });


    const fetchPerformanceData = async () => {
        setIndexers(await getIndexers(true));
    }

    useEffect(() => {
        fetchPerformanceData().then();
    }, []);

    useEffect(() => {
        updatePerformanceByIndexer();
    }, [filters]);

    const getPerformance = (indexerId: string, periodRange: number) => {
        getFinanceData(URL_FINANCE_INVESTMENT_PERFORMANCE, {
            periodRange: periodRange,
            indexerId: indexerId
        }).then((response: GetInvestmentPerformanceResponse) => {
            setPerformance(response);
        }).catch((err: string | ToastOptions) => {
            toast.error(`Houve um erro ao buscar a performance dos investimentos ${err}`)
        })
    }

    const updatePerformanceByIndexer = () => {
        getPerformance(filters.selectedIndexer, filters.selectedPeriod);
    }

    // const customToolTip = (pointInfo: any) => {
    //     const period: string = pointInfo.point.data.period
    //     const series: string = pointInfo.points.map(
    //         (p: { seriesName: any; valueText: any; }) =>
    //             `<b>${p.seriesName}</b>: ${parseFloat(p.valueText).toFixed(2)}%`
    //     ).join('<br/>')

    //     const formattedString = `<b>Período</b> ${period}<br/>${series}`
    //     return {
    //         text: formattedString,
    //     };
    // }
    function CustomAxisTooltip() {
        const tooltipData = useAxesTooltip();
        const firstAxisData: any = tooltipData?.[0];

        if (!firstAxisData) return null;

        return (
            <ChartsTooltipContainer>
                <Paper sx={{ p: 2, minWidth: 160 }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 'bold' }}>
                        {firstAxisData.axisValue}
                    </Typography>

                    <Divider />

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
                        series={performance.data}
                        xLabels={performance.xLabel}
                        customAxisTooltip={CustomAxisTooltip}
                    />
                </div>
            </div>

        </>
    )
}

export default App;