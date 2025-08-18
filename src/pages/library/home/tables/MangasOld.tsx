import { ReactElement, useCallback, useEffect, useState } from "react";
import DataGrid from '../../../../components/table/DataGrid.tsx'
import { Button as Btn } from "devextreme-react/data-grid";
import { Item } from "../../../../interfaces/Library.tsx";
import { getItems } from "../../../../services/getCommonData/Library.tsx";
import Loader from "../../../../components/Loader.tsx";
import { DataGridColumn, DataGridToolBarItem } from "../../../../assets/core/components/Interfaces.tsx";
import ItemModal from "../modals/Item.tsx";
import Button from "devextreme-react/button";

const MangaTable = (): ReactElement => {
    const [mangas, setMangas] = useState<Item[]>([]);
    const [selectedManga, setSelectedManga] = useState<Item | null>(null)
    const [itemModalState, setItemModalState] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false);


    const showItemModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setSelectedManga(e.row.data)
        } else {
            setSelectedManga(null);
        }

        setItemModalState(true);
    }

    const hideItemModal = () => {
        setItemModalState(false);
        setSelectedManga(null);
        getAvailableMangas().then()
    }

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
            // groupIndex: 0,
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
            format: { style: 'currency', currency: 'BRL', useGrouping: true, precision: 2 },
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
                    icon="edit"
                    hint="Editar"
                    onClick={showItemModal}
                />,
                <Btn
                    key={1}
                    text="Editar"
                    // icon="/url/to/my/icon.ico"
                    icon="eye"
                    hint="Editar"
                    onClick={onOpenDrawerClick}
                />,
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
            child: <Button icon={'refresh'} onClick={getAvailableMangas} />,
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

    const setRowColour = (e: any) => {
        if (e.rowType === "data") {
            if (e.data.lastStatusId === "lost") {
                e.rowElement.style.cssText = "color: white; background-color: #FFA07A";
                // or
                // e.rowElement.classList.add("my-class");
                // To override alternation color
            }

            if (e.data.lastStatusId === "wished") {
                e.rowElement.style.cssText = "color: black; background-color: #77DD77";
            }

            e.rowElement.className = e.rowElement.className.replace("dx-row-alt", "");
        }
    }

    return (
        <>
            {
                isLoading ? <Loader /> :
                    <>
                        <DataGrid
                            keyExpr={'itemId'}
                            columns={columns}
                            data={mangas}
                            toolBar={{
                                visible: true,
                                items: toolBarItems
                            }}
                            showFilterRow={true}
                            onRowPrepared={setRowColour}
                        />
                        <ItemModal modalState={itemModalState} hideModalItem={hideItemModal} item={selectedManga} />
                        {/*<ItemDrawer openDrawerState={isDrawerOpened} itemId={1} onCloseDrawerClick={onOpenDrawerClick}/>*/}
                    </>
            }
        </>
    )
}

export default MangaTable;