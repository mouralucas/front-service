import { Box, TextField } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ReactElement, useEffect, useState } from "react";
import DataGrid from '../../../../../components/table/DataGridV2';
import { Investment } from "../../../../../interfaces/Finance";
import { InvestmentResponse } from "../../../../../interfaces/FinanceRequest";
import { URL_FINANCE_INVESTMENT } from "../../../../../services/axios/ApiUrls";
import { getFinanceData } from "../../../../../services/axios/Get";
import ModalInvestment from '../modals/Investment';
import ModalInvestmentStatement from '../modals/Statement';
import ModalInvestmentPerformance from '../modals/Performance';
import IconButton from '@mui/material/IconButton';
import QueryStats from '@mui/icons-material/QueryStatsOutlined';
import Edit from '@mui/icons-material/EditOutlined';
import AccountBalanceWallet from '@mui/icons-material/AccountBalanceWalletOutlined';
import Autorenew from '@mui/icons-material/AutorenewOutlined';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';


const InvestmentV2 = (): ReactElement => {
    const [investments, setInvestments] = useState<Investment[]>([])

    // Modals States
    const [modalInvestmentState, setModalInvestmentState] = useState<boolean>(false);
    const [selectedInvestment, setSelectedInvestment] = useState<Investment | undefined>();
    
    const [modalInvestmentStatementState, setModalInvestmentStatementState] = useState<boolean>(false)
    const [modalInvestmentPerformanceState, setModalInvestmentPerformanceState] = useState<boolean>(false)

    // Table Filter
    const [investmentFilter, setInvestmentFilter] = useState('');

    // Loading State
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Investment information for the stats modal - soon to be deprecated
    const [investmentId, setInvestmentId] = useState<string>('')
    const [investmentName, setInvestmentName] = useState<string>('')

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

    const showInvestmentStatementModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setSelectedInvestment(e.row)
        }
        setModalInvestmentStatementState(true);
    }

    const hideInvestmentStatementModal = () => {
        setModalInvestmentStatementState(false);
        setSelectedInvestment(undefined);
        getInvestment();
    }

    const showInvestmentPerformanceModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setInvestmentId(e.row.investmentId);
            setInvestmentName(e.row.name);
            setModalInvestmentPerformanceState(true);
        }
    }

    const hideInvestmentPerformanceModal = () => {
        setModalInvestmentPerformanceState(false);
        setInvestmentId('');
        setInvestmentName('');
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
            headerName: 'Data => vencimento',
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
                const formattedValue = parseFloat(value).toLocaleString('pt-BR', { style: 'currency', currency: row.currencyId });
                const percentageChange: string = parseFloat(row.percentageChange).toFixed(2);
                return  `${formattedValue} (${percentageChange}%)`;
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
                    <IconButton 
                        aria-label="editar"
                        color="success" 
                        onClick={showInvestmentModal.bind(null, params)}
                    >
                        <Edit />
                    </IconButton>
                    <IconButton 
                        aria-label="extrato"
                        color="secondary" 
                        onClick={showInvestmentStatementModal.bind(null, params)}
                    >
                        <AccountBalanceWallet />
                    </IconButton>
                    <IconButton 
                        aria-label="performance"
                        color="secondary" 
                        onClick={showInvestmentPerformanceModal.bind(null, params)}
                    >
                        <QueryStats />
                    </IconButton>
                </Box>
            ),
        },
    ]

    const filterdRows = investmentFilter
    ? investments.filter(row => row.name.toLowerCase().includes(investmentFilter.toLowerCase()))
    : investments

    return (
        <Box sx={{ display: 'block', me: 5}}>
            <Box sx={{ display: 'flex', justifyContent: 'right', gap: 0, mb: 2, me: 2 }}>
                <TextField 
                    label='Filtrar por nome'
                    variant='outlined'
                    size='small'
                    value={investmentFilter}
                    onChange={e => setInvestmentFilter(e.target.value)}
                    sx={{ minWidth: 250 }}
                />
                <IconButton 
                    aria-label="Novo Registro"
                    onClick={showInvestmentModal}
                    loading={isLoading}
                >
                    <AddCircleOutline />
                </IconButton>
                <IconButton 
                    aria-label="Atualizar"
                    onClick={getInvestment}
                    loading={isLoading}
                >
                    <Autorenew />
                </IconButton>
            </Box>
            <DataGrid
                columns={columns}
                data={filterdRows}
                getRowId={(row) => row.investmentId.toString()}
                isLoading={isLoading}
            />
            <ModalInvestment modalState={modalInvestmentState} hideModal={hideInvestmentModal} investment={selectedInvestment}/>
            <ModalInvestmentStatement modalState={modalInvestmentStatementState} hideModal={hideInvestmentStatementModal} investment={selectedInvestment} />
            <ModalInvestmentPerformance modalState={modalInvestmentPerformanceState} hideModal={hideInvestmentPerformanceModal} investmentId={investmentId} investmentName={investmentName}/>
        </Box>
    )
}

export default InvestmentV2;