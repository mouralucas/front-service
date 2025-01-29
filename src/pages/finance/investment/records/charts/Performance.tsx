import Line from "../../../../../components/chart/Line.tsx"

// Import this css to test tooltip style
import '../../../../../assets/core/components/tooltip.css'

interface InvestmentPerformanceProps {
    indexerName: any;
    performance: any;
}

const App = (props: InvestmentPerformanceProps) => {
    const testTooltip = (pointInfo: any) => {
        return <div className="state-tooltip">
            <div className="state-tooltip">
                {pointInfo.points.map((p: { seriesName: string; valueText: string; }) => (
                    <div key={p.seriesName}>
                        <strong>{p.seriesName}</strong>
                        <br/>
                        {`${parseFloat(p.valueText).toFixed(2)}%`}
                        <br/>
                    </div>
                ))}
            </div>
        </div>;
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
                    zIndex: 3,
                    // customizeTooltip: customToolTip
                    contentRender: testTooltip
                }
            }
        />
    )
}

export default App;