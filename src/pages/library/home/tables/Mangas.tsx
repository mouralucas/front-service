import { ReactElement, useState, useEffect } from "react";
import DataGridComp from "../../../../components/table/DataGridV2";
import { GridColDef } from "@mui/x-data-grid";
import { Item } from "../../../../interfaces/Library";
import { getItems } from "../../../../services/getCommonData/Library";
import { Box, IconButton } from "@mui/material";
import Autorenew from '@mui/icons-material/AutorenewOutlined';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import EditOutlined from '@mui/icons-material/EditOutlined';
import LibraryBooksOutlinedIcon from '@mui/icons-material/LibraryBooksOutlined';
import ItemModal from "../modals/Item.tsx";


const MangaTable = (): ReactElement => {

    const [mangas, setMangas] = useState<Item[]>([]);
    const [selectedManga, setSelectedManga] = useState<Item | null>(null)
    const [itemModalState, setItemModalState] = useState<boolean>(false)
    const [isLoading, setIsLoading] = useState<boolean>(true)

    const getAvailableMangas: () => Promise<void> = async () => {
        setIsLoading(true);
        setMangas(await getItems('manga'));
        setIsLoading(false);
    }

    useEffect(() => {
        getAvailableMangas().then()
    }, [])

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
        getAvailableMangas().then()
    }

    const columns: GridColDef[] = [
        { field: 'itemId', headerName: 'Id', flex: 1 },
        { field: 'mainAuthorName', headerName: 'Autor', flex: 1 },
        { field: 'title', headerName: 'Título', flex: 1 },
        { field: 'serieName', headerName: 'Série', flex: 1 },
        { field: 'volume', headerName: 'Volume', flex: 1 },
        { field: 'collectionName', headerName: 'Coleção', flex: 1 },
        { field: 'publisherName', headerName: 'Editora', flex: 1 },
    ]

    return (
        <Box sx={{ me: 5 }}>
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'right' }}>
            <IconButton 
                    aria-label="Novo Registro"
                    onClick={showItemModal}
                    disabled={isLoading}
                >
                    <AddCircleOutline />
                </IconButton>
                <IconButton 
                    aria-label="Atualizar"
                    onClick={getAvailableMangas}
                    disabled={isLoading}
                >
                    <Autorenew />
                </IconButton>
            </Box>
            <DataGridComp
                data={mangas}
                columns={columns}
                isLoading={isLoading}
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