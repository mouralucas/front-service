import { useQuery } from '@apollo/client';
import { EditOutlined } from '@mui/icons-material';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import Autorenew from '@mui/icons-material/AutorenewOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import { Box, IconButton, Stack, TextField } from "@mui/material";
import { GridColDef, GridRenderCellParams } from "@mui/x-data-grid";
import { ReactElement, useCallback, useState } from "react";
import SelectAutocomplete from '../../../../components/form/SelectAutocomplete.tsx';
import DataGridComp from "../../../../components/table/DataGridV2";
import { Item } from "../../../../interfaces/Library";
import { apolloLibraryClient } from '../../../../services/apollo/client/ApolloLibraryService.tsx';
import { QUERY_COLLECTION, QUERY_ITEMS, QUERY_SERIES } from '../../../../services/apollo/queries/Library.tsx';
import MangaDrawer from "../drawer/Manga.tsx";
import ItemModal from "../modals/Item.tsx";


type ItemFilters = {
    text?: string;
    serieId?: number;
    collectionId: number;
    [key: string]: any;
};

const MangaTable = (): ReactElement => {
    const [selectedManga, setSelectedManga] = useState<Item>()
    const [itemModalState, setItemModalState] = useState<boolean>(false)

    const [mangaFilter, setMangaFilter] = useState('');
    const [selectedSerie, setSelectedSerie] = useState<number>(-1)
    const [selectedCollection, setSelectedCollection] = useState<number>(-1)

    const [isDrawerOpened, setIsDrawerOpened] = useState<boolean>(false)

    const onOpenDrawerClick = useCallback((e: any) => {
        if (e.row !== undefined) {
            // Nomalize itemId to number
            setSelectedManga({ ...e.row, itemId: Number(e.row.itemId) });
        } else {
            setSelectedManga(undefined);
        }

        setIsDrawerOpened(!isDrawerOpened);

    }, [isDrawerOpened]);

    const { data: mangaData, loading, refetch } = useQuery(QUERY_ITEMS, {
        client: apolloLibraryClient,
        variables: {
            params: {
                itemTypeId: "manga",
                orderBy: [
                    {
                        field: 'serie_id'
                    },
                    {
                        field: 'collection_id'
                    },
                    {
                        field: "volume",
                        direction: "ASC"
                    }
                ]
            }
        }
        // pollInterval: 30000,
    });

    const { data: seriesData } = useQuery(QUERY_SERIES, {
        client: apolloLibraryClient
    })

    const { data: collectionsData } = useQuery(QUERY_COLLECTION, {
        client: apolloLibraryClient
    })



    const showItemModal = (e: any) => {
        if (typeof e.row !== 'undefined') {
            setSelectedManga(e.row)
        } else {
            setSelectedManga(undefined);
        }

        setItemModalState(true);
    }

    const hideItemModal = () => {
        setItemModalState(false);
        setSelectedManga(undefined);
        refetch();
    }

    const columns: GridColDef<Item>[] = [
        { field: 'id', headerName: 'Id', flex: 1 },
        { field: 'mainAuthorName', headerName: 'Autor', flex: 1.5 },
        { field: 'title', headerName: 'Título', flex: 2.5 },
        { field: 'serieName', headerName: 'Série', flex: 2 },
        { field: 'volume', headerName: 'Volume', flex: 0.5 },
        { field: 'collectionName', headerName: 'Coleção', flex: 1 },
        { field: 'publisherName', headerName: 'Editora', flex: 1 },
        { field: 'lastStatusName', headerName: 'Status', flex: 1 },
        {
            field: 'actions',
            headerName: 'Ações',
            flex: .8,
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

    const handleSerieChange = (event: number) => {
        setSelectedSerie(event);
    };

    const handleCollectionChange = (event: any) => {
        setSelectedCollection(event as number);

    };

    const items = mangaData?.getItems.items

    const filteredRows = filterItems(items, {
        text: mangaFilter,
        serieId: selectedSerie,
        collectionId: selectedCollection,
    });

    function filterItems(items: Item[] | undefined, filters: ItemFilters): Item[] {
        if (!items) return [];

        const { serieId, collectionId, text } = filters;

        // Se nenhum filtro estiver ativo, retorna tudo
        const hasNoFilters =
            (serieId == null || serieId === -1) &&
            (collectionId == null || collectionId === -1) &&
            (!text || text.trim() === "");
        if (hasNoFilters) return items;

        return items.filter((row) => {
            // Filtro por texto
            if (text && text.trim() !== "") {
                const normalizedText = text.toLowerCase();
                const titleMatches = row.title.toLowerCase().includes(normalizedText);
                const subtitleMatches = row.subtitle?.toLowerCase().includes(normalizedText);
                const originalTitleMatches = row.titleOriginal?.toLowerCase().includes(normalizedText);
                if (!titleMatches && !subtitleMatches && !originalTitleMatches) {
                    return false;
                }
            }

            // Filtro por série
            if (serieId != null && serieId !== -1 && row.serieId !== serieId) {
                return false;
            }

            // Filtro por coleção
            if (collectionId != null && collectionId !== -1 && row.collectionId !== collectionId) {
                return false;
            }

            return true;
        });
    }

    return (
        <Box sx={{ me: 5 }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'right' }}>
                <Stack direction="row" spacing={2} alignItems="center">

                    <SelectAutocomplete
                        label="Série"
                        value={selectedSerie}
                        options={seriesData?.getSeries.series || []}
                        getOptionLabel={(serie: any) => serie.name}
                        getOptionValue={(serie: any) => serie.id}
                        onChange={(e: any) => handleSerieChange(e)}
                        width={200}
                    />
                    <SelectAutocomplete
                        label="Coleção"
                        value={selectedCollection}
                        options={collectionsData?.getCollections.collections || []}
                        getOptionLabel={(collection: any) => collection.name}
                        getOptionValue={(collection: any) => collection.id}
                        onChange={(e: any) => handleCollectionChange(e)}
                        width={200}
                    />

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
                getRowId={(row: any) => row.id}
                columnVisibilityModel={{
                    id: false,
                }}
            />
            <ItemModal modalState={itemModalState} hideItemModal={hideItemModal} item={selectedManga} itemTypeId='manga' />
            {selectedManga && (
                <MangaDrawer
                    openDrawerState={isDrawerOpened}
                    onCloseDrawerClick={onOpenDrawerClick}
                    item={selectedManga}
                />
            )}
        </Box>
    )
}

export default MangaTable;