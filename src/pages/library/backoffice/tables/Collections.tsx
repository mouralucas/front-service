import DataGrid from "../../../../components/table/DataGrid.tsx";
import {useEffect, useState} from "react";
import {getCollections} from "../../../../services/getCommonData/Library.tsx";
import {toast} from "react-toastify";
import {Button as Btn,} from 'devextreme-react/data-grid';
import Button from "devextreme-react/button";
import {DataGridColumn, DataGridToolBarItem} from "../../../../assets/core/components/Interfaces.tsx";


const App = () => {
    const [collections, setCollections] = useState<any[]>([])

    const getAvailableCollections = async () => {
        setCollections(await getCollections(false));
    }

    useEffect(() => {
        getAvailableCollections().then();
    }, [])

    const coffeeCommand = () => {
        toast('☕ Cafezinho delícia!');
    }

    const columns: DataGridColumn[] = [
        {
            dataField: "collectionId",
            caption: "Id",
            dataType: "number",
            width: 70,
        },
        {
            dataField: "collectionName",
            caption: "Nome",
            dataType: "string",
        },
        {
            dataField: "description",
            caption: "Descrição",
            dataType: "string",
        },
        {
            caption: 'Ações',
            type: 'buttons',
            width: 110,
            child: [
                // <Btn
                //     key={1}
                //     text="Editar"
                //     // icon="/url/to/my/icon.ico"
                //     icon="edit"
                //     hint="Editar"
                //     onClick={showModal}
                // />,
                <Btn
                    key={2}
                    //icon="/url/to/my/icon.ico"
                    icon="coffee"
                    hint="My Command"
                    onClick={coffeeCommand}
                />]
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
            child: <Button icon={'refresh'} onClick={getAvailableCollections}/>,
            location: "after"
        },
        // {
        //     child: <Button icon={'add'} onClick={showModal}></Button>,
        //     location: "after"
        // },
        {
            name: 'searchPanel',
            location: "after",
        },

    ]

    return (
        <DataGrid
            keyExpr={'collectionId'}
            data={collections}
            columns={columns}
            toolBar={
                {
                    visible: true,
                    items: toolBarItems,
                }
            }
        />
    )
}

export default App;

