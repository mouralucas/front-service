import Dropdown from './Dropdown';
import {useEffect, useRef, useState} from "react";
import {Link} from "react-router-dom";

// @ts-expect-error Missing types
const MenuItems = ({items, depthLevel}) => {
    const [dropdown, setDropdown] = useState(false);
    const ref = useRef<HTMLLIElement>(null); // Especificando o tipo do ref

    useEffect(() => {
        const handler = (event: { target: any; }) => {
            if (dropdown && ref.current && !ref.current.contains(event.target)) {
                setDropdown(false);
            }
        };
        document.addEventListener("mousedown", handler);
        document.addEventListener("touchstart", handler);
        return () => {
            // Cleanup the event listener
            document.removeEventListener("mousedown", handler);
            document.removeEventListener("touchstart", handler);
        };
    }, [dropdown]);

    const onMouseEnter = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        window.innerWidth > 960 && setDropdown(true);
    };

    const onMouseLeave = () => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        window.innerWidth > 960 && setDropdown(false);
    };



    return (
        <li className="menu-items" ref={ref} onMouseEnter={onMouseEnter} onMouseLeave={onMouseLeave}>
            {items.submenu ? (
                <>
                    <button type="button" aria-haspopup="menu"
                            aria-expanded={dropdown ? "true" : "false"}
                            onClick={() => setDropdown((prev) => !prev)}>
                        {items.title}{" "}
                        {depthLevel > 0 ? <span>&raquo;</span> : <span className="arrow"/>}
                    </button>
                    <Dropdown submenus={items.submenu} dropdown={dropdown} depthLevel={depthLevel}/>
                </>
            ) : (
                <Link to={items.url}>{items.title}</Link>
            )}
        </li>
    );
};

export default MenuItems;