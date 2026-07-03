import { Box, Typography } from '@mui/material';
import { GridColDef } from '@mui/x-data-grid';
import { ReactElement } from 'react';
import DataGrid from '../../../../../components/table/DataGrid';
import { CreditCardTransaction } from '../../types/CreditCard';

interface CreditCardMonthlyBillTransactionsProps {
    transactions: CreditCardTransaction[];
    isLoading?: boolean;
}

const CreditCardMonthlyBillTransactionsTable = (
    props: CreditCardMonthlyBillTransactionsProps
): ReactElement => {
    const columns: GridColDef<CreditCardTransaction>[] = [
        {
            field: 'transactionDate',
            headerName: 'Compra',
            flex: 1,
            valueFormatter: (value: string) => {
                if (!value) return '';
                return new Date(value).toLocaleDateString('pt-BR');
            },
        },
        {
            field: 'amount',
            headerName: 'Valor',
            flex: 1,
            headerAlign: 'center',
            align: 'right',
            valueFormatter: (value: number, row) => {
                return value.toLocaleString('pt-BR', { style: 'currency', currency: row.currencyId });
            }
        },
        {
            field: 'description',
            headerName: 'Descrição',
            flex: 3,
            headerAlign: 'center',
            minWidth: 180,
        },
        {
            field: 'categoryName',
            headerName: 'Categoria',
            flex: 1,
            headerAlign: 'center',
        },
        {
            field: 'currentInstallment',
            headerName: 'Parcelas',
            flex: 0.8,
            headerAlign: 'center',
            align: "center",
            valueFormatter: (value: any, row: CreditCardTransaction) => {
                if (!row?.isInstallment) return 'À vista';
                return `${value}/${row.installments}`;
            },
        },
    ];

    return (
        <Box>
            <Typography variant="subtitle1" sx={{ mb: 1, fontWeight: 600 }}>
                Transações
            </Typography>
            <DataGrid
                columns={columns}
                data={props.transactions}
                isLoading={props.isLoading}
                pageSizeOptions={[5, 10, 20]}
                pageSize={10}
                sx={{
                    '& .MuiDataGrid-cell': {
                        display: 'flex',
                        alignItems: 'center',
                    },
                }}
            />
        </Box>
    );
};

export default CreditCardMonthlyBillTransactionsTable;
