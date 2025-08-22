import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined';
import { Box, IconButton } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { ReactElement, useEffect, useState } from 'react';
import DataGridComp from '../../../../components/table/DataGridV2';
import { BrazilianFunds } from "../../../../interfaces/Finance.tsx";
import { getBrazilianFunds } from "../../../../services/getCommonData/Finance.tsx";
import BrazilianFundsModal from '../modals/BrazilianFunds.tsx';


const BrazilianFundsTable = (): ReactElement => {
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [brazilianFundsModalState, setBrazilianFundsModalState] = useState<boolean>(false)

    const [brazilianFunds, setBrazilianFunds] = useState<any[]>([])
    const [selectedBrazilianFund, setSelectedBrazilianFund] = useState<BrazilianFunds | undefined>()

    const fetchBrazilianFunds = async () => {
        setBrazilianFunds(await getBrazilianFunds(false));
        setIsLoading(false);
    }

    const showBrazilianFundsModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setSelectedBrazilianFund(e.row.data);
        }

        setBrazilianFundsModalState(true);
    }

    const hideBrazilianFundsModal = () => {
        setSelectedBrazilianFund(undefined);
        setBrazilianFundsModalState(false);
    }

    useEffect(() => {
        fetchBrazilianFunds().then();
    }, []);

    const columns: GridColDef = [
        { field: 'fundId', headerName: 'Id', flex: 1 },
        { field: 'name', headerName: 'Nme', flex: 3 },
        { field: 'administrator', headerName: 'Administrador', flex: 1 },
        {
            field: 'minimumBalance',
            headerName: 'Saldo mínimo',
            flex: 1,
            type: 'number',
            valueFormatter: (value: number) => {
                return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            }
        },
        {
            field: 'minimumInvestment',
            headerName: 'Investmento mínimo',
            flex: 1,
            type: 'number',
            valueFormatter: (value: number) => {
                return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            }
        },
        {
            field: 'minimumWithdraw',
            headerName: 'Saque mínimo',
            flex: 1,
            type: 'number',
            valueFormatter: (value: number) => {
                return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            }
        },
        {
            field: 'initialInvestment',
            headerName: 'Investimento inicial',
            flex: 1,
            type: 'number',
            valueFormatter: (value: number) => {
                return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
            }
        },
        { field: 'benchmark', headerName: 'Benchmark', flex: 1 }
    ]

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'right', gap: 0, mb: 2, me: 2 }}>
                <IconButton
                    aria-label="Novo Registro"
                    onClick={showBrazilianFundsModal}
                    loading={isLoading}
                >
                    <AddCircleOutline />
                </IconButton>
                <IconButton
                    aria-label="Atualizar"
                    onClick={fetchBrazilianFunds}
                    loading={isLoading}
                >
                    <AutorenewOutlined />
                </IconButton>
            </Box>
            <DataGridComp
                columns={columns}
                data={brazilianFunds}
                isLoading={isLoading}
                getRowId={(row) => row.fundId}
                columnVisibilityModel={{ fundId: false, benchmark: false }}
            />
            <BrazilianFundsModal modalState={brazilianFundsModalState} hideModal={hideBrazilianFundsModal} brazilianFund={selectedBrazilianFund} />
        </Box>
    )
}

export default BrazilianFundsTable;