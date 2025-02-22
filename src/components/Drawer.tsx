import classNames from 'classnames';
import {useState} from "react";
import {useScreenSize} from '../utils/media-query';
import '../assets/core/drawer.scss'
import '../assets/variables.scss'
import '../assets/library/ItemStatus.scss'
import '../assets/core/teste.scss'
import ReactDOM from 'react-dom';
import image from '../assets/core/images/no-cover.png'

interface DrawerProps {
    isOpened: boolean;
    changePanelOpened: any;
}

const Drawer = (props: DrawerProps) => {
    const [isPinned] = useState<boolean>(false);
    const {isLarge, isMedium} = useScreenSize();

    return ReactDOM.createPortal(
        <div id='contact-panel' className={classNames({'panel': true, 'open': props.isOpened, 'pin': isPinned && (isLarge || isMedium)})}>
            <div className="data-wrapper">
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
                        <button className="toolbar-button close-button" onClick={props.changePanelOpened}>
                            ✖
                        </button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-6">
                        <div className='form-photo-view mt-2 ms-2'>
                            <div
                                className={`form-photo`}
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
                                <th>Título</th>
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
            </div>
        </div>,
        document.body
    );

    // return (
    //     <div id='contact-panel' className={classNames({'panel': true, 'open': props.isOpened, 'pin': isPinned && (isLarge || isMedium)})}>
    //         <div className="data-wrapper">
    //             <Toolbar className="panel-toolbar">
    //                 <ToolbarItem location={'before'}>
    //                     <span className='contact-name value'>Lucas Moura</span>
    //                 </ToolbarItem>
    //             </Toolbar>
    //         </div>
    //     </div>
    // )
}

export default Drawer;