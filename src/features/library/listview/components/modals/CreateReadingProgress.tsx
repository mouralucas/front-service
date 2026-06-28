import { useMutation } from "@apollo/client";
import { TextField } from "@mui/material";
import Grid from '@mui/material/Grid';
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { ItemReadingProgress } from "../../../type/Reading";
import { apolloLibraryClient } from "../../../../../services/apollo/client/ApolloLibraryService";
import { CREATE_READING_PROGRESS_MUTATION } from "../../../api/mutations";
import Modal from "../../../../../components/Modal";


interface CreateReadingProgressProps {
    isOpen: boolean;
    onToggle: any;
    readingId: string;
}

const DefaultReadingProgress: ItemReadingProgress = {
    readingId: '',
    progressType: null,
    value: 0,
    progressDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    rate: undefined,
    comment: undefined
}

const progressType = [
    { value: 'page', label: 'Página' },
    { value: 'percentage', label: 'Porcentagem' }
]

const CreateReadingProgressModal = (props: CreateReadingProgressProps) => {
    const { handleSubmit, control, reset, formState: { errors }, setValue } = useForm<ItemReadingProgress>({ defaultValues: DefaultReadingProgress });

    const [createReadingProgress] = useMutation(CREATE_READING_PROGRESS_MUTATION, {
        client: apolloLibraryClient,
        onCompleted: (data) => {
            toast.success(
                `Progresso criado com sucesso para "${data.createReadingProgress.itemTitle}"`
            );
            props.onToggle();
        },
        onError: (error) => {
            toast.error(`Erro: ${error.message}`);
        },
    });


    useEffect(() => {
        if (props.isOpen && props.readingId) {
            setValue('readingId', props.readingId);
        } else {
            reset(DefaultReadingProgress);
        }

    }, [setValue, reset, props.isOpen, props.readingId]);

    const submitReadingProgress = async (progressFormData: ItemReadingProgress) => {
        const normalizedData = { ...progressFormData, value: Number(progressFormData.value) }
        try {
            await createReadingProgress({
                variables: {
                    input: normalizedData
                }
            });
        } catch (error) {
            console.error(`Erro ao criar progresso de leitura: ${error}`);
        }
    }

    const body = (
        <form onSubmit={handleSubmit(submitReadingProgress)}>
            <Grid container rowSpacing={4} columnSpacing={2} sx={{ mt: 4 }}>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Controller
                        name="progressType"
                        control={control}
                        render={({ field }) => (
                            <SelectAutocomplete
                                label="Tipo"
                                value={field.value || ''}
                                options={progressType}
                                getOptionLabel={(option: any) => option.label}
                                getOptionValue={(option: any) => option.value}
                                onChange={field.onChange}
                                error={errors.progressType?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }} >
                    <Controller
                        name={"value"}
                        control={control}
                        rules={{ required: "Esse campo é obrigatório." }}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Progresso"
                                type="number"
                                fullWidth
                                size="small"
                                onFocus={(e) => e.currentTarget.select()}
                                error={!!errors.value}
                                helperText={errors.value?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Controller
                        name="progressDate"
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
                                            error: !!errors.progressDate,
                                            helperText: errors.progressDate?.message,
                                        },
                                    }}
                                    sx={{ width: "100%" }}
                                />
                            </LocalizationProvider>
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 3 }}>
                    <Controller
                        // Eventually will by radio with start format
                        name={"rate"}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Nota"
                                type="number"
                                fullWidth
                                size="small"
                                error={!!errors.rate}
                                helperText={errors.rate?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ xs: 12, md: 12 }}>
                    <Controller
                        name={"comment"}
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Descrição"
                                fullWidth
                                multiline
                                minRows={5}
                                size="small"
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </form>
    )

    return (
        <div>
            <Modal
                isOpen={props.isOpen}
                onToggle={props.onToggle}
                title={'Progresso de Leitura'}
                body={body}
                actionModal={handleSubmit(submitReadingProgress)}
                size={'modal-md'}
            />
        </div>
    )
}

export default CreateReadingProgressModal;