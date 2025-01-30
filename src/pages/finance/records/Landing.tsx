import Card from '../../../components/Card'
import React, {useEffect} from "react";
import AccountTransactionTable from './tables/AccountTransaction'
import CreditCardTransactionTable from './tables/CreditCardTransaction'

const App = (): React.ReactElement => {
    useEffect(() => {
        document.title = 'Registro de informações';
    }, [])

    return (
        <div className="container">
            {/*<Sidebar/>*/}
                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Header>
                                <b>Transações bancárias</b>
                            </Card.Header>
                            <Card.Body>
                                <AccountTransactionTable />
                            </Card.Body>
                        </Card>
                    </div>
                </div>

                <div className="row">
                    <div className="col-12">
                        <Card>
                            <Card.Header>
                                <b>Transações no cartão de crédito</b>
                            </Card.Header>
                            <Card.Body>
                                <CreditCardTransactionTable />
                            </Card.Body>
                        </Card>
                    </div>
                </div>
        </div>
    );
}

export default App;