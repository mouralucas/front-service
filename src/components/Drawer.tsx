import classNames from 'classnames';
import {useState} from "react";
import Toolbar, { Item as ToolbarItem } from 'devextreme-react/toolbar';
import {useScreenSize} from '../utils/media-query';
import '../assets/core/drawer.scss'
// import '../assets/core/drawer_component.scss'
import '../assets/variables.scss'
import ReactDOM from 'react-dom';


interface DrawerProps {
    isOpened: boolean;
    changePanelOpened: any;
}

const Drawer = (props: DrawerProps) => {
    const [isPinned] = useState<boolean>(false);
    // const [isEditing, setIsEditing] = useState(false);
    const {isLarge, isMedium} = useScreenSize();

    if (!props.isOpened) return null;

    const caralho = () => {
        props.changePanelOpened(false);
    }

    return ReactDOM.createPortal(
        <div id='contact-panel' className={classNames({'panel': true, 'open': props.isOpened, 'pin': isPinned && (isLarge || isMedium)})}>
            <div className="data-wrapper">
                <Toolbar className="panel-toolbar">
                    <ToolbarItem location={'before'}>
                        <span className='contact-name value'>Lucas Moura</span>
                    </ToolbarItem>
                    <ToolbarItem >
                        <button onClick={caralho}>Fechar</button>
                    </ToolbarItem>
                </Toolbar>
            </div>
        </div>,
        document.body // Renderiza no body, garantindo que ocupe toda a tela
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