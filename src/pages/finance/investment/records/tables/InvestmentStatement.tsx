import { useQuery } from "@apollo/client";
import EditOutlined from "@mui/icons-material/EditOutlined";
import { Box, IconButton } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ReactElement } from "react";
import DataGridComp from "../../../../../components/table/DataGridV2";
import { InvestmentStatement } from "../../../../../interfaces/Finance";
import { apolloFinanceClient } from "../../../../../services/apollo/client/ApolloFinanceService";
import { QUERY_INVESTMENT_STATEMENTS } from "../../../../../services/apollo/queries/Finance";


interface IncestmentStatementTableProps {
    investmentId: string
}

const InvestmentStatementTable = (props: IncestmentStatementTableProps): ReactElement => {
    const { data: statementData, loading: statementLoading } = useQuery(QUERY_INVESTMENT_STATEMENTS,
        {
            client: apolloFinanceClient,
            variables: { params: { investmentId: props.investmentId } },
            skip: !props.investmentId,
            fetchPolicy: 'no-cache'
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
            field: "valueChange",
            headerName: "Variação",
            flex: 1,
            valueFormatter: (value: number, row) => {
                if (value === null) return ''
                const perc = row.percentageChange.toFixed(2)
                return `R$ ${value} (${perc}%)`
            }
        },
        {
            field: 'actions',
            headerName: 'Ações',
            flex: 1,
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',      // vertical
                        justifyContent: 'center',  // horizontal
                        gap: 1,
                        flex: 1,                   // ocupa toda a largura da célula
                        height: '100%',            // ocupa toda a altura
                    }}
                >
                    <IconButton
                        aria-label="editar"
                        color="success"
                        // onClick={showInvestmentModal.bind(null, params)}
                    >
                        <EditOutlined />
                    </IconButton>
                </Box>
            ),
        },
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