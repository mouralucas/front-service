import {useEffect, useState} from "react";
import PieChart from "../../../../components/chart/Pie"
import {getFinanceData} from "../../../../services/axios/Get";
import {URL_FINANCE_INVESTMENT_ALLOCATION} from "../../../../services/axios/ApiUrls";
import {toast, ToastOptions} from "react-toastify";
import {InvestmentAllocation} from "../../../../interfaces/Finance.tsx";

interface InvestmentAllocationResponse {
    success: boolean
    message?: string
    typeAllocation: InvestmentAllocation[]
    categoryAllocation: InvestmentAllocation[]
}

const App = () => {
    const [incomingAllocation, setIncomingAllocation] = useState<InvestmentAllocation[]>([])
    const [investmentAllocation, setInvestmentAllocation] = useState<InvestmentAllocation[]>([])


    const getAllocation = () => {
        getFinanceData(URL_FINANCE_INVESTMENT_ALLOCATION, {showMode: 'father'}).then((response: InvestmentAllocationResponse) => {
            setIncomingAllocation(response.typeAllocation);
            setInvestmentAllocation(response.categoryAllocation);
        }).catch((err: string | ToastOptions) => {
            toast.error(`Houve um erro ao buscar os tipos de investimento ${err}`)
        })
    }

    useEffect(() => {
        getAllocation();
    }, []);

    return (
        <div className="row">
            <div className="col-6">
                <PieChart
                    data={incomingAllocation}
                    title={"Alocação por tipo de renda"}
                    axis={{argumentField: 'name', valueField: 'total'}}
                    type={'doughnut'}
                    legend={
                        {
                            show: true,
                            orientation: 'vertical',
                            verticalAlignment: 'bottom',
                            horizontalAlignment: 'left',
                        }
                    }
                    tooltip={
                        {
                            show: true,
                        }
                    }
                />
            </div>
            <div className="col-6">
                <PieChart
                    data={investmentAllocation}
                    title={"Alocação por tipo de investimento"}
                    axis={{argumentField: 'name', valueField: 'total'}}
                    type={'doughnut'}
                    legend={
                        {
                            show: true,
                            orientation: 'vertical',
                            verticalAlignment: 'bottom',
                            horizontalAlignment: 'left',
                        }
                    }
                    tooltip={
                        {
                            show: true,
                        }
                    }
                />
            </div>
        </div>
    )
}

export default App;