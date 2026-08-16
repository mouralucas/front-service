import { AppBar, Avatar, Box, Toolbar } from "@mui/material";
import { Link } from "react-router-dom";
import Navbar from "./navbar/Navbar";

import logo from "@/assets/core/images/logo/logo_lucas.svg";
import { deepOrange } from "@mui/material/colors";
import { useEffect, useState } from "react";
import { UserProfile } from "../features/users/types/User";
import { GetUserProfile } from "../features/users/types/UserRequest";
import { URL_USER_LOGGED_PROFILE } from "../services/axios/ApiUrls";
import getUserData from "../features/users/api/User";

const Header = () => {
    const [userProfile, setUserProfile] = useState<UserProfile>()

    const GetUserProfile = async () => {
        const response: GetUserProfile = await getUserData(
            URL_USER_LOGGED_PROFILE,
        );

        setUserProfile(response.userProfile);
    }

    useEffect(() => {
        GetUserProfile();
    }, [])

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
                <Box sx={{ ml: 4, mr: 4 }}>
                    <Avatar
                        sx={{ bgcolor: deepOrange[500] }}
                        alt={userProfile?.name}
                        src="/broken-image.jpg"
                    />
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;