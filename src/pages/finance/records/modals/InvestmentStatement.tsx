import {ReactElement, useEffect} from "react";
import Modal from "../../../../components/Modal.tsx";
import {Investment, InvestmentStatement} from "../../../../interfaces/Finance.tsx";
import {Controller, useForm} from "react-hook-form";

interface InvestmentStatementProps {
    modalState: boolean,
    hideModal: any,
    investment: Investment | undefined,
}

const DefaultInvestmentStatement: InvestmentStatement = {
    investmentId: '',
    name: ''
}

const App = (props: InvestmentStatementProps): ReactElement => {
    const {handleSubmit, control, getValues, setValue, reset} = useForm<InvestmentStatement>({defaultValues: DefaultInvestmentStatement})

    useEffect(() => {
        if (props.modalState && props.investment && props.investment.investmentId) {
            reset({
                ...getValues(),
                investmentId: props.investment.investmentId,
                name: props.investment.name,
            });
        }
    }, [props.investment, props.modalState, setValue]);

    const onSubmit = (data: InvestmentStatement, e: any) => {
        console.log(data, e)
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
            </div>
        </form>

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