import { BaseSyntheticEvent, ReactElement, useEffect, useState } from "react";
import { URL_FINANCE_ACCOUNT_TRANSACTION } from "../../../../../services/axios/ApiUrls.tsx";
import { toast, ToastOptions } from "react-toastify";
import { format, parseISO } from 'date-fns';
import { Controller, useForm } from "react-hook-form";
import Modal from "../../../../../components/Modal.tsx";
import CurrencyInput from "../../../../../components/form/CurrencyInput.tsx";
import DatePicker from "react-datepicker";
import { financeSubmit } from "../../../../../services/axios/Submit.tsx";
import { getAccounts, getCategories, getCurrencies } from "../../../../../services/getCommonData/Finance.tsx";
import { Account, AccountTransaction } from "../../../../../interfaces/Finance.tsx";
import Loader from "../../../../../components/Loader.tsx";
import DateMaskedInput from "../../../../../components/form/DateMaskInput.tsx";
import Grid from "@mui/material/Grid";
import { FormControl, InputLabel, Select, MenuItem, FormHelperText } from "@mui/material";

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
    amount: 3.50,
    accountId: '',
    categoryId: '',
    currencyId: 'BRL',
    transactionCurrencyId: '',
    period: 0,
    exchangeRate: 0,
    taxPerc: 0,
    tax: 0,
    spreadPerc: 0,
    spread: 0,
    effectiveRate: 0,
    transactionDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    description: undefined,
    ownerId: '',
    createdAt: null,
    lastEditedAt: null,
}

