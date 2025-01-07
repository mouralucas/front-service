import {ReactElement} from "react";
import Modal from '../../../../components/Modal'
import {Investment} from "../../Interfaces.tsx";
import {useForm} from "react-hook-form";


interface InvestmentProps {
    investment?: Investment | undefined | null,
    modalState: boolean,
    hideModal: any
}

const App = (props: InvestmentProps): ReactElement => {
    const {
        handleSubmit,
        // control,
        // reset,
        formState: {dirtyFields},
        getValues,
    } = useForm<Investment>()

    const onSubmit = (data: Investment, e: any) => {
        let method;
        let submit_data;

        if (data.investmentId !== null){
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
                        <input className={'form-control'}/>
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