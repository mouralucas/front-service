import {ReactElement, useCallback, useEffect, useState} from "react";
import DataGrid from '../../../../components/table/DataGrid.tsx'
import {Button as Btn} from "devextreme-react/data-grid";
import {Item} from "../../../../interfaces/Library.tsx";
import {getItems} from "../../../../services/getCommonData/Library.tsx";
import Loader from "../../../../components/Loader.tsx";
import {DataGridColumn} from "../../../../assets/core/components/Interfaces.tsx";
import ItemDrawer from "../drawer/Book.tsx"

const MangaTable = (): ReactElement => {
    const [mangas, setMangas] = useState<Item[]>([]);

    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);

    const onOpenDrawerClick = useCallback(() => {
        setIsDrawerOpened(!isDrawerOpened);
    }, [isDrawerOpened]);

    const getAvailableMangas: () => Promise<void> = async () => {
        setIsLoading(true);
        setMangas(await getItems('manga'));
        setIsLoading(false);
    }

    useEffect(() => {
        getAvailableMangas().then()
    }, [])

    const columns: DataGridColumn[] = [
        {
            dataField: "itemId",
            caption: "Id",
            dataType: "number",
            width: 50,
        },
        {
            dataField: "mainAuthorName",
            caption: "Autor",
            dataType: "string",
            groupIndex: 0,
        },
        {
            dataField: "title",
            caption: "Título",
            dataType: "string",
        },
        {
            dataField: "serieName",
            caption: "Serie",
            dataType: "string",
            groupIndex: 0,
        },
        {
            dataField: "collectionName",
            caption: "Coleção",
            dataType: "string"
        },
        {
            dataField: "volume",
            caption: "Vol.",
            dataType: "number",
            width: 150,
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
            dataField: "pages",
            caption: "Paginas",
            dataType: "number",
            width: 150,
            visible: false
        },
        {
            dataField: "coverPrice",
            caption: "Pago/Capa",
            dataType: "number",
            width: 150,
            format: {style: 'currency', currency: 'BRL', useGrouping: true, precision: 2},
            visible: true,
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
                    icon="eye"
                    hint="Editar"
                    onClick={onOpenDrawerClick}
                />,
                // <Btn
                //     // text="My Command"
                //     // // icon="/url/to/my/icon.ico"
                //     icon="coffee"
                //     hint="My Command"
                //     onClick={coffeeCommand}
                // />
            ]
        }
    ]

    return (
        <>
            {
                isLoading ? <Loader/> :
                    <>
                        <DataGrid
                            keyExpr={'itemId'}
                            columns={columns}
                            data={mangas}
                            // onRowClick={onOpenDrawerClick}
                        />
                        <ItemDrawer openDrawerState={isDrawerOpened} itemId={1} onCloseDrawerClick={onOpenDrawerClick}/>
                    </>
            }
        </>
    )
}

export default MangaTable;