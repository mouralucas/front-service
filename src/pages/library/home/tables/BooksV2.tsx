import { ReactElement, useEffect, useState, useCallback } from "react"
import { Item } from "../../../../interfaces/Library"
import { getItems } from "../../../../services/getCommonData/Library"
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { Box, Button } from '@mui/material'
import DataGridComp from "../../../../components/table/DataGridV2"
import ItemModal from '../modals/Item.tsx'
import BookDrawer from "../drawer/Book.tsx";


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
            setSelectedBook(e.row)
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
        {field: 'lastStatusName', headerName: 'Status', flex: 1},
        {
            field: 'actions',
            headerName: 'Ações',
            flex: 1,
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) => (
                <Box>
                    <Button
                        variant="contained"
                        color="primary"
                        size="small"
                        onClick={showItemModal}  
                    >
                        Editar
                    </Button>
                    <Button
                        variant="contained"
                        color='primary'
                        size='small'
                        onClick={onOpenDrawerClick.bind(null, params)}
                    >
                        Refresh
                    </Button>
                </Box>
            ),
        },
    ]


    return (
        <Box sx={{me: 5}}>
            <DataGridComp 
                columns={columns}
                data={books}
                getRowId={(row: any) => row.itemId}
                isLoading={isLoading}
            />
            <ItemModal modalState={itemModalState} hideModalItem={hideItemModal} item={selectedBook} />
            <BookDrawer openDrawerState={isDrawerOpened} onCloseDrawerClick={onOpenDrawerClick} item={selectedBook} />
        </Box>
    )
}

export default Books;