import { useMutation, useQuery } from "@apollo/client";
import { TextField } from "@mui/material";
import Grid from "@mui/material/Grid";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { ptBR } from "date-fns/locale";
import { ReactElement, useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import '../../../../../assets/core/icons.css';
import CurrencyInput from "../../../../../components/form/CurrencyInput.tsx";
import CircularLoader from "../../../../../components/Loader.tsx";
import Modal from "../../../../../components/Modal.tsx";
import { InvestmentStatement } from "../../../../../interfaces/Finance.tsx";
import { apolloFinanceClient } from "../../../../../services/apollo/client/ApolloFinanceService.tsx";
import { CREATE_INVESTMENT_STATEMENT, UPDATE_INVESTMENT_STATEMENT } from "../../../../../services/apollo/mutations/Finance.tsx";
import { QUERY_CURRENCY, QUERY_INVESTMENT_STATEMENT, QUERY_INVESTMENT_STATEMENT_METADATA } from "../../../../../services/apollo/queries/Finance.tsx";
import { getPeriodFromDate } from "../../../../../utils/datetime.tsx";

interface InvestmentStatementProps {
    isOpen: boolean
    onToggle: any
    investmentId: string
    statementId?: string
}

const DefaultInvestmentStatement: Partial<InvestmentStatement> = {
    id: null,
    investmentId: '',
    name: '',
    maturityDate: null,
    referenceDate: null,
    period: '',
    contribution: 0,
    withdrawn: 0,
    grossAmount: 0,
    netAmount: 0,
    taxDetails: [],
    feeDetails: [],
}

const App = (props: InvestmentStatementProps): ReactElement => {
    const { handleSubmit, control, getValues, reset, formState: {dirtyFields, errors }, setValue } = useForm<InvestmentStatement>({ defaultValues: DefaultInvestmentStatement })

    const { data: currenciesData, loading: currenciesLoading } = useQuery(QUERY_CURRENCY, {
        client: apolloFinanceClient,
        skip: !props.isOpen,
    })

    const { data: metadata, loading: metadataLoading } = useQuery(QUERY_INVESTMENT_STATEMENT_METADATA, {
        client: apolloFinanceClient,
        skip: !props.isOpen,
        fetchPolicy: "no-cache",
        variables: { params: { investmentId: props.investmentId } },
    })

    const { data: statementData, loading: statementLoading } = useQuery(QUERY_INVESTMENT_STATEMENT, {
        client: apolloFinanceClient,
        variables: {
            params: {
                "id": props.statementId
            }
        },
        skip: !props.statementId,
        fetchPolicy: "no-cache"
    })

    const statement = statementData?.getInvestmentStatement?.statement

    // Effect for editing: combine statement with metadata
    useEffect(() => {
        // If statement exist, populate with its values, else just default metadata values
        if (metadata) {
            reset({
                ...DefaultInvestmentStatement,
                id: statement?.id ?? null,
                investmentId: props.investmentId,
                referenceDate: statement?.referenceDate ?? metadata?.getStatementMetadata?.referenceDate,
                period: statement?.period ?? metadata?.getStatementMetadata?.period,
                grossAmount: statement?.grossAmount ?? 0,
                netAmount: statement?.netAmount ?? 0,
                contribution: statement?.contribution ?? metadata?.getStatementMetadata?.contribution,
                withdrawn: statement?.withdrawn ?? 0,
                name: metadata?.getStatementMetadata?.investmentName,
                transactionDate: metadata?.getStatementMetadata?.investmentTransactionDate,
                maturityDate: metadata?.getStatementMetadata?.investmentMaturityDate,
            });
        }
    }, [statement, metadata, props.statementId, reset])

    const isLoading = currenciesLoading || metadataLoading || statementLoading
    const hasData = currenciesData

    const [createStatement] = useMutation(CREATE_INVESTMENT_STATEMENT, {
        client: apolloFinanceClient,
        onCompleted: () => {
            toast.success(
                'Extrato criado com sucesso'
            );
            props.onToggle();
        },
        onError: (error) => {
            toast.error(`Erro: ${error.message}`);
        },
    })

    const [updateStatement] = useMutation(UPDATE_INVESTMENT_STATEMENT, {
        client: apolloFinanceClient,
        onCompleted: () => {
            toast.success(
                'Extrato atualizado com sucesso'
            );
            props.onToggle();
        },
        onError: (error) => {
            toast.error(`Erro: ${error.message}`);
        },
    })

    const updatePeriod = () => {
        const selectedDate = getValues('referenceDate');
        if (!selectedDate) return;

        const period = getPeriodFromDate(selectedDate);
        setValue('period', String(period));
    }

    const updateNetAmount = () => {
        // Function only to update deplrecated field until its gone
        const grossAmount = getValues("grossAmount");
        if (!grossAmount) return;

        setValue("netAmount", grossAmount, {
            shouldDirty: true
        });
    }

    const onSubmit = async (data: InvestmentStatement) => {
        if (data.id) {
            const currentValues: InvestmentStatement = getValues();

            const modifiedFields: Partial<Record<keyof InvestmentStatement, InvestmentStatement[keyof InvestmentStatement]>> = {
                id: data.id
            };

            (Object.keys(dirtyFields) as Array<keyof InvestmentStatement>).forEach((key: keyof InvestmentStatement) => {
                modifiedFields[key] = currentValues[key];
            });
            
            console.log(modifiedFields);
            await updateStatement({
                variables: {
                    statement: modifiedFields
                }
            })
        } else {
            try {
                await createStatement({
                    variables: {
                        statement: data
                    }
                })
            } catch (error) {
                console.error("Erro ao criar extrato " + error)
            }
        }
    }

    const body: ReactElement = isLoading || !hasData ? <CircularLoader /> : (
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
                                        onChange={updateNetAmount}
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
                </Grid>
            </form>
        </>
    );

    return (
        <Modal
            isOpen={props.isOpen}
            onToggle={props.onToggle}
            title={'Investimento'}
            actionModal={handleSubmit(onSubmit)}
            body={body}
            size={'modal-md'}
        />
    )
}

export default App;