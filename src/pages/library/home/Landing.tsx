import {ReactElement, useEffect} from 'react'
import Card from "../../../components/Card.tsx";
import BookTable from './tables/Books.tsx'

const App = (): ReactElement => {
    useEffect(() => {
        document.title = 'Registro de informações';
    }, [])

    return (
        <div className="container">
            <div className="App">
                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Header>
                                Livros
                            </Card.Header>
                            <Card.Body>
                                <BookTable/>
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;