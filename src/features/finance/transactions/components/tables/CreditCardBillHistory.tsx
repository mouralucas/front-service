import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import DataGrid from '../../../../../components/table/DataGrid';
import { ReactElement, useEffect, useState } from "react";
import { getFinanceData } from "../../../../../services/axios/Get";
import { toast } from "react-toastify";
import { GetCreditCardBillHistoryResponse } from "../../../../../interfaces/FinanceRequest";
import { getLastPeriods, getPeriodFromDate } from "../../../../../utils/datetime";
import { URL_FINANCE_CREDIT_CARD_BILL_HISTORY } from "../../../../../services/axios/ApiUrls";
import { Stack } from "@mui/material";



const BillHistoryTable = (): ReactElement => {
    const [creditCardBillHistory, setCreditCardBillHistory] = useState<any[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(() => {
        getCreditCardBillHistory();
    }, [])

    const getCreditCardBillHistory = () => {
        setIsLoading(true);
        const dates = getLastPeriods(11, 1);

        getFinanceData(URL_FINANCE_CREDIT_CARD_BILL_HISTORY, {
            startPeriod: getPeriodFromDate(dates[0]),
            endPeriod: getPeriodFromDate(dates[1]),
        }).then((response: GetCreditCardBillHistoryResponse) => {
            setCreditCardBillHistory(response.creditCardBillHistory);
            setIsLoading(false);
        }).catch(() => {
            toast.error('Houve um erro ao buscar histórico de faturas');
            setIsLoading(false);
        })
    }

    const creditCardBillToggle = (e: any) => {
        alert("Opa");
        console.log(e);
    }

    const columns: GridColDef[] = [
        { field: "period", headerName: "Período", flex: 1 },
        {
            field: "totalAmount",
            headerName: "Total",
            align: "center",
            flex: 1,
            renderCell: (params: GridRenderCellParams) => (
                <div>
                    {params.value?.map((account: any, index: number) => (
                        <div key={index}>
                            {account.currency_symbol} {account.total.toFixed(2)}
                        </div>
                    ))}
                </div>
            ),
        },
        {
            field: "creditCards",
            headerName: "Total por cartão (Tot. parcelas)",
            flex: 2,
            renderCell: (params: GridRenderCellParams) => (
                <Stack direction="column" spacing={1}>
                    {params.value?.map((account: any, index: number) => (
                        <span key={index}>
                            <b>{account.nickname}</b>: {account.currencySymbol} {account.total.toFixed(2)} (
                            {account.currencySymbol} {account.totalInstallments.toFixed(2)})
                        </span>
                    ))}
                </Stack>
            ),
        }
    ]


    return (
        <DataGrid
            columns={columns}
            data={creditCardBillHistory}
            isLoading={isLoading}
            pageSizeOptions={[12]}
            getRowHeight={() => 'auto'}
            pageSize={12}
            onRowClick={creditCardBillToggle}
            sx={{
                "& .MuiDataGrid-cell": {
                    display: "flex",
                    alignItems: "center", // centraliza verticalmente
                },
            }}
        />
    )
}

export default BillHistoryTable;