import { useQuery } from "@apollo/client";
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from 'date-fns';
import { ptBR } from "date-fns/locale";
import { BaseSyntheticEvent, ReactElement, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast, ToastOptions } from "react-toastify";
import Loader from "../../../../../components/Loader.tsx";
import Modal from "../../../../../components/Modal.tsx";
import CurrencyInput from "../../../../../components/form/CurrencyInput.tsx";
import { Account, AccountTransaction } from "../../../../../interfaces/Finance.tsx";
import { apolloFinanceClient } from "../../../../../services/apollo/client/ApolloFinanceService.tsx";
import { QUERY_ACCOUNTS, QUERY_CATEGORIES, QUERY_CURRENCY } from "../../../../../services/apollo/queries/Finance.tsx";
import { URL_FINANCE_ACCOUNT_TRANSACTION } from "../../../../../services/axios/ApiUrls.tsx";
import { financeSubmit } from "../../../../../services/axios/Submit.tsx";

/**
 *
 * @constructor
 *
 * Account Transaction Modal With React Hook Form
 */
interface AccountStatementProps {
    transaction: AccountTransaction | undefined | null,
    modalState: boolean,
    hideModal: any
}

const DefaultTransaction: AccountTransaction = {
    transactionId: null,
    amount: 0,
    accountId: '',
    categoryId: '',
    currencyId: 'BRL',
    currencySymbol: "R$",
    transactionCurrencyId: '',
    period: 0,
    exchangeRate: 0,
    taxPerc: 0,
    tax: 0,
    spreadPerc: 0,
    spread: 0,
    effectiveRate: 0,
    transactionDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    description: "",
    ownerId: '',
    createdAt: null,
    lastEditedAt: null,
}

