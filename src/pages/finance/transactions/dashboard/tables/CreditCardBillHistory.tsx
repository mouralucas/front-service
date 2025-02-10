import {ReactElement, useEffect, useState} from "react";
import DataGrid from "../../../../../components/table/DataGrid";
import {DataGridColumn} from "../../../../../assets/core/components/Interfaces.tsx";
import {getFinanceData} from "../../../../../services/axios/Get.tsx";
import {URL_FINANCE_CREDIT_CARD_BILL_HISTORY} from "../../../../../services/axios/ApiUrls.tsx";
import {toast} from "react-toastify";
import {GetCreditCardBillHistoryResponse} from "../../../../../interfaces/FinanceRequest.tsx";
import Loader from "../../../../../components/Loader.tsx";


const App = (): ReactElement => {
    const [creditCardBillHistory, setCreditCardBillHistory] = useState<any[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        getCreditCardBillHistory();
    }, [])

    const getCreditCardBillHistory = () => {
        setIsLoading(true);
        getFinanceData(URL_FINANCE_CREDIT_CARD_BILL_HISTORY, {
            startPeriod: 202401,
            endPeriod: 202412,
        }).then((response: GetCreditCardBillHistoryResponse) => {
            setCreditCardBillHistory(response.creditCardBillHistory);
            setIsLoading(false);
        }).catch(() => {
            toast.error('Houve um erro ao buscar histórico de faturas');
            setIsLoading(false);
        })
    }

    const cardCustomCell = (cellInfo: any): ReactElement => {
        return (
            <div>
                {cellInfo.data.creditCards.map((account: any, index: number) => (
                    <div key={index}>
                        <b>{account.nickname}</b>: {account.currency_symbol}{" "}
                        {account.total.toFixed(2)}
                    </div>
                ))}
            </div>
        )
    }

    const totalAmountCustomCell = (cellInfo: any) => {
        return (
            <div>
                {cellInfo.data.totalAmount.map((account: any, index: number) => (
                    <div key={index}>
                        {account.currency_symbol}{" "}{account.total.toFixed(2)}
                    </div>
                ))}
            </div>
        )
    }

    const columns: DataGridColumn[] = [
        {
            dataField: "period",
            caption: "Período",
            dataType: "string",
            width: 80,
        },
        {
            dataField: "totalAmount",
            caption: "Total",
            cellRender: totalAmountCustomCell,
            width: 110
        },
        {
            dataField: "creditCard",
            caption: "Total por cartão",
            cellRender: cardCustomCell,
        }
    ]


    return (
        <>
            {isLoading ? <Loader/> :
                <DataGrid
                    keyExpr={'id'}
                    data={creditCardBillHistory}
                    columns={columns}
                    wordWrapEnabled={true}
                    paging={
                        {
                            enabled: true,
                            pageSize: 12
                        }
                    }
                    pager={
                        {
                            visible: false
                        }
                    }
                />
            }
        </>
    )
}

export default App;