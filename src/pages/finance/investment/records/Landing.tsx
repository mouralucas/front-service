import Card from '../../../../components/Card'
import React, {useEffect} from "react";
import InvestmentTable from './tables/Investment'
import ObjectivesTable from './tables/Objectives'

const App = (): React.ReactElement => {
    useEffect(() => {
        document.title = 'Registro de informações';
    }, [])

    return (
        <div className="container">
            {/*<Sidebar/>*/}
            <div className="App">
                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Header>
                                <b>Investimentos</b>
                            </Card.Header>
                            <Card.Body>
                                <InvestmentTable />
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Header><b>Objetivos</b></Card.Header>
                            <Card.Body>
                                <ObjectivesTable />
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;