import { useLazyQuery, useMutation, useQuery } from "@apollo/client";
import { Box, Checkbox, CircularProgress, Divider, FormControlLabel, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import React, { ReactElement, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import CircularLoader from "../../../../../components/Loader.tsx";
import Modal from '../../../../../components/Modal.tsx';
import CurrencyInput from "../../../../../components/form/CurrencyInput.tsx";
import SelectAutocomplete from "../../../../../components/form/SelectAutocomplete.tsx";
import { apolloFinanceClient } from "../../../../../services/apollo/client/ApolloFinanceService.tsx";
import { QUERY_CREDIT_CARDS, QUERY_CURRENCY } from "../../../api/queries.ts";
import { CREATE_CREDIT_CARD_TRANSACTION_MUTATION, UPDATE_CREDIT_CARD_TRANSACTION_MUTATION } from "../../api/mutations.ts";
import { QUERY_CREDIT_CARD_TRANSACTION_METADATA_BY_ID, QUERY_INSTALLMENT_DUE_DATE, QUERY_TRANSACTION_CATEGORIES } from "../../api/queries.ts";
import { CreditCardTransactionMetadata } from "../../types/CreditCard.ts";
import { GetCreditCardTransactionsMetadataById } from "../../types/CreditCardQueries.ts";

interface CreditCardBillTransactionProps {
    isOpen: boolean;
    onToggle: any;
    transactionId?: number;
}

const DefaultCreditCardTransaction: CreditCardTransactionMetadata = {
    id: null,
    creditCardId: '',
    transactionDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    categoryId: '',
    currencyId: 'BRL',

    isInternationalTransaction: false,
    transactionCurrencyId: '',
    transactionAmount: 0,
    dollarExchangeRate: 0,
    currencyDollarExchangeRate: 0,

    description: '',
    isInstallment: false,
    installments: [{ currentInstallment: 1, amount: 0, dueDate: format(new Date().toDateString(), 'yyyy-MM-dd') }],
    totalInstallments: 1,
    totalAmount: 0,
}

const App = (props: CreditCardBillTransactionProps): ReactElement => {
    const { handleSubmit, control, reset, formState: { isDirty, dirtyFields, errors }, getValues, watch } = useForm<CreditCardTransactionMetadata>({ defaultValues: DefaultCreditCardTransaction })

    const [qtdInstallments] = useState<any[]>(Array.from({ length: 12 }, (_, i) => ({ value: i + 1, label: String(i + 1) })))

    const showInternationalTransaction = watch('isInternationalTransaction')

    const { fields, append, remove, update } = useFieldArray({
        control,
        name: "installments",
    });

    const { loading: creaditCardTransactionLoading } = useQuery<GetCreditCardTransactionsMetadataById>(
        QUERY_CREDIT_CARD_TRANSACTION_METADATA_BY_ID, {
        client: apolloFinanceClient,
        variables: {
            param: props.transactionId
        },
        skip: !props.transactionId,
        fetchPolicy: "no-cache",
        onCompleted: (data) => {
            const transaction = data?.getCreditCardTransactionMetadataById?.transactionMetadata;
            if (transaction) {
                reset(transaction);
            }
        }
    })

    const { data: creditCardsData, loading: creditCardsLoading } = useQuery(QUERY_CREDIT_CARDS, {
        client: apolloFinanceClient,
        skip: !props.isOpen,
        variables: { params: { active: true } },
    })

    const { data: categoriesData, loading: categoriesLoading } = useQuery(QUERY_TRANSACTION_CATEGORIES, {
        client: apolloFinanceClient,
        skip: !props.isOpen,
    })

    const { data: currenciesData, loading: currenciesLoading } = useQuery(QUERY_CURRENCY, {
        client: apolloFinanceClient,
        skip: !props.isOpen,
    })

    const [fetchInstallmentDueDates, { loading: loadingIntallmentDueDate }] = useLazyQuery(QUERY_INSTALLMENT_DUE_DATE, {
        client: apolloFinanceClient,
        fetchPolicy: "no-cache",
    });

    const [createCreditCardTransaction] = useMutation(CREATE_CREDIT_CARD_TRANSACTION_MUTATION, {
        client: apolloFinanceClient,
        onCompleted: () => {
            toast.success(
                "Transação salva"
            );
        },
        onError: (error) => {
            toast.error(`Erro: ${error.message}`);
        }
    }
    )

    const [updateCreditCardTransaction] = useMutation(UPDATE_CREDIT_CARD_TRANSACTION_MUTATION, {
        client: apolloFinanceClient,
        onCompleted: () => {
            toast.success(
                "Transação atualizada"
            );
        },
        onError: (error) => {
            toast.error(`Erro: ${error.message}`);
        }
    })

    const isLoading = creditCardsLoading || categoriesLoading || currenciesLoading
    const hasData = creditCardsData && categoriesData && currenciesData

    useEffect(() => {
        reset(DefaultCreditCardTransaction);
    }, [props.isOpen, reset]);

    const updateInstallmentList = async () => {
        const totInstallments: number = getValues("totalInstallments");
        const totAmount: number | null = getValues("totalAmount");
        const creditCardId: string = getValues("creditCardId");
        const transactionDate: string = getValues("transactionDate");

        if (creditCardId !== "" && totAmount !== 0) {
            const installmentAmount = totAmount / totInstallments;
            const currentLength = fields.length;

            const { data } = await fetchInstallmentDueDates({
                variables: {
                    params: {
                        creditCardId,
                        totInstallments,
                        transactionDate
                    }
                },
            });

            const dueDates = data?.getCreditCardInstallmentDueDates.dueDates ?? [];

            fields.forEach((_, index) => {
                const dueDate =
                    dueDates.find((d: any) => d.currentInstallment === index + 1)?.dueDate ||
                    format(new Date().toDateString(), "yyyy-MM-dd");

                update(index, {
                    ...fields[index],
                    amount: installmentAmount,
                    dueDate,
                });
            });

            if (totInstallments > currentLength) {
                for (let i = currentLength; i < totInstallments; i++) {
                    append({
                        currentInstallment: i + 1,
                        amount: installmentAmount,
                        dueDate:
                            dueDates.find((d: any) => d.currentInstallment === i + 1)?.dueDate ||
                            format(new Date().toDateString(), "yyyy-MM-dd"),
                    });
                }
            } else if (totInstallments < currentLength) {
                for (let i = currentLength - 1; i >= totInstallments; i--) {
                    remove(i);
                }
            }
        }
    };

    const cleanObject = (obj: any): any => {
        if (Array.isArray(obj)) {
            return obj.map(cleanObject);
        }

        if (obj !== null && typeof obj === "object") {
            const newObj: any = {};
            Object.keys(obj).forEach((key) => {
                if (key !== "__typename") {
                    newObj[key] = cleanObject(obj[key]);
                }
            });
            return newObj;
        }

        return obj;
    };

    const onSubmit = async (data: CreditCardTransactionMetadata) => {
        if (data.id) {
            const cleanData = {
                ...data,
                installments: data.installments.map(({ id, ...rest }) => rest)
            };
            try {
                await updateCreditCardTransaction({
                    variables: {
                        transaction: cleanObject(cleanData)
                    }
                })
            } catch (error) {
                console.error("Erro ao atualizar transação " + error)
            }
        } else {
            const cleanData = {
                ...data,
                installments: data.installments.map(({ id, ...rest }) => rest)
            };
            try {
                await createCreditCardTransaction({
                    variables: {
                        transaction: cleanData
                    }
                })
            } catch (error) {
                console.error("Erro ao criar transação " + error)
            }
        }
    }

    const body: ReactElement = isLoading || !hasData ? <CircularLoader /> :
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container rowSpacing={4} columnSpacing={2} sx={{ mt: 4 }}>
                    <Grid size={{ sm: 12, md: 6 }} >
                        <Controller
                            name="creditCardId"
                            control={control}
                            rules={{ required: "Esse campo é obrigatório" }}
                            render={({ field }) => {
                                return (
                                    <SelectAutocomplete
                                        label="Cartão"
                                        value={field.value}
                                        options={creditCardsData?.getCreditCards.creditCards || []}
                                        getOptionLabel={(option: any) => option.nickname}
                                        getOptionValue={(option: any) => option.creditCardId}
                                        onChange={(val: any) => {
                                            const newVal = val ? (val.value ?? val) : null;
                                            field.onChange(newVal);
                                            updateInstallmentList();
                                        }}
                                        error={errors.creditCardId?.message}
                                    />
                                );
                            }}
                        />
                    </Grid>
                    <Grid size={{ sm: 6, md: 2 }} >
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
                    <Grid size={{ sm: 6, md: 4 }} >
                        <Controller
                            name="totalAmount"
                            control={control}
                            rules={{
                                validate: (value) => value !== 0 || "Este campo deve ser diferente de zero",
                            }}
                            render={({ field }) => (
                                <CurrencyInput
                                    label="Valor"
                                    prefix={"R$ "}
                                    value={field.value}
                                    onBlur={updateInstallmentList}
                                    onValueChange={(values: any) => field.onChange(values.rawValue)}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 3 }} >
                        <Controller
                            name="transactionDate"
                            control={control}
                            render={({ field }) => (
                                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                                    <DatePicker
                                        label="Data da Transação"
                                        value={field.value ? new Date(field.value + "T00:00") : null}
                                        onChange={(date) => {
                                            const newDate = date ? date.toISOString().split("T")[0] : null;
                                            field.onChange(newDate);
                                            updateInstallmentList();
                                        }}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                size: "small",
                                            }
                                        }}
                                        sx={{ width: "100%" }}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 6 }} >
                        <Controller name={'categoryId'}
                            control={control}
                            rules={{ required: 'Esse campo é obrigatório' }}
                            render={({ field }) => (
                                <SelectAutocomplete
                                    label="Categoria"
                                    value={field.value}
                                    options={categoriesData?.getCategories?.categories || []}
                                    getOptionLabel={(option: any) => option.categoryName}
                                    getOptionValue={(option: any) => option.categoryId}
                                    onChange={field.onChange}
                                    error={errors.categoryId?.message}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 3 }} >
                        <Controller
                            name={'totalInstallments'}
                            control={control}
                            rules={{ required: 'Esse campo é obrigatório' }}
                            render={({ field }) => {
                                const selectedOption = qtdInstallments.find((o: any) => o.value === field.value) || null;
                                return (
                                    <SelectAutocomplete
                                        label="Parcelas"
                                        value={selectedOption}
                                        options={qtdInstallments}
                                        getOptionLabel={(option: any) => option.label}
                                        getOptionValue={(option: any) => option.value}
                                        onChange={(val: any) => {
                                            const newVal = val ? (val.value ?? val) : null;
                                            field.onChange(newVal);
                                            updateInstallmentList();
                                        }}
                                        error={errors.totalInstallments?.message}
                                    />
                                );
                            }}
                        />
                    </Grid>

                    <Divider />

                    <Grid size={{ sm: 12, md: 12 }} >
                        <Controller
                            name="isInternationalTransaction"
                            control={control}
                            render={({ field }) => (
                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            {...field}
                                            checked={!!field.value}
                                            size="small"
                                        />
                                    }
                                    label="Compra internacional"
                                />
                            )}
                        />
                    </Grid>
                    {showInternationalTransaction && (
                        <>
                            <Grid size={{ sm: 6, md: 3 }} >
                                <Controller name={'transactionCurrencyId'}
                                    control={control}
                                    rules={{ required: 'Esse campo é obrigatório' }}
                                    render={({ field }) => (
                                        <SelectAutocomplete
                                            label="Moeda da compra"
                                            value={field.value}
                                            options={currenciesData?.getCurrencies?.currencies || []}
                                            getOptionLabel={(option: any) => option.symbol}
                                            getOptionValue={(option: any) => option.currencyId}
                                            onChange={field.onChange}
                                            error={errors.transactionCurrencyId?.message}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid size={{ sm: 6, md: 3 }} >
                                <Controller
                                    name="transactionAmount"
                                    control={control}
                                    rules={{ required: "Campo obrigatório" }}
                                    render={({ field }) => (
                                        <CurrencyInput
                                            label="Valor original da compra"
                                            prefix={"R$ "}
                                            value={field.value}
                                            onValueChange={(values: any) => field.onChange(values.rawValue)}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid size={{ sm: 6, md: 3 }} >
                                <Controller
                                    name="dollarExchangeRate"
                                    control={control}
                                    rules={{ required: "Campo obrigatório" }}
                                    render={({ field }) => (
                                        <CurrencyInput
                                            label="Valor do dólar"
                                            prefix={"R$ "}
                                            value={field.value}
                                            onValueChange={(values: any) => field.onChange(values.rawValue)}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid size={{ sm: 6, md: 3 }} >
                                <Controller
                                    name="currencyDollarExchangeRate"
                                    control={control}
                                    rules={{ required: "Campo obrigatório" }}
                                    render={({ field }) => (
                                        <CurrencyInput
                                            label="Valor dólar/moeda"
                                            prefix={"R$ "}
                                            value={field.value}
                                            onValueChange={(values: any) => field.onChange(values.rawValue)}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid size={{ sm: 6, md: 3 }} >
                                <Controller
                                    name="totalTax"
                                    control={control}
                                    rules={{ required: "Campo obrigatório" }}
                                    render={({ field }) => (
                                        <CurrencyInput
                                            label="Total de imposto"
                                            prefix={"R$ "}
                                            value={field.value}
                                            onValueChange={(values: any) => field.onChange(values.rawValue)}
                                        />
                                    )}
                                />
                            </Grid>
                        </>
                    )}

                    {loadingIntallmentDueDate ? (
                        <Box
                            display="flex"
                            justifyContent="center"
                            alignItems="center"
                            width="100%"
                            py={4}
                        >
                            <CircularProgress size={30} />
                        </Box>
                    ) : (
                        fields.map((field, index) => (
                            <React.Fragment key={field.id}>
                                <Grid size={{ sm: 6, md: 3 }}>
                                    <Controller
                                        name={`installments.${index}.currentInstallment`}
                                        control={control}
                                        render={({ field }) => (
                                            <TextField
                                                {...field}
                                                label="Nº parcela"
                                                fullWidth
                                                size="small"
                                                disabled
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid size={{ sm: 6, md: 3 }}>
                                    <Controller
                                        name={`installments.${index}.amount`}
                                        control={control}
                                        rules={{ required: "Campo obrigatório" }}
                                        render={({ field }) => (
                                            <CurrencyInput
                                                label="Valor da parcela"
                                                prefix={"R$ "}
                                                value={field.value}
                                                onValueChange={(values: any) => field.onChange(values.rawValue)}
                                            />
                                        )}
                                    />
                                </Grid>

                                <Grid size={{ sm: 6, md: 3 }}>
                                    <Controller
                                        name={`installments.${index}.dueDate`}
                                        control={control}
                                        render={({ field }) => (
                                            <LocalizationProvider
                                                dateAdapter={AdapterDateFns}
                                                adapterLocale={ptBR}
                                            >
                                                <DatePicker
                                                    label="Data do Pagamento"
                                                    value={field.value ? new Date(field.value + "T00:00") : null}
                                                    onChange={(date) =>
                                                        field.onChange(
                                                            date ? date.toISOString().split("T")[0] : null
                                                        )
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

                                <Grid size={{ sm: 6, md: 3 }}></Grid>
                            </React.Fragment>
                        ))
                    )}
                    <Grid size={{ sm: 12, md: 12 }} >
                        <Controller
                            name={"description"}
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Descrição"
                                    multiline
                                    minRows={4}
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
            title={'Transação'}
            body={body}
            actionModal={handleSubmit(onSubmit)}
            disableAction={!isDirty}
            size={'modal-md'}
        />
    )
}

export default App;