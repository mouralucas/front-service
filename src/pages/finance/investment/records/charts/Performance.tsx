import Line from "../../../../../components/chart/Line.tsx";

// Import this css to test tooltip style
import { useEffect, useState } from "react";
import { toast, ToastOptions } from "react-toastify";
import '../../../../../assets/core/components/tooltip.css';
import Loader from "../../../../../components/Loader.tsx";
import { GetInvestmentPerformanceResponse } from "../../../../../interfaces/FinanceRequest.tsx";
import { URL_FINANCE_INVESTMENT_PERFORMANCE } from "../../../../../services/axios/ApiUrls.tsx";
import { getFinanceData } from "../../../../../services/axios/Get.tsx";

interface InvestmentPerformanceProps {
    investmentId: string;
}

const App = (props: InvestmentPerformanceProps) => {
    const [indexerName, setIndexerName] = useState<string>()
    const [performance, setPerformance] = useState<any>([])

    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        if (props.investmentId) {
            getPerformanceData();
        }
    }, [props.investmentId]);

    const getPerformanceData = () => {
        setIsLoading(true);

        getFinanceData(URL_FINANCE_INVESTMENT_PERFORMANCE, {
            periodRange: 60,
            investmentId: props.investmentId,
        }).then((response: GetInvestmentPerformanceResponse) => {
            setPerformance(response);
            setIndexerName(response.indexerName);
            setIsLoading(false);
        }).catch((err: string | ToastOptions) => {
            toast.error(`Houve um erro ao buscar a performance dos investimentos ${err}`)
            setIsLoading(false);
        })
    }


    return (
        <>
            {isLoading ?
                <Loader/>
                :
                <Line 
                    series={performance?.data || []}
                    xLabels={performance?.xLabel}
                    title="Evolução do investimento"
                    subtitle={`Evolução, em %, dos investimentos comparados ao ${indexerName}`}
                />
            }
        </>
    )
}

export default App;