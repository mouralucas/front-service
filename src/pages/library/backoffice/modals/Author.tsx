import { useMutation, useQuery } from "@apollo/client";
import { FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ptBR } from "date-fns/locale";
import { ReactElement, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "../../../../components/Modal.tsx";
import { Author } from "../../../../interfaces/Library.tsx";
import { apolloLibraryClient } from "../../../../services/apollo/client/ApolloLibraryService.tsx";
import { CREATE_AUTHOR_MUTATION } from "../../../../services/apollo/mutations/Library.tsx";
import { GET_COUNTRIES, QUERY_LANGUAGES } from "../../../../services/apollo/queries/Library.tsx";

interface AuthorModalProps {
    modalState: boolean;
    hideAuthorModal: any;
    author?: Author;
}

const DefaultAuthor: Author = {
    authorId: null,
    authorName: '',
    birthDate: null,
    languageId: '',
    countryId: '',
    description: ''
}

const App = (props: AuthorModalProps): ReactElement => {
    const { handleSubmit, control, formState: { errors, dirtyFields }, reset, getValues } = useForm<Author>({ defaultValues: DefaultAuthor })

    const { data: languageData } = useQuery(QUERY_LANGUAGES, {
        client: apolloLibraryClient,
        onError: (error) => {
            toast.error(`Erro: ${error.message}`);
        },
        skip: !props.modalState
    })

    const { data: countryData } = useQuery(GET_COUNTRIES, {
        client: apolloLibraryClient,
        onError: (error) => {
            toast.error(`Erro: ${error.message}`);
        },
        skip: !props.modalState
    })

    const [createAuthor] = useMutation(CREATE_AUTHOR_MUTATION, {
        client: apolloLibraryClient,
         onCompleted: (data) => {
            toast.success(
                `Autor "${data.createAuthor.author.authorName}" criado com sucesso`
            );
            props.hideAuthorModal();
        },
        onError: (error) => {
            toast.error(`Erro: ${error.message}`);
        },
    })

    useEffect(() => {
        if (!props.modalState) {
            reset(DefaultAuthor);
            return;
        }

        if (languageData && countryData) {
            if (props.author) {
                reset(props.author);
            } else {
                reset(DefaultAuthor);
            }
        }
    }, [props.modalState, props.author, languageData, countryData, reset]);

    const onSubmit = async (authorFormData: Author) => {
        try {
            await createAuthor({
                variables: {
                    input: authorFormData
                }
            })
        } catch (error) {
            console.error("Erro ao criar autor " + error)
        }
    }

    const body = (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container rowSpacing={4} columnSpacing={2} sx={{ mt: 4 }}>
                    <Grid size={{ xs: 12, md: 9 }}>
                        <Controller
                            name="authorName"
                            control={control}
                            rules={{ required: "Esse campo é obrigatório" }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Nome"
                                    fullWidth
                                    size="small"
                                    error={!!errors.authorName}
                                    helperText={errors.authorName?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Controller
                            name="birthDate"
                            control={control}
                            render={({ field }) => (
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                    adapterLocale={ptBR}
                                >
                                    <DatePicker
                                        label="Nascimento"
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

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="countryId"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth size="small">
                                    <InputLabel id="country-label">País</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="country-label"
                                        value={field.value || ''}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        sx={{ width: "100%" }}
                                    >
                                        {countryData?.getCountries?.countries?.map((country: any) => (
                                            <MenuItem key={country.countryId} value={country.countryId}>
                                                {country.countryName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12, md: 6 }}>
                        <Controller
                            name="languageId"
                            control={control}
                            render={({ field }) => (
                                <FormControl fullWidth size="small">
                                    <InputLabel id="language-label">Idioma</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="language-label"
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
                                </FormControl>
                            )}
                        />
                    </Grid>

                    <Grid size={{ xs: 12 }}>
                        <Controller
                            name="description"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Descrição"
                                    fullWidth
                                    multiline
                                    minRows={3}
                                    size="small"
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </form>
        </>
    );



    return (
        <>
            {props.modalState && (
                <Modal
                    showModal={props.modalState}
                    hideModal={props.hideAuthorModal}
                    title={'Autor'}
                    body={body}
                    actionModal={handleSubmit(onSubmit)}
                    size={'modal-md'}
                />
            )}
        </>
    );
}

export default App;