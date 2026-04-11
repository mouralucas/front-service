import { useQuery } from "@apollo/client";
import EditOutlined from "@mui/icons-material/EditOutlined";
import { Box, IconButton } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ReactElement, useCallback, useState } from "react";
import DataGridComp from "../../../../../components/table/DataGridV2";
import { InvestmentStatement } from "../../../../../interfaces/Finance";
import { apolloFinanceClient } from "../../../../../services/apollo/client/ApolloFinanceService";
import { QUERY_INVESTMENT_STATEMENTS } from "../../../../../services/apollo/queries/Finance";
import StatementModal from "../modals/Statement";


interface IncestmentStatementTableProps {
    investmentId: string
    updatePerformanceChart: any;
}

const InvestmentStatementTable = (props: IncestmentStatementTableProps): ReactElement => {
    const [isStatementModalOpen, setIsStatementModalOpen] = useState<boolean>(false);
    const [selectedStatementId, setSelectedStatementId] = useState<string>()

    const { data: statementData, loading: statementLoading, refetch: statementRefetch } = useQuery(QUERY_INVESTMENT_STATEMENTS,
        {
            client: apolloFinanceClient,
            variables: { params: { investmentId: props.investmentId } },
            skip: !props.investmentId,
            fetchPolicy: 'no-cache'
        }
    )

    const onStatementModalToggle = useCallback((e: any) => {
        if (e !== undefined && e.row !== undefined) {
            setSelectedStatementId(e.row.id);
            setIsStatementModalOpen(true);
        }

        if (isStatementModalOpen) {
            props.updatePerformanceChart();
            statementRefetch();
        }

        setIsStatementModalOpen(!isStatementModalOpen);
    }, [isStatementModalOpen])

    const columns: GridColDef<InvestmentStatement>[] = [
        { field: "id", headerName: "Id", flex: 1 },
        { field: "period", headerName: 'Período', flex: 0.5 },
        {
            field: "previousAmount",
            headerName: 'Anterior',
            flex: 1,
            renderCell: (params: GridRenderCellParams) => {
                const { previousAmount, contribution, withdrawn, currencyId } = params.row;
                const formattedAmount = previousAmount.toLocaleString('pt-BR', { style: 'currency', currency: currencyId });

                return (
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                        <Box>{formattedAmount}</Box>

                        {contribution !== 0 && contribution && (
                            <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                                +{contribution.toLocaleString('pt-BR', { style: 'currency', currency: currencyId })}
                            </Box>
                        )}
                        {withdrawn !== 0 && withdrawn && (
                            <Box sx={{ fontSize: '0.75rem', color: 'text.secondary' }}>
                                -{withdrawn.toLocaleString('pt-BR', { style: 'currency', currency: currencyId })}
                            </Box>
                        )}
                    </Box>
                );
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
                        color="primary"
                        onClick={onStatementModalToggle.bind(null, params)}
                    >
                        <EditOutlined />
                    </IconButton>
                </Box>
            ),
        },
    ]

    return (

        <>
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
            <StatementModal
                isOpen={isStatementModalOpen}
                onToggle={onStatementModalToggle}
                investmentId={props.investmentId}
                statementId={selectedStatementId}
            />
        </>
    )
}

export default InvestmentStatementTable;