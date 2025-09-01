import { useQuery } from '@apollo/client';
import EditOutlined from '@mui/icons-material/EditOutlined';
import { Box, IconButton } from '@mui/material';
import { GridColDef, GridRenderCellParams } from '@mui/x-data-grid';
import { ReactElement, useCallback, useState } from 'react';
import DataGridComp from '../../../../components/table/DataGridV2';
import { Author } from '../../../../interfaces/Library';
import { apolloLibraryClient } from '../../../../services/apollo/client/ApolloLibraryService';
import { QUERY_AUTHORS } from '../../../../services/apollo/queries/Library';
import { formatDate } from '../../../../utils/datetime';
import AuthorModal from '../modals/Author.tsx';
import AddCircleOutline from '@mui/icons-material/AddCircleOutline';
import { toast } from 'react-toastify';

const AuthorTable = (): ReactElement => {
    const [authorModalState, setAuthorModalState] = useState<boolean>(false)
    const [selectedAuthor, setSelectedAuthor] = useState<Author | undefined>(undefined)

    const { data: authorData, loading: loadingAuthors, refetch: refetchAuthors } = useQuery(QUERY_AUTHORS, {
        client: apolloLibraryClient,
        variables: {
            params: {
                authorId: null
            }
        },
        onCompleted: () => {
            toast.success(
                `Dados de autores carregados com sucesso`
            );
        },
        onError: (error) => {
            toast.error(`Erro: ${error.message}`);
        },
    })

    const toggleAuthorModal = useCallback((e: any) => {
        if (e.row !== undefined) {
            setSelectedAuthor({ ...e.row, authorId: Number(e.row.authorId) });
        } else {
            setSelectedAuthor(undefined);
        }

        setAuthorModalState((prev) => !prev);
    }, [authorModalState])



    const columns: GridColDef<Author>[] = [
        { field: 'authorId', headerName: 'Id', type: 'number', flex: 2 },
        { field: "authorName", headerName: 'Nome', flex: 1 },
        {
            field: "birthDate",
            headerName: 'Data de Nascimento',
            flex: .5,
            valueFormatter: (value) => {
                if (!value) return '';

                const start = formatDate(value);
                return start;
            },
        },
        { field: "countryName", headerName: 'País', flex: 1 },
        { field: "languageName", headerName: 'Idioma', flex: 1 },
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
                        alignItems: 'center',      // vertical
                        justifyContent: 'center',  // horizontal
                        gap: 1,
                        flex: 1,                   // ocupa toda a largura da célula
                        height: '100%',            // ocupa toda a altura
                    }}
                >
                    <IconButton
                        aria-label="editar"
                        color="success"
                        onClick={toggleAuthorModal.bind(null, params)}
                    >
                        <EditOutlined />
                    </IconButton>
                </Box>
            ),
        },
    ]

    return (
        <Box sx={{ display: "block" }}>
            <Box sx={{ display: 'flex', justifyContent: 'right', gap: 2, mb: 2, me: 4 }}>
                <IconButton
                    aria-label="Novo Registro"
                    onClick={toggleAuthorModal}
                    loading={loadingAuthors}
                >
                    <AddCircleOutline />
                </IconButton>
            </Box>
            <DataGridComp
                data={authorData?.getAuthors?.authors}
                columns={columns}
                isLoading={loadingAuthors}
                getRowId={(row) => row.authorId}
                columnVisibilityModel={{
                    authorId: false
                }}
            />
            <AuthorModal modalState={authorModalState} hideModal={toggleAuthorModal} author={selectedAuthor} />
        </Box>
    );
};

export default AuthorTable;