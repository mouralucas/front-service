import {FC, ReactElement, useEffect, useState} from "react";
import DataGrid from "../../../../components/table/DataGrid";
import {Button as Btn} from "devextreme-react/data-grid";
import {DataGridColumn} from "../../../../assets/core/components/Interfaces.tsx";
import {getFinanceData} from "../../../../services/axios/Get.tsx";
import {URL_FINANCE_INVESTMENT} from "../../../../services/axios/ApiUrls.tsx";
import {Investment} from "../../../../interfaces/Finance.tsx";
import Button from "devextreme-react/button";
import ModalInvestment from '../modals/Investment'
import ModalInvestmentStatement from '../modals/InvestmentStatement'
import ModalInvestmentPerformance from '../modals/InvestmentPerformance'
import Loader from "../../../../components/Loader.tsx";
import {toast} from "react-toastify";

interface InvestmentResponse {
    success: boolean
    quantity: number
    investments: Investment[]
}

const App: FC = (): ReactElement => {
    const [modalInvestmentState, setModalInvestmentState] = useState<boolean>(false)
    const [modalInvestmentStatementState, setModalInvestmentStatementState] = useState<boolean>(false)
    const [modalInvestmentPerformanceState, setModalInvestmentPerformanceState] = useState<boolean>(false)

    const [investmentId, setInvestmentId] = useState<string>('')
    const [selectedInvestment, setSelectedInvestment] = useState<Investment | undefined>()
    const [investments, setInvestments] = useState<Investment[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(true)


    const showInvestmentModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setSelectedInvestment(e.row.data);
        }
        setModalInvestmentState(true);
    }

    const showInvestmentStatementModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setSelectedInvestment(e.row.data)
        }
        setModalInvestmentStatementState(true);
    }

    const showInvestmentPerformanceModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setInvestmentId(e.row.data.investmentId);
            setModalInvestmentPerformanceState(true);
        }

    }

    const hideInvestmentModal = () => {
        setModalInvestmentState(false);
        setSelectedInvestment(undefined);
        getInvestment();
    }

    const hideInvestmentStatementModal = () => {
        setModalInvestmentStatementState(false);
        setSelectedInvestment(undefined);
    }

    const hideInvestmentPerformanceModal = () => {
        setModalInvestmentPerformanceState(false);
        setInvestmentId('');
    }

    useEffect(() => {
        getInvestment();
    }, [])

    const getInvestment = () => {
        setIsLoading(true);
        getFinanceData(URL_FINANCE_INVESTMENT).then((response: InvestmentResponse) => {
            // TODO: add to common data
            setInvestments(response.investments);
            setIsLoading(false);
        }).catch(() => {
            toast.error('Houve um erro ao buscar os investimentos')
            setIsLoading(false);
        })
    }

    function amountCustomCell(cellInfo: any) {
        const amount: string = parseFloat(cellInfo.amount).toFixed(2);
        const formated_string: string = `${cellInfo.currencySymbol} ${amount}`
        return formated_string;
    }

    function grossAmountCustomCell(cellInfo: any) {
        const currentSymbol: string = cellInfo.currencySymbol;
        const grossAmount: string = parseFloat(cellInfo.grossAmount).toFixed(2);
        const percentageChange: string = parseFloat(cellInfo.percentageChange).toFixed(2);
        const formated_string: string = `${currentSymbol} ${grossAmount} (${percentageChange}%)`
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
            dataField: "period",
            caption: "Referência",
            dataType: "string",
            visible: false,
        },
        {
            dataField: "name",
            caption: "Nome",
            dataType: "string",
            alignment: 'left',
            width: 250,
        },
        {
            dataField: "transactionDate",
            caption: "Data",
            dataType: "date",
            format: 'dd/MM/yyyy',
            width: 100
        },
        {
            dataField: "maturityDate",
            caption: "Vencimento",
            dataType: "date",
            format: 'dd/MM/yyyy',
            width: 100
        },
        {
            dataField: "amount",
            caption: "Investido",
            dataType: "currency",
            calculateCellValue: amountCustomCell,
        },
        {
            dataField: "grossAmount",
            caption: 'Bruto',
            dataType: "currency",
            calculateCellValue: grossAmountCustomCell,
            width: 150,
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
        // TODO: try to change this column with a tooltip with the options
        {
            caption: 'Ações',
            type: 'buttons',
            width: 150,
            child: [
                <Btn
                    key={1}
                    text="Editar"
                    // icon="/url/to/my/icon.ico"
                    icon="edit"
                    hint="Editar"
                    onClick={showInvestmentModal}
                />,
                <Btn
                    key={2}
                    icon="money"
                    hint={"Liquidar"}
                />,
                <Btn
                    key={3}
                    icon={'percent'}
                    hint={'Adicionar extrato'}
                    onClick={showInvestmentStatementModal}
                />,
                <Btn
                    key={5}
                    icon="info"
                    hint='Evolução'
                    onClick={showInvestmentPerformanceModal}
                />,
            ]
        }
    ]

    const toolBarItems = [
        {
            name: 'columnChooserButton',
            location: 'after',
        },
        {
            name: 'exportButton',
            location: 'after',
        },
        {
            child: <Button icon='refresh' onClick={getInvestment}/>,
            location: "after"
        },
        {
            child: <Button icon={'add'} onClick={showInvestmentModal}></Button>,
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
            <ModalInvestment modalState={modalInvestmentState} hideModal={hideInvestmentModal} investment={selectedInvestment}/>
            <ModalInvestmentStatement modalState={modalInvestmentStatementState} hideModal={hideInvestmentStatementModal} investment={selectedInvestment}/>
            <ModalInvestmentPerformance modalState={modalInvestmentPerformanceState} hideModal={hideInvestmentPerformanceModal} investmentId={investmentId}/>
        </>
    )
}

export default App;