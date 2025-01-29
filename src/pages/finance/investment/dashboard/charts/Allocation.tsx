import {useEffect, useState} from "react";
import PieChart from "../../../../../components/chart/Pie.tsx"
import {getFinanceData} from "../../../../../services/axios/Get.tsx";
import {URL_FINANCE_INVESTMENT_ALLOCATION} from "../../../../../services/axios/ApiUrls.tsx";
import {toast, ToastOptions} from "react-toastify";
import {InvestmentAllocation} from "../../../../../interfaces/Finance.tsx";

interface InvestmentAllocationResponse {
    success: boolean
    message?: string
    typeAllocation: InvestmentAllocation[]
    categoryAllocation: InvestmentAllocation[]
    custodianAllocation: InvestmentAllocation[]
    objectiveAllocation: InvestmentAllocation[]
}

const App = () => {
    const [typeAllocation, setTypeAllocation] = useState<InvestmentAllocation[]>([])
    const [categoryAllocation, setCategoryAllocation] = useState<InvestmentAllocation[]>([])
    const [custodianAllocation, setCustodianAllocation] = useState<InvestmentAllocation[]>([])
    const [objectivesAllocation, setObjectivesAllocation] = useState<InvestmentAllocation[]>([])


    const getAllocation = () => {
        getFinanceData(URL_FINANCE_INVESTMENT_ALLOCATION, {showMode: 'father'}).then((response: InvestmentAllocationResponse) => {
            setTypeAllocation(response.typeAllocation);
            setCategoryAllocation(response.categoryAllocation);
            setCustodianAllocation(response.custodianAllocation);
            setObjectivesAllocation(response.objectiveAllocation);
        }).catch((err: string | ToastOptions) => {
            toast.error(`Houve um erro ao buscar os tipos de investimento ${err}`)
        })
    }

    useEffect(() => {
        getAllocation();
    }, []);

    return (
        <>
            <div className="row">
                <div className="col-6">
                    <PieChart
                        data={typeAllocation}
                        title={"Tipo de renda"}
                        axis={{argumentField: 'name', valueField: 'total'}}
                        type={'doughnut'}
                        legend={
                            {
                                visible: true,
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
                <div className="col-6">
                    <PieChart
                        data={categoryAllocation}
                        title={"Tipo de investimento"}
                        axis={{argumentField: 'name', valueField: 'total'}}
                        type={'doughnut'}
                        legend={
                            {
                                visible: true,
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
            <div className="row">
                <div className="col-6">
                    <PieChart
                        data={custodianAllocation}
                        title={"Agente de custódia"}
                        axis={{argumentField: 'name', valueField: 'total'}}
                        type={'doughnut'}
                        legend={
                            {
                                visible: true,
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
                <div className="col-6">
                    <PieChart
                        data={objectivesAllocation}
                        title={"Objetivos"}
                        axis={{argumentField: 'name', valueField: 'total'}}
                        type={'doughnut'}
                        legend={
                            {
                                visible: true,
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
        </>
    )
}

export default App;