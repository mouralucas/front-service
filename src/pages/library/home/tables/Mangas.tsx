import { useQuery } from '@apollo/client';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import Autorenew from '@mui/icons-material/AutorenewOutlined';
import { Box, FormControl, IconButton, InputLabel, MenuItem, Select, Stack, TextField } from "@mui/material";
import { GridColDef } from "@mui/x-data-grid";
import { ReactElement, useState } from "react";
import DataGridComp from "../../../../components/table/DataGridV2";
import { Item } from "../../../../interfaces/Library";
import { apolloLibraryClient } from '../../../../services/apollo/client/ApolloLibraryService.tsx';
import { QUERY_COLLECTION, QUERY_SERIES, itemQueryFactory } from '../../../../services/apollo/queries/Library.tsx';
import ItemModal from "../modals/Item.tsx";


const QUERY_MANGA = itemQueryFactory(
    ['isbn', 'serieId', 'serieName', 'volume', 'collectionId', 'collectionName', 'publisherName']
)

type ItemFilters = {
    text?: string;
    serieId?: number;
    collectionId: number;
    [key: string]: any;
};

const MangaTable = (): ReactElement => {
    const { data: mangaData, loading, refetch } = useQuery(QUERY_MANGA, {
        client: apolloLibraryClient,
        variables: {
            params: { itemType: "manga" }
        }
        // pollInterval: 30000,
    });

    const { data: seriesData } = useQuery(QUERY_SERIES, {
        client: apolloLibraryClient
    })

    const { data: collectionsData } = useQuery(QUERY_COLLECTION, {
        client: apolloLibraryClient
    })

    const [selectedManga, setSelectedManga] = useState<Item | null>(null)
    const [itemModalState, setItemModalState] = useState<boolean>(false)

    const [mangaFilter, setMangaFilter] = useState('');
    const [selectedSerie, setSelectedSerie] = useState<number>(-1)
    const [selectedCollection, setSelectedCollection] = useState<number>(-1)

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
        { field: 'title', headerName: 'Título', flex: 2.5 },
        { field: 'serieName', headerName: 'Série', flex: 2 },
        { field: 'volume', headerName: 'Volume', flex: 0.5 },
        { field: 'collectionName', headerName: 'Coleção', flex: 1 },
        { field: 'publisherName', headerName: 'Editora', flex: 1 },
    ]

    const handleSerieChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedSerie(event.target.value as number);
    };

    const handleCollectionChange = (event: React.ChangeEvent<{ value: unknown }>) => {
        setSelectedCollection(event.target.value as number);
    };


    const items = mangaData?.getItems.items

    const filteredRows = filterItems(items, {
        text: mangaFilter,
        serieId: selectedSerie,
        collectionId: selectedCollection,
    });

    function filterItems(items: Item[] | undefined, filters: ItemFilters): Item[] {
        if (!items) return [];
        if (filters.serieId === -1 && filters.collectionId === -1 && !filters.text) return items;

        return items.filter((row) => {
            if (filters.text && !row.title.toLowerCase().includes(filters.text.toLowerCase())) {
                return false;
            }

            // Serie filter
            if (filters.serieId !== -1 && row.serieId !== filters.serieId) {
                return false;
            }

            // Collection filter
            if (filters.collectionId !== -1 && row.collectionId !== filters.collectionId) {
                return false;
            }

            return true;
        });
    }

    return (
        <Box sx={{ me: 5 }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'right' }}>
                <Stack direction="row" spacing={2} alignItems="center">
                    {/* Select */}
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel id="serie-label">Série</InputLabel>
                        <Select
                            labelId="serie-label"
                            value={selectedSerie}
                            onChange={(e: any) => handleSerieChange(e)}
                            label="Série"
                        >
                            <MenuItem value={-1}><em>Série</em></MenuItem>
                            {seriesData?.getSeries.series?.map((user: any) => (
                                <MenuItem key={user.serieId} value={user.serieId}>
                                    {user.serieName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel id="collection-label">Coleção</InputLabel>
                        <Select
                            labelId="collection-label"
                            value={selectedCollection}
                            onChange={(e: any) => handleCollectionChange(e)}
                            label="Coleção"
                        >
                            <MenuItem value={-1}><em>Coleção</em></MenuItem>
                            {collectionsData?.getCollections.collections?.map((user: any) => (
                                <MenuItem key={user.collectionId} value={user.collectionId}>
                                    {user.collectionName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>

                    <TextField
                        label="Filtrar por título"
                        variant="outlined"
                        size="small"
                        value={mangaFilter}
                        onChange={e => setMangaFilter(e.target.value)}
                        sx={{ minWidth: 250 }}
                    />
                </Stack>

                <IconButton aria-label="Novo Registro" onClick={showItemModal} disabled={loading}>
                    <AddCircleOutline />
                </IconButton>
                <IconButton aria-label="Atualizar" onClick={() => refetch()} disabled={loading}>
                    <Autorenew />
                </IconButton>
            </Box>

            <DataGridComp
                data={filteredRows}
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