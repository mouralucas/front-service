import {InvestmentObjective} from "../../../../../interfaces/Finance.tsx";
import {Controller, useForm} from "react-hook-form";
import {BaseSyntheticEvent, useEffect} from "react";
import DatePicker from "react-datepicker";
import {format, parseISO} from "date-fns";
import Modal from "../../../../../components/Modal.tsx";
import {financeSubmit} from "../../../../../services/axios/Submit.tsx";
import {URL_FINANCE_INVESTMENT_OBJECTIVE} from "../../../../../services/axios/ApiUrls.tsx";
import {toast} from "react-toastify";
import CurrencyInput from "../../../../../components/form/CurrencyInput.tsx";

interface ObjectivesProps {
    modalState: boolean;
    hideModal: () => void;
    objective: InvestmentObjective | undefined | null;
}

const DefaultObjective: InvestmentObjective = {
    objectiveId: null,
    title: '',
    description: '',
    amount: 0,
    estimatedDeadline: format(new Date().toDateString(), 'yyyy-MM-dd')
}

const App = (props: ObjectivesProps) => {
    const {handleSubmit, control, reset, formState: {errors, dirtyFields}, getValues} = useForm<InvestmentObjective>({defaultValues: DefaultObjective});

    useEffect(() => {
        if (props.modalState && props.objective) {
            reset(props.objective);
        } else if (props.modalState && !props.objective) {
            reset(DefaultObjective);
        }

        if (!props.modalState) {
            reset(DefaultObjective);
        }
    }, [props.modalState, props.objective, reset]);

    const onSubmit = (data: InvestmentObjective, e: BaseSyntheticEvent<object> | undefined) => {
        let method;
        let submitData;

        if (data.objectiveId !== null) {
            method = 'patch';

            const currentValues: InvestmentObjective = getValues();
            const modifiedFields: Partial<Record<keyof InvestmentObjective, InvestmentObjective[keyof InvestmentObjective]>> = {
                objectiveId: data.objectiveId
            };

            (Object.keys(dirtyFields) as Array<keyof InvestmentObjective>).forEach((key: keyof InvestmentObjective) => {
                modifiedFields[key] = currentValues[key];
            });

            submitData = modifiedFields
        } else {
            method = 'post';
            submitData = data
        }

        financeSubmit(e, URL_FINANCE_INVESTMENT_OBJECTIVE, submitData, method).then(() => {
            toast.success('Objetivo de investimento criado com sucesso');
        }).catch(() => {
            toast.error('Houve um erro ao criar o objetivo de investimento')
        })
    }

    const body =
        <form onSubmit={handleSubmit(onSubmit)}>
            <div className="row">
                <div className="col-4">
                    <label htmlFor="">Título</label>
                    <Controller
                        name={'title'}
                        control={control}
                        rules={{required: "Este campo é obrigatório"}}
                        render={({field}) => (
                            <input
                                type="text"
                                {...field}
                                className={`form-control input-default ${errors.title ? "input-error" : ""}`}
                            />
                        )}
                    />
                </div>
                <div className="col-4">
                    <label htmlFor="">Valor</label>
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
                            />
                        )}
                    />
                </div>
                <div className="col-4">
                    <label htmlFor="">Data</label>
                    <Controller
                        name={'estimatedDeadline'}
                        control={control}
                        rules={{required: 'Esse campo é obrigatório'}}
                        render={({field}) => (
                            <DatePicker
                                selected={parseISO(field.value)}
                                onChange={(date: Date | null) => {
                                    field.onChange(date ? format(date, 'yyyy-MM-dd') : field.value);
                                }}
                                dateFormat="dd/MM/yyyy"
                                className={`form-control ${errors.estimatedDeadline} ? 'input-error' : ''`}
                                placeholderText="Selecione uma data"
                            />
                        )}
                    />
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <label htmlFor="">Descrição</label>
                    <Controller
                        name={'description'}
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

    return (
        <Modal
            title="Objetivo"
            body={body}
            showModal={props.modalState}
            hideModal={props.hideModal}
            actionModal={handleSubmit(onSubmit)}
            size={'modal-lg'}
        />
    )
}

export default App;