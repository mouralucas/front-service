import { useQuery } from "@apollo/client";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { ReactElement, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import CurrencyInput from "../../../../../components/form/CurrencyInput.tsx";
import SelectAutocomplete from "../../../../../components/form/SelectAutocomplete.tsx";
import CircularLoader from "../../../../../components/Loader.tsx";
import Modal from "../../../../../components/Modal.tsx";
import { BrazilianFundInvestment } from "../../../../../interfaces/Finance.tsx";
import { apolloFinanceClient } from "../../../../../services/apollo/client/ApolloFinanceService.tsx";
import { QUERY_ACCOUNTS } from "../../../../../services/apollo/queries/Finance.tsx";
import { getBrazilianFunds, getInvestmentObjectives } from "../../../../../services/getCommonData/Finance.tsx";


interface BrazilianFundInvestmentModalProps {
    isOpen: boolean;
    onToggle: any;
    brazilianFundInvestment: BrazilianFundInvestment | undefined | null
}

const DefaultBrazilianFundInvestment: BrazilianFundInvestment = {
    investmentId: null,
    transactionDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    fundId: '',
    accountId: '',
    name: '',
    investmentTypeId: '',
    quantity: 0,
    price: 0,
    amount: 0,
    currencyId: "BRL",
    countryId: 'BR',
    settlementDate: null,
    settlementAmount: 0,
    observation: '',
    objectiveId: ''
}

const BrazilianFundInvestmentModal = (props: BrazilianFundInvestmentModalProps) => {

    const { handleSubmit, control, reset, formState: { errors, dirtyFields }, getValues, setValue } = useForm<BrazilianFundInvestment>({ defaultValues: DefaultBrazilianFundInvestment })
    const [isLoading, setIsLoading] = useState<boolean>(true)

    // Combo boxes data
    const [funds, setFunds] = useState<any[]>([])
    const [objectives, setObjectives] = useState<any[]>([])

    const { data: accountData } = useQuery(
        QUERY_ACCOUNTS,
        {
            client: apolloFinanceClient,
            skip: !props.isOpen
        }
    )

    const fetchInvestmentData: () => Promise<void> = async () => {
        setFunds(await getBrazilianFunds(true));
        setObjectives(await getInvestmentObjectives(true))

        setIsLoading(false);
    }

    useEffect(() => {
        if (props.isOpen && props.brazilianFundInvestment) {
            reset(props.brazilianFundInvestment);
        } else if (props.isOpen && !props.brazilianFundInvestment) {
            reset(DefaultBrazilianFundInvestment);
        }

        // Load necessary information
        if (props.isOpen) {
            fetchInvestmentData().then();
        }
    }, [props.brazilianFundInvestment, props.isOpen, reset]);

    const calculateTotalAmount = () => {
        const quantity = getValues("quantity");
        const price = getValues("price");

        const amount = quantity * price
        setValue('amount', amount);
    }

    const onSubmit = (data: any) => {
        let method: string;
        let submitData;

        if (data.investmentId !== null) {
            method = 'patch';

            const currentValues: BrazilianFundInvestment = getValues();
            const modifiedFields: Partial<Record<keyof BrazilianFundInvestment, BrazilianFundInvestment[keyof BrazilianFundInvestment]>> = {
                investmentId: data.investmentId
            };

            (Object.keys(dirtyFields) as Array<keyof BrazilianFundInvestment>).forEach((key: keyof BrazilianFundInvestment) => {
                modifiedFields[key] = currentValues[key];
            });

            submitData = modifiedFields
        } else {
            method = 'post'
            submitData = data
        }

        console.log(method, submitData);
        // financeSubmit(e, URL_FINANCE_INVESTMENT, submitData, method).then(() => {
        //     toast.success('Investimento salvo com sucesso')
        // }).catch((err: string) => {
        //     toast.error('Erro ao salvar o investimento ' + err)
        // })
    }

    const body: ReactElement = isLoading ? <CircularLoader /> :
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container rowSpacing={4} columnSpacing={2} sx={{ mt: 4 }}>
                    <Grid size={{ sm: 12, md: 3 }}>
                        <Controller
                            name="transactionDate"
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
                    <Grid size={{ sm: 12, md: 3 }}>
                        <Controller
                            name="fundId"
                            control={control}
                            rules={{ required: "Esse campo é obrigatório" }}
                            render={({ field }) => (
                                <SelectAutocomplete
                                    label="Fundo"
                                    value={field.value}
                                    options={funds || []}
                                    getOptionLabel={(option: any) => option.label}
                                    getOptionValue={(option: any) => option.value}
                                    onChange={(value) => {
                                        field.onChange(value);
                                        // updateCurrency();
                                    }}
                                    error={errors.accountId?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 3 }}>
                        <Controller
                            name="accountId"
                            control={control}
                            rules={{ required: "Esse campo é obrigatório" }}
                            render={({ field }) => (
                                <SelectAutocomplete
                                    label="Conta"
                                    value={field.value}
                                    options={accountData?.getAccounts?.accounts || []}
                                    getOptionLabel={(option: any) => option.nickname}
                                    getOptionValue={(option: any) => option.accountId}
                                    onChange={(value) => {
                                        field.onChange(value);
                                        // updateCurrency();
                                    }}
                                    error={errors.accountId?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 3 }}>
                        <Controller
                            name="objectiveId"
                            control={control}
                            render={({ field }) => (
                                <SelectAutocomplete
                                    label="Objetivo"
                                    value={field.value || null}
                                    options={objectives || []}
                                    getOptionLabel={(option: any) => option.label}
                                    getOptionValue={(option: any) => option.value}
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 3 }}>
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Nome"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 3 }} >
                        <Controller
                            name="quantity"
                            control={control}
                            rules={{
                                validate: (value) => value !== 0 || "Este campo deve ser maior que zero",
                            }}
                            render={({ field }) => (
                                <CurrencyInput
                                    label="Quantidade"
                                    value={field.value}
                                    onValueChange={(values: any) => field.onChange(values.rawValue)}
                                    error={!!errors.quantity}
                                    helperText={errors.quantity?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 3 }} >
                        <Controller
                            name="price"
                            control={control}
                            rules={{
                                validate: (value) => value !== 0 || "Este campo deve ser maior que zero",
                            }}
                            render={({ field }) => (
                                <CurrencyInput
                                    label="Preço"
                                    value={field.value}
                                    prefix={'R$ '}
                                    onValueChange={(values: any) => field.onChange(values.rawValue)}
                                    error={!!errors.price}
                                    helperText={errors.price?.message}
                                    onBlur={calculateTotalAmount}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 3 }} >
                        <Controller
                            name="amount"
                            control={control}
                            rules={{
                                validate: (value) => value !== 0 || "Este campo deve ser maior que zero",
                            }}
                            render={({ field }) => (
                                <CurrencyInput
                                    label="Total"
                                    value={field.value}
                                    prefix={'R$ '}
                                    onValueChange={(values: any) => field.onChange(values.rawValue)}
                                    error={!!errors.amount}
                                    helperText={errors.amount?.message}
                                    disabled={true}
                                    onBlur={calculateTotalAmount}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </form>
        </>

    return (
        <Modal
            isOpen={props.isOpen}
            onToggle={props.onToggle}
            title={'Investimento em Fundos'}
            body={body}
            size={'modal-md'}
            actionModal={handleSubmit(onSubmit)}
        />
    )
}

export default BrazilianFundInvestmentModal;