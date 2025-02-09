import {FC, ReactElement} from "react";
import Card from "../../../../components/Card.tsx";
import CreditCardBillHistory from "./tables/CreditCardBillHistory.tsx";


const TransactionsDashboardLanding: FC = (): ReactElement => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-6">
                    <Card>
                        <Card.Header>
                            Histórico de faturas
                        </Card.Header>
                        <Card.Body>
                            <CreditCardBillHistory />
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    )
}

export default TransactionsDashboardLanding;