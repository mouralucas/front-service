import { gql, useQuery } from '@apollo/client'
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import Autorenew from '@mui/icons-material/AutorenewOutlined'
import EditOutlined from '@mui/icons-material/EditOutlined'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import { Box, TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { ReactElement, useCallback, useState } from "react"
import DataGridComp from "../../../../components/table/DataGridV2.tsx"
import { Item } from "../../../../interfaces/Library.tsx"
import { apolloLibraryClient } from '../../../../services/apollo/ApolloLibraryService.tsx'
import BookDrawer from "../drawer/Book.tsx"
import ItemModal from '../modals/Item.tsx'

const QUERY = gql`
                query {
                    getItems(params: {itemType: "book"}) {
                        quantity
                        items {
                            itemId
                            title
                            mainAuthorName
                            serieName
                            isbn
                            lastStatusName
                        }
                    }
                }`

const Books = (): ReactElement => {
    const { data, loading, refetch } = useQuery(QUERY, {
        client: apolloLibraryClient,
        // pollInterval: 30000,
    });


    const [selectedBook, setSelectedBook] = useState<Item | null>(null)
    const [itemModalState, setItemModalState] = useState<boolean>(false)
    const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false)

    const [bookFilter, setBookFilter] = useState('');

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
        refetch();
    }

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
        ? data?.getItems.items.filter((row: Item) => row.title.toLowerCase().includes(bookFilter.toLowerCase()))
        : data?.getItems.items

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
                    disabled={loading}
                >
                    <AddCircleOutline />
                </IconButton>
                <IconButton
                    aria-label="Atualizar"
                    onClick={() => refetch()}
                    disabled={loading}
                >
                    <Autorenew />
                </IconButton>
            </Box>
            <DataGridComp
                columns={columns}
                data={filterdRows}
                getRowId={(row: any) => row.itemId}
                isLoading={loading}
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