import {ReactElement, useState} from "react";
import classNames from 'classnames';
import {useScreenSize} from '../utils/media-query';
import '../assets/core/drawer.scss'
import '../assets/variables.scss'
import ReactDOM from 'react-dom';

interface DrawerProps {
    isOpened: boolean;
    changePanelOpened: any;
    content: ReactElement;
}

const Drawer = (props: DrawerProps) => {
    const [isPinned] = useState<boolean>(false);
    const {isLarge, isMedium} = useScreenSize();

    return ReactDOM.createPortal(
        <div id='contact-panel' className={classNames({'panel': true, 'open': props.isOpened, 'pin': isPinned && (isLarge || isMedium)})}>
            <div className="data-wrapper">
                {props.content}
            </div>
        </div>,
        document.body
    );
}

export default Drawer;