import DataGrid from "../../../../components/table/DataGrid.tsx";
import {DataGridColumn, DataGridToolBarItem} from "../../../../assets/core/components/Interfaces.tsx";
import {useEffect, useState} from "react";
import {getBrazilianFunds} from "../../../../services/getCommonData/Finance.tsx";
import Loader from "../../../../components/Loader.tsx";
import BrazilianFundsModal from '../modals/BrazilianFunds.tsx'
import {BrazilianFunds} from "../../../../interfaces/Finance.tsx";
import Button from "devextreme-react/button";


const BrazilianFundsTable = () => {
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

    const toolBarItems: DataGridToolBarItem[] = [
        {
            name: 'columnChooserButton',
            location: 'after',
        },
        {
            name: 'exportButton',
            location: 'after',
        },
        {
            child: <Button icon='refresh' onClick={fetchBrazilianFunds}/>,
            location: "after"
        },
        {
            child: <Button icon={'add'} onClick={showBrazilianFundsModal}></Button>,
            location: "after"
        },
        {
            name: 'searchPanel',
            location: "after",
        },
    ]

    return (
        <>
            {isLoading ? <Loader/> :
                <DataGrid
                    keyExpr={'fundId'}
                    data={brazilianFunds}
                    toolBar={
                        {
                            visible: true,
                            items: toolBarItems,
                        }
                    }
                    columns={columns}
                />

            }
            <BrazilianFundsModal modalState={brazilianFundsModalState} hideModal={hideBrazilianFundsModal} brazilianFund={selectedBrazilianFund}/>
        </>
    )
}

export default BrazilianFundsTable;