import React, {ReactElement} from 'react'
// import 'bootstrap/dist/css/bootstrap.min.css';
import '../assets/core/components/modal.css'

interface ModalProps {
    // Add defaults no parâmetro e tirar validações do tipo ??
    // Ref: https://bobbyhadz.com/blog/react-optional-props-typescript
    showModal: any;
    hideModal?: any;
    actionModal?: any;
    disableAction?: boolean;
    footer?: React.ReactElement;
    body: React.ReactElement;
    headerComponents?: React.ReactElement;
    fullscreen?: any;
    title?: string;
    size?: 'modal-sm' | 'modal-lg' | 'modal-xl' | 'modal-fullscreen';
}


const App = (props: ModalProps): React.ReactElement => {

    // Criar um props que recebe o footer, caso não exista o props usar o default (que está feito nessa tela)
    const footer: React.ReactElement = props.footer ??
        <>
            <div className="col-3">
                <div className="d-flex flex-nowrap">
                    <button className='btn btn-outline-secondary text-center w-100'
                            onClick={props.hideModal}>Fechar
                    </button>
                </div>
            </div>
            <div className="col-4">
            </div>
            <div className="col-3">
                <div className="d-flex flex-nowrap">
                    <button className='btn btn-default text-black btn-outline-primary text-center w-100 mr-1' disabled={props.disableAction ?? false}
                            onClick={props.actionModal ?? props.hideModal}>Salvar
                    </button>
                </div>
            </div>
        </>

    const html: ReactElement =
        <>
            {/* Modal */}
            <div
                className={`modal ${props.showModal ? "show" : "fade"}`}
                tabIndex={-1}
                style={{ display: props.showModal ? "block" : "none" }}
                role="dialog"
                aria-modal="true"
            >
                <div className={`modal-dialog modal-dialog-centered ${props.size ?? ''}`}>
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title">{props.title ?? "Modal Title"}</h5>
                            <button
                                type="button"
                                className="btn-close"
                                aria-label="Close"
                                onClick={props.hideModal}
                            ></button>
                        </div>
                        <div className="modal-body">
                            {props.body ?? <p>This is the modal body.</p>}
                        </div>
                        <div className="modal-footer">
                            <div className='row pr-2 pl-2 d-flex justify-content-between align-items-center flex-wrap w-100'>
                                {footer}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Backdrop */}
            {props.showModal && <div className="modal-backdrop fade show"></div>}
        </>

    return (
        html
    );
}
export default App;