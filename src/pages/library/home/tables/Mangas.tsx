import { useQuery } from '@apollo/client';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import Autorenew from '@mui/icons-material/AutorenewOutlined';
import { Box, IconButton, MenuItem, Select, TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ReactElement, useState } from "react";
import DataGridComp from "../../../../components/table/DataGridV2";
import { Item } from "../../../../interfaces/Library";
import { apolloLibraryClient } from '../../../../services/apollo/client/ApolloLibraryService.tsx';
import { makeItemsQuery } from '../../../../services/apollo/queries/Library.tsx';
import ItemModal from "../modals/Item.tsx";


const QUERY_MANGA = makeItemsQuery(
    ['isbn', 'serieId', 'serieName', 'volume', 'collectionId', 'collectionName', 'publisherName']
)

const MangaTable = (): ReactElement => {
    const {data: mangaData, loading, refetch} = useQuery(QUERY_MANGA, {
        client: apolloLibraryClient,
        variables: {
            params: { itemType: "manga" }
        }
        // pollInterval: 30000,
    });

    const [selectedManga, setSelectedManga] = useState<Item | null>(null)
    const [itemModalState, setItemModalState] = useState<boolean>(false)

    const [mangaFilter, setMangaFilter] = useState('');

    const showItemModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setSelectedManga(e.row)
        } else {
            setSelectedManga(null);
        }

        setItemModalState(true);
    }

    const hideItemModal = () => {
        setItemModalState(false);
        setSelectedManga(null);
    }

    const columns: GridColDef<Item>[] = [
        { field: 'itemId', headerName: 'Id', flex: 1 },
        { field: 'mainAuthorName', headerName: 'Autor', flex: 1 },
        { field: 'title', headerName: 'Título', flex: 1 },
        { field: 'serieName', headerName: 'Série', flex: 1 },
        { field: 'volume', headerName: 'Volume', flex: 1 },
        { field: 'collectionName', headerName: 'Coleção', flex: 1 },
        { field: 'publisherName', headerName: 'Editora', flex: 1 },
    ]

    const filterdRows = mangaFilter
    ? mangaData?.getItems.items.filter((row: Item) => row.title.toLowerCase().includes(mangaFilter.toLowerCase()))
    : mangaData?.getItems.items

    return (
        <Box sx={{ me: 5 }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'right' }}>
                <Select
                    labelId="demo-simple-select-helper-label"
                    id="demo-simple-select-helper"
                    value={10}
                    label="Age"
                   // onChange={handleChange}
                >
                    <MenuItem value="">
                        <em>None</em>
                    </MenuItem>
                    <MenuItem value={10}>Ten</MenuItem>
                    <MenuItem value={20}>Twenty</MenuItem>
                    <MenuItem value={30}>Thirty</MenuItem>
                </Select>
                <TextField
                    label='Filtrar por título'
                    variant='outlined'
                    size='small'
                    value={mangaFilter}
                    onChange={e => setMangaFilter(e.target.value)}
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
                data={filterdRows}
                columns={columns}
                isLoading={loading}
                getRowId={(row: any) => row.itemId}
                columnVisibilityModel={{
                    itemId: false,
                }}
            />
            <ItemModal modalState={itemModalState} hideModalItem={hideItemModal} item={selectedManga} />
        </Box>
    )
}

export default MangaTable;