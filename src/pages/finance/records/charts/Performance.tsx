import Line from "../../../../components/chart/Line"

interface InvestmentPerformanceProps {
    performance: any;
}

const App = (props: InvestmentPerformanceProps) => {
    return (
        <Line
            id={'investment_performance_chart'}
            data={props.performance?.data}
            series={props.performance?.series}
            argumentField={'period'}
            title={"Evolução do investimento"}
            subtitle={"Evolução, em %, dos investimentos comparados ao CDI"}
            type={'spline'}
        />
    )
}

export default App;