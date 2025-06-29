import Modal from "../../../../components/Modal.tsx";
import {BrazilianFunds} from "../../../../interfaces/Finance.tsx";
import {Controller, useForm} from "react-hook-form";
import {BaseSyntheticEvent} from "react";

interface BrazilianFundsModalProps {
    modalState: boolean;
    hideModal: () => void;
    brazilianFund?: BrazilianFunds;
}


const BrazilianFundsModal = (props: BrazilianFundsModalProps) => {
    const {handleSubmit, control, formState: {errors}} = useForm<BrazilianFunds>();

    const onSubmit = (data: BrazilianFunds, e: BaseSyntheticEvent<object> | undefined) => {
        console.log(e, data);
    }

    const body =
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
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
            showModal={props.modalState}
            hideModal={props.hideModal}
            body={body}
            size={'modal-lg'}
        />
    )
}

export default BrazilianFundsModal;