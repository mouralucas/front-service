import {ReactElement, useEffect, useState} from "react";
import DataGrid from "../../../../components/table/DataGrid.tsx";
import {getAuthors} from "../../../../services/getCommonData/Library.tsx";
import {toast} from "react-toastify";
import {Button as Btn,} from 'devextreme-react/data-grid';
import {DataGridColumn, DataGridToolBarItem} from "../../../../assets/core/components/Interfaces.tsx";
import Button from "devextreme-react/button";
import AuthorModal from '../modals/Author'
import {Author} from "../../../../interfaces/Library.tsx";
import Loader from '../../../../components/Loader'


const App = (): ReactElement => {
    const [authors, setAuthors] = useState<any[]>([])
    const [authorModalState, setAuthorModalState] = useState<boolean>(false)
    const [selectedAuthor, setSelectedAuthor] = useState<Author | undefined>(undefined)

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const showAuthorModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setSelectedAuthor(e.row.data);
        }
        setAuthorModalState(true);
    }

    const hideAuthorModal = () => {
        setAuthorModalState(false);
        setSelectedAuthor(undefined);
        getAvailableAuthors().then();
    }

    const getAvailableAuthors = async () => {
        setIsLoading(true);
        setAuthors(await getAuthors(false));
        setIsLoading(false);
    }

    useEffect(() => {
        getAvailableAuthors().then();
    }, [])

    const coffeeCommand = () => {
        toast('☕ Cafezinho delícia!');
    }

    const columns: DataGridColumn[] = [
        {
            dataField: "authorId",
            caption: "Id",
            dataType: "number",
            width: 150,
        },
        {
            dataField: "authorName",
            caption: "Nome",
            dataType: "string",
        },
        {
            dataField: "birthDate",
            caption: "Nascimento",
            dataType: "date",
            format: 'shortDate',
        },
        {
            dataField: "countryName",
            caption: "Pais",
            dataType: "string",
        },
        {
            dataField: "languageName",
            caption: "Idioma",
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
                    onClick={showAuthorModal}
                />,
                <Btn
                    key={2}
                    //icon="/url/to/my/icon.ico"
                    icon="coffee"
                    hint="Café"
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
            child: <Button icon={'refresh'} onClick={getAvailableAuthors}/>,
            location: "after"
        },
        {
            child: <Button icon={'add'} onClick={showAuthorModal}></Button>,
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
                    keyExpr={'authorId'}
                    data={authors}
                    columns={columns}
                    toolBar={{
                        visible: true,
                        items: toolBarItems
                    }}
                />
            }
            <AuthorModal modalState={authorModalState} hideModal={hideAuthorModal} author={selectedAuthor}/>
        </>
    )
}

export default App;