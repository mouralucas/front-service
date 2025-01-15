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
    custodianAllocation: InvestmentAllocation[]
}

const App = () => {
    const [typeAllocation, setTypeAllocation] = useState<InvestmentAllocation[]>([])
    const [categoryAllocation, setCategoryAllocation] = useState<InvestmentAllocation[]>([])
    const [custodianAllocation, setCustodianAllocation] = useState<InvestmentAllocation[]>([])


    const getAllocation = () => {
        getFinanceData(URL_FINANCE_INVESTMENT_ALLOCATION, {showMode: 'father'}).then((response: InvestmentAllocationResponse) => {
            setTypeAllocation(response.typeAllocation);
            setCategoryAllocation(response.categoryAllocation);
            setCustodianAllocation(response.custodianAllocation);
        }).catch((err: string | ToastOptions) => {
            toast.error(`Houve um erro ao buscar os tipos de investimento ${err}`)
        })
    }

    useEffect(() => {
        getAllocation();
    }, []);

    return (
        <div className="row">
            <div className="col-4">
                <PieChart
                    data={typeAllocation}
                    title={"Tipo de renda"}
                    axis={{argumentField: 'name', valueField: 'total'}}
                    type={'doughnut'}
                    legend={
                        {
                            enabled: true,
                            orientation: 'horizontal',
                            verticalAlignment: 'bottom',
                            horizontalAlignment: 'left',
                        }
                    }
                    tooltip={
                        {
                            enabled: true,
                        }
                    }
                />
            </div>
            <div className="col-4">
                <PieChart
                    data={categoryAllocation}
                    title={"Tipo de investimento"}
                    axis={{argumentField: 'name', valueField: 'total'}}
                    type={'doughnut'}
                    legend={
                        {
                            enabled: true,
                            orientation: 'horizontal',
                            verticalAlignment: 'bottom',
                            horizontalAlignment: 'left',
                        }
                    }
                    tooltip={
                        {
                            enabled: true,
                        }
                    }
                />
            </div>
            <div className="col-4">
                <PieChart
                    data={custodianAllocation}
                    title={"Agente de custódia"}
                    axis={{argumentField: 'name', valueField: 'total'}}
                    type={'doughnut'}
                    legend={
                        {
                            enabled: true,
                            orientation: 'horizontal',
                            verticalAlignment: 'bottom',
                            horizontalAlignment: 'left',
                        }
                    }
                    tooltip={
                        {
                            enabled: true,
                        }
                    }
                />
            </div>
        </div>

    )
}

export default App;