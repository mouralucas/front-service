import {ReactElement, FC, useState} from "react";
import '../assets/login/Login.css'
import user_service_conn from "../services/axios/UserServiceAxios";
import logo from '../assets/core/images/logo/logo_lucas.svg'
import {setToken} from "../services/auth/Auth.tsx";
import {URL_LOGIN} from "../services/axios/ApiUrls.tsx";
import {useLocation, useNavigate} from "react-router-dom";

async function loginAPI(credentials: { username: string; password: string; }) {
    return user_service_conn({
        method: 'post',
        url: URL_LOGIN,
        data: credentials,
        headers: {}
    }).then((response: { data: any; }) => {
        return response.data
    }).catch((response: any) => {
        return {'error': response}
    })
}


const Login: FC = (): ReactElement => {
    const [username, setUserName] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const navigate = useNavigate();
    const location = useLocation();

    const handleSubmit = async (e: { preventDefault: () => void; }) => {
        e.preventDefault();

        const token = await loginAPI({
            username,
            password
        });

        if (Object.prototype.hasOwnProperty.call(token, 'error')) {
            alert(token.error.response.data.error);
        } else {
            setToken('access', token.tokenPair.accessToken);
            setToken('refresh', token.tokenPair.refreshToken);

            const navigate_to: string = location.state?.from.pathname ?? "/library/home"
            navigate(navigate_to, {replace: true});
        }
    }


    return (
        <div className="row d-flex align-items-center justify-content-center vh-100 bg-light">
            <div className="card card-custom shadow">
                <div className="card-body d-flex flex-column align-items-center justify-content-center">
                    <div className="row">
                        <img src={logo} alt="Logo" className='mb-4'/>
                        <form onSubmit={handleSubmit}>
                            <label htmlFor="">Username</label>
                            <input name={'username'} placeholder={'Username'} onChange={e => setUserName(e.target.value)} className='form-control'/>
                            <label htmlFor="">Password</label>
                            <input type={'password'} name={'password'} placeholder={'Password'} onChange={e => setPassword(e.target.value)} className='form-control'/>
                            <div className="text-center">
                                <button type='submit' className="mt-4 btn btn-primary btn-block w-100">Entrar</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login;