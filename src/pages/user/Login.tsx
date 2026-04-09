import { FC } from "react";
import {
    Box,
    Card,
    CardContent,
    TextField,
    Button,
    Typography
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import logo from "../../assets/core/images/logo/logo_lucas.svg";
import { Login as LoginInterface } from "./Interfaces";
import { userSubmit } from "../../services/axios/Submit";
import { URL_LOGIN } from "../../services/axios/ApiUrls";
import { setToken } from "../../services/auth/Auth";

interface LoginResponse {
    tokenPair: {
        accessToken: string;
        refreshToken: string;
    };
}

const Login: FC = () => {
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting }
    } = useForm<LoginInterface>();

    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = async (data: LoginInterface, e: any) => {
        try {
            const response: LoginResponse = await userSubmit(
                e,
                URL_LOGIN,
                data,
                "post"
            );

            setToken("access", response.tokenPair.accessToken);
            setToken("refresh", response.tokenPair.refreshToken);

            let navigateTo: string = location.state?.from?.pathname ?? "/";

            if (navigateTo === "/") {
                const searchParams = new URLSearchParams(location.search);
                navigateTo = searchParams.get("from") || "/";
            }

            navigate(navigateTo, { replace: true });
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            height="100vh"
            bgcolor="background.default"
        >
            <Card sx={{ width: 800, p: 2, height: 400 }}>
                <CardContent>
                    <Box display="flex" flexDirection="column" alignItems="center">
                        <Box
                            component="img"
                            src={logo}
                            alt="Logo"
                            sx={{ width: 120, mb: 3 }}
                        />

                        <Typography variant="h5" mb={2}>
                            Login
                        </Typography>

                        <Box
                            component="form"
                            onSubmit={handleSubmit(onSubmit)}
                            width="50%"
                            display="flex"
                            flexDirection="column"
                            alignItems="center"
                        >
                            <TextField
                                label="Usuário"
                                fullWidth
                                margin="normal"
                                {...register("username", {
                                    required: "Entre com o nome de usuário"
                                })}
                                error={!!errors.username}
                                helperText={errors.username?.message}
                            />

                            <TextField
                                label="Senha"
                                type="password"
                                fullWidth
                                margin="normal"
                                {...register("password", {
                                    required: "Entre com a senha"
                                })}
                                error={!!errors.password}
                                helperText={errors.password?.message}
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                fullWidth
                                sx={{ mt: 2 }}
                                disabled={isSubmitting}
                            >
                                Entrar
                            </Button>
                        </Box>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default Login;