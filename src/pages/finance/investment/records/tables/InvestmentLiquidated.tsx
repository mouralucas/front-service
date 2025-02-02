import {FC, ReactElement, useEffect, useState} from "react";
import DataGrid from "../../../../../components/table/DataGrid";
import {Button as Btn} from "devextreme-react/data-grid";
import {DataGridColumn, DataGridToolBarItem} from "../../../../../assets/core/components/Interfaces.tsx";
import {getFinanceData} from "../../../../../services/axios/Get.tsx";
import {URL_FINANCE_INVESTMENT} from "../../../../../services/axios/ApiUrls.tsx";
import {Investment} from "../../../../../interfaces/Finance.tsx";
import Button from "devextreme-react/button";
import ModalInvestmentPerformance from '../modals/Performance.tsx'
import Loader from "../../../../../components/Loader.tsx";
import {toast} from "react-toastify";

interface InvestmentResponse {
    success: boolean
    quantity: number
    investments: Investment[]
}

const App: FC = (): ReactElement => {
    const [modalInvestmentPerformanceState, setModalInvestmentPerformanceState] = useState<boolean>(false)

    const [investmentId, setInvestmentId] = useState<string>('')
    const [investmentName, setInvestmentName] = useState<string>('')
    const [investments, setInvestments] = useState<Investment[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const showInvestmentPerformanceModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setInvestmentId(e.row.data.investmentId);
            setInvestmentName(e.row.data.name);
            setModalInvestmentPerformanceState(true);
        }

    }

    const hideInvestmentPerformanceModal = () => {
        setModalInvestmentPerformanceState(false);
        setInvestmentId('');
        setInvestmentName('');
    }

    useEffect(() => {
        getInvestment();
    }, [])

    const getInvestment = () => {
        setIsLoading(true);
        getFinanceData(URL_FINANCE_INVESTMENT, {isLiquidated: true}).then((response: InvestmentResponse) => {
            setInvestments(response.investments);
            setIsLoading(false);
        }).catch(() => {
            toast.error('Houve um erro ao buscar os investimentos')
            setIsLoading(false);
        })
    }

    function amountCustomCell(cellInfo: any) {
        const amount: string = parseFloat(cellInfo.liquidationAmount).toFixed(2);
        const formated_string: string = `${cellInfo.currencySymbol} ${amount}`
        return formated_string;
    }

    const columns: DataGridColumn[] = [
        {
            dataField: "investmentId",
            caption: "Id",
            dataType: "string",
            width: 40,
            visible: false
        },
        {
            dataField: "name",
            caption: "Nome",
            dataType: "string",
            alignment: 'left',
            width: 250,
        },
        {
            dataField: "maturityDate",
            caption: "Vencimento",
            dataType: "date",
            format: 'dd/MM/yyyy',
            width: 100
        },
        {
            dataField: 'liquidationDate',
            caption: 'Liquidado em',
            dataType: "date",
            format: 'dd/MM/yyyy'
        },
        {
            dataField: "liquidationAmount",
            caption: "Valor liquidado",
            dataType: "currency",
            calculateCellValue: amountCustomCell,
        },
        {
            dataField: 'contractedRate',
            caption: 'Taxa',
            dataType: 'string'
        },
        {
            dataField: 'custodianName',
            caption: 'Agente de custódia',
            dataType: "string",
            visible: false
        },
        {
            caption: 'Ações',
            type: 'buttons',
            width: 150,
            child: [
                <Btn
                    key={5}
                    icon="info"
                    hint='Evolução'
                    onClick={showInvestmentPerformanceModal}
                />,
            ]
        }
    ]

    const toolBarItems: DataGridToolBarItem[] = [
        {
            name: 'exportButton',
            location: 'after',
        },
        {
            child: <Button icon='refresh' onClick={getInvestment}/>,
            location: "after"
        },
        {
            name: 'searchPanel',
            location: "after",
        },

    ]

    return (
        <>
            {isLoading ? <Loader/> :
                <DataGrid
                    keyExpr={'investmentId'}
                    data={investments}
                    columns={columns}
                    toolBar={{
                        visible: true,
                        items: toolBarItems
                    }}
                />
            }
            <ModalInvestmentPerformance modalState={modalInvestmentPerformanceState} hideModal={hideInvestmentPerformanceModal} investmentId={investmentId} investmentName={investmentName}/>
        </>
    )
}

export default App;