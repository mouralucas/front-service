import {ReactElement} from "react";
import Card from "../components/Card.tsx";


const App = (): ReactElement => {

    return (
        <div className="container">
            <div className="row">
                <div className="col-3">
                    <Card>
                        <Card.Body>
                            <>Card de descrição</>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-9">
                    <div className="row">
                        <div className="col-4">
                            <Card>
                                <Card.Body>
                                    <p>Saldo</p>
                                    <p>R$ 0,00</p>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-4">
                            <Card>
                                <Card.Body>
                                    <p>Entradas</p>
                                    <p>R$ 0,00</p>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-4">
                            <Card>
                                <Card.Body>
                                    <p>Despesas</p>
                                    <p>R$ 0,00</p>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-6">
                            <Card>
                                <Card.Body>
                                    <>Lucas</>
                                </Card.Body>
                            </Card>
                        </div>
                        <div className="col-6">
                            <Card>
                                <Card.Body>
                                    <>Lucas</>
                                </Card.Body>
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default App;