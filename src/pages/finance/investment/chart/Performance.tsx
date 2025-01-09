import {useEffect, useState} from "react";
import Line from "../../../../components/chart/Line"
import {getFinanceData} from "../../../../services/axios/Get";
import {URL_FINANCE_INVESTMENT_PERFORMANCE} from "../../../../services/axios/ApiUrls";
import {toast, ToastOptions} from "react-toastify";

const App = () => {
    const [performance, setPerformance] = useState<any>([])

    useEffect(() => {
        getPerformanceData();
    }, []);

    const getPerformanceData = () => {
        getFinanceData(URL_FINANCE_INVESTMENT_PERFORMANCE, {
            periodRange: 12,
        }).then((response: any) => {
            setPerformance(response);
        }).catch((err: string | ToastOptions) => {
            toast.error(`Houve um erro ao buscar a performance dos investimentos ${err}`)
        })
    }

    return (
        <Line
            id={'investment_profit_chart'}
            data={performance?.data}
            series={performance?.series}
            argumentField={'period'}
            title={"Evolução do investimento"}
            subtitle={"Evolução, em %, dos investimentos comparados ao CDI"}
            type={'spline'}
        />
    )
}

export default App;