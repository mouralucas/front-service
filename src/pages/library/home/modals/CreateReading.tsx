import { useMutation } from "@apollo/client";
import { TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BaseSyntheticEvent, ReactElement, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Modal from "../../../../components/Modal.tsx";
import { ItemReading } from "../../../../interfaces/Library.tsx";
import { apolloLibraryClient } from "../../../../services/apollo/client/ApolloLibraryService.tsx";
import { CREATE_READING_MUTATION } from "../../../../services/apollo/mutations/Library.tsx";


interface CreateReadingModalProps {
    modalState: boolean;
    hideCreateReadingModal: () => void;
    itemId: number;
}

const DefaultReading: ItemReading ={
    readingId: null,
    itemId: 0,
    startDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    finishDate: null,
    isDropped: false
}

const CreateReadingModal = (props: CreateReadingModalProps): ReactElement => {
    const { handleSubmit, control, formState: { errors }, reset, setValue } = useForm<ItemReading>({ defaultValues: DefaultReading })
    
    const [createReading] = useMutation(CREATE_READING_MUTATION, {
        client: apolloLibraryClient,
        onCompleted: (data) => {
            toast.success(
                `Leitura criada com sucesso para "${data.createReading.reading.itemTitle}"`
            );
            props.hideCreateReadingModal();
        },
        onError: (error) => {
            toast.error(`Erro: ${error.message}`);
        },
    }); 

    useEffect(() => {
        if (props.modalState) {
            // check, eventually, the reading object to load
            setValue('itemId', props.itemId);
        }  else {
            reset(DefaultReading);
        }
    }, [props.modalState, reset])

   
    const onSubmit = async (data: ItemReading, e: BaseSyntheticEvent<object> | undefined) => {
        console.log(data, e);
        try {
            await createReading({
                variables: {
                    input: data,
                },
            });
        } catch (err) {
        console.error("Erro ao criar leitura:", err);
        }
    }

    const body = (
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container rowSpacing={4} columnSpacing={2} sx={{ mt: 4 }}>
                <Grid size={{ xs: 12, md: 2}}>
                    <Controller 
                        name={"itemId"}
                        control={control}
                        rules={{ required: "Esse campo é obrigatório." }}
                        defaultValue={props.itemId ?? ""} 
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Item Id"
                                fullWidth
                                size="small"
                                error={!!errors.itemId}
                                helperText={errors.itemId?.message}
                                disabled
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 5}}>
                    <Controller
                        name="startDate"
                        control={control}
                        rules={{ required: "Esse campo é obrigatório." }}
                        render={({ field }) => (
                            <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                                adapterLocale={ptBR}
                            >
                                <DatePicker
                                    label="Início da leitura"
                                    value={field.value ? new Date(field.value) : null}
                                    onChange={(date) =>
                                        field.onChange(date ? date.toISOString().split("T")[0] : null)
                                    }
                                    slotProps={{
                                        textField: {
                                            fullWidth: true,
                                            size: "small",
                                            error: !!errors.finishDate,
                                            helperText: errors.finishDate?.message,
                                        },
                                    }}
                                    sx={{ width: "100%" }}
                                />
                            </LocalizationProvider>
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 5 }}>
                    <Controller
                        name="finishDate"
                        control={control}
                        defaultValue={null} // começa como null
                        rules={{ required: false}}
                        render={({ field }) => (
                        <LocalizationProvider
                            dateAdapter={AdapterDateFns}
                            adapterLocale={ptBR}
                        >
                            <DatePicker
                            label="Fim da leitura"
                            value={field.value ? new Date(field.value) : null} 
                            onChange={(date) =>
                                field.onChange(date ? date.toISOString().split("T")[0] : null)
                            }
                            slotProps={{
                                textField: {
                                fullWidth: true,
                                size: "small",
                                error: !!errors.finishDate,
                                helperText: errors.finishDate?.message,
                                },
                            }}
                            sx={{ width: "100%" }}
                            />
                        </LocalizationProvider>
                        )}
                    />
                    </Grid>
            </Grid>
        </form>
    );

    return (
        <Modal
            title="Iniciar Leitura"
            body={body}
            showModal={props.modalState}
            hideModal={props.hideCreateReadingModal}
            actionModal={handleSubmit(onSubmit)}
            size={"modal-sm"}
        />
    )
}

export default CreateReadingModal;
