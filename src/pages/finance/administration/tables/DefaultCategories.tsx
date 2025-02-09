import {ReactElement, useEffect, useState} from "react";
import DataGrid from "../../../../components/table/DataGrid.tsx";
import {DataGridColumn, DataGridToolBarItem} from "../../../../assets/core/components/Interfaces.tsx";
import Button from "devextreme-react/button";
import {getCategories} from "../../../../services/getCommonData/Finance.tsx";
import {Bank, Category} from "../../../../interfaces/Finance.tsx";
import CategoryModal from '../modals/Category'
import Loader from "../../../../components/Loader";

const App = (): ReactElement => {
    const [banks, setBanks] = useState<Bank[]>([])

    const [defaultCategoriesModalState, setDefaultCategoriesModalState] = useState<boolean>(false)
    const [selectedCategories, setSelectedCategories] = useState<Category | undefined>()

    const [isLoading, setIsLoading] = useState<boolean>(true)


    const fetchCategoriesData = async () => {
        setIsLoading(true);
        setBanks(await getCategories(false))
        setIsLoading(false);
    }

    const showBankModal = (e: any) => {
        if (typeof e.row != 'undefined') {
            setSelectedCategories(e.row.data);
        }

        setDefaultCategoriesModalState(true);
    }

    const hideBankModal = () => {
        setSelectedCategories(undefined);
        setDefaultCategoriesModalState(false);
    }

    useEffect(() => {
        fetchCategoriesData().then();
    }, []);

    const columns: DataGridColumn[] = [
        {
            dataField: "categoryId",
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
            dataField: 'description',
            caption: 'Descrição',
            dataType: 'string'
        },
        {
            dataField: 'parentName',
            caption: 'Categoria Mãe',
            dataType: 'string'
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
            child: <Button icon='refresh' onClick={fetchCategoriesData}/>,
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
                    keyExpr='categoryId'
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
            <CategoryModal modalState={defaultCategoriesModalState} hideModal={hideBankModal} category={selectedCategories}/>
        </>
    )
}

export default App;