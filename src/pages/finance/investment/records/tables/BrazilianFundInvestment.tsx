import {DataGridColumn} from "../../../../../assets/core/components/Interfaces.tsx";
import {useEffect, useState} from "react";
import DataGrid from "../../../../../components/table/DataGrid.tsx";
import Loader from "../../../../../components/Loader.tsx";
import {getFinanceData} from "../../../../../services/axios/Get.tsx";
import {URL_FINANCE_BRAZILIAN_FUND_INVESTMENT} from "../../../../../services/axios/ApiUrls.tsx";
import {BrazilianFundInvestment} from "../../../../../interfaces/Finance.tsx";
import {toast} from "react-toastify";

interface BrazilianFundInvestmentResponse {
    success: boolean
    quantity: number
    investments: BrazilianFundInvestment[]
}

const BrazilianFundInvestmentTable = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [brFundInvestments, setBrFundInvestments] = useState<BrazilianFundInvestment[]>([])

    useEffect(() => {
        getBrazilianFundInvestments();
    }, [])

    const getBrazilianFundInvestments = () => {
        getFinanceData(URL_FINANCE_BRAZILIAN_FUND_INVESTMENT, {is_liquidated: false}).then((response: BrazilianFundInvestmentResponse) => {
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
    ]

    return (
        <>
            {isLoading ? <Loader/> :
                <DataGrid
                    keyExpr={'investmentId'}
                    data={brFundInvestments}
                    columns={columns}
                />
            }
        </>
    )
}

export default BrazilianFundInvestmentTable;