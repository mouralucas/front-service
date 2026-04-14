import { useQuery } from "@apollo/client";
import { Grid, TextField } from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import { BaseSyntheticEvent, ReactElement, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CurrencyInput from '../../../../../components/form/CurrencyInput.tsx';
import SelectAutocomplete from "../../../../../components/form/SelectAutocomplete.tsx";
import Loader from "../../../../../components/Loader.tsx";
import Modal from '../../../../../components/Modal.tsx';
import { Investment } from "../../../../../interfaces/Finance.tsx";
import { apolloFinanceClient } from "../../../../../services/apollo/client/ApolloFinanceService.tsx";
import { QUERY_ACCOUNTS, QUERY_CURRENCY as QUERY_CURRENCIES, QUERY_INVESTMENT_BY_ID, QUERY_INVESTMENT_OBJECTIVES } from "../../../../../services/apollo/queries/Finance.tsx";
import { URL_FINANCE_INVESTMENT } from "../../../../../services/axios/ApiUrls.tsx";
import { financeSubmit } from "../../../../../services/axios/Submit.tsx";
import { getCountries } from "../../../../../services/getCommonData/Core.tsx";
import { getIndexers, getIndexerTypes, getInvestmentTypes, getLiquidity } from "../../../../../services/getCommonData/Finance.tsx";


interface InvestmentProps {
    isOpen: boolean,
    onToggle: any,
    investmentId: string,
}

const DefaultInvestment: Investment = {
    id: null,
    transactionDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    name: '',
    accountId: '',
    typeId: '',
    maturityDate: null,
    quantity: 0,
    price: 0,
    amount: 0,
    totalContribution: 0,
    totalWithdrawn: 0,
    grossAmount: 0,
    contractedRate: '',
    currencyId: 'BRL',
    indexerTypeId: '',
    indexerId: '',
    liquidityId: '',
    countryId: 'BR',
    settlementDate: null,
    settlementAmount: 0,
    observation: '',
    objectiveId: null
}

const App = (props: InvestmentProps): ReactElement => {
    const { handleSubmit, control, reset, formState: { errors, dirtyFields }, getValues, setValue } = useForm<Investment>({ defaultValues: DefaultInvestment })

    const [investmentTypes, setInvestmentTypes] = useState<any[]>([])
    const [indexerTypes, setIndexerTypes] = useState<any[]>([])
    const [indexers, setIndexers] = useState<any[]>([])
    const [liquidity, setLiquidity] = useState<any[]>([])
    const [countries, setCountries] = useState<any[]>([])

    const { data: investmentData, loading: investmentLoading } = useQuery(QUERY_INVESTMENT_BY_ID, {
        client: apolloFinanceClient,
        variables: {
            params: {id: props.investmentId}
        },
        skip: !props.isOpen || !props.investmentId,
        fetchPolicy: "no-cache"
    })

    const { data: accountData, loading: accountLoading } = useQuery(QUERY_ACCOUNTS,
        {
            client: apolloFinanceClient,
            skip: !props.isOpen
        }
    )
    
    const { data: objectiveData, loading: objectiveLoading } = useQuery(QUERY_INVESTMENT_OBJECTIVES,
        {
            client: apolloFinanceClient,
            skip: !props.isOpen
        }
    )

    const { data: currencyData, loading: currencyLoading } = useQuery(QUERY_CURRENCIES,
        {
            client: apolloFinanceClient,
            skip: !props.isOpen
        }
    )

    const investment = investmentData?.getInvestmentById?.investment

    const fetchInvestmentData: () => Promise<void> = async () => {
        setInvestmentTypes(await getInvestmentTypes());
        setIndexerTypes(await getIndexerTypes());
        setIndexers(await getIndexers(true));
        setLiquidity(await getLiquidity());
        setCountries(await getCountries(true));
    };


    const isLoading = objectiveLoading || currencyLoading || accountLoading || investmentLoading

    useEffect(() => {
        // Set initial value if provided
        if (props.isOpen && investment) {
            reset(investment);
        } else if (props.isOpen && !investment) {
            reset(DefaultInvestment);
        }

        // Load necessary information
        if (props.isOpen) {
            fetchInvestmentData().then();
        }

        // Clean form when modal closes
        if (!props.isOpen) {
            reset(DefaultInvestment);
        }
    }, [props.isOpen, investment, reset]);

    const calculateTotalAmount = () => {
        const quantity = getValues("quantity");
        const price = getValues("price");

        const amount = quantity * price
        setValue('amount', amount);
    }

    const onSubmit = (data: Investment, e: BaseSyntheticEvent<object> | undefined) => {
        let method: string;
        let submitData;

        if (data.id !== null) {
            method = 'patch';

            const currentValues: Investment = getValues();
            const modifiedFields: Partial<Record<keyof Investment, Investment[keyof Investment]>> = {
                id: data.id
            };

            (Object.keys(dirtyFields) as Array<keyof Investment>).forEach((key: keyof Investment) => {
                modifiedFields[key] = currentValues[key];
            });

            submitData = modifiedFields
        } else {
            method = 'post'
            submitData = data
        }

        financeSubmit(e, URL_FINANCE_INVESTMENT, submitData, method).then(() => {
            toast.success('Investimento salvo com sucesso');
            props.onToggle();
        }).catch((err: string) => {
            toast.error('Erro ao salvar o investimento ' + err)
        })
    }


    const body: ReactElement = isLoading ? <Loader /> :
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container rowSpacing={4} columnSpacing={2} sx={{ mt: 4 }}>
                    <Grid size={{ sm: 12, md: 3 }} >
                        <Controller
                            name="transactionDate"
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
                                                error: !!errors.transactionDate,
                                                helperText: errors.transactionDate?.message,
                                            },
                                        }}
                                        sx={{ width: "100%" }}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 3 }} >
                        <Controller
                            name={'accountId'}
                            control={control}
                            rules={{ required: "Campo obrigatório" }}
                            render={({ field }) => (
                                <SelectAutocomplete
                                    label="Conta"
                                    value={field.value}
                                    options={accountData?.getAccounts?.accounts || []}
                                    getOptionLabel={(option: any) => option.nickname}
                                    getOptionValue={(option: any) => option.accountId}
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                    error={errors.accountId?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 3 }} >
                        <Controller
                            name={'typeId'}
                            control={control}
                            rules={{ required: "Campo obrigatório" }}
                            render={({ field }) => (
                                <SelectAutocomplete
                                    label="Tipo de Investimento"
                                    value={field.value}
                                    options={investmentTypes || []}
                                    getOptionLabel={(option: any) => option.label}
                                    getOptionValue={(option: any) => option.value}
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                    error={errors.id?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 3 }} >
                        <Controller
                            name={'objectiveId'}
                            control={control}
                            render={({ field }) => (
                                <SelectAutocomplete
                                    label="Objetivo"
                                    value={field.value || null}
                                    options={objectiveData?.getInvestmentObjectives?.objectives || []}
                                    getOptionLabel={(option: any) => option.title}
                                    getOptionValue={(option: any) => option.id}
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                    error={errors.objectiveId?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 6 }} >
                        <Controller
                            name="name"
                            control={control}
                            rules={{ required: "Esse campo é obrigatório" }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Título"
                                    fullWidth
                                    size="small"
                                    onFocus={(e) => e.currentTarget.select()}
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 6 }} >
                        <Controller
                            name="contractedRate"
                            control={control}
                            rules={{ required: "Esse campo é obrigatório" }}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Taxa contratada"
                                    fullWidth
                                    size="small"
                                    onFocus={(e) => e.currentTarget.select()}
                                    error={!!errors.contractedRate}
                                    helperText={errors.contractedRate?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 6, md: 3 }} >
                        <Controller
                            name="maturityDate"
                            control={control}
                            render={({ field }) => (
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                    adapterLocale={ptBR}
                                >
                                    <DatePicker
                                        label="Vencimento"
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
                                    decimalPlaces={5}
                                    onValueChange={(values: any) => field.onChange(values.rawValue)}
                                    onFocus={(e) => e.currentTarget.select()}
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
                                    decimalPlaces={5}
                                    onValueChange={(values: any) => field.onChange(values.rawValue)}
                                    onFocus={(e) => e.currentTarget.select()}
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
                                    decimalPlaces={5}
                                    onValueChange={(values: any) => field.onChange(values.rawValue)}
                                    error={!!errors.amount}
                                    helperText={errors.amount?.message}
                                    disabled={true}
                                    onBlur={calculateTotalAmount}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 2 }} >
                        <Controller
                            name={'currencyId'}
                            control={control}
                            rules={{ required: "Campo obrigatório" }}
                            render={({ field }) => (
                                <SelectAutocomplete
                                    label="Moeda"
                                    value={field.value}
                                    options={currencyData?.getCurrencies?.currencies || []}
                                    getOptionLabel={(option: any) => option.symbol}
                                    getOptionValue={(option: any) => option.currencyId}
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                    error={errors.currencyId?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 5 }} >
                        <Controller
                            name={'indexerTypeId'}
                            control={control}
                            rules={{ required: "Campo obrigatório" }}
                            render={({ field }) => (
                                <SelectAutocomplete
                                    label="Tipo indexador"
                                    value={field.value}
                                    options={indexerTypes || []}
                                    getOptionLabel={(option: any) => option.label}
                                    getOptionValue={(option: any) => option.value}
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                    error={errors.indexerTypeId?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 5 }} >
                        <Controller
                            name={'indexerId'}
                            control={control}
                            rules={{ required: "Campo obrigatório" }}
                            render={({ field }) => (
                                <SelectAutocomplete
                                    label="Indexador"
                                    value={field.value}
                                    options={indexers || []}
                                    getOptionLabel={(option: any) => option.label}
                                    getOptionValue={(option: any) => option.value}
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                    error={errors.indexerId?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 3 }} >
                        <Controller
                            name={'liquidityId'}
                            control={control}
                            rules={{ required: "Campo obrigatório" }}
                            render={({ field }) => (
                                <SelectAutocomplete
                                    label="Liquidez"
                                    value={field.value}
                                    options={liquidity || []}
                                    getOptionLabel={(option: any) => option.label}
                                    getOptionValue={(option: any) => option.value}
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                    error={errors.liquidityId?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 3 }} >
                        <Controller
                            name={'countryId'}
                            control={control}
                            rules={{ required: "Campo obrigatório" }}
                            render={({ field }) => (
                                <SelectAutocomplete
                                    label="País"
                                    value={field.value}
                                    options={countries || []}
                                    getOptionLabel={(option: any) => option.label}
                                    getOptionValue={(option: any) => option.value}
                                    onChange={(value) => {
                                        field.onChange(value);
                                    }}
                                    error={errors.countryId?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 6, md: 3 }} >
                        <Controller
                            name="settlementDate"
                            control={control}
                            render={({ field }) => (
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                    adapterLocale={ptBR}
                                >
                                    <DatePicker
                                        label="Liquidado em"
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
                    <Grid size={{ sm: 12, md: 3 }} >
                        <Controller
                            name="settlementAmount"
                            control={control}
                            render={({ field }) => (
                                <CurrencyInput
                                    label="Total liquidado"
                                    value={field.value}
                                    prefix={'R$ '}
                                    onValueChange={(values: any) => field.onChange(values.rawValue)}
                                    error={!!errors.settlementAmount}
                                    helperText={errors.settlementAmount?.message}
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
        </>

    return (
        <Modal
            isOpen={props.isOpen}
            onToggle={props.onToggle}
            title={'Investimento'}
            actionModal={handleSubmit(onSubmit)}
            body={body}
            size={'modal-lg'}
        />
    )
}

export default App;