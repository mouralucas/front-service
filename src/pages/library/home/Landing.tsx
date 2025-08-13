import {ReactElement, useEffect} from 'react'
import Card from "../../../components/Card.tsx";
import BookTable from './tables/Books.tsx'
import MangaTable from "./tables/Mangas.tsx";

const App = (): ReactElement => {
    useEffect(() => {
        document.title = 'Registro de informações';
    }, [])

    return (
        <div className="container">
            <div className="App">
                <div className="row">
                    <div className="col-12">
                        <BookTable/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Body>
                                <MangaTable />
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;