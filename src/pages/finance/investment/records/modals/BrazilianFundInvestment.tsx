import {ReactElement, useEffect, useState} from "react";
import Modal from "../../../../../components/Modal.tsx";
import Loader from "../../../../../components/Loader.tsx";
import {Controller, useForm} from "react-hook-form";
import {BrazilianFundInvestment} from "../../../../../interfaces/Finance.tsx";
import Select from "react-select";
import {getAccounts, getBrazilianFunds, getInvestmentObjectives} from "../../../../../services/getCommonData/Finance.tsx";
import DatePicker from "react-datepicker";
import {format, parseISO} from "date-fns";
import DateMaskedInput from "../../../../../components/form/DateMaskInput.tsx";
import CurrencyInput from "../../../../../components/form/CurrencyInput.tsx";


interface BrazilianFundInvestmentModalProps {
    modalState: boolean;
    hideModal: any;
    brazilianFundInvestment: BrazilianFundInvestment | undefined | null
}

const DefaultBrazilianFundInvestment: BrazilianFundInvestment = {
    investmentId: null,
    transactionDate: format(new Date().toDateString(), 'yyyy-MM-dd'),
    fundId: '',
    accountId: '',
    name: '',
    investmentTypeId: '',
    quantity: 0,
    price: 0,
    amount: 0,
    currencyId: "BRL",
    countryId: 'BR',
    settlementDate: null,
    settlementAmount: 0,
    observation: '',
    objectiveId: ''
}

const BrazilianFundInvestmentModal = (props: BrazilianFundInvestmentModalProps) => {

    const {handleSubmit, control, reset, formState: {errors, dirtyFields}, getValues} = useForm<BrazilianFundInvestment>({defaultValues: DefaultBrazilianFundInvestment})
    const [isLoading, setIsLoading] = useState<boolean>(true)

    // Combo boxes data
    const [funds, setFunds] = useState<any[]>([])
    const [accounts, setAccounts] = useState<any[]>([])
    const [objectives, setObjectives] = useState<any[]>([])

    const fetchInvestmentData: () => Promise<void> = async () => {
        setFunds(await getBrazilianFunds(true));
        setAccounts(await getAccounts());
        setObjectives(await getInvestmentObjectives(true))

        setIsLoading(false);
    }

    useEffect(() => {
        if (props.modalState && props.brazilianFundInvestment) {
            reset(props.brazilianFundInvestment);
        } else if (props.modalState && !props.brazilianFundInvestment) {
            reset(DefaultBrazilianFundInvestment);
        }

        // Load necessary information
        if (props.modalState) {
            fetchInvestmentData().then();
        }
    }, [props.brazilianFundInvestment, props.modalState, reset]);

    const onSubmit = (data: any) => {
        let method: string;
        let submitData;

        if (data.investmentId !== null) {
            method = 'patch';

            const currentValues: BrazilianFundInvestment = getValues();
            const modifiedFields: Partial<Record<keyof BrazilianFundInvestment, BrazilianFundInvestment[keyof BrazilianFundInvestment]>> = {
                investmentId: data.investmentId
            };

            (Object.keys(dirtyFields) as Array<keyof BrazilianFundInvestment>).forEach((key: keyof BrazilianFundInvestment) => {
                modifiedFields[key] = currentValues[key];
            });

            submitData = modifiedFields
        } else {
            method = 'post'
            submitData = data
        }

        console.log(method, submitData);
        // financeSubmit(e, URL_FINANCE_INVESTMENT, submitData, method).then(() => {
        //     toast.success('Investimento salvo com sucesso')
        // }).catch((err: string) => {
        //     toast.error('Erro ao salvar o investimento ' + err)
        // })
    }

    const body: ReactElement = isLoading ? <Loader/> :
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-2">
                        <label htmlFor="">Data</label>
                        <Controller
                            name={'transactionDate'}
                            control={control}
                            rules={{required: 'Esse campo é obrigatório'}}
                            render={({field}) => (
                                <DatePicker
                                    selected={parseISO(field.value)}
                                    onChange={(date: Date | null) => {
                                        field.onChange(date ? format(date, 'yyyy-MM-dd') : field.value);
                                    }}
                                    dateFormat="dd/MM/yyyy"
                                    className={`form-control ${errors.transactionDate} ? 'input-error' : ''`}
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
                    <div className="col-4">
                        <label htmlFor="">Fundo de investimento</label>
                        <Controller
                            name={'fundId'}
                            control={control}
                            rules={{required: "Este campo é obrigatório"}}
                            render={({field}) => (
                                <Select
                                    {...field}
                                    key={field.value}
                                    options={funds}
                                    value={funds.find((c: any) => c.value === field.value)}
                                    onChange={(val: any) => field.onChange(val?.value)}
                                    className={`${errors.fundId ? "border border-danger" : ""}`}
                                    placeholder={'Selecione'}
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
                                    key={field.value}
                                    options={accounts}
                                    value={accounts.find((c: any) => c.value === field.value)}
                                    onChange={(val: any) => field.onChange(val?.value)}
                                    className={`${errors.accountId ? "border border-danger" : ""}`}
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
                                    key={field.value}
                                    options={objectives}
                                    value={objectives.find((c: any) => c.value === field.value)}
                                    onChange={(val: any) => field.onChange(val?.value)}
                                    placeholder={'Selecione'}
                                />
                            )}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <label htmlFor="">Nome</label>
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
                    <div className="col-2">
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
                                    // onBlur={calculateTotalAmount}
                                />
                            )}
                        />
                        {errors.quantity && (<div className="text-danger mt-1">{errors.quantity.message}</div>)}
                    </div>
                    <div className="col-2">
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
                                    // onBlur={calculateTotalAmount}
                                />
                            )}
                        />
                    </div>
                    <div className="col-2">
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
            </form>
        </>

    return (
        <Modal
            showModal={props.modalState}
            hideModal={props.hideModal}
            title={'Investimento em Fundos'}
            body={body}
            size={'modal-md'}
        />
    )
}

export default BrazilianFundInvestmentModal;