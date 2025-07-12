import { useEffect, useState } from "react";
import { URL_CREDIT_CARD_TRANSACTION } from "../../../../../services/axios/ApiUrls.tsx";
import DataGrid from "../../../../../components/table/DataGrid.tsx";
import { Button as Btn, } from 'devextreme-react/data-grid';
import Button from "devextreme-react/button";
import TransactionModal from '../modals/CreditCardTransaction.tsx'
import UpdateTransactionModal from '../modals/CreditCardTransactionUpdate.tsx'
import { toast } from "react-toastify";
import { DataGridColumn, DataGridToolBarItem } from "../../../../../assets/core/components/Interfaces.tsx";
import { getFinanceData } from "../../../../../services/axios/Get.tsx";
import { CreditCardTransaction, UpdateCreditCardTransaction } from "../../../../../interfaces/Finance.tsx";
import Loader from '../../../../../components/Loader.tsx'
import { getLastPeriods, getPeriodFromDate } from "../../../../../utils/datetime.tsx";
import DatePicker from "react-datepicker";
import { ptBR } from 'date-fns/locale';

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

    const [dateRange, setDateRange] = useState<any>([]);
    const [startDate, endDate] = dateRange;

    useEffect(() => {
        setDateRange(getLastPeriods());
        updateDateRange(getLastPeriods())
    }, []);


    const updateDateRange = (dates: any) => {
        if (dates[1] !== null) {
            getTransactions(getPeriodFromDate(dates[0]), getPeriodFromDate(dates[1]));
        }
    }

    const getTransactions = (startAt: number, endAt: number) => {
        setIsLoading(true);

        getFinanceData(URL_CREDIT_CARD_TRANSACTION, {
            startPeriod: startAt,
            endPeriod: endAt
        }).then((response: TransactionResponse) => {
            setCreditCardTransaction(response.transactions);
            setIsLoading(false);
        }).catch(response => {
            toast.error("Erro ao buscar transações")
            setIsLoading(false);
            return { 'error': response }
        })
    }

    const showTransactionModal = () => {
        setTransactionModalState(true);
    }

    const hideTransactionModal = () => {
        setTransactionModalState(false);
        updateDateRange(getLastPeriods());
    }


    const showUpdateTransactionModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setSelectedCreditCardTransaction(e.row.data);
            setUpdateTransactionModalState(true);
        }
    }

    const hideUpdateTransactionModal = () => {
        setUpdateTransactionModalState(false);
        updateDateRange(getLastPeriods());
    }

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
            child: <Button icon={'add'} onClick={showTransactionModal}></Button>,
            location: "after"
        },
        {
            name: 'exportButton',
            location: 'after',
        },
        {
            child: <DatePicker
                selectsRange={true}
                startDate={startDate}
                endDate={endDate}
                onChange={(update) => {
                    updateDateRange(update);
                    setDateRange(update);
                }}
                showMonthYearPicker
                dateFormat={'MMM/yyyy'}
                locale={ptBR}
                className={'form-control'}
            />
        },
        {
            name: 'searchPanel',
            location: "after",
        },

    ]

    return (
        <>
            {isLoading ?
                (<Loader />)
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
            <TransactionModal modalState={transactionModalState} hideModal={hideTransactionModal} />
            <UpdateTransactionModal modalState={updateTransactionModalState} hideModal={hideUpdateTransactionModal} creditCardTransaction={selectedCreditCardTransaction} />
        </>
    );
}

export default App;