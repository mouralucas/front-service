import { useMutation, useQuery } from "@apollo/client";
import { FormControl, FormHelperText, Grid, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ReactElement, useEffect } from "react";
import { Controller, useForm } from 'react-hook-form';
import { toast } from "react-toastify";
import Loader from "../../../../components/Loader.tsx";
import Modal from "../../../../components/Modal.tsx";
import CurrencyInput from "../../../../components/form/CurrencyInput.tsx";
import { CreateItemInput } from '../../../../interfaces/Library.tsx';
import { apolloLibraryClient } from "../../../../services/apollo/client/ApolloLibraryService.tsx";
import { CREATE_ITEM_MUTATION, UPDATE_ITEM_MUTATION } from "../../../../services/apollo/mutations/Library.tsx";
import { QUERY_AUTHORS, QUERY_COLLECTION, QUERY_LANGUAGES, QUERY_PUBLISHERS, QUERY_SERIES, QUERY_STATUS } from "../../../../services/apollo/queries/Library.tsx";

export interface ItemModalProps {
    item: CreateItemInput | undefined | null
    modalState: boolean
    hideItemModal: any
}


const DefaultItem: CreateItemInput = {
    itemId: null,
    lastStatusId: null,
    lastStatusDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    mainAuthorId: null,
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
    publisherId: null,
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
    const {handleSubmit, control, reset, formState: {isDirty, errors, dirtyFields}, getValues} = useForm<CreateItemInput>({defaultValues: DefaultItem});

    const { data: authorsData, loading: authorsLoading } = useQuery(QUERY_AUTHORS, {
        client: apolloLibraryClient,
        onError: (error) => {toast.error(`Erro: ${error.message}`);},
        variables: { params: {} },
        skip: !props.modalState
    })

    const { data: statusesData, loading: statusesLoading } = useQuery(QUERY_STATUS, {
        client: apolloLibraryClient,
        onError: (error) => {toast.error(`Erro: ${error.message}`);},
        variables: { params: {
            statusType: "ITEM.STATUS"
        } },
        skip: !props.modalState
    })

    const { data: seriesData, loading: seriesLoading } = useQuery(QUERY_SERIES, {
        client: apolloLibraryClient,
        onError: (error) => {toast.error(`Erro: ${error.message}`);},
        variables: { params: {} },
        skip: !props.modalState
    })

    const { data: collectionsData, loading: collectionsLoading } = useQuery(QUERY_COLLECTION, {
        client: apolloLibraryClient,
        onError: (error) => {toast.error(`Erro: ${error.message}`);},
        variables: { params: {} },
        skip: !props.modalState
    })

    const { data: publishersData, loading: publishersLoading } = useQuery(QUERY_PUBLISHERS, {
        client: apolloLibraryClient,
        onError: (error) => {toast.error(`Erro: ${error.message}`);},
        variables: { params: {} },
        skip: !props.modalState
    })

    const { data: languageData, loading: languageLoading } = useQuery(QUERY_LANGUAGES, {
        client: apolloLibraryClient,
        onError: (error) => {toast.error(`Erro: ${error.message}`);},
        skip: !props.modalState
    })

    const isLoading = authorsLoading || statusesLoading || seriesLoading || collectionsLoading || publishersLoading || languageLoading
    const hasData = authorsData && statusesData && seriesData && collectionsData && publishersData && languageData

    
    const [createItem] = useMutation(CREATE_ITEM_MUTATION, {
            client: apolloLibraryClient,
            onCompleted: (data) => {
                toast.success(
                    `Item "${data.createItem.item.title}" criado com sucesso`
                );
                props.hideItemModal();
            },
            onError: (error) => {
                toast.error(`Erro: ${error.message}`);
            },
        })

    const [updateItem] = useMutation(UPDATE_ITEM_MUTATION, {
            client: apolloLibraryClient,
            onCompleted: (data) => {
                toast.success(
                    `Item "${data.updateItem.item.title}" atualizado com sucesso`
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

        // Clean form when modal closes
        if (!props.modalState) {
            reset(DefaultItem);
        }
    }, [props.modalState, props.item, reset]);

    const onSubmit = async (itemFormData: CreateItemInput) => {
        if (itemFormData.itemId) {
            try {
                const currentValues: CreateItemInput = getValues();
                const modifiedFields: Partial<Record<keyof CreateItemInput, CreateItemInput[keyof CreateItemInput]>> = {
                    itemId: itemFormData.itemId
                };

                (Object.keys(dirtyFields) as Array<keyof CreateItemInput>).forEach((key: keyof CreateItemInput) => {
                    modifiedFields[key] = currentValues[key];
                });
                
                console.log(modifiedFields);
                console.log(itemFormData)

                await updateItem({
                    variables: {
                        input: modifiedFields
                    }
                })
            }catch (error) {
                console.error("Erro ao atualizar o item " + error)
            }
        } else {
            try {
                await createItem({
                    variables: {
                        input: itemFormData
                    }
                })
            } catch (error) {
                console.error("Erro ao criar item " + error)
            }
        }
    };

    const body: ReactElement = isLoading || !hasData ? <Loader /> :
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container rowSpacing={4} columnSpacing={2} sx={{ mt: 4 }}>
                    <Grid size={{ sm: 12, md: 4}} >
                        <Controller
                            name={'mainAuthorId'}
                            control={control}
                            rules={{required: "Campo obrigatório"}}
                            render={({field}) => (
                                <FormControl fullWidth size="small" error={!!errors.mainAuthorId} >
                                    <InputLabel id="main-author-label">Autor</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="main-author-label"
                                        label="Autor"
                                        value={field.value ?? ''}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        sx={{ width: "100%" }}
                                    >
                                        {authorsData?.getAuthors?.authors?.map((author: any) => (
                                            <MenuItem key={author.authorId} value={author.authorId}>
                                                {author.authorName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.mainAuthorId && (
                                        <FormHelperText>{errors.mainAuthorId.message}</FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 4}} >
                        <Controller
                            name={'authorsId'}
                            control={control}
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
                                        {authorsData?.getAuthors?.authors?.map((author: any) => (
                                            <MenuItem key={author.authorId} value={author.authorId}>
                                                {author.authorName}
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
                            rules={{required: "Campo obrigatório"}}
                            render={({field}) => (
                                <FormControl fullWidth size="small" error={!!errors.lastStatusId} >
                                    <InputLabel id="last_status-label">Status</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="last_status-label"
                                        label="Status"
                                        value={field.value || ''}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        sx={{ width: "100%" }}
                                    >
                                        {statusesData?.getStatus?.statuses.map((author: any) => (
                                            <MenuItem key={author.statusId} value={author.statusId}>
                                                {author.name}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.lastStatusId && (
                                        <FormHelperText>{errors.lastStatusId.message}</FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 6, md: 2}} >
                        <Controller
                            name="lastStatusDate"
                            control={control}
                            rules={{required: "Campo obrigatório"}}
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
                                                error: !!errors.lastStatusDate,
                                                helperText: errors.lastStatusDate?.message, 
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
                            rules={{required: "Campo obrigatório"}}
                            render={({field}) => (
                                <FormControl fullWidth size="small" error={!!errors.itemTypeId} >
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
                                    {errors.itemTypeId && (
                                        <FormHelperText>{errors.itemTypeId?.message}</FormHelperText>
                                    )}
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
                            rules={{required: "Campo obrigatório"}}
                            render={({field}) => (
                                <FormControl fullWidth size="small" error={!!errors.serieId} >
                                    <InputLabel id="serie-label">Série</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="serie-label"
                                        label="Série"
                                        value={field.value ?? ''}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        sx={{ width: "100%" }}
                                    >
                                        {seriesData?.getSeries?.series.map((serie: any) => (
                                            <MenuItem key={serie.serieId} value={serie.serieId}>
                                                {serie.serieName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.serieId && (
                                        <FormHelperText>{errors.serieId.message}</FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 4}} >
                        <Controller
                            name={'collectionId'}
                            control={control}
                            rules={{required: "Campo obrigatório"}}
                            render={({field}) => (
                                <FormControl fullWidth size="small" error={!!errors.collectionId} >
                                    <InputLabel id="collections-label">Coleção</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="collection-label"
                                        label="Coleção"
                                        value={field.value ?? ''}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        sx={{ width: "100%" }}
                                    >
                                        {collectionsData?.getCollections?.collections.map((collection: any) => (
                                            <MenuItem key={collection.collectionId} value={collection.collectionId}>
                                                {collection.collectionName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.collectionId && (
                                        <FormHelperText>{errors.collectionId.message}</FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 4}} >
                        <Controller
                            name={'publisherId'}
                            control={control}
                            rules={{required: "Campo obrigatório"}}
                            render={({field}) => (
                                <FormControl fullWidth size="small" error={!!errors.publisherId} >
                                    <InputLabel id="publishers-label">Editora</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="publishers-label"
                                        label="Editora"
                                        value={field.value ?? ''}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        sx={{ width: "100%" }}
                                    >
                                        {publishersData?.getPublishers?.publishers.map((publisher: any) => (
                                            <MenuItem key={publisher.publisherId} value={publisher.publisherId}>
                                                {publisher.publisherName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.publisherId && (
                                        <FormHelperText>{errors.publisherId.message}</FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 4}} >
                        <Controller
                            name={'formatId'}
                            control={control}
                            rules={{required: "Campo obrigatório"}}
                            render={({field}) => (
                                <FormControl 
                                fullWidth
                                 size="small"
                                 error={!!errors.formatId} 
                                 >
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
                                    {errors.formatId && (
                                        <FormHelperText>{errors.formatId.message}</FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 4}} >
                        <Controller
                            name={'languageId'}
                            control={control}
                            rules={{required: "Campo obrigatório"}}
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
                                        {languageData?.getLanguages?.languages?.map((language: any) => (
                                            <MenuItem key={language.languageId} value={language.languageId}>
                                                {language.languageName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.languageId && (
                                        <FormHelperText>{errors.languageId.message}</FormHelperText>
                                    )}
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
                body={body}
                actionModal={handleSubmit(onSubmit)}
                disableAction={!isDirty}
                size={'modal-lg'}
            />
        </div>
    )
}

export default App;