import {ReactElement} from "react";
import Modal from "../../../../components/Modal.tsx";

interface SerieModalProps {
    modalState: boolean;
    hideModal: () => void;
}

const App = (props: SerieModalProps): ReactElement => {
    const body =
        <>Lucas</>

    return (
        <Modal
            showModal={props.modalState}
            body={body}
        />
    )
}

export default App;