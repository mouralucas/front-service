import {ReactElement, useEffect, useState} from "react";
import Modal from '../../../../components/Modal'
import {Investment} from "../../Interfaces.tsx";
import {Controller, useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import Select from "react-select";
import {format, parseISO} from "date-fns";
import {getAccounts, getInvestmentTypes} from "../../../../services/getCommonData/Finance.tsx";


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
    observation: ''
}

const App = (props: InvestmentProps): ReactElement => {
    const {
        handleSubmit,
        control,
        reset,
        formState: {errors, dirtyFields},
        getValues,
    } = useForm<Investment>({defaultValues: DefaultInvestment})

    const [accounts, setAccounts] = useState<any[]>([])
    const [investmentTypes, setInvestmentTypes] = useState<any[]>([])

    const fetchInvestmentData: () => Promise<void> = async () => {
        setAccounts(await getAccounts());
        setInvestmentTypes(await getInvestmentTypes());
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
            // getCurrencies();
            // getIndexerTypes();
            // getIndexers();
            // getLiquidity();
            // getCountries();
        }

        // Clean form when modal closes
        if (!props.modalState) {
            reset(DefaultInvestment);
        }
    }, [props.modalState, props.investment, reset]);

    const onSubmit = (data: Investment, e: any) => {
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
            console.log(submit_data);
        } else {
            method = 'post'
            submit_data = data
        }

        console.log(method + submit_data + e);
        // financialSubmit(e, URL_INVESTMENT, submit_data, false, method).then(() => {
        //     toast.success('Investimento salvo com sucesso')
        // }).catch((err: string | ToastOptions) => {
        //     toast.error('Erro ao salvar o investimento ' + err)
        // })
    }


    const body: ReactElement =
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-4">
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
                    <div className="col-4">
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
                    <div className="col-4">
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
            </form>
        </>

    return (
        <Modal
            showModal={props.modalState}
            hideModal={props.hideModal}
            title={'Investimento'}
            body={body}
            size={'lg'}
        />
    )
}

export default App;