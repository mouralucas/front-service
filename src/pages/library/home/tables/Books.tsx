import DataGrid from "../../../../components/table/DataGrid.tsx";
import {useEffect, useState} from "react";
import {getItems} from "../../../../services/getCommonData/Library.tsx";
import {DataGridColumn, DataGridToolBarItem} from "../../../../assets/core/components/Interfaces.tsx";
import {Button as Btn,} from 'devextreme-react/data-grid';
import {toast} from "react-toastify";
import ItemModal from '../modals/Item.tsx'
import Button from "devextreme-react/button";
import {Item} from "../../../../interfaces/Library.tsx";
import Loader from "../../../../components/Loader.tsx";


const App = () => {
    const [books, setBooks] = useState<any[]>([])
    const [selectedBook, setSelectedBook] = useState<Item | null>(null)
    const [itemModalState, setItemModalState] = useState<boolean>(false)

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const showItemModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setSelectedBook(e.row.data)
        } else {
            setSelectedBook(null);
        }

        setItemModalState(true);
    }

    const hideItemModal = () => {
        setItemModalState(false);
        setSelectedBook(null);
    }

    const getAvailableBooks: () => Promise<void> = async () => {
        setIsLoading(true);
        setBooks(await getItems('book'));
        setIsLoading(false);
    }

    useEffect(() => {
        getAvailableBooks().then()
    }, []);


    const coffeeCommand = () => {
        toast('☕ Cafezinho delícia!');
    }

    const columns: DataGridColumn[] = [
        {
            dataField: "itemId",
            caption: "Id",
            dataType: "number",
            visible: false,
        },
        {
            dataField: "title",
            caption: "Título",
            dataType: "string",
        },
        {
            dataField: "mainAuthorName",
            caption: "Autor",
            dataType: "string",
            visible: true,
        },
        {
            dataField: "pages",
            caption: "Paginas",
            dataType: "number",
            width: 150,
        },
        {
            dataField: "itemType",
            caption: "Tipo",
            dataType: "string",
            width: 150,
            visible: false,
        },
        {
            dataField: "itemFormat",
            caption: "Formato",
            dataType: "string",
            visible: false
        },
        {
            dataField: "serieName",
            caption: "Serie",
            dataType: "string",
            visible: true,
        },
        {
            dataField: "publisherName",
            caption: "Editora",
            dataType: "string",
        },
        {
            dataField: "lastStatusName",
            caption: "Status",
            dataType: "string",
        },
        {
            caption: 'Ações',
            type: 'buttons',
            width: 110,
            child: [
                <Btn
                    key={1}
                    text="Editar"
                    // icon="/url/to/my/icon.ico"
                    icon="edit"
                    hint="Editar"
                    onClick={showItemModal}
                />,
                <Btn
                    // text="My Command"
                    // // icon="/url/to/my/icon.ico"
                    icon="coffee"
                    hint="My Command"
                    onClick={coffeeCommand}
                />
            ]
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
            child: <Button icon={'refresh'} onClick={getAvailableBooks}/>,
            location: "after"
        },
        {
            child: <Button icon={'add'} onClick={showItemModal}></Button>,
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
                    keyExpr={'itemId'}
                    data={books}
                    columns={columns}
                    toolBar={{
                        visible: true,
                        items: toolBarItems
                    }}
                    showFilterRow={true}
                />
            }
            <ItemModal modalState={itemModalState} hideModalItem={hideItemModal} item={selectedBook}/>
        </>

    )
}

export default App;