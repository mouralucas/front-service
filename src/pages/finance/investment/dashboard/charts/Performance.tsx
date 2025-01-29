import {useEffect, useState} from "react";
import Line from "../../../../../components/chart/Line.tsx"
import {getFinanceData} from "../../../../../services/axios/Get.tsx";
import {URL_FINANCE_INVESTMENT_PERFORMANCE} from "../../../../../services/axios/ApiUrls.tsx";
import {toast, ToastOptions} from "react-toastify";
import {GetInvestmentPerformanceResponse} from "../../../../../interfaces/FinanceRequest.tsx";

const App = () => {
    const [performance, setPerformance] = useState<any>([])

    useEffect(() => {
        getPerformanceData();
    }, []);

    const getPerformanceData = () => {
        getFinanceData(URL_FINANCE_INVESTMENT_PERFORMANCE, {
            periodRange: 12,
        }).then((response: GetInvestmentPerformanceResponse) => {
            setPerformance(response);
        }).catch((err: string | ToastOptions) => {
            toast.error(`Houve um erro ao buscar a performance dos investimentos ${err}`)
        })
    }

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
            data={performance?.data}
            series={performance?.series}
            argumentField={'period'}
            title={"Evolução do investimento"}
            subtitle={"Evolução, em %, dos investimentos comparados ao CDI"}
            type={'spline'}
            toolTip={
            {
                enabled: true,
                shared: true,
                customizeTooltip: customToolTip,
            }
            }
        />
    )
}

export default App;