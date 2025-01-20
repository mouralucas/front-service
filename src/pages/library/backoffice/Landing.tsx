import {ReactElement, useEffect} from "react";
import AuthorTable from './tables/Authors'
import PublisherTable from './tables/Publishers'
import SerieTable from './tables/Series'
import CollectionTable from './tables/Collections'
import Card from "../../../components/Card";

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
                            <b>Autores</b>
                        </Card.Header>
                        <Card.Body>
                            <AuthorTable/>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Card>
                        <Card.Header>
                            <b>Editoras</b>
                        </Card.Header>
                        <Card.Body>
                            <PublisherTable/>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Card>
                        <Card.Header>
                            <b>Séries</b>
                        </Card.Header>
                        <Card.Body>
                            <SerieTable/>
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-12">
                    <Card>
                        <Card.Header>
                            <b>Coleções</b>
                        </Card.Header>
                        <Card.Body>
                            <CollectionTable/>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default App;