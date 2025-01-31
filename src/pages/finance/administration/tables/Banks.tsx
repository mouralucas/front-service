import {ReactElement, useEffect, useState} from "react";
import DataGrid from "../../../../components/table/DataGrid.tsx";
import {DataGridColumn, DataGridToolBarItem} from "../../../../assets/core/components/Interfaces.tsx";
import Button from "devextreme-react/button";
import {getBanks} from "../../../../services/getCommonData/Finance.tsx";
import {Bank} from "../../../../interfaces/Finance.tsx";
import BankModal from '../modals/Bank'
import Loader from "../../../../components/Loader.tsx";

const App = (): ReactElement => {
    const [banks, setBanks] = useState<Bank[]>([])

    const [bankModalState, setBankModalState] = useState<boolean>(false)
    const [selectedBank, setSelectedBank] = useState<Bank | undefined>()

    const [isLoading, setIsLoading] = useState<boolean>(true)


    const fetchBankData = async () => {
        setBanks(await getBanks(false))

        setIsLoading(false);
    }

    const showBankModal = (e: any) => {
        if (typeof e.row != 'undefined') {
            setSelectedBank(e.row.data);
        }

        setBankModalState(true);
    }

    const hideBankModal = () => {
        setSelectedBank(undefined);
        setBankModalState(false);
    }

    useEffect(() => {
        fetchBankData().then();
    }, []);

    const columns: DataGridColumn[] = [
        {
            dataField: "bankId",
            caption: "Id",
            dataType: "number",
            visible: false,
        },
        {
            dataField: 'bankName',
            caption: 'Nome',
            dataType: 'string'
        },
        {
            dataField: 'code',
            caption: 'Código',
            dataType: 'number'
        }
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
            child: <Button icon='refresh' onClick={fetchBankData}/>,
            location: "after"
        },
        {
            child: <Button icon={'add'} onClick={showBankModal}></Button>,
            location: "after"
        },
        {
            name: 'searchPanel',
            location: "after",
        },

    ]

    return (
        <>
            {isLoading ?
                <Loader/>
                :
                <DataGrid
                    keyExpr='bankId'
                    data={banks}
                    columns={columns}
                    toolBar={
                        {
                            visible: true,
                            items: toolBarItems
                        }
                    }
                />
            }
            <BankModal modalState={bankModalState} hideModal={hideBankModal} bank={selectedBank}/>
        </>
    )
}

export default App;