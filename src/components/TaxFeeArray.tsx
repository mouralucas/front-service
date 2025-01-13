import { Controller } from 'react-hook-form';
import Select from 'react-select';
import CurrencyInput from '../components/form/CurrencyInput';

interface TaxFeeArrayProps {
    control: any,
    errors: any,
    taxFeeFields: any,
    appendTaxFee: any,
    removeTaxFee: any,
    currencies: any[],
    taxFeeList: any[]
    type: 'taxDetails' | 'feeDetails'
}

const App = (props: TaxFeeArrayProps) => {
    const title = props.type === 'taxDetails' ? 'Imposto' : 'Taxa';

    return (
        <>
            {props.taxFeeFields.map((taxField: any, taxIndex: any) => (
                <div className="row" key={taxField.id}>
                    <div className="col-3">
                        <label htmlFor=""></label>
                        <Controller
                            name={`${props.type}.${taxIndex}.currencyId`}
                            control={props.control}
                            rules={{ required: 'Esse campo é obrigatório' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={props.currencies}
                                    value={props.currencies.find((c: any) => c.value === field.value)}
                                    onChange={(val) => field.onChange(val?.value)}
                                    className={`${props.errors[props.type]?.[taxIndex]?.currencyId ? "input-error" : ""}`}
                                />
                            )}
                        />
                    </div>
                    <div className="col-4">
                        <label htmlFor="">{title}</label>
                        <Controller
                            name={`${props.type}.${taxIndex}.taxFeeId`}
                            control={props.control}
                            rules={{ required: 'Esse campo é obrigatório' }}
                            render={({ field }) => (
                                <Select
                                    {...field}
                                    options={props.taxFeeList}
                                    value={props.taxFeeList.find((c) => c.value === field.value)}
                                    onChange={(val) => field.onChange(val?.value)}
                                    className={`${props.errors[props.type]?.[taxIndex]?.taxFeeId ? "input-error" : ""}`}
                                />
                            )}
                        />
                    </div>
                    <div className="col-4">
                        <label htmlFor="">Valor</label>
                        <Controller
                            name={`${props.type}.${taxIndex}.amount`}
                            control={props.control}
                            rules={{
                                validate: (value) => value !== 0 || "Este campo não deve ser zero",
                            }}
                            render={({ field }) => (
                                <CurrencyInput
                                    prefix={'R$ '}
                                    value={field.value}
                                    onValueChange={(values) => field.onChange(values.rawValue)}
                                    className={`form-control input-default ${props.errors[props.type]?.[taxIndex]?.amount ? "input-error" : ""}`}
                                />
                            )}
                        />
                    </div>
                    <div className="col-1">
                        <label htmlFor=""></label>
                        <div className="d-flex align-items-center justify-content-center">
                            {taxIndex === props.taxFeeFields.length - 1 &&
                                <button
                                    className='btn btn-plus-sign btn-outline-primary'
                                    onClick={() => props.appendTaxFee({ currencyId: 'BRL', taxFeeId: '', amount: 0 })}
                                ></button>
                            }
                            {taxIndex > 0 &&
                                <button
                                    className='btn btn-minus-sign btn-outline-primary m-lg-2'
                                    onClick={() => props.removeTaxFee(taxIndex)}
                                ></button>
                            }
                        </div>
                    </div>
                </div>
            ))}
        </>
    );
};

export default App;
