import Line from "../../../../components/chart/Line"

interface InvestmentPerformanceProps {
    indexerName: any;
    performance: any;
}

const App = (props: InvestmentPerformanceProps) => {
    const customToolTip = (pointInfo: any) => {
        const period: string = pointInfo.point.data.period
        const series: string = pointInfo.points.map(
            (p: { seriesName: any; valueText: any; }) =>
                `${p.seriesName}: ${parseFloat(p.valueText).toFixed(2)}%`
        ).join('<br/>')

        const formattedString = `Período ${period}<br/>${series}`
        return {
            text: formattedString,
        };
    }

    return (
        <Line
            id={'investment_performance_chart'}
            data={props.performance?.data}
            series={props.performance?.series}
            argumentField={'period'}
            title={"Evolução do investimento"}
            subtitle={`Evolução, em %, dos investimentos comparados ao ${props.indexerName}`}
            type={'spline'}
            toolTip={
                {
                    enabled: true,
                    shared: true,
                    customizeTooltip: customToolTip
                }
            }
        />
    )
}

export default App;