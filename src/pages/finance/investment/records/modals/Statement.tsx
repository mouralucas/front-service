import { useQuery } from "@apollo/client";
import { Button, Divider, TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ptBR } from "date-fns/locale";
import { BaseSyntheticEvent, ReactElement, useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import '../../../../../assets/core/icons.css';
import CurrencyInput from "../../../../../components/form/CurrencyInput.tsx";
import Loader from "../../../../../components/Loader.tsx";
import Modal from "../../../../../components/Modal.tsx";
import TaxArray from "../../../../../components/TaxFeeArray.tsx";
import { Investment, InvestmentStatement } from "../../../../../interfaces/Finance.tsx";
import { apolloFinanceClient } from "../../../../../services/apollo/client/ApolloFinanceService.tsx";
import { QUERY_CURRENCY, QUERY_INVESTMENT_STATEMENT_METADATA } from "../../../../../services/apollo/queries/Finance.tsx";
import { URL_FINANCE_INVESTMENT_STATEMENT } from "../../../../../services/axios/ApiUrls.tsx";
import { financeSubmit } from "../../../../../services/axios/Submit.tsx";
import { getTaxFee } from "../../../../../services/getCommonData/Finance.tsx";
import { getPeriodFromDate } from "../../../../../utils/datetime.tsx";

interface InvestmentStatementProps {
    modalState: boolean,
    hideModal: any,
    investment: Investment | undefined,
}

const DefaultInvestmentStatement: Partial<InvestmentStatement> = {
    investmentStatementId: null,
    investmentId: '',
    name: '',
    maturityDate: null,
    referenceDate: null, // TODO: create function to get last business day from last month
    period: '',
    grossAmount: 0,
    netAmount: 0,
    taxDetails: [],
    feeDetails: [],
}

const App = (props: InvestmentStatementProps): ReactElement => {
    const { handleSubmit, control, getValues, reset, formState: { errors }, setValue } = useForm<InvestmentStatement>({ defaultValues: DefaultInvestmentStatement })

    const { fields: taxFields, append: appendTax, remove: removeTax } = useFieldArray({
        control,
        name: 'taxDetails',
    });

    const { fields: feeFields, append: appendFee, remove: removeFee } = useFieldArray({
        control,
        name: 'feeDetails',
    });

    const { data: currenciesData, loading: currenciesLoading } = useQuery(QUERY_CURRENCY, {
        client: apolloFinanceClient,
        skip: !props.modalState,
    })

    const { data: metadata, loading: metadataLoading } = useQuery(QUERY_INVESTMENT_STATEMENT_METADATA, {
        client: apolloFinanceClient,
        skip: !props.modalState,
        fetchPolicy: "no-cache",
        variables: { params: { investmentId: props.investment?.investmentId } },
    })

    const [taxes, setTaxes] = useState<any[]>([])
    const [fees, setFees] = useState<any[]>([])

    const fetchTransactionData: () => Promise<void> = async () => {
        setTaxes(await getTaxFee('BR', 'tax'))
        setFees(await getTaxFee('BR', 'fee'))
    };


    const isLoading = currenciesLoading || metadataLoading
    const hasData = taxes && fees && currenciesData

    useEffect(() => {
        // TODO: add fetch to get last statement and set the data and period automatically
        if (props.modalState && props.investment && props.investment.investmentId) {
            reset({
                ...getValues(),
                investmentId: props.investment.investmentId,
                name: props.investment.name,
                transactionDate: props.investment.transactionDate,
                maturityDate: props.investment.maturityDate,
            });

            fetchTransactionData().then()
        }

        if (!props.modalState) {
            reset(DefaultInvestmentStatement);
        }
    }, [getValues, props.investment, props.modalState, reset]);

    useEffect(() => {
        setValue("referenceDate", metadata?.getStatementMetadata?.referenceDate);
        setValue("period", metadata?.getStatementMetadata?.period)
        setValue("contribution", metadata?.getStatementMetadata?.contribution)
    }, [metadata])

    const updatePeriod = () => {
        const selectedDate = getValues('referenceDate');
        if (!selectedDate) return;

        const period = getPeriodFromDate(selectedDate);
        setValue('period', String(period));
    }

    const onSubmit = (data: InvestmentStatement, e: BaseSyntheticEvent<object> | undefined) => {
        let method: string;
        let submitData: InvestmentStatement;

        if (data.investmentStatementId !== null) {
            method = 'patch'
            submitData = data
        } else {
            method = 'post'
            submitData = data
        }

        financeSubmit(e, URL_FINANCE_INVESTMENT_STATEMENT, submitData, method).then(() => {
            toast.success('Extrato inserido com sucesso');
            reset(DefaultInvestmentStatement);
            props.hideModal();
        }).catch(() => {
            toast.error('Erro ao salvar extrato');
        })
    }

    const body: ReactElement = isLoading || !hasData ? <Loader /> : (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container rowSpacing={4} columnSpacing={2} sx={{ mt: 4 }}>
                    <Grid size={{ sm: 12, md: 6 }} > {/* Investment name */}
                        <Controller
                            name="name"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Investmento"
                                    variant="outlined"
                                    size="small"
                                    fullWidth
                                    error={!!errors.name}
                                    helperText={errors.name?.message}
                                    disabled={true}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 3 }} > {/* Transaction date */}
                        <Controller
                            name="transactionDate"
                            control={control}
                            render={({ field }) => (
                                <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                    adapterLocale={ptBR}
                                >
                                    <DatePicker
                                        label="Transação"
                                        value={field.value ? new Date(field.value + "T00:00") : null}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                size: "small",
                                            },
                                        }}
                                        sx={{ width: "100%" }}
                                        disabled={true}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 3 }} > {/* Maturity date */}
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
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                size: "small",
                                            },
                                        }}
                                        sx={{ width: "100%" }}
                                        disabled={true}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 4 }} > {/* Reference date */}
                        <Controller
                            name="referenceDate"
                            control={control}
                            rules={{ required: "Esse campo é obrigatório" }}
                            render={({ field }) => (
                                <LocalizationProvider dateAdapter={AdapterDateFns} adapterLocale={ptBR}>
                                    <DatePicker
                                        label="Referência"
                                        value={field.value ? new Date(field.value + "T00:00") : null}
                                        onChange={(date) => {
                                            const newDate = date ? date.toISOString().split("T")[0] : null;
                                            field.onChange(newDate);
                                            updatePeriod();
                                        }}
                                        slotProps={{
                                            textField: {
                                                fullWidth: true,
                                                size: "small",
                                                error: !!errors.referenceDate,
                                                helperText: errors.referenceDate?.message,
                                            },
                                        }}
                                        sx={{ width: "100%" }}
                                    />
                                </LocalizationProvider>
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 4 }} > {/* Period */}
                        <Controller
                            name="period"
                            control={control}
                            render={({ field }) => (
                                <TextField
                                    {...field}
                                    label="Período"
                                    variant="outlined"
                                    type="number"
                                    size="small"
                                    fullWidth
                                    error={!!errors.period}
                                    helperText={errors.period?.message}
                                    disabled={true}
                                />
                            )}
                        />
                    </Grid>
                    <Grid size={{ sm: 12, md: 4 }} > {/* Contribution */}
                        <div key={"R$"}>
                            <Controller
                                name="contribution"
                                control={control}
                                render={({ field }) => (
                                    <CurrencyInput
                                        label="Entradas"
                                        prefix={"R$ "}
                                        value={field.value}
                                        onValueChange={(values: any) => field.onChange(values.rawValue)}
                                        error={!!errors?.contribution}
                                        helperText={errors?.contribution?.message}
                                    />
                                )}
                            />
                        </div>
                    </Grid>
                     <Grid size={{ sm: 12, md: 4 }} > {/* Withdrawn */}
                        <div key={"R$"}>
                            <Controller
                                name="withdrawn"
                                control={control}
                                render={({ field }) => (
                                    <CurrencyInput
                                        label="Saídas"
                                        prefix={"R$ "}
                                        value={field.value}
                                        onValueChange={(values: any) => field.onChange(values.rawValue)}
                                        error={!!errors?.withdrawn}
                                        helperText={errors?.withdrawn?.message}
                                    />
                                )}
                            />
                        </div>
                    </Grid>
                    <Grid size={{ sm: 12, md: 4 }} > {/* Gross amout */}
                        <div key={"R$"}>
                            <Controller
                                name="grossAmount"
                                control={control}
                                rules={{
                                    validate: (value) => value !== 0 || "Este campo não deve ser zero",
                                }}
                                render={({ field }) => (
                                    <CurrencyInput
                                        label="Valor bruto"
                                        prefix={"R$ "}
                                        value={field.value}
                                        onValueChange={(values: any) => field.onChange(values.rawValue)}
                                        error={!!errors?.grossAmount}
                                        helperText={errors?.grossAmount?.message}
                                    />
                                )}
                            />
                        </div>
                    </Grid>
                    <Grid size={{ sm: 12, md: 4 }} > {/* Net amount */}
                        <div key={"R$"}>
                            <Controller
                                name="netAmount"
                                control={control}
                                rules={{
                                    validate: (value) => value !== 0 || "Este campo não deve ser zero",
                                }}
                                render={({ field }) => (
                                    <CurrencyInput
                                        label="Valor líquido"
                                        prefix={"R$ "}
                                        value={field.value}
                                        onValueChange={(values: any) => field.onChange(values.rawValue)}
                                        error={!!errors?.netAmount}
                                        helperText={errors?.netAmount?.message}
                                    />
                                )}
                            />
                        </div>
                    </Grid>
                    {/* --- TAX --- */}
                    <Divider sx={{ my: 2 }} />
                    <Grid size={12}>
                        {taxFields.length === 0 ? (
                            <>
                                <Grid size={{ xs: 12, md: 2 }} />
                                <Grid size={{ xs: 12, md: 10 }} >
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={() =>
                                            appendTax([{ currencyId: "BRL", taxFeeId: "", amount: 0 }])
                                        }
                                    >
                                        Adicionar imposto
                                    </Button>
                                </Grid>
                            </>
                        ) : (
                            <Grid size={{ xs: 12, md: 12 }}>
                                <TaxArray
                                    taxFeeTitile="Imposto"
                                    type="taxDetails"
                                    control={control}
                                    taxFeeList={taxes}
                                    errors={errors}
                                    taxFeeFields={taxFields}
                                    appendTaxFee={appendTax}
                                    removeTaxFee={removeTax}
                                    currencies={currenciesData?.getCurrencies?.currencies}
                                />
                            </Grid>
                        )}
                    </Grid>

                    {/* --- FEE --- */}
                    <Divider sx={{ my: 2 }} />

                    <Grid size={{ md: 12 }}>
                        {feeFields.length === 0 ? (
                            <>
                                <Grid size={{ xs: 12, md: 2 }} />
                                <Grid size={{ xs: 12, md: 10 }}>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        onClick={() =>
                                            appendFee([{ currencyId: "BRL", taxFeeId: "", amount: 0 }])
                                        }
                                    >
                                        Adicionar taxa
                                    </Button>
                                </Grid>
                            </>
                        ) : (
                            <Grid size={{ xs: 12, md: 12 }}>
                                <TaxArray
                                    taxFeeTitile="Taxa"
                                    type="feeDetails"
                                    control={control}
                                    taxFeeList={fees}
                                    errors={errors}
                                    taxFeeFields={feeFields}
                                    appendTaxFee={appendFee}
                                    removeTaxFee={removeFee}
                                    currencies={currenciesData?.getCurrencies?.currencies}
                                />
                            </Grid>
                        )}
                    </Grid>

                </Grid>
            </form>
        </>
    );

    return (
        <Modal
            showModal={props.modalState}
            hideModal={props.hideModal}
            title={'Investimento'}
            actionModal={handleSubmit(onSubmit)}
            body={body}
            size={'modal-md'}
        />
    )
}

export default App;