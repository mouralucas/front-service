import {BaseSyntheticEvent, ReactElement} from "react";
import Modal from "../../../../components/Modal.tsx";
import {Bank} from "../../../../interfaces/Finance.tsx";
import {Controller, useForm} from "react-hook-form";
import {financeSubmit} from "../../../../services/axios/Submit.tsx";
import {URL_FINANCE_BANK} from "../../../../services/axios/ApiUrls.tsx";
import {toast} from "react-toastify";

interface BankModalProps {
    modalState: boolean;
    hideModal: () => void;
    bank?: Bank;
}

const DefaultBank: Bank = {
    bankId: null,
    bankName: '',
    code: null,
}


const App = (props: BankModalProps): ReactElement => {
    const {handleSubmit, control, formState: {errors, dirtyFields, isDirty}, getValues} = useForm<Bank>({defaultValues: DefaultBank})

    const onSubmit = (data: Bank, e: BaseSyntheticEvent<object> | undefined) => {
        let method: string;
        let submitData;

        if (data.bankId !== null) {
            method = 'patch';

            const currentValues: Bank = getValues();
            const modifiedFields: Partial<Record<keyof Bank, Bank[keyof Bank]>> = {
                bankId: data.bankId
            };

            (Object.keys(dirtyFields) as Array<keyof Bank>).forEach((key: keyof Bank) => {
                modifiedFields[key] = currentValues[key];
            });

            submitData = modifiedFields
        } else {
            method = 'post'
            submitData = data
        }

        financeSubmit(e, URL_FINANCE_BANK, submitData, method).then(() => {
            toast.success('Extrato inserido com sucesso');
        }).catch(() => {
            toast.error('Erro ao salvar extrato');
        })
    }

    const body =
        <>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="row">
                    <div className="col-8">
                        <label htmlFor="">Nome</label>
                        <Controller
                            name={'bankName'}
                            control={control}
                            rules={{required: 'Esse campo é obrigatório'}}
                            render={({field}) => (
                                <input
                                    type={'text'}
                                    {...field}
                                    className={`form-control input-default ${errors.bankName ? 'input-error' : ''}`}
                                />
                            )}
                        />
                    </div>
                    <div className="col-4">
                        <label htmlFor="">Código</label>
                        <Controller
                            name={'code'}
                            control={control}
                            rules={{required: 'Esse campo é obrigatório'}}
                            render={({field}) => (
                                <input type={'text'}
                                       {...field}
                                       value={field.value ?? ''}
                                       className={'form-control input-default'}
                                />
                            )}
                        />
                    </div>
                </div>
            </form>
        </>

    return (
        <Modal
            title={'Bancos/Financeiras'}
            showModal={props.modalState}
            hideModal={props.hideModal}
            body={body}
            actionModal={handleSubmit(onSubmit)}
            disableAction={!isDirty}
            size='modal-lg'
        />
    )
}

export default App;