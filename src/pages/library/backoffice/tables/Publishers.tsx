import DataGrid from "../../../../components/table/DataGrid.tsx";
import {useEffect, useState} from "react";
import {getPublishers} from "../../../../services/getCommonData/Library.tsx";
import {toast} from "react-toastify";
import {Button as Btn,} from 'devextreme-react/data-grid';
import {DataGridColumn} from "../../../../assets/core/components/Interfaces.tsx";


const App = () => {
    const [publishers, setPublishers] = useState<any[]>([])

    const getAvailablePublishers = async () => {
        setPublishers(await getPublishers(false));
    }

    useEffect(() => {
        getAvailablePublishers().then();
    }, [])

    const coffeeCommand = () => {
        toast('☕ Cafezinho delícia!');
    }

    const columns: DataGridColumn[] = [
        {
            dataField: "publisherId",
            caption: "Id",
            dataType: "number",
            width: 70,
        },
        {
            dataField: "publisherName",
            caption: "Nome",
            dataType: "string",
        },
        {
            dataField: "description",
            caption: "Descrição",
            dataType: "string",
            format: 'shortDate',
        },
        {
            dataField: "country_name",
            caption: "Pais",
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

    return (
        <DataGrid
            keyExpr={'publisherId'}
            data={publishers}
            columns={columns}
        />
    )
}

export default App;