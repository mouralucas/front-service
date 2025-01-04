import Card from '../../../components/Card'
import React, {useEffect} from "react";
import InvestmentTable from './tables/Investment'

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
                                <div className="row pr-2 pl-2 d-flex justify-content-between align-items-center flex-wrap w-100">
                                    <div className="col-10">Fatura</div>
                                    <div className="col-2"></div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                a
                            </Card.Body>
                        </Card>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Header>Extrato</Card.Header>
                            <Card.Body>
                                a
                            </Card.Body>
                        </Card>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Header>
                                <div className="row pr-2 pl-2 d-flex justify-content-between align-items-center flex-wrap w-100">
                                    <div className="col-10">Investimentos</div>
                                    <div className="col-2"></div>
                                </div>
                            </Card.Header>
                            <Card.Body>
                                <InvestmentTable />
                            </Card.Body>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;