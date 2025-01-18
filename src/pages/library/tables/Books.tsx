import DataGrid from "../../../components/table/DataGrid.tsx";
import {useEffect, useState} from "react";
import {getItems} from "../../../services/getCommonData/Library";
import {DataGridColumn, DataGridToolBarItem} from "../../../assets/core/components/Interfaces.tsx";
import {Button as Btn,} from 'devextreme-react/data-grid';
import {toast} from "react-toastify";
import ItemModal from '../modals/Item'
import Button from "devextreme-react/button";


const App = () => {
    const [books, setBooks] = useState<any[]>([])
    const [itemModalState, setItemModalState] = useState<boolean>(false)

    const showItemModal = () => {
        setItemModalState(true);
    }

    const hideItemModal = () => {
        setItemModalState(false);
    }

    const fetchBooks: () => Promise<void> = async () => {
        const items = await getItems('book')
        setBooks(items.items);
    }

    useEffect(() => {
        fetchBooks().then()
    }, []);


    const coffeeCommand = () => {
        toast('☕ Cafezinho delícia!');
    }

    const columns: DataGridColumn[] = [
        {
            dataField: "itemId",
            caption: "Id",
            dataType: "number",
            visible: true,
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
            child: <Button icon={'refresh'} onClick={fetchBooks}/>,
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
            <DataGrid
                keyExpr={'itemId'}
                data={books}
                columns={columns}
                toolBar={{
                    visible: true,
                    items: toolBarItems
                }}
            />
            <ItemModal modalState={itemModalState} hideModalItem={hideItemModal} item={null}/>
        </>

    )
}

export default App;