import {useEffect, useState} from "react";
import {URL_CREDIT_CARD_TRANSACTION} from "../../../../services/axios/ApiUrls";
import DataGrid from "../../../../components/table/DataGrid";
import {Button as Btn,} from 'devextreme-react/data-grid';
import Button from "devextreme-react/button";
import TransactionModal from '../modals/CreditCardTransaction'
import UpdateTransactionModal from '../modals/CreditCardTransactionUpdate'
import {toast} from "react-toastify";
import {DataGridColumn, DataGridToolBarItem} from "../../../../assets/core/components/Interfaces";
import {getFinanceData} from "../../../../services/axios/Get";
import {CreditCardTransaction, UpdateCreditCardTransaction} from "../../../../interfaces/Finance.tsx";
import Loader from '../../../../components/Loader'

interface TransactionResponse {
    success: boolean
    quantity: number
    transactions: CreditCardTransaction[]
}

const App = () => {
    const [creditCardTransaction, setCreditCardTransaction] = useState<CreditCardTransaction[]>();
    const [selectedCreditCardTransaction, setSelectedCreditCardTransaction] = useState<UpdateCreditCardTransaction | undefined>(undefined)
    const [transactionModalState, setTransactionModalState] = useState<boolean>(false)
    const [updateTransactionModalState, setUpdateTransactionModalState] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const showTransactionModal = () => {
        setTransactionModalState(true);
    }

    const hideTransactionModal = () => {
        setTransactionModalState(false);
        getTransactions();
    }

    const showUpdateTransactionModal = (e: any) => {
        console.log(e);
        if (typeof e.row !== 'undefined') {
            setSelectedCreditCardTransaction(e.row.data);
            setUpdateTransactionModalState(true);
        }
    }

    const hideUpdateTransactionModal = () => {
        setUpdateTransactionModalState(false);
        getTransactions();
    }

    const getTransactions = () => {
        setIsLoading(true);
        getFinanceData(URL_CREDIT_CARD_TRANSACTION, {
            startPeriod: 202401,
            endPeriod: 202506
        }).then((response: TransactionResponse) => {
            setCreditCardTransaction(response.transactions);
            setIsLoading(false);
        }).catch(response => {
            toast.error("Erro ao buscar transações")
            setIsLoading(false);
            return {'error': response}
        })
    }

    useEffect(() => {
        getTransactions();
    }, []);

    /**
     * Custom function to show the installments in the table it shows the current installment and the total in the format xx/xx
     * @param cellInfo
     * @returns the installments in xx/xx format
     */
    function installmentCustomCell(cellInfo: any) {
        return cellInfo.currentInstallment + '/' + cellInfo.installments;
    }

    function amountCustomCell(cellInfo: any) {
        const formattedAmount = cellInfo.amount.toFixed(2)

        return cellInfo.currencySymbol + ' ' + formattedAmount;
    }

    const coffeeCommand = () => {
        toast('☕ Cafezinho delícia!');
    }

    const columns: DataGridColumn[] = [
        {
            dataField: "transactionId",
            caption: "Id",
            dataType: "number",
            visible: false,
            width: 70
        },
        {
            dataField: "period",
            caption: "Período",
            dataType: "string",
            visible: false,
        },
        {
            dataField: "creditCardId",
            visible: false
        },
        {
            dataField: "creditCardNickname",
            caption: "Cartão",
            dataType: "string",
            width: 150,
        },
        {
            dataField: "transactionDate",
            caption: "Compra",
            dataType: "date",
            format: 'dd/MM/yyyy',
            width: 150,
        },
        {
            dataField: "dueDate",
            caption: "Pagamento",
            dataType: "date",
            format: 'dd/MM/yyyy',
            width: 150,
        },
        {
            dataField: "amount",
            caption: "Valor",
            dataType: "currency",
            calculateCellValue: amountCustomCell,
            alignment: 'justify',
            width: 110,
        },
        {
            dataField: "installment",
            caption: "Parcela",
            dataType: "string",
            calculateCellValue: installmentCustomCell,
            width: 100,
        },
        {
            dataField: "description",
            caption: "Descrição",
            dataType: "string",
        },
        {
            dataField: "categoryName",
            caption: "Categoria",
            dataType: "string",
        },
        {
            caption: 'Ações',
            type: 'buttons',
            width: 110,
            child: [
                <Btn
                    key={1}
                    text="Editar"
                    // icon="/url/to/my/icon.ico"
                    icon="edit"
                    hint="Editar"
                    onClick={showUpdateTransactionModal}
                />,
                <Btn
                    key={2}
                    //icon="/url/to/my/icon.ico"
                    icon="coffee"
                    hint="Coffee"
                    onClick={coffeeCommand}
                />
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
            child: <Button icon={'refresh'} onClick={getTransactions}/>,
            location: "after"
        },
        {
            child: <Button icon={'add'} onClick={showTransactionModal}></Button>,
            location: "after"
        },
        {
            name: 'searchPanel',
            location: "after",
        },

    ]

    return (
        <>
            {isLoading ?
                (<Loader/>)
                :
                <DataGrid
                    keyExpr={'transactionId'}
                    columns={columns}
                    data={creditCardTransaction}
                    toolBar={{
                        visible: true,
                        items: toolBarItems
                    }}
                    showLoadPanel={false}
                    searchPanel={{
                        visible: true
                    }}
                />
            }
            <TransactionModal modalState={transactionModalState} hideModal={hideTransactionModal}/>
            <UpdateTransactionModal modalState={updateTransactionModalState} hideModal={hideUpdateTransactionModal} creditCardTransaction={selectedCreditCardTransaction}/>
        </>
    );
}

export default App;