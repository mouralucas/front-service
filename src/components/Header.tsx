import { AppBar, Toolbar, Box } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "./navbar/Navbar";

import logo from "@/assets/core/images/logo/logo_lucas.svg";

const Header = () => {
    return (
        <AppBar position="sticky">
            <Toolbar>
                <Box
                    component={Link}
                    to="/"
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        flexGrow: 1,
                    }}
                >
                    <Box
                        component="img"
                        src={logo}
                        alt="Logo"
                        sx={{
                            height: 40, // ajuste conforme necessário
                            width: "auto",
                        }}
                    />
                </Box>

                <Navbar />
            </Toolbar>
        </AppBar>
    );
};

export default Header;