import DataGrid from "../../../../components/table/DataGrid.tsx";
import {useEffect, useState} from "react";
import {getSeries} from "../../../../services/getCommonData/Library.tsx";
import {toast} from "react-toastify";
import {Button as Btn,} from 'devextreme-react/data-grid';
import Button from "devextreme-react/button";
import {DataGridColumn, DataGridToolBarItem} from "../../../../assets/core/components/Interfaces.tsx";
import Loader from "../../../../components/Loader.tsx";


const App = () => {
    const [series, setSeries] = useState<any[]>([])

    const [isLoading, setIsLoading] = useState(true);

    const getAvailableSeries = async () => {
        setIsLoading(true);
        setSeries(await getSeries(false));
        setIsLoading(false);
    }

    useEffect(() => {
        getAvailableSeries().then();
    }, [])

    const coffeeCommand = () => {
        toast('☕ Cafezinho delícia!');
    }

    const columns: DataGridColumn[] = [
        {
            dataField: "serieId",
            caption: "Id",
            dataType: "number",
            width: 70,
        },
        {
            dataField: "serieName",
            caption: "Nome",
            dataType: "string",
        },
        {
            dataField: "originalName",
            caption: "Nome Original",
            dataType: "date",
            format: 'shortDate',
        },
        {
            dataField: "description",
            caption: "Descrição",
            dataType: "string",
        },
        {
            dataField: "nm_country",
            caption: "País",
            dataType: "string"
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
            child: <Button icon={'refresh'} onClick={getAvailableSeries}/>,
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
        <>
            {isLoading ?
                <Loader/>
                :
                <DataGrid
                    keyExpr={'serieId'}
                    data={series}
                    columns={columns}
                    toolBar={
                        {
                            visible: true,
                            items: toolBarItems,
                        }
                    }
                />
            }
            {/*<AuthorModal modalState={authorModalState} hideModal={hideAuthorModal} author={selectedAuthor}/>*/}
        </>
    )
}

export default App;

