import { useMutation } from "@apollo/client";
import { Grid, TextField } from "@mui/material";
import { ReactElement } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "../../../../components/ModalV2.tsx";
import { Collection } from "../../../../interfaces/Library.tsx";
import { apolloLibraryClient } from "../../../../services/apollo/client/ApolloLibraryService.tsx";
import { CREATE_COLLECTION_MUTATION } from "../../../../services/apollo/mutations/Library.tsx";

export interface CollectionModalProps {
    collection: Collection | undefined
    onToggle: any;
    isOpen: boolean;
}

const DefaultCollections: Collection = {
    id: null,
    name: '',
    description: ''
}

const App = (props: CollectionModalProps): ReactElement => {
    const { handleSubmit, control, formState: { isDirty, errors } } = useForm<Collection>({ defaultValues: DefaultCollections });

    const [createCollection] = useMutation(CREATE_COLLECTION_MUTATION, {
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

    const onSubmit = async (collectionFormData: Collection) => {
        console.log("Aqui");
        if (collectionFormData.id) {
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
                await createCollection({
                    variables: {
                        input: collectionFormData
                    }
                })
            } catch (error) {
                console.error("Erro ao criar coleção " + error)
            }
        }
    }

    const body =
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container rowSpacing={4} columnSpacing={2} sx={{ mt: 4 }}>
                <Grid size={{ sm: 12, md: 12 }} >
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