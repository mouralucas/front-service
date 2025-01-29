import {BaseSyntheticEvent, ReactElement, useEffect, useState} from "react";
import Modal from '../../../../components/Modal'
import {Investment} from "../../../../interfaces/Finance.tsx";
import {Controller, useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import Select from "react-select";
import {format, parseISO} from "date-fns";
import CurrencyInput from '../../../../components/form/CurrencyInput.tsx'
import {getAccounts, getCurrencies, getIndexers, getIndexerTypes, getInvestmentObjectives, getInvestmentTypes, getLiquidity} from "../../../../services/getCommonData/Finance.tsx";
import {getCountries} from "../../../../services/getCommonData/Core.tsx";
import {financeSubmit} from "../../../../services/axios/Submit.tsx";
import {URL_FINANCE_INVESTMENT} from "../../../../services/axios/ApiUrls.tsx";
import {toast} from "react-toastify";
import Loader from "../../../../components/Loader.tsx";


interface InvestmentProps {
    investment: Investment | undefined | null,
    modalState: boolean,
    hideModal: any
}

const DefaultInvestment: Investment = {
    investmentId: null,
    transactionDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    name: '',
    accountId: '',
    investmentTypeId: '',
    maturityDate: null,
    quantity: 0,
    price: 0,
    amount: 0,
    contractedRate: '',
    currencyId: 'BRL',
    indexerTypeId: '',
    indexerId: '',
    liquidityId: '',
    countryId: 'BR',
    liquidationDate: null,
    liquidationAmount: 0,
    observation: '',
    objectiveId: ''
}

const App = (props: InvestmentProps): ReactElement => {
    const {handleSubmit, control, reset, formState: {errors, dirtyFields}, getValues, setValue} = useForm<Investment>({defaultValues: DefaultInvestment})

    const [accounts, setAccounts] = useState<any[]>([])
    const [investmentTypes, setInvestmentTypes] = useState<any[]>([])
    const [obejectives, setObejectives] = useState<any[]>([])
    const [currencies, setCurrencies] = useState<any[]>([])
    const [indexerTypes, setIndexerTypes] = useState<any[]>([])
    const [indexers, setIndexers] = useState<any[]>([])
    const [liquidity, setLiquidity] = useState<any[]>([])
    const [countries, setCountries] = useState<any[]>([])

    const [isLoading, setIsLoading] = useState<boolean>(true)

    const fetchInvestmentData: () => Promise<void> = async () => {
        setAccounts(await getAccounts());
        setInvestmentTypes(await getInvestmentTypes());
        setObejectives(await getInvestmentObjectives(true));
        setCurrencies(await getCurrencies());
        setIndexerTypes(await getIndexerTypes());
        setIndexers(await getIndexers());
        setLiquidity(await getLiquidity());
        setCountries(await getCountries(true));

        setIsLoading(false);
    };

    useEffect(() => {
        // Set initial value if provided
        if (props.modalState && props.investment) {
            reset(props.investment);
        } else if (props.modalState && !props.investment) {
            reset(DefaultInvestment);
        }

        // Load necessary information
        if (props.modalState) {
            fetchInvestmentData().then();
        }

        // Clean form when modal closes
        if (!props.modalState) {
            reset(DefaultInvestment);
        }
    }, [props.modalState, props.investment, reset]);

    const calculateTotalAmount = () => {
        const quantity = getValues("quantity");
        const price = getValues("price");

        const amount = quantity * price
        setValue('amount', amount);
    }

    const onSubmit = (data: Investment, e: BaseSyntheticEvent<object, any, any> | undefined) => {
        let method;
        let submit_data;

        if (data.investmentId !== null) {
            method = 'patch'

            const currentValues: Investment = getValues();
            const modifiedFields: Partial<Record<keyof Investment, Investment[keyof Investment]>> = {
                investmentId: data.investmentId
            };

            (Object.keys(dirtyFields) as Array<keyof Investment>).forEach((key: keyof Investment) => {
                modifiedFields[key] = currentValues[key];
            });

            submit_data = modifiedFields
        } else {
            method = 'post'
            submit_data = data
        }

        financeSubmit(e, URL_FINANCE_INVESTMENT, submit_data, method).then(() => {
            toast.success('Investimento salvo com sucesso')
        }).catch((err: string) => {
            toast.error('Erro ao salvar o investimento ' + err)
        })
    }


    const body: ReactElement = isLoading ? <Loader/> :
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-3">
                        <label htmlFor="">Data</label>
                        <Controller
                            name={'transactionDate'}
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <DatePicker
                                    selected={parseISO(field.value)}
                                    onChange={(date: Date | null) => {
                                        field.onChange(date ? format(date, 'yyyy-MM-dd') : field.value);
                                    }}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    placeholderText="Selecione uma data"
                                />
                            )}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="">Conta</label>
                        <Controller
                            name={'accountId'}
                            control={control}
                            rules={{required: "Este campo é obrigatório"}}
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
                        {errors.accountId && (
                            <div className="text-danger mt-1">{errors.accountId.message}</div>
                        )}
                    </div>
                    <div className="col-3">
                        <label htmlFor="">Tipo de investimento</label>
                        <Controller
                            name={'investmentTypeId'}
                            control={control}
                            rules={{required: true}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={investmentTypes}
                                    value={investmentTypes.find((c: any) => c.value === field.value)}
                                    onChange={(val: any) => field.onChange(val?.value)}
                                    className={`${errors.investmentTypeId ? "border border-danger" : ""}`}
                                    placeholder={'Selecione'}
                                />
                            )}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="">Objetivo</label>
                        <Controller
                            name={'objectiveId'}
                            control={control}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={obejectives}
                                    value={obejectives.find((c: any) => c.value === field.value)}
                                    onChange={(val: any) => field.onChange(val?.value)}
                                    placeholder={'Selecione'}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="">Nome do investimento</label>
                        <Controller
                            name={'name'}
                            control={control}
                            rules={{required: "Este campo é obrigatório"}}
                            render={({field}) => (
                                <input
                                    type="text"
                                    {...field}
                                    className={`form-control input-default ${errors.name ? "input-error" : ""}`}
                                />
                            )}
                        />
                    </div>
                    <div className="col-6">
                        <label htmlFor="">Taxa contratada</label>
                        <Controller
                            name={'contractedRate'}
                            control={control}
                            rules={{required: "Este campo é obrigatório"}}
                            render={({field}) => (
                                <input
                                    type="text"
                                    {...field}
                                    className={`form-control input-default ${errors.contractedRate ? "input-error" : ""}`}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <label htmlFor="">Vencimento</label>
                        <Controller
                            name={'maturityDate'}
                            control={control}
                            render={({field}) => (
                                <DatePicker
                                    selected={field.value ? parseISO(field.value) : null}
                                    onChange={(date) => {
                                        field.onChange(date ? format(date, 'yyyy-MM-dd') : field.value);
                                    }}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    placeholderText="__/__/____"
                                />
                            )}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="">Quantidade</label>
                        <Controller
                            name={'quantity'}
                            control={control}
                            rules={{
                                validate: (value) => value !== 0 || "Este campo não deve ser zero",
                            }}
                            render={({field}) => (
                                <CurrencyInput
                                    value={field.value}
                                    onValueChange={(values) => field.onChange(values.rawValue)}
                                    className={`form-control input-default ${errors.quantity ? 'input-error' : ''}`}
                                    onBlur={calculateTotalAmount}
                                />
                            )}
                        />
                        {errors.quantity && (<div className="text-danger mt-1">{errors.quantity.message}</div>)}
                    </div>
                    <div className="col-3">
                        <label htmlFor="">Preço</label>
                        <Controller
                            name={'price'}
                            control={control}
                            rules={{
                                validate: (value) => value !== 0 || "Este campo não deve ser zero",
                            }}
                            render={({field}) => (
                                <CurrencyInput
                                    prefix={'R$ '}
                                    decimalPlaces={5}
                                    value={field.value}
                                    onValueChange={(values) => field.onChange(values.rawValue)}
                                    className={`form-control input-default ${errors.price ? 'input-error' : ''}`}
                                    onBlur={calculateTotalAmount}
                                />
                            )}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="">Total</label>
                        <Controller
                            name={'amount'}
                            control={control}
                            rules={{
                                validate: (value) => value !== 0 || "Este campo não deve ser zero",
                            }}
                            render={({field}) => (
                                <CurrencyInput
                                    prefix={'R$ '}
                                    value={field.value}
                                    onValueChange={(values) => field.onChange(values.rawValue)}
                                    className={`form-control input-default ${errors.amount ? 'input-error' : ''}`}
                                    disabled={true}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-2">
                        <label htmlFor="">Moeda</label>
                        <Controller
                            name={'currencyId'}
                            control={control}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={currencies}
                                    value={currencies.find((c: any) => c.value === field.value)}
                                    onChange={(val) => field.onChange(val?.value)}
                                    className={`${errors.currencyId ? "border border-danger" : ""}`}
                                />
                            )}
                        />
                    </div>
                    <div className="col-5">
                        <label htmlFor="">Tipo indexador</label>
                        <Controller
                            name={'indexerTypeId'}
                            control={control}
                            rules={{required: 'Esse campo é obrigatório'}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={indexerTypes}
                                    value={indexerTypes.find((c: any) => c.value === field.value)}
                                    onChange={(val) => field.onChange(val?.value)}
                                    className={`${errors.indexerTypeId ? "border border-danger" : ""}`}
                                    placeholder={'Selecione'}
                                />
                            )}
                        />
                    </div>
                    <div className="col-5">
                        <label htmlFor="">Indexador</label>
                        <Controller
                            name={'indexerId'}
                            control={control}
                            rules={{required: 'Esse campo é obrigatório'}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={indexers}
                                    value={indexers.find((c: any) => c.value === field.value)}
                                    onChange={(val) => field.onChange(val?.value)}
                                    className={`${errors.indexerId ? "border border-danger" : ""}`}
                                    placeholder={'Selecione'}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-3">
                        <label htmlFor="">Liquidez</label>
                        <Controller
                            name={'liquidityId'}
                            control={control}
                            rules={{required: 'Esse campo é obrigatório'}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={liquidity}
                                    value={liquidity.find((c: any) => c.value === field.value)}
                                    onChange={(val) => field.onChange(val?.value)}
                                    className={`${errors.liquidityId ? "border border-danger" : ""}`}
                                    placeholder={'Selecione'}
                                />
                            )}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="">País</label>
                        <Controller
                            name={'countryId'}
                            control={control}
                            rules={{required: 'Esse campo é obrigatório'}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    options={countries}
                                    value={countries.find((c: any) => c.value === field.value)}
                                    onChange={(val) => field.onChange(val?.value)}
                                    className={`${errors.liquidityId ? "border border-danger" : ""}`}
                                />
                            )}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="">Liquidado em</label>
                        <Controller
                            name={'liquidationDate'}
                            control={control}
                            render={({field}) => (
                                <DatePicker
                                    selected={field.value ? parseISO(field.value) : null}
                                    onChange={(date) => {
                                        field.onChange(date ? format(date, 'yyyy-MM-dd') : field.value);
                                    }}
                                    dateFormat="dd/MM/yyyy"
                                    className="form-control"
                                    placeholderText="__/__/____"
                                />
                            )}
                        />
                    </div>
                    <div className="col-3">
                        <label htmlFor="">Valor líquido</label>
                        <Controller
                            name={'liquidationAmount'}
                            control={control}
                            render={({field}) => (
                                <CurrencyInput
                                    prefix={'R$ '}
                                    value={field.value}
                                    onValueChange={(values) => field.onChange(values.rawValue)}
                                    className={`form-control input-default`}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <label htmlFor="">Observações</label>
                        <Controller
                            name={'observation'}
                            control={control}
                            render={({field}) => (
                                <textarea
                                    {...field}
                                    value={field.value ?? ''}
                                    onChange={field.onChange}
                                    rows={5}
                                    className='form-control'
                                />
                            )}
                        />
                    </div>
                </div>
            </form>
        </>

    return (
        <Modal
            showModal={props.modalState}
            hideModal={props.hideModal}
            title={'Investimento'}
            actionModal={handleSubmit(onSubmit)}
            body={body}
            size={'modal-xl'}
        />
    )
}

export default App;