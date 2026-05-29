import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import AutorenewOutlined from '@mui/icons-material/AutorenewOutlined';
import { Box, IconButton } from "@mui/material";
import { GridColDef } from '@mui/x-data-grid';
import { ReactElement, useCallback, useEffect, useState } from "react";
import DataGrid from "../../../../../components/table/DataGrid.tsx";
import { Bank } from "../../../../../interfaces/Finance.tsx";
import { getBanks } from "../../../../../services/getCommonData/Finance.tsx";
import BankModal from '../modals/Bank';


const BankTable = (): ReactElement => {
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [banks, setBanks] = useState<Bank[]>([])

    const [isBankModalOpen, setIsBankModalOpen] = useState<boolean>(false)
    const [selectedBank, setSelectedBank] = useState<Bank | undefined>()

    const fetchBankData = async () => {
        setIsLoading(true);
        setBanks(await getBanks(false))
        setIsLoading(false);
    }

    const onBankModalToggle = useCallback((e: any) => {
        if (typeof e.row != 'undefined') {
            setSelectedBank(e.row.data);
        }

        if (isBankModalOpen) {
            setSelectedBank(undefined);
        }

        setIsBankModalOpen(!isBankModalOpen);
    }, [isBankModalOpen])

    useEffect(() => {
        fetchBankData().then();
    }, []);

    const columns: GridColDef<Bank>[] = [
        { field: 'bankId', headerName: 'ID', flex: 1 },
        { field: 'bankName', headerName: 'Nome', flex: 1 },
        { field: 'code', headerName: 'Código', type: 'number', flex: 1 }
    ]

    return (
        <Box sx={{ display: 'block ' }} >
            <Box sx={{ display: 'flex', justifyContent: 'right', gap: 0, mb: 2, me: 2 }}>
                <IconButton
                    aria-label="Novo Registro"
                    onClick={onBankModalToggle}
                    loading={isLoading}
                >
                    <AddCircleOutline />
                </IconButton>
                <IconButton
                    aria-label="Atualizar"
                    onClick={fetchBankData}
                    loading={isLoading}
                >
                    <AutorenewOutlined />
                </IconButton>
            </Box>
            <DataGrid
                columns={columns}
                data={banks}
                isLoading={isLoading}
                getRowId={(row) => row.bankId}
                columnVisibilityModel={{ bankId: false }}
            />
            <BankModal
                isOpen={isBankModalOpen}
                onToggle={onBankModalToggle}
                bank={selectedBank} />
        </Box>
    )
}

export default BankTable;