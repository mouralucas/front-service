import {ReactElement, FC, useState, useEffect} from "react";
import DataGrid from "../../../../components/table/DataGrid";
import {DataGridColumn} from "../../../../assets/core/components/Interfaces.tsx";
import {getFinanceData} from "../../../../services/axios/Get.tsx";
import {URL_INVESTMENT} from "../../../../services/axios/ApiUrls.tsx";
import {Investment} from "../../Interfaces.tsx";

interface InvestmentResponse {
    success: boolean
    quantity: number
    investments: Investment[]
}

const App: FC = (): ReactElement => {
    const [investments, setInvestments] = useState<Investment[]>([])

    useEffect(() => {
        getInvestment();
    }, [])

    const getInvestment = () => {
        getFinanceData(URL_INVESTMENT).then((response: InvestmentResponse) => {
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
            width: 110,
            child: [
                // <Btn
                //     key={1}
                //     text="Editar"
                //     // icon="/url/to/my/icon.ico"
                //     icon="edit"
                //     hint="Editar"
                //     onClick={showInvestmentModal}
                // />,
                // <Btn
                //     key={2}
                //     //icon="/url/to/my/icon.ico"
                //     icon="coffee"
                //     hint="Coffee"
                //     onClick={coffeeCommand}
                // />,
                // <Btn
                //     key={3}
                //     icon="money"
                //     hint={"Liquidar"}
                //     onClick={showLiquidateModal}
                // />
            ]
        }

    ]


    return (
        <DataGrid
            keyExpr={'data'}
            data={investments}
            columns={columns}
        />
    )
}

export default App;