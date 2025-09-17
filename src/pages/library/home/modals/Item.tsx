import { useMutation } from "@apollo/client";
import { FormControl, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ReactElement, useEffect, useState } from "react";
import { Controller, useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import Loader from "../../../../components/Loader.tsx";
import Modal from "../../../../components/Modal.tsx";
import CurrencyInput from "../../../../components/form/CurrencyInput.tsx";
import { CreateItemInput, Item } from '../../../../interfaces/Library.tsx';
import { apolloLibraryClient } from "../../../../services/apollo/client/ApolloLibraryService.tsx";
import { CREATE_ITEM_MUTATION } from "../../../../services/apollo/mutations/Library.tsx";
import { getLanguages } from "../../../../services/getCommonData/Core.tsx";
import { getAuthors, getCollections, getPublishers, getSeries, getStatuses } from "../../../../services/getCommonData/Library.tsx";

export interface ItemModalProps {
    item: Item | undefined | null
    modalState: boolean
    hideItemModal: any
}


const DefaultItem: CreateItemInput = {
    itemId: null,
    lastStatusId: null,
    lastStatusDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    mainAuthorId: 0,
    authorsId: [],
    translatorId: 0,
    title: '',
    subtitle: '',
    titleOriginal: '',
    subtitleOriginal: '',
    isbn: '',
    isbn10: '',
    itemTypeId: '',
    pages: 0,
    volume: 1,
    edition: 1,
    publicationDate: null,
    originalPublicationDate: null,
    serieId: 0,
    collectionId: 0,
    publisherId: 0,
    formatId: '',
    languageId: 'PT',
    coverPrice: 0,
    paidPrice: 0,
    dimensions: '',
    height: 0,
    width: 0,
    thickness: 0,
    summary: '',
    observation: '',
}

const itemTypes = [
    {
        value: 'book',
        label: 'Livro'
    },
    {
        value: 'manga',
        label: 'Mangá'
    }
]

const itemFormats = [
    {
        value: 'hardcover',
        label: 'Capa Dura'
    },
    {
        value: 'paperback',
        label: 'Capa comum'
    },
    {
        value: 'ebook',
        label: 'eBook'
    }
]


const App = (props: ItemModalProps) => {
    const {handleSubmit, control, reset, formState: {isDirty, dirtyFields, errors}, getValues} = useForm<CreateItemInput>({defaultValues: DefaultItem});

    const [authors, setAuthors] = useState<any[]>([]);
    const [statuses, setStatuses] = useState<any[]>([])
    const [itemSeries, setItemSeries] = useState<any[]>([])
    const [itemCollections, setItemCollections] = useState<any[]>([])
    const [publishers, setPublishers] = useState<any[]>([])
    const [languages, setLanguages] = useState<any[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(true);

    const fetchItemData: () => Promise<void> = async () => {
        setAuthors(await getAuthors(true));
        setStatuses(await getStatuses('ITEM.STATUS', true));
        setItemSeries(await getSeries(true));
        setItemCollections(await getCollections(true));
        setPublishers(await getPublishers(true));
        setLanguages(await getLanguages(true));

        setIsLoading(false);
    }

    const [createItem] = useMutation(CREATE_ITEM_MUTATION, {
            client: apolloLibraryClient,
             onCompleted: (data) => {
                toast.success(
                    `Item "${data.createItem.item.itemTitle}" criado com sucesso`
                );
                props.hideItemModal();
            },
            onError: (error) => {
                toast.error(`Erro: ${error.message}`);
            },
        })

    useEffect(() => {
        // Set initial values
        if (props.modalState && props.item) {
            reset(props.item);
        } else if (props.modalState && !props.item) {
            reset(DefaultItem);
        }

        // Load necessary information
        if (props.modalState) {
            fetchItemData().then();
        }

        // Clean form when modal closes
        if (!props.modalState) {
            reset(DefaultItem);
        }
    }, [props.modalState, props.item, reset]);

    const onSubmit = async (data: CreateItemInput) => {
        try {
            await createItem({
                variables: {
                    input: data
                }
            })
        } catch (error) {
            console.error("Erro ao criar autor " + error)
        }
    };

    const body: ReactElement = isLoading ? <Loader /> :
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container rowSpacing={4} columnSpacing={2} sx={{ mt: 4 }}>
                    <Grid size={{ sm: 12, md: 4}} >
                        <Controller
                            name={'mainAuthorId'}
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <FormControl fullWidth size="small">
                                    <InputLabel id="main-author-label">Autor</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="main-author-label"
                                        label="Autor"
                                        value={field.value || ''}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        sx={{ width: "100%" }}
                                    >
                                        {authors.map((author: any) => (
                                            <MenuItem key={author.value} value={author.value}>
                                                {author.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 4}} >
                        <Controller
                            name={'authorsId'}
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <FormControl fullWidth size="small">
                                    <InputLabel id="authors-label">Outros autores</InputLabel>
                                    <Select
                                        {...field}
                                        multiple
                                        labelId="authors-label"
                                        label="Outros Autores"
                                        value={field.value ?? []}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        sx={{ width: "100%" }}
                                    >
                                        {authors.map((author: any) => (
                                            <MenuItem key={author.value} value={author.value}>
                                                {author.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 6, md: 2}} >
                        <Controller
                            name={'lastStatusId'}
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <FormControl fullWidth size="small">
                                    <InputLabel id="last_status-label">Status</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="last_status-label"
                                        label="Status"
                                        value={field.value || ''}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        sx={{ width: "100%" }}
                                    >
                                        {statuses.map((author: any) => (
                                            <MenuItem key={author.value} value={author.value}>
                                                {author.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 6, md: 2}} >
                        <Controller
                            name="lastStatusDate"
                            control={control}
                            render={({ field }) => (
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}    
                                    adapterLocale={ptBR}
                                >
                                    <DatePicker
                                        label="Data"
                                        value={field.value ? new Date(field.value + "T00:00") : null}
                                        onChange={(date) =>
                                            field.onChange(date ? date.toISOString().split("T")[0] : null)
                                        }
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                size: "small",
                                            },
                                        }}
                                        sx={{ width: "100%" }}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 6 }} >
                        <Controller
                            name="title"
                            control={control}
                            rules={{ required: "Esse campo é obrigatório" }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Título"
                                    fullWidth
                                    size="small"
                                    error={!!errors.title}
                                    helperText={errors.title?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 6 }} >
                        <Controller
                            name="subtitle"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Subtítulo"
                                    fullWidth
                                    size="small"
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 6 }} >
                        <Controller
                            name="titleOriginal"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Título original"
                                    fullWidth
                                    size="small"
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 6 }} >
                        <Controller
                            name="subtitleOriginal"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Subtítulo original"
                                    fullWidth
                                    size="small"
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 3 }} >
                        <Controller
                            name="isbn"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="ISBN"
                                    fullWidth
                                    size="small"
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 3 }} >
                        <Controller
                            name="isbn10"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="ISBN 10"
                                    fullWidth
                                    size="small"
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 3}} >
                        <Controller
                            name={'itemTypeId'}
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <FormControl fullWidth size="small">
                                    <InputLabel id="item-type-label">Tipo</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="item-type-label"
                                        label="Tipo"
                                        value={field.value || ''}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        sx={{ width: "100%" }}
                                    >
                                        {itemTypes.map((author: any) => (
                                            <MenuItem key={author.value} value={author.value}>
                                                {author.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 4, md: 1 }} >
                        <Controller
                            name="pages"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Páginas"
                                    fullWidth
                                    size="small"
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 4, md: 1 }} >
                        <Controller
                            name="volume"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Volume"
                                    fullWidth
                                    size="small"
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 4, md: 1 }} >
                        <Controller
                            name="edition"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Edição"
                                    fullWidth
                                    size="small"
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 6, md: 2}} >
                        <Controller
                            name="publicationDate"
                            control={control}
                            render={({ field }) => (
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}    
                                    adapterLocale={ptBR}
                                >
                                    <DatePicker
                                        label="Lançamento"
                                        value={field.value ? new Date(field.value + "T00:00") : null}
                                        onChange={(date) =>
                                            field.onChange(date ? date.toISOString().split("T")[0] : null)
                                        }
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                size: "small",
                                            },
                                        }}
                                        sx={{ width: "100%" }}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 6, md: 2}} >
                        <Controller
                            name="originalPublicationDate"
                            control={control}
                            render={({ field }) => (
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}    
                                    adapterLocale={ptBR}
                                >
                                    <DatePicker
                                        label="Lançamento original"
                                        value={field.value ? new Date(field.value + "T00:00") : null}
                                        onChange={(date) =>
                                            field.onChange(date ? date.toISOString().split("T")[0] : null)
                                        }
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                size: "small",
                                            },
                                        }}
                                        sx={{ width: "100%" }}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 4}} >
                        <Controller
                            name={'serieId'}
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <FormControl fullWidth size="small">
                                    <InputLabel id="serie-label">Série</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="serie-label"
                                        label="Série"
                                        value={field.value || ''}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        sx={{ width: "100%" }}
                                    >
                                        {itemSeries.map((author: any) => (
                                            <MenuItem key={author.value} value={author.value}>
                                                {author.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 4}} >
                        <Controller
                            name={'collectionId'}
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <FormControl fullWidth size="small">
                                    <InputLabel id="collections-label">Coleção</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="collection-label"
                                        label="Coleção"
                                        value={field.value || ''}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        sx={{ width: "100%" }}
                                    >
                                        {itemCollections.map((author: any) => (
                                            <MenuItem key={author.value} value={author.value}>
                                                {author.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 4}} >
                        <Controller
                            name={'publisherId'}
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <FormControl fullWidth size="small">
                                    <InputLabel id="publishers-label">Editora</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="publishers-label"
                                        label="Editora"
                                        value={field.value || ''}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        sx={{ width: "100%" }}
                                    >
                                        {publishers.map((author: any) => (
                                            <MenuItem key={author.value} value={author.value}>
                                                {author.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 4}} >
                        <Controller
                            name={'formatId'}
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <FormControl fullWidth size="small">
                                    <InputLabel id="format-label">Formato</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="format-label"
                                        label="Formato"
                                        value={field.value || ''}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        sx={{ width: "100%" }}
                                    >
                                        {itemFormats.map((author: any) => (
                                            <MenuItem key={author.value} value={author.value}>
                                                {author.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 4}} >
                        <Controller
                            name={'languageId'}
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <FormControl fullWidth size="small">
                                    <InputLabel id="langiuages-label">Idioma</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="languages-label"
                                        label="Idioma"
                                        value={field.value || ''}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        sx={{ width: "100%" }}
                                    >
                                        {languages.map((author: any) => (
                                            <MenuItem key={author.value} value={author.value}>
                                                {author.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 3 }} >
                            <Controller
                                name="coverPrice"
                                control={control}
                                render={({ field }) => (
                                    <CurrencyInput
                                        label="Preço de capa"
                                        prefix={"R$ "}
                                        value={field.value}
                                        onValueChange={(values: any) => field.onChange(values.rawValue)}
                                    />
                                )}
                            />
                    </Grid>
                    <Grid size={{ sm: 12, md: 3 }} >
                            <Controller
                                name="paidPrice"
                                control={control}
                                render={({ field }) => (
                                    <CurrencyInput
                                        label="Preço pago"
                                        prefix={"R$ "}
                                        value={field.value}
                                        onValueChange={(values: any) => field.onChange(values.rawValue)}
                                    />
                                )}
                            />
                    </Grid>
                    <Grid size={{ sm: 12, md: 6 }} ></Grid>
                    <Grid size={{ sm: 6, md: 3 }} >
                        <Controller
                            name="dimensions"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Dimensões"
                                    fullWidth
                                    size="small"
                                />
                            )}
                        />
                    </Grid>      
                    <Grid size={{ sm: 6, md: 3 }} >
                        <Controller
                            name="height"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Altura"
                                    fullWidth
                                    size="small"
                                />
                            )}
                        />
                    </Grid>    
                    <Grid size={{ sm: 6, md: 3 }} >
                        <Controller
                            name="width"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Largura"
                                    fullWidth
                                    size="small"
                                />
                            )}
                        />
                    </Grid>               
                    <Grid size={{ sm: 6, md: 3 }} >
                        <Controller
                            name="thickness"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Profundidade"
                                    fullWidth
                                    size="small"
                                />
                            )}
                        />
                    </Grid>     
                    <Grid size={{ sm: 12, md: 12 }} >
                        <Controller
                            name="summary"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Descrição"
                                    multiline
                                    minRows={6}
                                    fullWidth
                                    size="small"
                                />
                            )}
                        />
                    </Grid>     
                    <Grid size={{ sm: 12, md: 12 }} >
                        <Controller
                            name="observation"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Observações"
                                    multiline
                                    minRows={6}
                                    fullWidth
                                    size="small"
                                />
                            )}
                        />
                    </Grid>  
                </Grid>
            </form>
        </div>


    return (
        <div>
            <Modal
                showModal={props.modalState}
                hideModal={props.hideItemModal}
                title={'Item'}
                fullscreen={true}
                body={body}
                actionModal={handleSubmit(onSubmit)}
                disableAction={!isDirty}
                size={'modal-lg'}
            />
        </div>
    )
}

export default App;