import { BaseSyntheticEvent } from "react";
import { Controller, useForm } from "react-hook-form";
import { BrazilianFunds } from "../../../type/Finance";
import Modal from "../../../../../components/Modal";

interface BrazilianFundsModalProps {
    isOpen: boolean;
    onToggle: any;
    brazilianFund?: BrazilianFunds;
}


const BrazilianFundsModal = (props: BrazilianFundsModalProps) => {
    // TODO: chante to accept brazilianFundId
    const {handleSubmit, control, formState: {errors}} = useForm<BrazilianFunds>();

    const onSubmit = (data: BrazilianFunds, e: BaseSyntheticEvent<object> | undefined) => {
        console.log(e, data);
    }

    const body =
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row mt-2">
                    <div className="col-6">
                        <label htmlFor="">Nome do fundo</label>
                        <Controller
                            name={'name'}
                            control={control}
                            rules={{required: 'Esse campo é obrigatório'}}
                            render={({field}) => (
                                <input
                                    type={'text'}
                                    {...field}
                                    className={`form-control input-default ${errors.name ? 'input-error' : ''}`}
                                />
                            )}
                        />
                    </div>
                    <div className="col-6">
                        <label htmlFor="">CNPJ</label>
                        <Controller
                            name={'fundCnpj'}
                            control={control}
                            render={({field}) => (
                                <input
                                    type={'text'}
                                    {...field}
                                    className={`form-control input-default ${errors.fundCnpj ? 'input-error' : ''}`}
                                />
                            )}
                        />
                    </div>
                </div>
            </form>
        </>

    return (
        <Modal
            title={'Fundos de Investimentos do Brasil'}
            isOpen={props.isOpen}
            onToggle={props.onToggle}
            body={body}
            size={'modal-sm'}
        />
    )
}

export default BrazilianFundsModal;