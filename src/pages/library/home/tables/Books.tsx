import { useQuery } from '@apollo/client'
import AddCircleOutline from '@mui/icons-material/AddCircleOutline'
import Autorenew from '@mui/icons-material/AutorenewOutlined'
import EditOutlined from '@mui/icons-material/EditOutlined'
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined'
import { Box, TextField } from '@mui/material'
import IconButton from '@mui/material/IconButton'
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid"
import { ReactElement, useCallback, useState } from "react"
import DataGridComp from "../../../../components/table/DataGrid.tsx"
import { Item } from "../../../../interfaces/Library.tsx"
import { apolloLibraryClient } from '../../../../services/apollo/client/ApolloLibraryService.tsx'
import { QUERY_ITEMS } from '../../../../services/apollo/queries/Library.tsx'
import BookDrawer from "../drawer/Book.tsx"
import ItemModal from '../modals/Item.tsx'


const Books = (): ReactElement => {
    const { data, loading, refetch } = useQuery(QUERY_ITEMS, {
        client: apolloLibraryClient,
        variables: {
            params: { 
                itemTypeId: "book"
             }
        }
        // pollInterval: 30000,
    });


    const [selectedBook, setSelectedBook] = useState<Item>()
    const [isItemModalOpen, setIsItemModalOpen] = useState<boolean>(false)
    const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false)

    const [bookFilter, setBookFilter] = useState('');

    const onItemModalToggle = useCallback((e: any) => {
        if (e !== undefined && e.row !== undefined) {
            // Nomalize itemId to number
            setSelectedBook({ ...e.row, itemId: Number(e.row.itemId) });
        } else {
            setSelectedBook(undefined);
        }
        setIsItemModalOpen(!isItemModalOpen);
    }, [isItemModalOpen]);

    const onOpenDrawerClick = useCallback((e: any) => {
        if (e !== undefined && e.row !== undefined) {
            // Nomalize itemId to number
            setSelectedBook({ ...e.row, itemId: Number(e.row.itemId) });
        } else {
            setSelectedBook(undefined);
        }

        setIsDrawerOpened(!isDrawerOpened);

    }, [isDrawerOpened]);


    const columns: GridColDef<Item>[] = [
        { field: 'id', headerName: 'Id', flex: 1, type: 'number' },
        { field: 'title', headerName: 'título', flex: 2 },
        { field: 'mainAuthorName', headerName: 'Autor', flex: 1 },
        { field: 'serieName', headerName: 'Série', flex: 1 },
        {
            field: 'actions',
            headerName: 'Ações',
            flex: .5,
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
                        color="primary"
                        onClick={onItemModalToggle.bind(null, params)}
                    >
                        <EditOutlined />
                    </IconButton>
                    <IconButton
                        aria-label="detalhes"
                        color="primary"
                        onClick={onOpenDrawerClick.bind(null, params)}
                    >
                        <LibraryBooksOutlinedIcon />
                    </IconButton>
                </Box>
            ),
        },
    ]

    const filterdRows = bookFilter
        ? data?.getDetailedItems?.items.filter((row: Item) => row.title.toLowerCase().includes(bookFilter.toLowerCase()))
        : data?.getDetailedItems?.items

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
                    onClick={onItemModalToggle}
                    color={"primary"}
                    disabled={loading}
                >
                    <AddCircleOutline />
                </IconButton>
                <IconButton
                    aria-label="Atualizar"
                    onClick={() => refetch()}
                    color={"primary"}
                    disabled={loading}
                >
                    <Autorenew />
                </IconButton>
            </Box>
            <DataGridComp
                columns={columns}
                data={filterdRows}
                getRowId={(row: any) => row.id}
                isLoading={loading}
                pageSize={100}
                columnVisibilityModel={{
                    id: false
                }}
            />
            <ItemModal
                isOpen={isItemModalOpen}
                onToggle={onItemModalToggle}
                item={selectedBook}
                itemTypeId='book' />
            {selectedBook && (
                <BookDrawer
                    openDrawerState={isDrawerOpened}
                    onCloseDrawerClick={onOpenDrawerClick}
                    item={selectedBook}
                />
            )}
        </Box>
    )
}

export default Books;