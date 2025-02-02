import {BaseSyntheticEvent, ReactElement, useEffect, useState} from "react";
import Modal from "../../../../../components/Modal.tsx";
import {Investment, InvestmentStatement} from "../../../../../interfaces/Finance.tsx";
import {Controller, useFieldArray, useForm} from "react-hook-form";
import DatePicker from "react-datepicker";
import {format, parseISO} from "date-fns";
import CurrencyInput from "../../../../../components/form/CurrencyInput.tsx";
import {getCurrencies, getTaxFee} from "../../../../../services/getCommonData/Finance.tsx";
import '../../../../../assets/core/icons.css'
import TaxArray from "../../../../../components/TaxFeeArray.tsx";
import {financeSubmit} from "../../../../../services/axios/Submit.tsx";
import {URL_FINANCE_INVESTMENT_STATEMENT} from "../../../../../services/axios/ApiUrls.tsx";
import {toast} from "react-toastify";

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
    referenceDate: null,
    period: '',
    grossAmount: 0,
    netAmount: 0,
    taxDetails: [],
    feeDetails: [],
}

const App = (props: InvestmentStatementProps): ReactElement => {
    const {handleSubmit, control, getValues, reset, formState: {errors},} = useForm<InvestmentStatement>({defaultValues: DefaultInvestmentStatement})

    const {fields: taxFields, append: appendTax, remove: removeTax} = useFieldArray({
        control,
        name: 'taxDetails',
    });

    const {fields: feeFields, append: appendFee, remove: removeFee} = useFieldArray({
        control,
        name: 'feeDetails',
    });

    const [currencies, setCurrencies] = useState<any[]>([])
    const [taxes, setTaxes] = useState<any[]>([])
    const [fees, setFees] = useState<any[]>([])

    const fetchTransactionData: () => Promise<void> = async () => {
        setCurrencies(await getCurrencies());
        setTaxes(await getTaxFee('BR', 'tax'))
        setFees(await getTaxFee('BR', 'fee'))
    };

    useEffect(() => {
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

    const onSubmit = (data: InvestmentStatement, e: BaseSyntheticEvent<object> | undefined) => {
        let method: string;
        let submitData: InvestmentStatement;

        if (data.investmentStatementId !== null) {
            method = 'patch'
            //TODO: implement correctly
            submitData = data
        } else {
            method = 'post'
            submitData = data
        }

        financeSubmit(e, URL_FINANCE_INVESTMENT_STATEMENT, submitData, method).then(() => {
            toast.success('Extrato inserido com sucesso');
        }).catch(() => {
            toast.error('Erro ao salvar extrato');
        })
    }

    const body: ReactElement =
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-6">
                    <label htmlFor="">InvestmentID</label>
                    <Controller
                        name={'name'}
                        control={control}
                        render={({field}) => (
                            <input type={'text'}
                                   {...field}
                                   disabled={true}
                                   className={'form-control input-default'}
                            />
                        )}
                    />
                </div>
                <div className="col-3">
                    <label htmlFor="">Data</label>
                    <Controller
                        name={'transactionDate'}
                        control={control}
                        render={({field}) => (
                            <DatePicker
                                selected={field.value ? parseISO(field.value) : null}
                                onChange={(date) => {
                                    field.onChange(date ? format(date, 'yyyy-MM-dd') : field.value);
                                }}
                                dateFormat="dd/MM/yyyy"
                                className="form-control"
                                disabled={true}
                            />
                        )}
                    />
                </div>
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
                                disabled={true}
                            />
                        )}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-3">
                    <label htmlFor="">Referência</label>
                    <Controller
                        name={'referenceDate'}
                        control={control}
                        rules={{required: 'Esse campo é obrigatório'}}
                        render={({field}) => (
                            <DatePicker
                                selected={field.value ? parseISO(field.value) : null}
                                onChange={(date) => {
                                    field.onChange(date ? format(date, 'yyyy-MM-dd') : field.value);
                                }}
                                dateFormat="dd/MM/yyyy"
                                className={`form-control ${errors.referenceDate ? "input-error" : ""}`}
                                placeholderText="__/__/____"
                            />
                        )}
                    />
                </div>
                <div className="col-3">
                    <label htmlFor="">Período</label>
                    <Controller
                        name={'period'}
                        control={control}
                        render={({field}) => (
                            <input type={'text'}
                                   {...field}
                                   className={'form-control input-default'}
                            />
                        )}
                    />
                </div>
                <div className="col-3">
                    <label htmlFor="">Valor bruto</label>
                    <Controller
                        name={'grossAmount'}
                        control={control}
                        rules={{
                            validate: (value) => value !== 0 || "Este campo não deve ser zero",
                        }}
                        render={({field}) => (
                            <CurrencyInput
                                prefix={'R$ '}
                                value={field.value}
                                onValueChange={(values) => field.onChange(values.rawValue)}
                                className={`form-control input-default ${errors.grossAmount ? 'input-error' : ''}`}
                            />
                        )}
                    />
                </div>
                <div className="col-3">
                    <label htmlFor="">Valor líquido</label>
                    <Controller
                        name={'netAmount'}
                        control={control}
                        rules={{
                            validate: (value) => value !== 0 || "Este campo não deve ser zero",
                        }}
                        render={({field}) => (
                            <CurrencyInput
                                prefix={'R$ '}
                                value={field.value}
                                onValueChange={(values) => field.onChange(values.rawValue)}
                                className={`form-control input-default ${errors.netAmount ? 'input-error' : ''}`}
                            />
                        )}
                    />
                </div>
            </div>
            <hr/>
            <div className="row">
                {taxFields.length === 0 &&
                    <>
                        <div className="col-9"></div>
                        <div className="col-3">
                            <button className={'btn btn-outline-secondary text-center w-100'} onClick={() => appendTax([{currencyId: 'BRL', taxFeeId: '', amount: 0}])}>Adicionar imposto</button>
                        </div>
                    </>
                }
                {taxFields.length > 0 &&
                    <TaxArray taxFeeTitile={'Imposto'} type={'taxDetails'} control={control} taxFeeList={taxes}
                              errors={errors} taxFeeFields={taxFields}
                              appendTaxFee={appendTax} removeTaxFee={removeTax} currencies={currencies}/>
                }
            </div>
            <hr/>
            <div className="row">
                {feeFields.length === 0 &&
                    <>
                        <div className="col-9"></div>
                        <div className="col-3">
                            <button className={'btn btn-outline-secondary text-center w-100'} onClick={() => appendFee([{currencyId: 'BRL', taxFeeId: '', amount: 0}])}>Adicionar taxa</button>
                        </div>
                    </>
                }
                {feeFields.length > 0 &&
                    <TaxArray taxFeeTitile={'Taxa'} type={'feeDetails'} control={control} taxFeeList={fees}
                              errors={errors} taxFeeFields={feeFields}
                              appendTaxFee={appendFee} removeTaxFee={removeFee} currencies={currencies}/>
                }
            </div>
        </form>

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