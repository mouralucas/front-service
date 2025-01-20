import {ReactElement, useEffect} from "react";
import AuthorTable from './tables/Authors'
import Card from "../../../components/Card.tsx";

const App = (): ReactElement => {
    useEffect(() => {
        document.title = 'Library backoffice';
    }, [])

    return (
        <div className='container'>
            <div className="row">
                <div className="col-12">
                    <Card>
                        <Card.Header>
                            Autores
                        </Card.Header>
                        <Card.Body>
                            <AuthorTable/>
                        </Card.Body>
                    </Card>

                </div>
            </div>
        </div>
    )
}

export default App;