import React, {useEffect, useState} from "react";

import Modal from '../../../../components/Modal'
import {Controller, useFieldArray, useForm} from "react-hook-form";
import {getFinanceData} from "../../../../services/axios/Get";
import {URL_CREDIT_CARD_INSTALLMENT_DUE_DATES, URL_CREDIT_CARD_TRANSACTION} from "../../../../services/axios/ApiUrls";
import CurrencyInput from "../../../../components/form/CurrencyInput";
import DatePicker from "react-datepicker"
import Select from "react-select";
import {format, parseISO} from "date-fns";
import {financeSubmit} from "../../../../services/axios/Submit.tsx";
import {toast, ToastOptions} from "react-toastify";
import {getCategories, getCreditCards, getCurrencies} from "../../../../services/getCommonData/Finance.tsx";
import { CreditCardTransaction } from "../../../../interfaces/Finance.tsx";

interface CreditCardBillProps {
    modalState: boolean;
    hideModal: any;
}

interface GetDueDatesResponse {
    dueDates: [{
        currentInstallment: number;
        dueDate: string;
    }];
}

const DefaultCreditCardTransaction: CreditCardTransaction = {
    transactionId: null,
    creditCardId: '',
    transactionDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    categoryId: '',
    currencyId: 'BRL',

    isInternationalTransaction: false,
    transactionCurrencyId: '',
    transactionAmount: 0,
    dollarExchangeRate: 0,
    currencyDollarExchangeRate: 0,
    totalTax: 0,

    description: '',
    isInstallment: false,
    installments: [{currentInstallment: 1, amount: 0, dueDate: format(new Date().toDateString(), 'yyyy-MM-dd')}],
    totInstallments: 1,
    totalAmount: 0,
    parentId: null,
    createdAt: undefined,
    lastEditedAt: undefined
}

