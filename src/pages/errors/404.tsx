import {ReactElement} from "react";
import '../../assets/core/errors.css'
import error404 from '../../assets/core/images/error/404.png'


const App = (): ReactElement => {
    return (
        <>
            <div className='error-404'>
                <div className='error-404-img'>
                    <img src={error404} alt="Não encontrado"/>
                </div>
                <div className="error-404_text">
                    <h2 className='error-404'> Ops!</h2>
                    <p className='error-404-title'>Não conseguimos encontrar a página que você está tentando acessar :(</p>
                    <p className='error-404-specification'>Erro 404.</p>
                </div>
            </div>
            <div className="bt-back-error404">
                <a href="#" className="bt-back-error404" onClick={() => window.history.go(-1)}>Voltar</a>
            </div>
        </>
    )
}

export default App;