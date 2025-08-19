import { ReactElement, useState, useEffect } from "react";
import DataGrid from '../../../../../components/table/DataGridV2';
import { GridColDef } from "@mui/x-data-grid";
import { getFinanceData } from "../../../../../services/axios/Get";
import { URL_FINANCE_BRAZILIAN_FUND_INVESTMENT } from "../../../../../services/axios/ApiUrls";
import { GetBrazilianFundInvestmentResponse } from "../../../../../interfaces/FinanceRequest";
import BrazilianFundInvestmentModal from "../modals/BrazilianFundInvestment.tsx";
import { BrazilianFundInvestment } from "../../../../../interfaces/Finance";
import { Box, IconButton } from "@mui/material";
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { formatDate } from "../../../../../utils/datetime";


const BrazilianFundInvestmentTable = (): ReactElement => {
    const [brFundInvestments, setBrFundInvestments] = useState<BrazilianFundInvestment[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    // Modal states
    const [modalInvestmentState, setModalInvestmentState] = useState<boolean>(false)

    useEffect(() => {
        getBrazilianFundInvestments();
    }, [])

    const showInvestmentModal = (e: any) => {
        if (e.row) {

        }
        setModalInvestmentState(true);
    }

    const hideInvestmentModal = () => {
        setModalInvestmentState(false);
        getBrazilianFundInvestments()
    }

    const getBrazilianFundInvestments = () => {
        setIsLoading(true);
        getFinanceData(URL_FINANCE_BRAZILIAN_FUND_INVESTMENT, { isSettled: false }).then((response: GetBrazilianFundInvestmentResponse) => {
            setBrFundInvestments(response.investments);
            setIsLoading(false);
        }).catch(() => {
            //toast.error('Houve um erro aos buscar os investimentos em fundos');
            setIsLoading(false);
        })
    }

    const columns: GridColDef[] = [
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
                    onClick={showInvestmentModal}
                    loading={isLoading}
                >
                    <AddCircleOutline />
                </IconButton>
                <IconButton
                    aria-label="Atualizar"
                    onClick={getBrazilianFundInvestments}
                    loading={isLoading}
                >
                    <AutorenewOutlined />
                </IconButton>
            </Box>
            <DataGrid
                columns={columns}
                data={brFundInvestments}
                isLoading={isLoading}
                getRowId={(row) => row.investmentId}
                columnVisibilityModel={{
                    investmentId: false, // Hide the investmentId column
                }}
            />
            <BrazilianFundInvestmentModal modalState={modalInvestmentState} hideModal={hideInvestmentModal} brazilianFundInvestment={null} />
        </Box>
    )
}


export default BrazilianFundInvestmentTable;