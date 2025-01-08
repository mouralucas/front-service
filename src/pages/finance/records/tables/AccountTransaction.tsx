import {useEffect, useState} from "react";
import {URL_FINANCE_ACCOUNT_TRANSACTION} from "../../../../services/axios/ApiUrls";
import DataGrid from "../../../../components/table/DataGrid";
import Button from "devextreme-react/button";
import {Button as Btn} from "devextreme-react/data-grid";
import {toast} from "react-toastify";
import { AccountTransaction } from "../../../../interfaces/Finance";
import {getFinanceData} from "../../../../services/axios/Get.tsx";
import {DataGridColumn} from "../../../../assets/core/components/Interfaces.tsx";
import ModalStatement from '../modals/AccountTransaction.tsx'

interface TransactionResponse {
    quantity: number
    transactions: AccountTransaction[]
}

const App = () => {
    const [transaction, setTransaction] = useState<AccountTransaction[] | null>();
    const [selectedTransaction, setSelectedTransaction] = useState<AccountTransaction | null>()
    const [modalState, setModalState] = useState<boolean>(false)

    const showModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setSelectedTransaction(e.row.data);
        } else {
            setSelectedTransaction(null);
        }
        setModalState(true);
    }

    const hideModal = () => {
        setModalState(false);
        getStatements();
    }

    const getStatements = () => {
        getFinanceData(URL_FINANCE_ACCOUNT_TRANSACTION, {
            startPeriod: 202401,
            endPeriod: 202412
        }).then((response: TransactionResponse) => {
                setTransaction(response?.transactions);
            }
        ).catch(err => {
            toast.error('Houve um erro ao buscar extratos: ' + err)
        })
    }

    function amountCustomCell(cellInfo: any) {
        const formattedAmount = cellInfo.amount.toFixed(2)

        return cellInfo.currencySymbol + ' ' + formattedAmount;
    }

    useEffect(() => {
        getStatements();
    }, []);

    const coffeeCommand = (e: any) => {
        console.log(e)
        toast('🦄 Cafezinho delícia!');
    }

    const columns: DataGridColumn[] = [
        {
            dataField: "transactionId",
            caption: "Id",
            dataType: "number",
            visible: false,
        },
        {
            dataField: "accountNickname",
            caption: "Conta",
            dataType: "string",
        },
        {
            dataField: "transactionDate",
            caption: "Compra",
            dataType: "date",
            format: 'dd/MM/yyyy',
            width: 150,
        },
        {
            dataField: "amount",
            caption: "Valor",
            dataType: "currency",
            width: 110,
            alignment: 'justify',
            calculateCellValue: amountCustomCell,
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
                    onClick={showModal}
                />,
                <Btn
                    // text="My Command"
                    // // icon="/url/to/my/icon.ico"
                    icon="coffee"
                    hint="Coffee"
                    onClick={coffeeCommand}
                />
            ]
        }
    ]

    let toolBarItems = [
        {
            name: 'columnChooserButton',
            location: 'after',
        },
        {
            name: 'exportButton',
            location: 'after',
        },
        {
            child: <Button icon='refresh' onClick={getStatements}/>,
            location: "after"
        },
        {
            child: <Button icon={'add'} onClick={showModal}></Button>,
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
                keyExpr={'transactionId'}
                columns={columns}
                data={transaction}
                toolBar={{
                    visible: true,
                    items: toolBarItems
                }}
                showLoadPanel={false}
                searchPanel={{
                    visible: true
                }}
            />
            <ModalStatement modalState={modalState} hideModal={hideModal} transaction={selectedTransaction}/>
        </>
    );
}

export default App;