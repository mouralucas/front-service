import {ReactElement, useEffect, useState} from "react";
import DataGrid from "../../../../../components/table/DataGrid.tsx";
import {DataGridColumn} from "../../../../../assets/core/components/Interfaces.tsx";
import {InvestmentObjective} from "../../../../../interfaces/Finance.tsx";
import {getInvestmentObjectives} from "../../../../../services/getCommonData/Finance.tsx";


const App = (): ReactElement => {
    const [objectives, setObjectives] = useState<InvestmentObjective[]>([])

    const fetchObjectivesDate = async () => {
        setObjectives(await getInvestmentObjectives(false))
    }

    useEffect(() => {
        fetchObjectivesDate().then()
    }, [])

    const columns: DataGridColumn[] = [
        {
            dataField: "objectiveId",
            caption: "Id",
            dataType: "string",
            width: 40,
            visible: false
        },
        {
            dataField: "title",
            caption: "Nome",
            dataType: "string",
        },
        {
            dataField: "description",
            caption: "Descrição",
            dataType: 'string',
        },
        {
            dataField: "amount",
            caption: "Valor",
            dataType: "number",
        },
        {
            dataField: "estimatedDeadline",
            caption: "Prazo",
            dataType: "date",
        }
    ]

    return (
        <DataGrid
            keyExpr={'objectiveId'}
            data={objectives}
            columns={columns}
        />
    )
}

export default App;