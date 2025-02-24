import {FC, ReactElement} from "react";
import Card from "../../../../components/Card.tsx";
import CreditCardBillHistory from "./tables/CreditCardBillHistory.tsx";
import CreditCardBillEvolution from "./charts/CreditCardBillEvolution.tsx";


const TransactionsDashboardLanding: FC = (): ReactElement => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-12">
                    <Card>
                        <Card.Body>
                            <CreditCardBillEvolution />
                        </Card.Body>
                    </Card>
                </div>
            </div>
            <div className="row">
                <div className="col-6">
                    <Card>
                        {/*<Card.Header>*/}
                        {/*    Histórico de faturas*/}
                        {/*</Card.Header>*/}
                        <Card.Body>
                            <h5 className="card-title mb-3">Histórico Crédito</h5>
                            <CreditCardBillHistory/>
                        </Card.Body>
                    </Card>
                </div>
                <div className="col-6">
                    <Card>
                        <Card.Body>
                            <h5 className='card-title'>Gráfico</h5>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default TransactionsDashboardLanding;