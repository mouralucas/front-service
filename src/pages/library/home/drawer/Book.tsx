import {ReactElement} from "react";
import '../../../../assets/library/itemDrawer.scss'
import Drawer from "../../../../components/Drawer.tsx";
import image from '../../../../assets/core/images/no-cover.png'


interface BookDrawerProps {
    openDrawerState: boolean;
    itemId: number;
    onCloseDrawerClick: () => void;
}

const BookDrawer = (props: BookDrawerProps): ReactElement => {

    // TODO: add here fetch to item summary

    const html: ReactElement =
        <>
            <div className="custom-toolbar">
                <div className="toolbar-item before">
                    <span className="contact-name">Lucas Moura</span>
                </div>
                <div className="toolbar-item before">
                    <div className="status-item status-owned">
                        <span>Na estante</span>
                    </div>
                </div>
                <div className="toolbar-item after">
                    ouo
                </div>
                <div className="toolbar-item after">
                    <button className="toolbar-button close-button" onClick={props.onCloseDrawerClick}>
                        ✖
                    </button>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <div className='item-cover-view mt-2 ms-2'>
                        <div
                            className={`item-cover`}
                            style={{
                                width: 150,
                                height: 200,
                                maxHeight: 200,
                                backgroundImage: `url(${image})`,
                                backgroundSize: "cover",
                                backgroundPosition: "center",
                                backgroundRepeat: "no-repeat",
                            }}
                        />
                    </div>
                </div>
                <div className="col-6">
                    <table className={'mt-2 me-2'}>
                        <tr>
                            <th className={'contact-name'}>Título</th>
                        </tr>
                        <tr>
                            <td>
                                <div>O Iluminado</div>
                                <div className="fw-light text-muted small">Aqui é o subtítulo</div>
                            </td>
                        </tr>
                    </table>
                    <table className={'mt-2 me-2'}>
                        <tr>
                            <th>
                                <div>
                                    Stephen King
                                    <div className="fw-light text-mutted small">
                                        Owen King; Outro Autor; Mais um ainda
                                    </div>
                                </div>
                            </th>
                        </tr>
                    </table>
                </div>
            </div>
        </>

    return (
        <Drawer
            isOpened={props.openDrawerState}
            changePanelOpened={props.onCloseDrawerClick}
            content={html}
        />
    )
}

export default BookDrawer;