import MenuItems from "./MenuItems";

const Dropdown = ({submenus, dropdown, depthLevel}: { submenus: any, dropdown: any, depthLevel: any }) => {
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? "dropdown-submenu" : "";

    return (
        <ul className={`dropdown ${dropdownClass} ${dropdown ? "show" : ""}`}>
            {submenus.map((submenu: never, index: never) => (
                <MenuItems items={submenu} key={index} depthLevel={depthLevel}/>
            ))}
        </ul>
    );
};

export default Dropdown;