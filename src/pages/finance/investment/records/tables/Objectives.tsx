import {ReactElement, useEffect, useState} from "react";
import DataGrid from "../../../../../components/table/DataGrid.tsx";
import {DataGridColumn, DataGridToolBarItem} from "../../../../../assets/core/components/Interfaces.tsx";
import {InvestmentObjective} from "../../../../../interfaces/Finance.tsx";
import {getInvestmentObjectives} from "../../../../../services/getCommonData/Finance";
import ObjectiveModal from '../modals/Objectives'
import Button from "devextreme-react/button";


const App = (): ReactElement => {
    const [modalObjectivesState, setModalObjectivesState] = useState<boolean>(false)

    const [objectives, setObjectives] = useState<InvestmentObjective[]>([])
    const [selectedObjective, setSelectedObjective] = useState<InvestmentObjective | undefined>()

    const fetchObjectivesData = async () => {
        setObjectives(await getInvestmentObjectives(false))
    }

    const showObjectiveModal = (e: any) => {
        if (typeof e.row != "undefined") {
            setSelectedObjective(e.row.data);
        }

        setModalObjectivesState(true)
    }

    const hideObjectiveModal = () => {
        setSelectedObjective(undefined);
        setModalObjectivesState(false)
        fetchObjectivesData().then();
    }

    useEffect(() => {
        fetchObjectivesData().then()
    }, [])


    const amountCustomCell = (cellInfo: any) => {
        const currentSymbol: string = "R$ ";
        const grossAmount: string = parseFloat(cellInfo.amount).toFixed(2);
        const formated_string: string = `${currentSymbol} ${grossAmount}`
        return formated_string;
    }

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
            calculateCellValue: amountCustomCell
        },
        {
            dataField: "estimatedDeadline",
            caption: "Prazo",
            dataType: "date",
        }
    ]

    const toolBarItems: DataGridToolBarItem[] = [
        {
            name: 'columnChooserButton',
            location: 'after',
        },
        {
            name: 'exportButton',
            location: 'after',
        },
        {
            child: <Button icon='refresh' onClick={fetchObjectivesData}/>,
            location: "after"
        },
        {
            child: <Button icon={'add'} onClick={showObjectiveModal}></Button>,
            location: "after"
        },
        {
            name: 'searchPanel',
            location: "after",
        },

    ]

    return (
        <>
            <DataGrid
                keyExpr={'objectiveId'}
                data={objectives}
                columns={columns}
                toolBar={
                    {
                        visible: true,
                        items: toolBarItems
                    }
                }
            />
            <ObjectiveModal modalState={modalObjectivesState} hideModal={hideObjectiveModal} objective={selectedObjective}/>
        </>
    )
}

export default App;