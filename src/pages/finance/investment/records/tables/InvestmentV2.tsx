import { ReactElement, useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import DataGrid from '../../../../../components/table/DataGridV2'
import { getFinanceData } from "../../../../../services/axios/Get";
import { URL_FINANCE_INVESTMENT } from "../../../../../services/axios/ApiUrls";
import { GridColDef } from "@mui/x-data-grid";
import { Investment } from "../../../../../interfaces/Finance";
import { InvestmentResponse } from "../../../../../interfaces/FinanceRequest";


const InvestmentV2 = (): ReactElement => {
    const [investments, setInvestments] = useState<Investment[]>([])
    
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        getInvestment();
    }, [])

    const getInvestment = () => {
        setIsLoading(true);
        getFinanceData(URL_FINANCE_INVESTMENT, {isLiquidated: false}).then((response: InvestmentResponse) => {
            setInvestments(response.investments);
            setIsLoading(false);
        }).catch(() => {
            // TODO: change to mui toast
            // toast.error('Houve um erro ao buscar os investimentos')
            setIsLoading(false);
        })
    }

    const columns: GridColDef[] = [
        { field: 'investmentId', headerName: 'ID', flex: 1 },
        { field: 'name', headerName: 'Nome', flex: 1 },
        {
            field: 'transactionDate',
            headerName: 'Data (vencimento)',
            flex: 1,
            valueFormatter: (value, row) => {
                if (!value) return '';
            
                const format = (val: any) => {
                  if (!val) return '';
                  let date: Date;
                  if (val instanceof Date) {
                    date = val;
                  } else {
                    date = new Date(String(val));
                  }
                  const dd = String(date.getDate()).padStart(2, '0');
                  const mm = String(date.getMonth() + 1).padStart(2, '0');
                  const yy = String(date.getFullYear()).slice(-2);
                  return `${dd}/${mm}/${yy}`;
                };
            
                const start = format(value); // transactionDate
                const end = format(row.maturityDate); // maturityDate
                return end ? `${start} => ${end}` : start;
              },  
        },
        { 
            field: 'amount',
            headerName: 'Valor',
            flex: 1, 
            type: 'number',
            valueFormatter: (value: number, row) => {
                return value.toLocaleString('pt-BR', { style: 'currency', currency: row.currencyId });
            }
        },
        { 
            field: 'grossAmount',
            headerName: 'Valor',
            flex: 1,
            type: 'number',
            valueFormatter: (value: number, row) => {
                return value.toLocaleString('pt-BR', { style: 'currency', currency: row.currencyId });
            }
        },
        { field: 'contractedRate', headerName: 'Taxa', flex: 1 },
    ]

    return (
        <Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
            <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={getInvestment}
                    disabled={isLoading}
                >
                    Atualizar
                </Button>
            </Box>
            <DataGrid
                columns={columns}
                data={investments}
                getRowId={(row) => row.investmentId.toString()}
                isLoading={isLoading}
            />
        </Box>
    )
}

export default InvestmentV2;