const App = (props: AccountStatementProps) => {
    const { handleSubmit, control, reset, formState: { isDirty, dirtyFields, errors }, getValues } = useForm<AccountTransaction>({ defaultValues: DefaultTransaction });

    const [accounts, setAccounts] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [currencies, setCurrencies] = useState<any[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const fetchAccountTransactionData: () => Promise<void> = async () => {
        setAccounts(await getAccounts());
        setCategories(await getCategories(true));
        setCurrencies(await getCurrencies());

        setIsLoading(false);
    }

    const updateCurrency = () => {
        // TODO: find a way to get currency from account
        const account_id: string = getValues('accountId');
        const account: Account = accounts.find((account) => account.value === account_id);
    }

    useEffect(() => {
        // Set initial value if provided
        if (props.modalState && props.transaction) {
            reset(props.transaction);
        } else if (props.modalState && !props.transaction) {
            reset(DefaultTransaction);
        }

        // Load necessary information
        if (props.modalState) {
            fetchAccountTransactionData().then()
        }
        // Clean form when modal closes
        if (!props.modalState) {
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

        // financeSubmit(e, URL_FINANCE_ACCOUNT_TRANSACTION, submitData, method).then(() => {
        //     toast.success('Transação salva com sucesso');
        //     reset(DefaultTransaction);
        // }).catch((err: string | ToastOptions) => {
        //     toast.error('Erro ao salvar a transação da conta ' + err);
        // })
    };

    const body: ReactElement = (
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Grid container rowSpacing={4} columnSpacing={2} sx={{ mt: 4 }}>
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
                                        value={field.value || ''}
                                        onChange={(e) => {
                                            field.onChange(e.target.value)
                                            updateCurrency()
                                        }}
                                        sx={{ width: "100%" }}
                                    >
                                        {accounts?.map((account: any) => (
                                            <MenuItem key={account.value} value={account.value}>
                                                {account.label}
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
                    <Grid size={{ sm: 12, md: 4 }} >
                        <Controller name={'currencyId'}
                            control={control}
                            rules={{ required: 'Esse campo é obrigatório' }}
                            render={({ field }) => (
                                <FormControl fullWidth size="small">
                                    <InputLabel id="currency-label">Moeda</InputLabel>
                                    <Select
                                        {...field}
                                        labelId="currency-label"
                                        value={field.value || ''}
                                        onChange={(e) => field.onChange(e.target.value)}
                                        sx={{ width: "100%" }}
                                    >
                                        {currencies?.map((currency: any) => (
                                            <MenuItem key={currency?.value} value={currency?.value}>
                                                {currency?.label}
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
                    <Grid size={{ sm: 12, md: 4 }} >
                        <Controller
                            name="amount"
                            control={control}
                            rules={{ required: "Campo obrigatório" }}
                            render={({ field }) => (
                                <CurrencyInput
                                    label="Valor"
                                    prefix="R$ "
                                    value={field.value}
                                    onValueChange={(values: any) => field.onChange(values.rawValue)}
                                    className={`form-control input-default ${errors.amount ? 'input-error' : ''}`}
                                />
                            )}
                        />
                    </Grid>
                </Grid>
            </form>
        </>
    );

    const body_2: ReactElement = isLoading ? <Loader /> :
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mt-2">
                    <div className="col-4">
                        <label htmlFor="">Conta</label>
                        <Controller name={'accountId'}
                            control={control}
                            rules={{ required: 'Esse campo é obrigatório' }}
                            render={({ field }) => (
                                <Select
                                    key={field.value}
                                    {...field}
                                    options={accounts}
                                    value={accounts.find((c: any) => c.value === field.value)}
                                    onChange={(val: any) => {
                                        field.onChange(val?.value)
                                        updateCurrency()
                                    }}
                                    className={`${errors.accountId ? "border border-danger" : ""}`}
                                    placeholder={'Selecione'}
                                />
                            )}
                        />
                    </div>
                    <div className="col-2">
                        <label htmlFor=""></label>
                        <Controller
                            name="currencyId"
                            control={control}
                            rules={{ required: 'Esse campo é obrigatório' }}
                            render={({ field }) => (
                                <Select
                                    key={field.value}
                                    {...field}
                                    options={currencies}
                                    value={currencies.find((c: any) => c.value === field.value)}
                                    onChange={(val) => field.onChange(val?.value)}
                                    className={`${errors.currencyId ? "input-error" : ""}`}
                                />
                            )}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="">Valor</label>
                        <Controller name={'amount'}
                            control={control}
                            rules={{
                                validate: (value) => value !== 0 || "Este campo não deve ser zero",
                            }}
                            render={({ field }) => (
                                <CurrencyInput
                                    prefix="R$ "
                                    value={field.value}
                                    onValueChange={(values: any) => field.onChange(values.rawValue)}
                                    className={`form-control input-default ${errors.amount ? 'input-error' : ''}`}
                                />
                            )}

                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="">Data da compra</label>
                        <Controller
                            name={'transactionDate'}
                            control={control}
                            rules={{ required: 'Esse campo é obrigatório' }}
                            render={({ field }) => (
                                <DatePicker
                                    selected={parseISO(field.value)}
                                    onChange={(date) => {
                                        field.onChange(date ? format(date, 'yyyy-MM-dd') : field.value);
                                    }}
                                    dateFormat="dd/MM/yyyy"
                                    placeholderText="Selecione uma data"
                                    className={`form-control ${errors.transactionDate ? "input-error" : ""}`}
                                    customInput={
                                        <DateMaskedInput
                                            placeholder="dd/mm/aaaa"
                                            className={`form-control ${errors.transactionDate ? "input-error" : ""}`}
                                        />
                                    }
                                />

                            )}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="">Categoria</label>
                        <Controller name={'categoryId'}
                            control={control}
                            rules={{ required: 'Esse campo é obrigatório' }}
                            render={({ field }) => (
                                <Select
                                    key={field.value}
                                    {...field}
                                    options={categories}
                                    value={categories.find((c: any) => c.value === field.value)}
                                    onChange={(val) => field.onChange(val?.value)}
                                    className={`${errors.categoryId ? "input-error" : ""}`}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="">Descrição</label>
                        <Controller name={'description'}
                            control={control}
                            rules={{ required: false }}
                            render={({ field }) => (
                                <textarea
                                    {...field}
                                    value={field.value ?? ''}
                                    onChange={field.onChange}
                                    rows={5}
                                    className='form-control'></textarea>
                            )}
                        />
                    </div>
                </div>
            </form>
        </div>

    return (
        <div>
            <Modal
                showModal={props.modalState}
                hideModal={props.hideModal}
                title={'Transação'}
                body={body}
                actionModal={handleSubmit(onSubmit)}
                disableAction={!isDirty}
                size={'modal-md'}
            />
        </div>
    );
}

export default App;