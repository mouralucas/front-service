import {DataGridColumn, DataGridToolBarItem} from "../../../../../assets/core/components/Interfaces.tsx";
import {useEffect, useState} from "react";
import DataGrid from "../../../../../components/table/DataGrid.tsx";
import Loader from "../../../../../components/Loader.tsx";
import {getFinanceData} from "../../../../../services/axios/Get.tsx";
import {URL_FINANCE_BRAZILIAN_FUND_INVESTMENT} from "../../../../../services/axios/ApiUrls.tsx";
import {BrazilianFundInvestment} from "../../../../../interfaces/Finance.tsx";
import {toast} from "react-toastify";
import {Button as Btn} from "devextreme-react/data-grid";
import BrazilianFundInvestmentModal from "../modals/BrazilianFundInvestment.tsx";
import Button from "devextreme-react/button";

interface BrazilianFundInvestmentResponse {
    success: boolean
    quantity: number
    investments: BrazilianFundInvestment[]
}

const BrazilianFundInvestmentTable = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)

    // Modal states
    const [modalInvestmentState, setModalInvestmentState] = useState<boolean>(false)

    const [brFundInvestments, setBrFundInvestments] = useState<BrazilianFundInvestment[]>([])

    useEffect(() => {
        getBrazilianFundInvestments();
    }, [])

    const showInvestmentModal = (e: any) => {
        alert(e);
        setModalInvestmentState(true);
    }

    const hideInvestmentModal = () => {
        setModalInvestmentState(false);
        getBrazilianFundInvestments()
    }

    const getBrazilianFundInvestments = () => {
        getFinanceData(URL_FINANCE_BRAZILIAN_FUND_INVESTMENT, {isSettled: false}).then((response: BrazilianFundInvestmentResponse) => {
            setBrFundInvestments(response.investments);
            setIsLoading(false);
        }).catch(() => {
            toast.error('Houve um erro aos buscar os investimentos em fundos');
            setIsLoading(false);
        })
    }

    const columns: DataGridColumn[] = [
        {
            dataField: "investmentId",
            caption: "Id",
            dataType: "string",
            width: 40,
            visible: false,
        },
        {
            dataField: 'fundName',
            caption: 'Fundo',
            groupIndex: 0,
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
            dataField: "amount",
            caption: "Investido",
            dataType: "currency",
            // calculateCellValue: amountCustomCell,
        },
        {
            dataField: "quantity",
            caption: "Numero de cotas",
            dataType: "string",
        },
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
                // <Btn
                //     key={3}
                //     icon={'percent'}
                //     hint={'Adicionar extrato'}
                //     onClick={showInvestmentStatementModal}
                // />,
                // <Btn
                //     key={5}
                //     icon="info"
                //     hint='Evolução'
                //     onClick={showInvestmentPerformanceModal}
                // />,
            ]
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
            child: <Button icon='refresh' onClick={getBrazilianFundInvestments}/>,
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
                    data={brFundInvestments}
                    columns={columns}
                    toolBar={{
                        visible: true,
                        items: toolBarItems
                    }}
                />
            }
            <BrazilianFundInvestmentModal modalState={modalInvestmentState} hideModal={hideInvestmentModal} brazilianFundInvestment={null}/>
        </>
    )
}

export default BrazilianFundInvestmentTable;