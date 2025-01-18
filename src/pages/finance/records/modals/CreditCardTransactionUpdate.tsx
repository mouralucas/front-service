import React, {BaseSyntheticEvent, useEffect, useState} from "react";
import Modal from "../../../../components/Modal";
import {Controller, useForm} from "react-hook-form";
import Select from "react-select";
import CurrencyInput from "../../../../components/form/CurrencyInput";
import DatePicker from "react-datepicker";
import {format, parseISO} from "date-fns";
import {getCategories, getCreditCards, getCurrencies} from "../../../../services/getCommonData/Finance.tsx";
import {UpdateCreditCardTransaction} from "../../../../interfaces/Finance.tsx";

interface UpdateCreditCardTransactionProps {
    creditCardTransaction: UpdateCreditCardTransaction | undefined;
    modalState: boolean;
    hideModal: any;
}

const DefaultTransaction: UpdateCreditCardTransaction = {
    transactionId: null,
    creditCardId: '',
    transactionDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    categoryId: '',
    currencyId: 'BRL',

    // International transactions information
    isInternationalTransaction: false,
    transactionCurrencyId: 'BRL',
    transactionAmount: 0,
    dollarExchangeRate: 0,
    currencyDollarExchangeRate: 0,
    taxDetail: [],
    totalTax: 0,

    description: '',
    isInstallment: false,
    currentInstallment: 1,
    dueDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    amount: 0,
    totInstallments: 1,
    totalAmount: 0,
    parentId: null,
    createdAt: format(new Date().toDateString(), 'yyyy-MM-dd'),
    lastEditedAt: format(new Date().toDateString(), 'yyyy-MM-dd')
}

const App = (props: UpdateCreditCardTransactionProps) => {
    const {handleSubmit, control, reset, formState: {errors}} = useForm<UpdateCreditCardTransaction>({defaultValues: DefaultTransaction})

    const [creditCards, setCreditCards] = useState<any[]>([])
    const [categories, setCategories] = useState<any[]>([])
    const [currencies, setCurrencies] = useState<any[]>([])

    useEffect(() => {
        reset(props.creditCardTransaction);

        if (props.modalState) {
            fetchTransactionData().then();
        }

    }, [props.modalState]);

    const fetchTransactionData = async () => {
        setCreditCards(await getCreditCards());
        setCategories(await getCategories());
        setCurrencies(await getCurrencies());
    };

    const onSubmit = (data: UpdateCreditCardTransaction, e: BaseSyntheticEvent<object, any, any> | undefined) => {
        console.log(data);
        console.log(e);
    }

    const body = () => {
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
                                        render={({field}) => (
                                            <Select
                                                {...field}
                                                options={categories}
                                                value={categories.find((c: any) => c.value === field.value)}
                                                onChange={(val: any) => field.onChange(val?.value)}
                                                placeholder={'Selecione'}
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
                                    <input type="text"
                                           {...field}
                                           className={'form-control input-default'}
                                           disabled={true}
                                    />
                                )}
                            />
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
            // actionModal={handleSubmit(onSubmit)}
            // disableAction={!isDirty}
               size={'modal-xl'}
        />
    )
}

export default App;