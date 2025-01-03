import {items} from './Items';
import MenuItems from './MenuItems';
import React from 'react';

// Project reference:
// https://blog.logrocket.com/how-create-multilevel-dropdown-menu-react/
const getMenuItens = () => {
    return items.map((menu, index: React.Key | null | undefined) => {

        const depthLevel = 0;

        return <MenuItems items={menu} key={index} depthLevel={depthLevel}/>;
    })
}

const Navbar = () => {
    return (
        <nav>
            <ul className="menus">
                {getMenuItens()}
            </ul>
        </nav>
    );
};

export default Navbar;