import { useMutation, useQuery } from "@apollo/client";
import { Grid, TextField } from "@mui/material";
import { ReactElement } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import SelectAutocomplete from "../../../../components/form/SelectAutocomplete.tsx";
import Modal from "../../../../components/Modal.tsx";
import { Serie } from "../../../../interfaces/Library.tsx";
import { apolloLibraryClient } from "../../../../services/apollo/client/ApolloLibraryService.tsx";
import { CREATE_SERIE_MUTATION } from "../../../../services/apollo/mutations/Library.tsx";
import { QUERY_COUNTRIES } from "../../../../features/library/api/queries.ts";

export interface SerieModalProps {
    serie: Serie | undefined
    onToggle: any;
    isOpen: boolean;
}

const DefaultSerie: Serie = {
    id: null,
    name: '',
    originalName: '',
    description: '',
    countryId: null
}

const App = (props: SerieModalProps): ReactElement => {
    const { handleSubmit, control, formState: { isDirty, errors }} = useForm<Serie>({ defaultValues: DefaultSerie });

    const { data: countriesData } = useQuery(QUERY_COUNTRIES, {
        client: apolloLibraryClient,
        onError: (error) => { toast.error(`Erro: ${error.message}`); },
        skip: !props.isOpen
    })

    const [createSerie] = useMutation(CREATE_SERIE_MUTATION, {
        client: apolloLibraryClient,
        onCompleted: (data) => {
            toast.success(
                `Serie "${data.createSerie.name}" criada com sucesso`
            );
            props.onToggle()
        },
        onError: (error) => {
            toast.error(`Erro: ${error.message}`);
        },
    })

    const onSubmit = async (serieFormData: Serie) => {
        console.log("Aqui");
        if (serieFormData.id) {
            // try {
            //     const currentValues: Serie = getValues();
            //     const modifiedFields: Partial<Record<keyof Serie, Serie[keyof Serie]>> = {
            //         id: serieFormData.id
            //     };

            //     (Object.keys(dirtyFields) as Array<keyof Serie>).forEach((key: keyof Serie) => {
            //         modifiedFields[key] = currentValues[key];
            //     });

            //     await updateItem({
            //         variables: {
            //             input: modifiedFields
            //         }
            //     })
            // } catch (error) {
            //     console.error("Erro ao atualizar a série " + error)
            // }
            console.log("Item update");
        } else {
            try {
                await createSerie({
                    variables: {
                        input: serieFormData
                    }
                })
            } catch (error) {
                console.error("Erro ao criar série " + error)
            }
        }
    }

    const body =
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container rowSpacing={4} columnSpacing={2} sx={{ mt: 4 }}>
                <Grid size={{ sm: 12, md: 4 }} >
                    <Controller
                        name={'name'}
                        control={control}
                        rules={{ required: "Esse campo é obrigatório" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Nome"
                                fullWidth
                                size="small"
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ sm: 12, md: 4 }} >
                    <Controller
                        name={'originalName'}
                        control={control}
                        rules={{ required: "Esse campo é obrigatório" }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Nome original"
                                fullWidth
                                size="small"
                                error={!!errors.name}
                                helperText={errors.name?.message}
                                onFocus={(e) => e.currentTarget.select()}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ sm: 6, md: 4 }} >
                    <Controller
                        name={'countryId'}
                        control={control}
                        render={({ field }) => (
                            <SelectAutocomplete
                                label="País"
                                value={field.value}
                                options={countriesData?.getCountry?.countries || []}
                                getOptionLabel={(country: any) => country.name}
                                getOptionValue={(country: any) => country.id}
                                onChange={(value) => {
                                    field.onChange(value);
                                }}
                                error={errors.countryId?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ sm: 12, md: 12 }} >
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Descrição"
                                multiline
                                minRows={6}
                                fullWidth
                                size="small"
                                onFocus={(e) => e.currentTarget.select()}
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </form>

    return (
        <Modal
            isOpen={props.isOpen}
            onToggle={props.onToggle}
            body={body}
            actionModal={handleSubmit(onSubmit)}
            disableAction={!isDirty}
        />
    )
}

export default App;