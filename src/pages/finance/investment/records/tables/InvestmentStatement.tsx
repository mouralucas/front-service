import {ReactElement} from "react";
import {InvestmentStatement} from "../../../../../interfaces/Finance.tsx";
import {DataGridColumn} from "../../../../../assets/core/components/Interfaces.tsx";
import DataGrid from "../../../../../components/table/DataGrid.tsx";

interface InvestmentStatementProps {
    statementList: InvestmentStatement[];

}


const App = (props: InvestmentStatementProps): ReactElement => {
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
            <DataGrid
                keyExpr={'investmentStatementId'}
                data={props.statementList}
                columns={columns}
                columnChooser={
                    {
                        enabled: false
                    }
                }
            />
        </>
    )
}

export default App;