const App = (props: AccountStatementProps) => {
    const [currencySymbol, setCurrencySymbol] = useState<string>("R$")
    const { handleSubmit, control, reset, formState: { isDirty, dirtyFields, errors }, getValues, setValue } = useForm<AccountTransaction>({ defaultValues: DefaultTransaction });

    const { data: accountData, loading: accountsLoading } = useQuery(QUERY_ACCOUNTS, {
        client: apolloFinanceClient,
        variables: { params: {} },
        skip: !props.modalState,
    })

    const { data: categoriesData, loading: categoriesLoading } = useQuery(QUERY_CATEGORIES, {
        client: apolloFinanceClient,
        skip: !props.modalState,
    })

    const { data: currenciesData, loading: currenciesLoading } = useQuery(QUERY_CURRENCY, {
        client: apolloFinanceClient,
        skip: !props.modalState,
    })

    const isLoading = accountsLoading || categoriesLoading || currenciesLoading
    const hasData = accountData && categoriesData && currenciesData

    const updateCurrency = () => {
        // TODO: find a way to get currency from account
        const accountId: string = getValues('accountId');
        const account: Account = accountData?.getAccounts?.accounts?.find((a: any) => a.accountId === accountId);
        if (account) {
            setValue('currencyId', account?.currencyId);
        }
        console.log(account)
        setCurrencySymbol(account?.currencySymbol);
    }

    useEffect(() => {
        // Set initial value if provided
        if (props.modalState && props.transaction && accountData && categoriesData && currenciesData) {
            reset(props.transaction);
        } else if (props.modalState && !props.transaction && accountData && categoriesData && currenciesData) {
            reset(DefaultTransaction);
        }

        // Clean form when modal closes
        if (!props.modalState && accountData && categoriesData && currenciesData) {
            reset(DefaultTransaction);
        }
    }, [props.modalState, props.transaction, reset]);

    const onSubmit = (data: AccountTransaction, e: BaseSyntheticEvent<object> | undefined) => {
        let method;
        let submitData;

        if (data.transactionId !== null) {
            method = 'patch'

            const currentValues: AccountTransaction = getValues();
            const modifiedFields: Partial<Record<keyof AccountTransaction, AccountTransaction[keyof AccountTransaction]>> = {
                transactionId: data.transactionId
            };

            (Object.keys(dirtyFields) as Array<keyof AccountTransaction>).forEach((key: keyof AccountTransaction) => {
                modifiedFields[key] = currentValues[key];
            });

            submitData = modifiedFields
        } else {
            method = 'post'
            submitData = data
        }

        console.log(submitData);
        reset(DefaultTransaction);

        financeSubmit(e, URL_FINANCE_ACCOUNT_TRANSACTION, submitData, method).then(() => {
            toast.success('Transação salva com sucesso');
            reset(DefaultTransaction);
        }).catch((err: string | ToastOptions) => {
            toast.error('Erro ao salvar a transação da conta ' + err);
        })
    };

    const body: ReactElement = isLoading || !hasData ? <Loader /> : (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container rowSpacing={4} columnSpacing={2} sx={{ mt: 4 }}>
                    <Grid size={{ sm: 12, md: 3 }} >
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
                    <Grid size={{ sm: 12, md: 4 }} >
                        <Controller name={'accountId'}
                            control={control}
                            rules={{ required: 'Esse campo é obrigatório' }}
                            render={({ field }) => (
                                <FormControl fullWidth size="small">
                                    <InputLabel id="account-label">Conta</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="account-label"
                                        variant="outlined"
                                        label="Conta"
                                        value={field.value || ''}
                                        onChange={(e) => {
                                            field.onChange(e.target.value)
                                            updateCurrency()
                                        }}
                                        sx={{ width: "100%" }}
                                    >
                                        {accountData?.getAccounts.accounts.map((account: any) => (
                                            <MenuItem key={account.accountId} value={account.accountId}>
                                                {account.nickname}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.accountId && (
                                        <FormHelperText>{errors.accountId.message}</FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 2 }} >
                        <Controller name={'currencyId'}
                            control={control}
                            rules={{ required: 'Esse campo é obrigatório' }}
                            render={({ field }) => (
                                <FormControl fullWidth size="small">
                                    <InputLabel id="currency-label">Moeda</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="currency-label"
                                        label="Moeda"
                                        value={field.value || ''}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        sx={{ width: "100%" }}
                                    >
                                        {currenciesData?.getCurrencies?.currencies?.map((currency: any) => (
                                            <MenuItem key={currency?.currencyId} value={currency?.currencyId}>
                                                {currency?.symbol}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.currencyId && (
                                        <FormHelperText>{errors.currencyId.message}</FormHelperText>
                                    )}
                                </FormControl>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 3 }} >
                        <div key={currencySymbol}>
                            <Controller
                                name="amount"
                                control={control}
                                rules={{ required: "Campo obrigatório" }}
                                render={({ field }) => (
                                    <CurrencyInput
                                        label="Valor"
                                        prefix={currencySymbol + " "}
                                        value={field.value}
                                        onValueChange={(values: any) => field.onChange(values.rawValue)}
                                    />
                                )}
                            />
                        </div>
                    </Grid>
                    <Grid size={{ sm: 12, md: 12 }}>
                        <Controller name={'categoryId'}
                            control={control}
                            rules={{ required: 'Esse campo é obrigatório' }}
                            render={({ field }) => (
                                <FormControl fullWidth size="small">
                                    <InputLabel id="category-label">Categoria</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="category-label"
                                        value={field.value || ''}
                                        label="Categoria"
                                        onChange={(e) => field.onChange(e.target.value)}
                                        sx={{ width: "100%" }}
                                    >
                                        {categoriesData?.getCategories?.categories?.map((category: any) => (
                                            <MenuItem key={category?.categoryId} value={category?.categoryId}>
                                                {category?.categoryName}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                    {errors.categoryId && (
                                        <FormHelperText>{errors.categoryId.message}</FormHelperText>
                                    )}
                                </FormControl>
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
        </>
    );

    return (
        <>
            <Modal
                showModal={props.modalState}
                hideModal={props.hideModal}
                title={'Transação'}
                body={body}
                actionModal={handleSubmit(onSubmit)}
                disableAction={!isDirty}
                size={'modal-md'}
            />
        </>
    );
}

export default App;