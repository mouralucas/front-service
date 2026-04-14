import { useQuery } from "@apollo/client";
import { Grid, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BaseSyntheticEvent, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CurrencyInput from "../../../../../components/form/CurrencyInput.tsx";
import SelectAutocomplete from "../../../../../components/form/SelectAutocomplete.tsx";
import Modal from "../../../../../components/Modal.tsx";
import { InvestmentObjective } from "../../../../../interfaces/Finance.tsx";
import { apolloFinanceClient } from "../../../../../services/apollo/client/ApolloFinanceService.tsx";
import { QUERY_CURRENCY } from "../../../../../services/apollo/queries/Finance.tsx";
import { URL_FINANCE_INVESTMENT_OBJECTIVE } from "../../../../../services/axios/ApiUrls.tsx";
import { financeSubmit } from "../../../../../services/axios/Submit.tsx";

interface ObjectivesProps {
    isOpen: boolean;
    onToggle: any;
    objective: InvestmentObjective | undefined | null;
}

const DefaultObjective: InvestmentObjective = {
    objectiveId: null,
    title: '',
    description: '',
    amount: 0,
    currencyId: "BRL",
    estimatedDeadline: format(new Date().toDateString(), 'yyyy-MM-dd')
}

const App = (props: ObjectivesProps) => {
    const { handleSubmit, control, reset, formState: { errors, dirtyFields }, getValues } = useForm<InvestmentObjective>({ defaultValues: DefaultObjective });

    const { data: currenciesData } = useQuery(QUERY_CURRENCY, {
        client: apolloFinanceClient,
        skip: !props.isOpen,
    })

    useEffect(() => {
        if (props.isOpen && props.objective) {
            reset(props.objective);
        } else if (props.isOpen && !props.objective) {
            reset(DefaultObjective);
        }

        if (!props.isOpen) {
            reset(DefaultObjective);
        }
    }, [props.isOpen, props.objective, reset]);

    const onSubmit = (data: InvestmentObjective, e: BaseSyntheticEvent<object> | undefined) => {
        let method;
        let submitData;

        if (data.objectiveId !== null) {
            method = 'patch';

            const currentValues: InvestmentObjective = getValues();
            const modifiedFields: Partial<Record<keyof InvestmentObjective, InvestmentObjective[keyof InvestmentObjective]>> = {
                objectiveId: data.objectiveId
            };

            (Object.keys(dirtyFields) as Array<keyof InvestmentObjective>).forEach((key: keyof InvestmentObjective) => {
                modifiedFields[key] = currentValues[key];
            });

            submitData = modifiedFields
        } else {
            method = 'post';
            submitData = data
        }

        financeSubmit(e, URL_FINANCE_INVESTMENT_OBJECTIVE, submitData, method).then(() => {
            toast.success('Objetivo de investimento criado com sucesso');
        }).catch(() => {
            toast.error('Houve um erro ao criar o objetivo de investimento')
        })
    }

    const body =
        <form onSubmit={handleSubmit(onSubmit)}>
            <Grid container rowSpacing={4} columnSpacing={2} sx={{ mt: 4 }}>
                <Grid size={{ sm: 12, md: 12 }} >
                    <Controller
                        name="title"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Título"
                                variant="outlined"
                                size="small"
                                fullWidth
                                error={!!errors.title}
                                helperText={errors.title?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ sm: 12, md: 4 }} >
                    <Controller name={'currencyId'}
                        control={control}
                        rules={{ required: 'Esse campo é obrigatório' }}
                        render={({ field }) => (
                            <SelectAutocomplete
                                label="Moeda"
                                value={field.value}
                                options={currenciesData?.getCurrencies?.currencies || []}
                                getOptionLabel={(option: any) => option.symbol}
                                getOptionValue={(option: any) => option.currencyId}
                                onChange={field.onChange}
                                error={errors.currencyId?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ sm: 12, md: 4 }} >
                    <Controller
                        name="amount"
                        control={control}
                        rules={{
                            validate: (value) => value !== 0 || "Este campo deve ser maior que zero",
                        }}
                        render={({ field }) => (
                            <CurrencyInput
                                label="Valor"
                                prefix={"R$ "}
                                value={field.value}
                                onValueChange={(values: any) => field.onChange(values.rawValue)}
                                error={!!errors.amount}
                                helperText={errors.amount?.message}
                            />
                        )}
                    />
                </Grid>
                <Grid size={{ sm: 12, md: 4 }} >
                    <Controller
                        name="estimatedDeadline"
                        control={control}
                        render={({ field }) => (
                            <LocalizationProvider
                                dateAdapter={AdapterDateFns}
                                adapterLocale={ptBR}
                            >
                                <DatePicker
                                    label="Data da Transação"
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
                <Grid size={{ sm: 12, md: 12 }}>
                    <Controller
                        name="description"
                        control={control}
                        render={({ field }) => (
                            <TextField
                                {...field}
                                label="Descrição"
                                multiline
                                rows={4}
                                variant="outlined"
                                fullWidth
                                error={!!errors.description}
                                helperText={errors.description?.message}
                            />
                        )}
                    />
                </Grid>
            </Grid>
        </form>

    return (
        <Modal
            title="Objetivo"
            body={body}
            isOpen={props.isOpen}
            onToggle={props.onToggle}
            actionModal={handleSubmit(onSubmit)}
            size={'modal-sm'}
        />
    )
}

export default App;