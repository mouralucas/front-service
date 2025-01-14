import Modal from "../../../../components/Modal.tsx";

interface InvestmentPerformanceProps {
    modalState: boolean;
    hideModal: any;
    investmentId: string;
}

const App = (props: InvestmentPerformanceProps) => {

    const body =
        <>Lucas</>

    const footer =
        <>
            <div className="col-9">
            </div>
            <div className="col-3">
                <div className="d-flex flex-nowrap">
                    <button className='btn btn-outline-secondary text-center w-100'
                            onClick={props.hideModal}>Fechar
                    </button>
                </div>
            </div>

        </>

    return (
        <Modal
            showModal={props.modalState}
            hideModal={props.hideModal}
            title={'Investimento'}
            body={body}
            footer={footer}
        />
    )
}

export default App;