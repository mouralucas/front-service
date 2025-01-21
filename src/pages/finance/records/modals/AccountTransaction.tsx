import React, {BaseSyntheticEvent, useEffect, useState} from "react";
import {URL_FINANCE_ACCOUNT_TRANSACTION} from "../../../../services/axios/ApiUrls";
import {toast, ToastOptions} from "react-toastify";
import {format, parseISO} from 'date-fns';
import {Controller, useForm} from "react-hook-form";
import Modal from "../../../../components/Modal";
import CurrencyInput from "../../../../components/form/CurrencyInput";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import {financeSubmit} from "../../../../services/axios/Submit";
import {getAccounts, getCategories, getCurrencies} from "../../../../services/getCommonData/Finance.tsx";
import { AccountTransaction } from "../../../../interfaces/Finance.tsx";

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
    const {handleSubmit, control, reset, formState: {isDirty, dirtyFields, errors}, getValues} = useForm<AccountTransaction>({defaultValues: DefaultTransaction});

    const [accounts, setAccounts] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [currencies, setCurrencies] = useState<any[]>([])

    const fetchAccountTransactionData: () => Promise<void> = async () => {
        setAccounts(await getAccounts());
        setCategories(await getCategories());
        setCurrencies(await getCurrencies());
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

    const onSubmit = (data: AccountTransaction, e: BaseSyntheticEvent<object, any, any> | undefined) => {
        let method;
        let submitData;

        if (data.transactionId !== null){
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

        financeSubmit(e, URL_FINANCE_ACCOUNT_TRANSACTION, submitData, method).then(() => {
            toast.success('Transação salva com sucesso');
            reset(DefaultTransaction);
            props.hideModal();
        }).catch((err: string | ToastOptions) => {
            toast.error('Erro ao salvar a transação da conta ' + err);
        })
    };

    const body = (): React.ReactElement => {
        let html: React.ReactElement =
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-2">
                            <label htmlFor=""></label>
                            <Controller
                                name="currencyId"
                                control={control}
                                rules={{required: 'Esse campo é obrigatório'}}
                                render={({field}) => (
                                    <Select
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
                                        render={({field}) => (
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
                                rules={{required: 'Esse campo é obrigatório'}}
                                render={({field}) => (
                                    <DatePicker
                                        selected={parseISO(field.value)}
                                        onChange={(date) => {
                                            field.onChange(date ? format(date, 'yyyy-MM-dd') : field.value);
                                        }}
                                        dateFormat="dd/MM/yyyy"
                                        placeholderText="Selecione uma data"
                                        className={`form-control ${errors.transactionDate ? "input-error" : ""}`}
                                    />
                                )}
                            />
                        </div>
                        <div className="col-4">
                            <label htmlFor="">Conta</label>
                            <Controller name={'accountId'}
                                        control={control}
                                        rules={{required: 'Esse campo é obrigatório'}}
                                        render={({field}) => (
                                            <Select
                                                {...field}
                                                options={accounts}
                                                value={accounts.find((c: any) => c.value === field.value)}
                                                onChange={(val: any) => field.onChange(val?.value)}
                                                className={`${errors.accountId ? "border border-danger" : ""}`}
                                                placeholder={'Selecione'}
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
                                        rules={{required: 'Esse campo é obrigatório'}}
                                        render={({field}) => (
                                            <Select
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
                                        rules={{required: false}}
                                        render={({field}) => (
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

        return html
    }

    return (
        <div>
            <Modal
                showModal={props.modalState}
                hideModal={props.hideModal}
                title={'Transação'}
                body={body()}
                fullscreen={false}
                actionModal={handleSubmit(onSubmit)}
                disableAction={!isDirty}
                size={'modal-xl'}
            />
        </div>
    );
}

export default App;