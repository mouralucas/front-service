import {FC, ReactElement} from "react";

import '../../assets/login/login.css'
import logo from '../../assets/core/images/logo/logo_lucas.svg'
import {Controller, useForm} from "react-hook-form";
import {Login as LoginInterface} from './Interfaces'
import {userSubmit} from "../../services/axios/Submit.tsx";
import {URL_LOGIN} from "../../services/axios/ApiUrls.tsx";
import {setToken} from "../../services/auth/Auth.tsx";
import {useLocation, useNavigate} from "react-router-dom";

interface LoginResponse {
    tokenPair: {
        accessToken: string;
        refreshToken: string;
    }
}


const Login: FC = (): ReactElement => {
    const {handleSubmit, control, formState: {errors}} = useForm<LoginInterface>()

    const navigate = useNavigate();
    const location = useLocation();

    const onSubmit = async (data: LoginInterface, e: any) => {
        userSubmit(e, URL_LOGIN, data, 'post').then((response: LoginResponse) => {
            console.log(response);
            setToken('access', response.tokenPair.accessToken);
            setToken('refresh', response.tokenPair.refreshToken);

            // Try to get "from" from Navigate state, if none try to get query param "from"
            let navigateTo: string = location.state?.from.pathname ?? '/'
            if (navigateTo === '/') {
                // The query param "from" is used to trigger login from API calls
                const searchParams = new URLSearchParams(location.search);
                navigateTo = searchParams.get('from') || '/';
            }
            navigate(navigateTo, {replace: true})

        }).catch((error: Error) => {
            console.log(error);
        })
    }


    return (
        <div className="row d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="card card-custom shadow overflow-auto">
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <div className="row">
                        <img src={logo} alt="Logo" className="mb-4 mx-auto d-block"/>
                        <form onSubmit={handleSubmit(onSubmit)} className="w-100">
                            <div className="mb-3">
                                <label htmlFor="username" className="form-label">Usuário</label>
                                <Controller
                                    name="username"
                                    control={control}
                                    rules={{required: 'Digite o nome de usuário'}}
                                    render={({field}) => (
                                        <input
                                            id="username"
                                            type="text"
                                            {...field}
                                            className={`${errors.username ? "input-error form-control" : "form-control"}`}
                                        />
                                    )}
                                />
                                {errors.username && <span className={'text-danger mt-1'}>{errors.username.message}</span>}
                            </div>
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Senha</label>
                                <Controller
                                    name="password"
                                    control={control}
                                    rules={{required: 'Digite a senha'}}
                                    render={({field}) => (
                                        <input
                                            id="password"
                                            type="password"
                                            {...field}
                                            className={`${errors.password ? "input-error form-control" : "form-control"}`}
                                        />
                                    )}
                                />
                                {errors.password && <span className={'text-danger mt-1'}>{errors.password.message}</span>}
                            </div>
                            <div className="d-grid">
                                <button type="submit" className="btn btn-primary">Entrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Login;