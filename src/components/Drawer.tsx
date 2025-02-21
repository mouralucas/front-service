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
                {/*<Toolbar className="panel-toolbar">*/}
                {/*    <ToolbarItem location={'before'}>*/}
                {/*        <span className='contact-name value'>Lucas Moura</span>*/}
                {/*    </ToolbarItem>*/}
                {/*    <ToolbarItem location={'before'}>*/}
                {/*        <div className={`status status-item status-owned`}>*/}
                {/*            <span>Na estante</span>*/}
                {/*        </div>*/}
                {/*    </ToolbarItem>*/}
                {/*    <ToolbarItem location='after'>*/}
                {/*        <Button*/}
                {/*            icon='close'*/}
                {/*            stylingMode='text'*/}
                {/*            onClick={props.changePanelOpened}*/}
                {/*        />*/}
                {/*    </ToolbarItem>*/}
                {/*</Toolbar>*/}
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
                        <span>Título</span>
                        O Iluminado
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