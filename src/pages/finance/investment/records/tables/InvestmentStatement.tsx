import { GridColDef } from "@mui/x-data-grid";
import { ReactElement, useEffect, useState } from "react";
import DataGridComp from "../../../../../components/table/DataGridV2";
import { InvestmentStatement } from "../../../../../interfaces/Finance";
import { GetInvestmentStatementResponse } from "../../../../../interfaces/FinanceRequest";
import { URL_FINANCE_INVESTMENT_STATEMENT } from "../../../../../services/axios/ApiUrls";
import { getFinanceData } from "../../../../../services/axios/Get";


interface IncestmentStatementTableProps {
    investmentId: string
}

const InvestmentStatementTable = (props: IncestmentStatementTableProps): ReactElement => {
    const [statements, setStatements] = useState<InvestmentStatement[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (props.investmentId) {
            getInvestmentStatement()
        }
    }, [props.investmentId])

    const getInvestmentStatement = () => {
        setIsLoading(true);

        getFinanceData(URL_FINANCE_INVESTMENT_STATEMENT, { investmentId: props.investmentId }).then((response: GetInvestmentStatementResponse) => {
            setStatements(response.statements)
            setIsLoading(false);
        }).catch(() => {
            // toast.error('Erro ao buscar os extratos do investimento')
            setIsLoading(false);
        })
    }

    const columns: GridColDef<InvestmentStatement>[] = [
        { field: "investmentStatementId", headerName: "Id", flex: 1 },
        { field: "period", headerName: 'Período', flex: 0.5 },
        {
            field: "previousAmount",
            headerName: 'Anterior (aportes)',
            flex: 1,
            valueFormatter: (value: number, row) => {
                const previousAmount = value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
                const incoming = row.incoming.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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
            data={statements}
            isLoading={isLoading}
            getRowId={(row) => row.investmentStatementId}
            pageSize={100}
            columnVisibilityModel={{
                investmentStatementId: false
            }}
        />
    )
}

export default InvestmentStatementTable;