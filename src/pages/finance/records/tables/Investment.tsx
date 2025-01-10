import {ReactElement, FC, useState, useEffect} from "react";
import DataGrid from "../../../../components/table/DataGrid";
import {Button as Btn} from "devextreme-react/data-grid";
import {DataGridColumn} from "../../../../assets/core/components/Interfaces.tsx";
import {getFinanceData} from "../../../../services/axios/Get.tsx";
import {URL_FINANCE_INVESTMENT} from "../../../../services/axios/ApiUrls.tsx";
import {Investment} from "../../../../interfaces/Finance.tsx";
import Button from "devextreme-react/button";
import ModalInvestment from '../modals/Investment'
import ModalInvestmentStatement from '../modals/InvestmentStatement'
import {toast} from "react-toastify";

interface InvestmentResponse {
    success: boolean
    quantity: number
    investments: Investment[]
}

const App: FC = (): ReactElement => {
    const [modalInvestmentState, setModalInvestmentState] = useState<boolean>(false)
    const [modalInvestmentStatementState, setModalInvestmentStatementState] = useState<boolean>(false)
    const [selectedInvestment, setSelectedInvestment] = useState<Investment | undefined>()
    const [investments, setInvestments] = useState<Investment[]>([])

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

    const hideInvestmentModal = () => {
        setModalInvestmentState(false);
        setSelectedInvestment(undefined);
        getInvestment();
    }

    const hideInvestmentStatementModal = () => {
        setModalInvestmentStatementState(false);
        setSelectedInvestment(undefined);
    }

    useEffect(() => {
        getInvestment();
    }, [])

    const getInvestment = () => {
        getFinanceData(URL_FINANCE_INVESTMENT).then((response: InvestmentResponse) => {
            setInvestments(response.investments);
        }).catch(err => {
            console.log(err);
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

    const coffeeCommand = () => {
        toast('☕ Cafezinho delícia!');
    }

    const columns: DataGridColumn[] = [
        {
            dataField: "investmentId",
            caption: "Id",
            dataType: "string",
            width: 70,
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
            width: 400,
        },
        {
            dataField: "transactionDate",
            caption: "Data",
            dataType: "date",
            format: 'dd/MM/yyyy',
            width: 130
        },
        {
            dataField: "maturityDate",
            caption: "Vencimento",
            dataType: "date",
            format: 'dd/MM/yyyy',
            width: 130
        },
        {
            dataField: "amount",
            caption: "Valor",
            dataType: "currency",
            calculateCellValue: amountCustomCell,
            width: 200
        },
        {
            dataField: "grossAmount",
            caption: 'Atual',
            dataType: "currency",
            calculateCellValue: grossAmountCustomCell,
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
            width: 130,
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
                    //icon="/url/to/my/icon.ico"
                    icon="coffee"
                    hint="Coffee"
                    onClick={coffeeCommand}
                />,
                <Btn
                    key={3}
                    icon="money"
                    hint={"Liquidar"}
                />,
                <Btn
                    key={4}
                    icon={'percent'}
                    hint={'Adicionar extrato'}
                    onClick={showInvestmentStatementModal}
                />
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
            <DataGrid
                keyExpr={'investmentId'}
                data={investments}
                columns={columns}
                toolBar={{
                    visible: true,
                    items: toolBarItems
                }}
            />
            <ModalInvestment modalState={modalInvestmentState} hideModal={hideInvestmentModal} investment={selectedInvestment}/>
            <ModalInvestmentStatement modalState={modalInvestmentStatementState} hideModal={hideInvestmentStatementModal} investment={selectedInvestment} />
        </>
    )
}

export default App;