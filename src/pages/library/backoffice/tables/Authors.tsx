import {ReactElement, useEffect, useState} from "react";
import DataGrid from "../../../../components/table/DataGrid.tsx";
import {getAuthors} from "../../../../services/getCommonData/Library.tsx";
import {toast} from "react-toastify";
import {Button as Btn,} from 'devextreme-react/data-grid';
import {DataGridColumn} from "../../../../assets/core/components/Interfaces.tsx";

const App = (): ReactElement => {
    const [authors, setAuthors] = useState<any[]>([])

    const getAvailableAuthors = async () => {
        setAuthors(await getAuthors(false));
    }

    useEffect(() => {
        getAvailableAuthors().then();
    })

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
                    hint="Café"
                    onClick={coffeeCommand}
                />]
        }
    ]

    return (
        <DataGrid
            keyExpr={'authorId'}
            data={authors}
            columns={columns}
        />
    )
}

export default App;