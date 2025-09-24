import { useMutation, useQuery } from "@apollo/client";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from 'date-fns';
import { ptBR } from "date-fns/locale";
import { ReactElement, useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Loader from "../../../../../components/Loader.tsx";
import Modal from "../../../../../components/Modal.tsx";
import CurrencyInput from "../../../../../components/form/CurrencyInput.tsx";
import SelectAutocomplete from "../../../../../components/form/SelectAutocomplete.tsx";
import { Account, AccountTransaction, CreateAccountTransactionInput } from "../../../../../interfaces/Finance.tsx";
import { apolloFinanceClient } from "../../../../../services/apollo/client/ApolloFinanceService.tsx";
import { CREATE_ACCOUNT_TRANSACTION, UPDATE_ACCOUNT_TRANSACTION } from "../../../../../services/apollo/mutations/Finance.tsx";
import { QUERY_ACCOUNTS, QUERY_CATEGORIES, QUERY_CURRENCY } from "../../../../../services/apollo/queries/Finance.tsx";

/**
 *
 * @constructor
 *
 * Account Transaction Modal With React Hook Form
 */
interface AccountStatementProps {
    transaction: AccountTransaction | undefined | null,
    modalState: boolean,
    hideAccountTransactionModal: any
}

const DefaultTransaction: CreateAccountTransactionInput = {
    transactionId: null,
    amount: 0,
    accountId: '',
    categoryId: '',
    currencyId: 'BRL',
    transactionCurrencyId: '',
    exchangeRate: 0,
    taxPerc: 0,
    tax: 0,
    spreadPerc: 0,
    spread: 0,
    effectiveRate: 0,
    transactionDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    description: "",
}

const App = (props: AccountStatementProps) => {
    const [currencySymbol, setCurrencySymbol] = useState<string>("R$")
    const { handleSubmit, control, reset, formState: { isDirty, dirtyFields, errors }, getValues, setValue } = useForm<CreateAccountTransactionInput>({ defaultValues: DefaultTransaction });

    const [createAccountTransaction] = useMutation(CREATE_ACCOUNT_TRANSACTION, {
        client: apolloFinanceClient,
        onCompleted: () => {
            toast.success(
                `Transação criada com sucesso!`
            );
            props.hideAccountTransactionModal();
        },
        onError: (error) => {
            toast.error(`Erro: ${error.message}`);
        },
    })

    const [updateAccountTransaction] = useMutation(UPDATE_ACCOUNT_TRANSACTION, {
        client: apolloFinanceClient,
        onCompleted: () => {
            toast.success(
                `Transação atualizada com sucesso!`
            );
            props.hideAccountTransactionModal();
        },
        onError: (error) => {
            toast.error(`Erro: ${error.message}`);
        },
    })

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
    }, [props.modalState, props.transaction, reset, accountData, currenciesData, categoriesData]);

    const onSubmit = async (transactionFormData: CreateAccountTransactionInput) => {
        if (transactionFormData.transactionId !== null) {
            try {
                const currentValues: CreateAccountTransactionInput = getValues();

                const modifiedFields: Partial<Record<keyof CreateAccountTransactionInput, CreateAccountTransactionInput[keyof CreateAccountTransactionInput]>> = {
                    transactionId: transactionFormData.transactionId
                };

                (Object.keys(dirtyFields) as Array<keyof CreateAccountTransactionInput>).forEach((key: keyof CreateAccountTransactionInput) => {
                    modifiedFields[key] = currentValues[key];
                });

                await updateAccountTransaction({
                    variables: {
                        input: modifiedFields
                    }
                })
            } catch (err) {
                console.log("Erro ao atualizar transação: ", err)
            }
        } else {
            try {
                await createAccountTransaction({
                    variables: {
                        input: transactionFormData
                    }
                })
            } catch (err) {
                console.log("Erro ao salvar transação: ", err)
            }
        }
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
                        <Controller
                            name="accountId"
                            control={control}
                            rules={{ required: "Esse campo é obrigatório" }}
                            render={({ field }) => (
                                <SelectAutocomplete
                                    label="Conta"
                                    value={field.value}
                                    options={accountData?.getAccounts.accounts || []}
                                    getOptionLabel={(option) => option.nickname}
                                    getOptionValue={(option) => option.accountId}
                                    onChange={field.onChange}
                                    error={errors.accountId?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 2 }} >
                        <Controller name={'currencyId'}
                            control={control}
                            rules={{ required: 'Esse campo é obrigatório' }}
                            render={({ field }) => (
                                <SelectAutocomplete
                                    label="Moeda"
                                    value={field.value}
                                    options={currenciesData?.getCurrencies?.currencies || []}
                                    getOptionLabel={(option) => option.symbol}
                                    getOptionValue={(option) => option.currencyId}
                                    onChange={field.onChange}
                                    error={errors.accountId?.message}
                                />
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
                                <SelectAutocomplete
                                    label="Categoria"
                                    value={field.value}
                                    options={categoriesData?.getCategories?.categories || []}
                                    getOptionLabel={(option) => option.categoryName}
                                    getOptionValue={(option) => option.categoryId}
                                    onChange={field.onChange}
                                    error={errors.accountId?.message}
                                />
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
                hideModal={props.hideAccountTransactionModal}
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