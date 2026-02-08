import { useMutation, useQuery } from "@apollo/client";
import { Grid, TextField } from "@mui/material";
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
import SelectAutocomplete from "../../../../components/form/SelectAutocomplete.tsx";
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
    id: null,
    lastStatusId: 'owned',
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
    itemTypeId: 'manga',
    pages: 0,
    volume: 1,
    edition: 1,
    publicationDate: null,
    originalPublicationDate: null,
    serieId: 0,
    collectionId: 0,
    publisherId: 2,
    formatId: 'paperback',
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
    const { handleSubmit, control, reset, formState: { isDirty, errors, dirtyFields }, getValues } = useForm<CreateItemInput>({ defaultValues: DefaultItem });

    const { data: authorsData, loading: authorsLoading } = useQuery(QUERY_AUTHORS, {
        client: apolloLibraryClient,
        onError: (error) => { toast.error(`Erro: ${error.message}`); },
        skip: !props.modalState
    })

    const { data: statusesData, loading: statusesLoading } = useQuery(QUERY_STATUS, {
        client: apolloLibraryClient,
        onError: (error) => { toast.error(`Erro: ${error.message}`); },
        variables: {
            params: {
                statusType: "ITEM.STATUS"
            }
        },
        skip: !props.modalState
    })

    const { data: seriesData, loading: seriesLoading } = useQuery(QUERY_SERIES, {
        client: apolloLibraryClient,
        onError: (error) => { toast.error(`Erro: ${error.message}`); },
        skip: !props.modalState
    })

    const { data: collectionsData, loading: collectionsLoading } = useQuery(QUERY_COLLECTION, {
        client: apolloLibraryClient,
        onError: (error) => { toast.error(`Erro: ${error.message}`); },
        skip: !props.modalState
    })

    const { data: publishersData, loading: publishersLoading } = useQuery(QUERY_PUBLISHERS, {
        client: apolloLibraryClient,
        onError: (error) => { toast.error(`Erro: ${error.message}`); },
        variables: { params: {} },
        skip: !props.modalState
    })

    const { data: languageData, loading: languageLoading } = useQuery(QUERY_LANGUAGES, {
        client: apolloLibraryClient,
        onError: (error) => { toast.error(`Erro: ${error.message}`); },
        skip: !props.modalState
    })

    const isLoading = authorsLoading || statusesLoading || seriesLoading || collectionsLoading || publishersLoading || languageLoading
    const hasData = authorsData && statusesData && seriesData && collectionsData && publishersData && languageData


    const [createItem] = useMutation(CREATE_ITEM_MUTATION, {
        client: apolloLibraryClient,
        onCompleted: (data) => {
            toast.success(
                `Item "${data.createItem.item}" criado com sucesso`
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
        if (itemFormData.id) {
            try {
                const currentValues: CreateItemInput = getValues();
                const modifiedFields: Partial<Record<keyof CreateItemInput, CreateItemInput[keyof CreateItemInput]>> = {
                    id: itemFormData.id
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
            } catch (error) {
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
                    <Grid size={{ sm: 12, md: 4 }} >
                        <Controller
                            name={'mainAuthorId'}
                            control={control}
                            rules={{ required: "Campo obrigatório" }}
                            render={({ field }) => (
                                <SelectAutocomplete
                                    label="Autor"
                                    value={field.value}
                                    options={authorsData?.getAuthors?.authors || []}
                                    getOptionLabel={(author: any) => author.name}
                                    getOptionValue={(author: any) => author.id}
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                    error={errors.mainAuthorId?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 4 }} >
                        <Controller
                            name={'authorsId'}
                            control={control}
                            render={({ field }) => (
                                <SelectAutocomplete
                                    label="Outros autores"
                                    value={Array.isArray(field.value) ? field.value : []}
                                    multiple
                                    options={authorsData?.getAuthors?.authors || []}
                                    getOptionLabel={(option: any) => option.authorName}
                                    getOptionValue={(option: any) => option.authorId}
                                    onChange={(value) => {
                                        field.onChange(Array.isArray(value) ? value : []);
                                    }}
                                    error={errors.authorsId?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 6, md: 2 }} >
                        <Controller
                            name={'lastStatusId'}
                            control={control}
                            rules={{ required: "Campo obrigatório" }}
                            render={({ field }) => (
                                <SelectAutocomplete
                                    label="Status"
                                    value={field.value}
                                    options={statusesData?.getStatus?.statuses || []}
                                    getOptionLabel={(status: any) => status.name}
                                    getOptionValue={(status: any) => status.id}
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                    error={errors.lastStatusId?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 6, md: 2 }} >
                        <Controller
                            name="lastStatusDate"
                            control={control}
                            rules={{ required: "Campo obrigatório" }}
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
                    {/* <Grid size={{ sm: 12, md: 6 }} >
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
                    </Grid> */}
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
                    {/* <Grid size={{ sm: 12, md: 3 }} >
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
                    </Grid> */}
                    <Grid size={{ sm: 12, md: 3 }} >
                        <Controller
                            name={'itemTypeId'}
                            control={control}
                            rules={{ required: "Campo obrigatório" }}
                            render={({ field }) => (
                                <SelectAutocomplete
                                    label="Tipo"
                                    value={field.value}
                                    options={itemTypes || []}
                                    getOptionLabel={(option: any) => option.label}
                                    getOptionValue={(option: any) => option.value}
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                    error={errors.itemTypeId?.message}
                                />
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
                                    value={field.value ?? ''}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        field.onChange(value === '' ? null : Number(value));
                                    }}
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
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        field.onChange(value === '' ? null : Number(value));
                                    }}
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
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        field.onChange(value === '' ? null : Number(value));
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 6, md: 2 }} >
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
                    <Grid size={{ sm: 6, md: 2 }} >
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
                    <Grid size={{ sm: 12, md: 4 }} >
                        <Controller
                            name={'serieId'}
                            control={control}
                            rules={{ required: "Campo obrigatório" }}
                            render={({ field }) => (
                                <SelectAutocomplete
                                    label="Série"
                                    value={field.value}
                                    options={seriesData?.getSeries?.series || []}
                                    getOptionLabel={(serie: any) => serie.name}
                                    getOptionValue={(serie: any) => serie.id}
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                    error={errors.serieId?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 4 }} >
                        <Controller
                            name={'collectionId'}
                            control={control}
                            rules={{ required: "Campo obrigatório" }}
                            render={({ field }) => (
                                <SelectAutocomplete
                                    label="Coleção"
                                    value={field.value}
                                    options={collectionsData?.getCollections?.collections || []}
                                    getOptionLabel={(collection: any) => collection.name}
                                    getOptionValue={(collection: any) => collection.id}
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                    error={errors.collectionId?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 4 }} >
                        <Controller
                            name={'publisherId'}
                            control={control}
                            rules={{ required: "Campo obrigatório" }}
                            render={({ field }) => (
                                <SelectAutocomplete
                                    label="Editora"
                                    value={field.value}
                                    options={publishersData?.getPublishers?.publishers || []}
                                    getOptionLabel={(publisher: any) => publisher.name}
                                    getOptionValue={(publisher: any) => publisher.id}
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                    error={errors.publisherId?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 4 }} >
                        <Controller
                            name={'formatId'}
                            control={control}
                            rules={{ required: "Campo obrigatório" }}
                            render={({ field }) => (
                                <SelectAutocomplete
                                    label="Formato"
                                    value={field.value}
                                    options={itemFormats || []}
                                    getOptionLabel={(option: any) => option.label}
                                    getOptionValue={(option: any) => option.value}
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                    error={errors.formatId?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 4 }} >
                        <Controller
                            name={'languageId'}
                            control={control}
                            rules={{ required: "Campo obrigatório" }}
                            render={({ field }) => (
                                <SelectAutocomplete
                                    label="Idioma"
                                    value={field.value}
                                    options={languageData?.getLanguages?.languages || []}
                                    getOptionLabel={(language: any) => language.name}
                                    getOptionValue={(language: any) => language.id}
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                    error={errors.languageId?.message}
                                />
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