import DataGrid from "../../../../components/table/DataGrid.tsx";
import {DataGridColumn} from "../../../../assets/core/components/Interfaces.tsx";
import {useEffect, useState} from "react";
import {getBrazilianFunds} from "../../../../services/getCommonData/Finance.tsx";
import Loader from "../../../../components/Loader.tsx";


const BrazilianFundsTable = () => {
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const [brazilianFunds, setBrazilianFunds] = useState<Any>([])

    const fetchBrazilianFunds = async () => {
        setBrazilianFunds(await getBrazilianFunds(false));
        setIsLoading(false);
    }

    useEffect(() => {
        fetchBrazilianFunds().then();
    }, []);


    const columns: DataGridColumn[] = [
        {
            dataField: "fundId",
            caption: "Id",
            dataType: "number",
            visible: false,
        },
        {
            dataField: 'name',
            caption: 'Nome',
            dataType: 'string'
        },
        {
            dataField: 'administrator',
            caption: 'Administrador',
            dataType: 'string',
            visible: false
        },
        {
            dataField: 'minimumBalance',
            caption: 'Saldo mínimo',
            dataType: 'number',
        },
        {
            dataField: 'minimumInvestment',
            caption: 'Investimento mínimo',
            dataType: 'number',
        },
        {
            dataField: 'minimumWithdraw',
            caption: 'Saque mínimo',
            dataType: 'number',
        },
        {
            dataField: 'initialInvestment',
            caption: 'Investimento inicial',
            dataType: 'number',
        },
        {
            dataField: 'benchmark',
            caption: 'Benchmark',
            dataType: 'number',
            visible: false
        },
    ]

    return (
        <>
            {isLoading ? <Loader/> :
                <DataGrid
                    keyExpr={'fundId'}
                    data={brazilianFunds}
                    columns={columns}
                />
            }
        </>
    )
}

export default BrazilianFundsTable;