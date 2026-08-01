import { useState } from "react";
import {
  Button,
  Menu,
  MenuItem,
  Popover,
  Box
} from "@mui/material";
import { Link } from "react-router-dom";
import { items } from "./Items";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface MenuItemType {
  title: string;
  url?: string;
  submenu?: MenuItemType[];
}

const Navbar = () => {
  return (
    <Box sx={{ display: "flex", gap: 1 }}>
      {items.map((item, index) => (
        <NavItem key={index} item={item} />
      ))}
    </Box>
  );
};

export default Navbar;

const NavItem = ({ item }: { item: MenuItemType }) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (item.submenu) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  if (!item.submenu) {
    return (
      <Button
        component={Link}
        to={item.url || "/"}
        color="inherit"
      >
        {item.title}
      </Button>
    );
  }

  return (
    <>
      <Button color="inherit" onClick={handleOpen}>
        {item.title}
      </Button>

      <Menu anchorEl={anchorEl} open={open} onClose={handleClose}>
        {item.submenu.map((subItem, index) => (
          <SubMenuItem
            key={index}
            item={subItem}
            onCloseAll={handleClose}
          />
        ))}
      </Menu>
    </>
  );
};

const SubMenuItem = ({
  item,
  onCloseAll,
}: {
  item: MenuItemType;
  onCloseAll: () => void;
}) => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const open = Boolean(anchorEl);

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    if (item.submenu) {
      setAnchorEl(event.currentTarget);
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  // 🔹 Item final (link)
  if (!item.submenu) {
    return (
      <MenuItem
        component={Link}
        to={item.url || "/"}
        onClick={onCloseAll} // 🔥 fecha tudo
      >
        {item.title}
      </MenuItem>
    );
  }

  // 🔹 Item com submenu
  return (
    <>
      <MenuItem
        onClick={handleOpen}
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          gap: 1,
        }}
      >
        {item.title}
        <ChevronRightIcon
          fontSize="small"
          sx={{ opacity: 0.6, color: "text.secondary" }}
        />
      </MenuItem>

      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <Box sx={{ minWidth: 200 }}>
          {item.submenu.map((subItem, index) => (
            <SubMenuItem
              key={index}
              item={subItem}
              onCloseAll={onCloseAll} 
            />
          ))}
        </Box>
      </Popover>
    </>
  );
};