const App = (props: CreditCardBillProps): React.ReactElement => {
    const {handleSubmit, control, reset, formState: {isDirty, dirtyFields, errors}, getValues, watch} = useForm<CreditCardTransaction>({defaultValues: DefaultCreditCardTransaction})

    const [creditCards, setCreditCards] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [currencies, setCurrencies] = useState<any[]>([])
    const [qtdInstallments] = useState<any[]>(Array.from({length: 12}, (_, i) => ({value: i + 1, label: i + 1})))

    const showInternationalTransaction: boolean = watch('isInternationalTransaction')

    const {fields, append, remove, update} = useFieldArray({
        control,
        name: "installments",
    });

    const fetchTransactionData: () => Promise<void> = async () => {
        setCreditCards(await getCreditCards());
        setCategories(await getCategories());
        setCurrencies(await getCurrencies());
    };

    useEffect(() => {
        reset(DefaultCreditCardTransaction);

        if (props.modalState) {
            fetchTransactionData().then();
        }

    }, [props.modalState, reset]);

    const updateInstallmentList = () => {
        const totInstallment: number = getValues('totInstallments');
        const totAmount: number = getValues('totalAmount')
        const creditCardId: string = getValues('creditCardId')
        const transactionDate: string = getValues('transactionDate')

        if (creditCardId !== "" && totAmount !== 0) {
            // The minimum information needed to calculate the due date is the credit card.
            const installmentAmount = totAmount / totInstallment

            const currentLength = fields.length;

            getFinanceData(URL_CREDIT_CARD_INSTALLMENT_DUE_DATES, {
                creditCardId: creditCardId,
                totInstallments: totInstallment,
                transactionDate: transactionDate
            }).then((response: GetDueDatesResponse) => {
                fields.forEach((_, index) => {
                    const dueDate = response.dueDates.find(d => d.currentInstallment === index + 1)?.dueDate || format(new Date().toDateString(), 'yyyy-MM-dd');
                    update(index, {
                        ...fields[index],
                        amount: installmentAmount,
                        dueDate: dueDate
                    });
                });

                if (totInstallment > currentLength) {
                    for (let i = currentLength; i < totInstallment; i++) {
                        append({currentInstallment: i + 1, amount: installmentAmount, dueDate: response.dueDates.find(d => d.currentInstallment === i + 1)?.dueDate || format(new Date().toDateString(), 'yyyy-MM-dd')});
                    }
                } else if (totInstallment < currentLength) {
                    for (let i = currentLength - 1; i >= totInstallment; i--) {
                        remove(i);
                    }
                }
            });
        }
    }

    const onSubmit = (data: CreditCardTransaction, e: any) => {
        let method;
        let submit_data;
        if (data.transactionId !== null) {
            method = 'patch'

            const currentValues: CreditCardTransaction = getValues();
            const modifiedFields: Partial<Record<keyof CreditCardTransaction, CreditCardTransaction[keyof CreditCardTransaction]>> = {
                transactionId: data.transactionId
            };


            (Object.keys(dirtyFields) as Array<keyof CreditCardTransaction>).forEach((key: keyof CreditCardTransaction) => {
                modifiedFields[key] = currentValues[key];
            });
            submit_data = modifiedFields
        } else {
            method = 'post'
            submit_data = data
        }

        financeSubmit(e, URL_CREDIT_CARD_TRANSACTION, submit_data, method).then(() => {
            toast.success('Investimento salvo com sucesso')
        }).catch((err: string | ToastOptions) => {
            toast.error('Erro ao salvar o investimento ' + err)
        })
    }

    const body = (): React.ReactElement => {
        const html: React.ReactElement =
            <div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="row">
                        <div className="col-6">
                            <label htmlFor="">Cartão</label>
                            <Controller
                                name={'creditCardId'}
                                control={control}
                                rules={{required: 'Esse campo é obrigatório'}}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        options={creditCards}
                                        value={creditCards.find((c: any) => c.value === field.value)}
                                        onChange={(val) => {
                                            field.onChange(val?.value);
                                            updateInstallmentList();
                                        }}
                                        placeholder={'Selecione'}
                                        className={`${errors.creditCardId ? "input-error" : ""}`}
                                    />
                                )}
                            />
                        </div>
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
                        <div className="col-4">
                            <label htmlFor="">Valor total</label>
                            <Controller name={'totalAmount'}
                                        control={control}
                                        rules={{
                                            validate: (value) => value !== 0 || "Este campo não deve ser zero",
                                        }}
                                        render={({field}) => (
                                            <CurrencyInput
                                                prefix="R$ "
                                                value={field.value}
                                                onValueChange={(values: any) => field.onChange(values.rawValue)}
                                                onBlur={updateInstallmentList}
                                                className={`form-control input-default ${errors.totalAmount ? "input-error" : ""}`}
                                            />
                                        )}
                            />
                        </div>

                    </div>
                    <div className="row">
                        <div className="col-3">
                            <label htmlFor="">Data compra</label>
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
                                        onBlur={updateInstallmentList}
                                        className={`form-control input-default ${errors.transactionDate ? "input-error" : ""}`}
                                        placeholderText="Selecione uma data"
                                    />
                                )}
                            />
                        </div>
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
                                                onChange={(val: any) => field.onChange(val?.value)}
                                                placeholder={'Selecione'}
                                                className={`${errors.categoryId ? "input-error" : ""}`}
                                            />
                                        )}
                            />
                        </div>
                        <div className="col-3">
                            <label htmlFor="">Parcelas</label>
                            <Controller
                                name={'totInstallments'}
                                control={control}
                                render={({field}) => (
                                    <Select
                                        {...field}
                                        options={qtdInstallments}
                                        value={qtdInstallments.find((c: any) => c.value === field.value)}
                                        onChange={(val: any) => {
                                            field.onChange(val?.value);
                                            updateInstallmentList();
                                        }}
                                        placeholder={'Selecione'}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    <hr/>
                    <h4>
                        <Controller
                            name={"isInternationalTransaction"}
                            control={control}
                            render={({field}) => (
                                <input
                                    {...field}
                                    type={'checkbox'}
                                    value={'on'}
                                    checked={field.value}
                                    // disabled={true}
                                    // className={'form-control'}
                                />
                            )}
                        />
                        Compra internacional
                    </h4>

                    {showInternationalTransaction && (
                        <div>
                            <div className="row">
                                <div className="col-3">
                                    <label htmlFor="">Moeda original</label>
                                    <Controller
                                        name={'transactionCurrencyId'}
                                        control={control}
                                        rules={{
                                            required: showInternationalTransaction ? 'Campo obrigatório' : false,
                                        }}
                                        render={({field}) => (
                                            <Select
                                                {...field}
                                                options={currencies}
                                                value={currencies.find((c: any) => c.value === field.value)}
                                                onChange={(val: any) => field.onChange(val?.value)}
                                                placeholder={'Selecione'}
                                                className={`${errors.transactionCurrencyId ? "input-error" : ""}`}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="">Valor original</label>
                                    <Controller
                                        name={'transactionAmount'}
                                        control={control}
                                        rules={{
                                            validate: (value) => {
                                                if (showInternationalTransaction) {
                                                    return value !== 0 || 'Este campo não deve ser zero';
                                                }
                                                return true; // Se não for uma compra internacional, o campo não precisa ser validado
                                            },
                                        }}
                                        render={({field}) => (
                                            <CurrencyInput
                                                prefix="R$ "
                                                value={field.value}
                                                onValueChange={(values: any) => field.onChange(values.rawValue)}
                                                className={`form-control input-default ${errors.transactionAmount ? "input-error" : ""}`}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="">Dólar</label>
                                    <Controller
                                        name={'dollarExchangeRate'}
                                        control={control}
                                        rules={{
                                            validate: (value) => {
                                                if (showInternationalTransaction) {
                                                    return value !== 0 || 'Este campo não deve ser zero';
                                                }
                                                return true;
                                            },
                                        }}
                                        render={({field}) => (
                                            <CurrencyInput
                                                prefix="R$ "
                                                value={field.value}
                                                onValueChange={(values: any) => field.onChange(values.rawValue)}
                                                className={`form-control input-default ${errors.dollarExchangeRate ? "input-error" : ""}`}
                                            />
                                        )}
                                    />
                                </div>
                                <div className="col-3">
                                    <label htmlFor="">Moéda para Dólar</label>
                                    <Controller
                                        name={'currencyDollarExchangeRate'}
                                        control={control}
                                        rules={{
                                            validate: (value) => {
                                                if (showInternationalTransaction) {
                                                    return value !== 0 || 'Este campo não deve ser zero';
                                                }
                                                return true; // Se não for uma compra internacional, o campo não precisa ser validado
                                            },
                                        }}
                                        render={({field}) => (
                                            <CurrencyInput
                                                prefix="R$ "
                                                value={field.value}
                                                onValueChange={(values: any) => field.onChange(values.rawValue)}
                                                className={`form-control input-default ${errors.currencyDollarExchangeRate ? "input-error" : ""}`}
                                            />
                                        )}
                                    />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-3">
                                    <label htmlFor="">Total de imposto</label>
                                    <Controller
                                        name={'totalTax'}
                                        control={control}
                                        render={({field}) => (
                                            <CurrencyInput
                                                prefix={"R$ "}
                                                value={field.value}
                                                onValueChange={(values: any) => field.onChange(values.rawValue)}
                                                className={`form-control input-default`}
                                            />
                                        )}
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    <hr/>
                    <h4>Parcelas</h4>
                    {/*// TODO: only show this block if it is a installment purchase, otherwise just send the basic list with one element*/}
                    {fields.map((field, index) => (
                        <div className="row" key={field.id}>
                            <div className={'col-3'}>
                                <label>Nº parcela</label>
                                <Controller
                                    name={`installments.${index}.currentInstallment`}
                                    control={control}
                                    render={({field}) => (
                                        <input type={'text'}
                                               {...field}
                                               disabled={true}
                                               className={'form-control'}
                                        />
                                    )}
                                />
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Valor</label>
                                <Controller
                                    name={`installments.${index}.amount`}
                                    control={control}
                                    render={({field}) => (
                                        <CurrencyInput
                                            prefix="R$ "
                                            value={field.value}
                                            onValueChange={(values: any) => field.onChange(values.rawValue)}
                                            className={`form-control input-default ${errors.totalAmount ? "input-error" : ""}`}
                                        />
                                    )}
                                />
                            </div>
                            <div className="col-3">
                                <label htmlFor="">Pagamento</label>
                                <Controller
                                    name={`installments.${index}.dueDate`}
                                    control={control}
                                    render={({field}) => (
                                        <DatePicker
                                            selected={parseISO(field.value)}
                                            onChange={(date) => {
                                                field.onChange(date ? format(date, 'yyyy-MM-dd') : field.value);
                                            }}
                                            dateFormat="dd/MM/yyyy"
                                            className={'form-control'}
                                        />
                                    )}
                                />
                            </div>

                        </div>
                    ))}

                    <div className="row">
                        <div className="col-12">
                            <label htmlFor="">Descrição</label>
                            <Controller name={'description'}
                                        control={control}
                                        render={({field}) => (
                                            <textarea
                                                {...field}
                                                rows={5}
                                                className='form-control'
                                            />
                                        )}/>
                        </div>
                    </div>
                </form>
            </div>

        return html
    }

    return (
        <Modal showModal={props.modalState}
               hideModal={props.hideModal}
               title={'Transação'}
               body={body()}
               fullscreen={false}
               actionModal={handleSubmit(onSubmit)}
               disableAction={!isDirty}
               size={'lg'}
        />
    )
}

export default App;