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
            setStatements(response.statement)
            setIsLoading(false);
        }).catch(() => {
            // toast.error('Erro ao buscar os extratos do investimento')
            setIsLoading(false);
        })
    }

    const columns: GridColDef<InvestmentStatement>[] = [
        { field: "investmentStatementId", headerName: "Id", flex: 1 },
        { field: "period", headerName: 'Período', flex: 1 },
        {
            field: "totalTax",
            headerName: 'Impostos',
            flex: 1,
            valueFormatter: (value: number) => {
                return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            }
        },
        {
            field: "totalFee",
            headerName: 'Taxas',
            flex: 1,
            valueFormatter: (value: number) => {
                return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
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
        }
    ]

    return (
        <DataGridComp
            columns={columns}
            data={statements}
            isLoading={isLoading}
            getRowId={(row) => row.investmentStatementId}
            columnVisibilityModel={{
                investmentStatementId: false
            }}
        />
    )
}

export default InvestmentStatementTable;