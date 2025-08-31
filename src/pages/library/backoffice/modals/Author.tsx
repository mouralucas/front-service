import { BaseSyntheticEvent, ReactElement, useEffect, useState } from "react";
import Modal from "../../../../components/Modal.tsx";
import { Author } from "../../../../interfaces/Library.tsx";
import { Controller, useForm } from "react-hook-form";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { ptBR } from "date-fns/locale";
import { getCountries, getLanguages } from "../../../../services/getCommonData/Core.tsx";
import { librarySubmit } from "../../../../services/axios/Submit.tsx";
import { URL_LIBRARY_AUTHOR } from "../../../../services/axios/ApiUrls.tsx";
import { toast } from "react-toastify";
import { FormControl, Box, TextField, MenuItem, Select, InputLabel } from "@mui/material";
import Grid from '@mui/material/Grid';

interface AuthorModalProps {
    modalState: boolean;
    hideModal: () => void;
    author?: Author;
}

const DefaultAuthor: Author = {
    authorId: null,
    authorName: '',
    birthDate: null,
    languageId: '',
    description: ''
}

const App = (props: AuthorModalProps): ReactElement => {
    const { handleSubmit, control, formState: { errors, dirtyFields }, reset, getValues } = useForm<Author>({ defaultValues: DefaultAuthor })

    const [countries, setCountries] = useState<any[]>([])
    const [languages, setLanguages] = useState<any[]>([])

    const getAuthorData = async () => {
        setCountries(await getCountries(true));
        setLanguages(await getLanguages(true));
    }

    useEffect(() => {
        if (props.modalState && props.author) {
            reset(props.author);
        } else if (props.modalState && !props.author) {
            reset(DefaultAuthor);
        }

        if (props.modalState) {
            getAuthorData().then();
        }
    }, [props.author, props.modalState, reset])

    const onSubmit = (data: Author, e: BaseSyntheticEvent<object> | undefined) => {
        let method;
        let submitData;

        if (data.authorId !== null) {
            method = 'patch'

            const currentValues: Author = getValues();
            const modifiedFields: Partial<Record<keyof Author, Author[keyof Author]>> = {
                authorId: data.authorId
            };

            (Object.keys(dirtyFields) as Array<keyof Author>).forEach((key: keyof Author) => {
                modifiedFields[key] = currentValues[key];
            });

            submitData = modifiedFields
        } else {
            method = 'post'
            submitData = data
        }

        librarySubmit(e, URL_LIBRARY_AUTHOR, submitData, method).then(() => {
            toast.success('Autor salvo com sucesso');
        }).catch(() => {
            toast.error('Erro ao salvar o autor');
        })

    }

    const body = (
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
                                    value={field.value ? new Date(field.value) : null}
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
                                    value={field.value || ""}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    sx={{ width: "100%" }}
                                >
                                    <MenuItem value="1">Brasil</MenuItem>
                                    <MenuItem value="2">EUA</MenuItem>
                                    <MenuItem value="3">Alemanha</MenuItem>
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
                                    value={field.value || ""}
                                    onChange={(e) => field.onChange(e.target.value)}
                                    sx={{ width: "100%" }}
                                >
                                    {languages?.map((user: any) => (
                                        <MenuItem key={user.languageId} value={user.languageId}>
                                            {user.name}
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
    );


    return (
        <div>
            <Modal
                showModal={props.modalState}
                hideModal={props.hideModal}
                title={'Autor'}
                body={body}
                // actionModal={handleSubmit(onSubmit)}
                size={'modal-md'}
            />
        </div>
    )
}

export default App;