import { useQuery } from '@apollo/client';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined';
import { Box, IconButton } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ReactElement, useCallback, useEffect, useState } from "react";
import DataGrid from '../../../../../components/table/DataGridV2';
import { BrazilianFundInvestment } from "../../../../../interfaces/Finance";
import { apolloFinanceClient } from '../../../../../services/apollo/client/ApolloFinanceService.tsx';
import { QUERY_BRAZILIAN_FUND_INVESTMENTS } from '../../../../../services/apollo/queries/Finance.tsx';
import { formatDate } from "../../../../../utils/datetime";
import BrazilianFundInvestmentModal from "../modals/BrazilianFundInvestment.tsx";


const BrazilianFundInvestmentTable = (): ReactElement => {
    // Modal states
    const [isBrazilianFundsInvestmentModalOpen, setIsBrazilianFundsInvestmentModalOpen] = useState<boolean>(false)

    const { data: brFundsData, loading: brFundsIsLoading, refetch: refetchBrFunds } = useQuery(
        QUERY_BRAZILIAN_FUND_INVESTMENTS,
        {
            client: apolloFinanceClient,
            variables: {
                params: {
                    isSettled: false
                }
            }
        }
    );

    useEffect(() => {
        refetchBrFunds();
    }, [])

    const onBrazilianFundsInvestmentModaToggle = useCallback((e: any) => {
        if (e.row) {
            console.log("Example to access the row values");
        }
        
        setIsBrazilianFundsInvestmentModalOpen(!isBrazilianFundsInvestmentModalOpen);

    }, [isBrazilianFundsInvestmentModalOpen])

    const columns: GridColDef<BrazilianFundInvestment>[] = [
        { field: 'investmentId', headerName: 'Id', flex: 1 },
        { field: 'fundName', headerName: 'Fundo', flex: 1 },
        { field: 'name', headerName: 'Nome', flex: 1 },
        {
            field: 'transactionDate',
            headerName: 'Data',
            flex: 1,
            valueFormatter: (value) => {
                if (!value) return '';

                const start = formatDate(value);
                return start;
            },
        },
        {
            field: 'amount',
            headerName: 'Investido',
            flex: 1,
            type: 'number',
            valueFormatter: (value: number, row) => {
                return value.toLocaleString('pt-BR', { style: 'currency', currency: row.currencyId });
            }
        },
        { field: 'quantity', headerName: 'Quantidade', flex: 1, type: 'number' },
    ]

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'right', gap: 0, mb: 2, me: 2 }}>
                <IconButton
                    aria-label="Novo Registro"
                    onClick={onBrazilianFundsInvestmentModaToggle}
                    color='primary'
                    loading={brFundsIsLoading}
                >
                    <AddCircleOutline />
                </IconButton>
                <IconButton
                    aria-label="Atualizar"
                    onClick={refetchBrFunds}
                    color='primary'
                    loading={brFundsIsLoading}
                >
                    <AutorenewOutlined />
                </IconButton>
            </Box>
            <DataGrid
                columns={columns}
                data={brFundsData?.getInvestmentsBrazilianFunds?.investments || []}
                isLoading={brFundsIsLoading}
                getRowId={(row) => row.investmentId}
                columnVisibilityModel={{
                    investmentId: false, // Hide the investmentId column
                }}
            />
            <BrazilianFundInvestmentModal
                isOpen={isBrazilianFundsInvestmentModalOpen}
                onToggle={onBrazilianFundsInvestmentModaToggle}
                brazilianFundInvestment={null} />
        </Box>
    )
}


export default BrazilianFundInvestmentTable;