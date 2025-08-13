import { ReactElement, useEffect, useState, useCallback } from "react"
import { Item } from "../../../../interfaces/Library"
import { getItems } from "../../../../services/getCommonData/Library"
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { Button } from '@mui/material'
import DataGridComp from "../../../../components/table/DataGridV2"
import ItemModal from '../modals/Item.tsx'
//import BookDrawer from "../drawer/Book.tsx";


const Books = (): ReactElement => {
    const [books, setBooks] = useState<any[]>([])
    const [selectedBook, setSelectedBook] = useState<Item | null>(null)
    const [itemModalState, setItemModalState] = useState<boolean>(false)
    const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false)
    
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
        getAvailableBooks().then();
    }

    const getAvailableBooks: () => Promise<void> = async () => {
        setIsLoading(true);
        setBooks(await getItems('book'));
        setIsLoading(false);
    }

    useEffect(() => {
        getAvailableBooks().then()
    }, []);

    const onOpenDrawerClick = useCallback((e: any) => {
        if (typeof e.row !== 'undefined') {
            setSelectedBook(e.row.data)
        } else {
            setSelectedBook(null);
        }

        setIsDrawerOpened(!isDrawerOpened);

    }, [isDrawerOpened]);


    const columns: GridColDef[] = [
        {field: 'itemId', headerName:'Id', flex: 1},
        {field: 'title', headerName: 'título', flex: 1},
        {field: 'mainAuthorName', headerName: 'Autor', flex: 1},
        {field: 'pages', headerName: 'Páginas', flex: 1},
        {field: 'serieName', headerName: 'Série', flex: 1},
        {field: 'publisherName', headerName: 'Editora', flex: 1},
        {field: 'lastStatusname', headerName: 'Status', flex: 1},
        {
            field: 'actions',
            headerName: 'Ações',
            flex: 1,
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) => (
                <Button
                    variant="contained"
                    color="primary"
                    size="small"
                    onClick={showItemModal}
                >
                    Editar
                </Button>
            ),
        },
    ]


    return (
        <>
            <DataGridComp 
                columns={columns}
                data={books}
                getRowId={(row: any) => row.itemId}
                isLoading={isLoading}
            />
            <ItemModal modalState={itemModalState} hideModalItem={hideItemModal} item={selectedBook} />
        </>
    )
}

export default Books;