import { Box, Button, TextField } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ReactElement, useEffect, useState } from "react";
import DataGrid from '../../../../../components/table/DataGridV2';
import { Investment } from "../../../../../interfaces/Finance";
import { InvestmentResponse } from "../../../../../interfaces/FinanceRequest";
import { URL_FINANCE_INVESTMENT } from "../../../../../services/axios/ApiUrls";
import { getFinanceData } from "../../../../../services/axios/Get";
import ModalInvestment from '../modals/Investment';


const InvestmentV2 = (): ReactElement => {
    const [investments, setInvestments] = useState<Investment[]>([])

    // Modals States
    const [modalInvestmentState, setModalInvestmentState] = useState<boolean>(false);
    const [selectedInvestment, setSelectedInvestment] = useState<Investment | undefined>();

    // Table Filter
    const [investmentFilter, setInvestmentFilter] = useState('');

    // Loading State
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Modals Open/Close functions
    const showInvestmentModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setSelectedInvestment(e.row);
        }
        setModalInvestmentState(true);
    }

    const hideInvestmentModal = () => {
        setModalInvestmentState(false);
        setSelectedInvestment(undefined);
        getInvestment();
    }

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
            valueFormatter: (value: string, row) => {
                const vael = parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: row.currencyId });
                const percentageChange: string = parseFloat(row.percentageChange).toFixed(2);
                return  `${vael} (${percentageChange}%)`;
            }
        },
        { field: 'contractedRate', headerName: 'Taxa', flex: 1 },
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
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={showInvestmentModal.bind(null, params)}  
                    >
                        Editar
                    </Button>
                    <Button
                        variant="contained"
                        color='primary'
                        size='small'
                        onClick={showInvestmentModal.bind(null, params)}
                    >
                        Extrato
                    </Button>
                </Box>
            ),
        },
    ]

    const filterdRows = investmentFilter
    ? investments.filter(row => row.name.toLowerCase().includes(investmentFilter.toLowerCase()))
    : investments

    return (
        <Box sx={{ display: 'block', me: 5}}>
            <Box sx={{ display: 'flex', justifyContent: 'right', gap: 2, mb: 2 }}>
                <TextField 
                    label='Filtrar por nome'
                    variant='outlined'
                    size='small'
                    value={investmentFilter}
                    onChange={e => setInvestmentFilter(e.target.value)}
                    sx={{ minWidth: 250 }}
                />
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={showInvestmentModal}
                    disabled={isLoading}
                >
                    Novo
                </Button>
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
                data={filterdRows}
                getRowId={(row) => row.investmentId.toString()}
                isLoading={isLoading}
            />
            <ModalInvestment modalState={modalInvestmentState} hideModal={hideInvestmentModal} investment={selectedInvestment}/>
        </Box>
    )
}

export default InvestmentV2;