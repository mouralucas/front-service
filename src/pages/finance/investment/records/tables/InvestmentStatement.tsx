import {ReactElement, useEffect, useState} from "react";
import {DataGridColumn} from "../../../../../assets/core/components/Interfaces.tsx";
import DataGrid from "../../../../../components/table/DataGrid.tsx";
import {getFinanceData} from "../../../../../services/axios/Get.tsx";
import {URL_FINANCE_INVESTMENT_STATEMENT} from "../../../../../services/axios/ApiUrls.tsx";
import {GetInvestmentStatementResponse} from "../../../../../interfaces/FinanceRequest.tsx";
import {toast} from "react-toastify";
import Loader from "../../../../../components/Loader.tsx";

interface InvestmentStatementProps {
    investmentId: string;

}


const App = (props: InvestmentStatementProps): ReactElement => {
    const [statements, setStatements] = useState<any>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        if (props.investmentId) {
            getInvestmentStatement()
        }
    }, [props.investmentId])

    const getInvestmentStatement = () => {
        setIsLoading(true);

        getFinanceData(URL_FINANCE_INVESTMENT_STATEMENT, {investmentId: props.investmentId}).then((response: GetInvestmentStatementResponse) => {
            setStatements(response.statement)
            setIsLoading(false);
        }).catch(() => {
            toast.error('Erro ao buscar os extratos do investimento')
            setIsLoading(false);
        })
    }

    function grossAmountCustomCell(cellInfo: any) {
        // const currentSymbol: string = cellInfo.currencySymbol;
        const currentSymbol: string = "R$ ";
        const grossAmount: string = parseFloat(cellInfo.grossAmount).toFixed(2);
        const formated_string: string = `${currentSymbol} ${grossAmount}`
        return formated_string;
    }

    const columns: DataGridColumn[] = [
        {
            dataField: "investmentStatementId",
            caption: "Id",
            dataType: "string",
            width: 70,
            visible: false
        },
        {
            dataField: "period",
            caption: "Período",
            dataType: "number",
        },
        {
            dataField: "referenceDate",
            caption: "Referência",
            dataType: "date",
            format: 'dd/MM/yyyy',
        },
        {
            dataField: "totalTax",
            caption: "Impostos",
            dataType: "number",
        },
        {
            dataField: "totalFee",
            caption: "Taxas",
            dataType: "number",
        },
        {
            dataField: "grossAmount",
            caption: 'Bruto',
            dataType: "currency",
            calculateCellValue: grossAmountCustomCell,
        },
        {
            dataField: "netAmount",
            caption: 'Líquido',
            dataType: "currency",
        }
    ]

    return (
        <>
            {isLoading ?
                <Loader/>
                :
                <DataGrid
                    keyExpr={'investmentStatementId'}
                    data={statements}
                    columns={columns}
                    columnChooser={
                        {
                            enabled: false
                        }
                    }
                />
            }
        </>
    )
}

export default App;