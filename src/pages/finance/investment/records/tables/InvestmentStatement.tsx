import { GridColDef } from "@mui/x-data-grid";
import { ReactElement } from "react";
import DataGridComp from "../../../../../components/table/DataGridV2";
import { InvestmentStatement } from "../../../../../interfaces/Finance";
import { useQuery } from "@apollo/client";
import { QUERY_INVESTMENT_STATEMENT } from "../../../../../services/apollo/queries/Finance";
import { apolloFinanceClient } from "../../../../../services/apollo/client/ApolloFinanceService";


interface IncestmentStatementTableProps {
    investmentId: string
}

const InvestmentStatementTable = (props: IncestmentStatementTableProps): ReactElement => {
    const { data: statementData, loading: statementLoading } = useQuery(QUERY_INVESTMENT_STATEMENT,
        {
            client: apolloFinanceClient,
            variables: { params: { investmentId: props.investmentId } },
            skip: !props.investmentId
        }
    )

    const columns: GridColDef<InvestmentStatement>[] = [
        { field: "id", headerName: "Id", flex: 1 },
        { field: "period", headerName: 'Período', flex: 0.5 },
        {
            field: "previousAmount",
            headerName: 'Anterior (aportes)',
            flex: 1,
            valueFormatter: (value: number, row) => {
                const previousAmount = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                const incoming = row.contribution.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                const formattedValue = `${previousAmount} (${incoming})`;
                return formattedValue;
            }
        },
        {
            field: "grossAmount",
            headerName: 'Valor Bruto',
            flex: 1,
            valueFormatter: (value: number) => {
                return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            }
        },
        {
            field: "netAmount",
            headerName: 'Valor Líquido',
            flex: 1,
            valueFormatter: (value: number) => {
                return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            }
        },
        {
            field: "valueChange",
            headerName: "Variação",
            flex: 1,
            valueFormatter: (value: number, row) => {
                if (value === null) return ''
                const perc = row.percentageChange.toFixed(2)
                return `R$ ${value} (${perc}%)`
            }
        }
    ]

    return (
        <DataGridComp
            columns={columns}
            data={statementData?.getInvestmentStatements?.statements}
            isLoading={statementLoading}
            getRowId={(row) => row.id}
            pageSize={100}
            columnVisibilityModel={{
                id: false
            }}
        />
    )
}

export default InvestmentStatementTable;