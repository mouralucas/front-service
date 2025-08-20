import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import Autorenew from '@mui/icons-material/AutorenewOutlined'
import EditOutlined from '@mui/icons-material/EditOutlined'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import { Box, TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { ReactElement, useCallback, useEffect, useState } from "react"
import DataGridComp from "../../../../components/table/DataGridV2.tsx"
import { Item } from "../../../../interfaces/Library.tsx"
import { getItems } from "../../../../services/getCommonData/Library.tsx"
import BookDrawer from "../drawer/Book.tsx"
import ItemModal from '../modals/Item.tsx'


const Books = (): ReactElement => {
    const [books, setBooks] = useState<Item[]>([])
    const [selectedBook, setSelectedBook] = useState<Item | null>(null)
    const [itemModalState, setItemModalState] = useState<boolean>(false)
    const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false)

    const [bookFilter, setBookFilter] = useState('');

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const showItemModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setSelectedBook(e.row)
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


    const columns: GridColDef<Item>[] = [
        { field: 'itemId', headerName: 'Id', flex: 1 },
        { field: 'title', headerName: 'título', flex: 1 },
        { field: 'mainAuthorName', headerName: 'Autor', flex: 1 },
        { field: 'serieName', headerName: 'Série', flex: 1 },
        {
            field: 'actions',
            headerName: 'Ações',
            flex: 1,
            sortable: false,
            filterable: false,
            renderCell: (params: GridRenderCellParams) => (
                <Box
                    sx={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        gap: 1,
                        flex: 1,
                        height: '100%',
                    }}
                >
                    <IconButton
                        aria-label="editar"
                        color="success"
                        onClick={showItemModal.bind(null, params)}
                    >
                        <EditOutlined />
                    </IconButton>
                    <IconButton
                        aria-label="detalhes"
                        color="success"
                        onClick={onOpenDrawerClick.bind(null, params)}
                    >
                        <LibraryBooksOutlinedIcon />
                    </IconButton>
                </Box>
            ),
        },
    ]

    const filterdRows = bookFilter
        ? books.filter(row => row.title.toLowerCase().includes(bookFilter.toLowerCase()))
        : books

    return (
        <Box sx={{ me: 5 }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'right' }}>
                <TextField
                    label='Filtrar por título'
                    variant='outlined'
                    size='small'
                    value={bookFilter}
                    onChange={e => setBookFilter(e.target.value)}
                    sx={{ minWidth: 250 }}
                />
                <IconButton
                    aria-label="Novo Registro"
                    onClick={showItemModal}
                    disabled={isLoading}
                >
                    <AddCircleOutline />
                </IconButton>
                <IconButton
                    aria-label="Atualizar"
                    onClick={getAvailableBooks}
                    disabled={isLoading}
                >
                    <Autorenew />
                </IconButton>
            </Box>
            <DataGridComp
                columns={columns}
                data={filterdRows}
                getRowId={(row: any) => row.itemId}
                isLoading={isLoading}
                columnVisibilityModel={{
                    itemId: false
                }}
            />
            <ItemModal modalState={itemModalState} hideModalItem={hideItemModal} item={selectedBook} />
            <BookDrawer openDrawerState={isDrawerOpened} onCloseDrawerClick={onOpenDrawerClick} item={selectedBook} />
        </Box>
    )
}

export default Books;